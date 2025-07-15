'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';

// Dynamically import AgoraRTC to avoid SSR issues
const AgoraRTC = dynamic(() => import('agora-rtc-sdk-ng'), { ssr: false });

export default function VideoCall() {
  const router = useRouter();
  const [channelName, setChannelName] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [joined, setJoined] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const localVideoRef = useRef(null);
  const remoteContainerRef = useRef(null);
  const [client, setClient] = useState(null);

  // Initialize Agora client only on the client side
  useEffect(() => {
    if (AgoraRTC) {
      setClient(AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }));
    }
  }, []);

  const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID; // Add your Agora App ID in .env

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (channelName.trim()) {
      joinChannel(channelName);
    }
  };

  const handleHostMeeting = () => {
    const newMeetingId = uuidv4();
    setChannelName(newMeetingId);
    setMeetingId(newMeetingId);
    joinChannel(newMeetingId);
  };

  const joinChannel = async (channel) => {
    if (!client) return;
    try {
      const uid = await client.join(appId, channel, null, null);
      const stream = AgoraRTC.createStream({ video: true, audio: true });
      await stream.init();
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream.getMediaStream();
      }
      client.publish(stream);
      setJoined(true);
    } catch (error) {
      console.error('Error joining channel:', error);
    }
  };

  const leaveChannel = async () => {
    if (localStream) {
      localStream.close();
      await client.unpublish(localStream);
    }
    await client.leave();
    setJoined(false);
    setLocalStream(null);
    setRemoteStreams([]);
    setChannelName('');
    setMeetingId('');
  };

  useEffect(() => {
    if (!client) return;

    client.on('user-published', async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === 'video') {
        const stream = user.videoTrack;
        setRemoteStreams((prev) => [...prev, { uid: user.uid, stream }]);
      }
    });

    client.on('user-unpublished', (user) => {
      setRemoteStreams((prev) => prev.filter((stream) => stream.uid !== user.uid));
    });

    return () => {
      if (joined) {
        leaveChannel();
      }
    };
  }, [client, joined]);

  useEffect(() => {
    remoteStreams.forEach(({ uid, stream }) => {
      const videoElement = document.getElementById(`remote-${uid}`);
      if (videoElement && stream) {
        stream.play(videoElement);
      }
    });
  }, [remoteStreams]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {!joined ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Video Call</h1>
          <button
            onClick={handleHostMeeting}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-200 mb-4"
          >
            Host New Meeting
          </button>
          <form onSubmit={handleJoinSubmit}>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="Enter Meeting ID"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Join Call
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-5xl space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Meeting ID: {channelName}</h1>
            <button
              onClick={leaveChannel}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Leave Call
            </button>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <p className="text-gray-800">Share this Meeting ID: <span className="font-mono">{meetingId}</span></p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-black rounded-lg overflow-hidden shadow-md">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 object-cover"
              />
              <p className="text-center text-white bg-gray-800 py-2">You</p>
            </div>
            <div ref={remoteContainerRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {remoteStreams.map(({ uid, stream }) => (
                <div key={uid} className="bg-black rounded-lg overflow-hidden shadow-md">
                  <video
                    id={`remote-${uid}`}
                    autoPlay
                    playsInline
                    className="w-full h-64 object-cover"
                  />
                  <p className="text-center text-white bg-gray-800 py-2">User {uid}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}