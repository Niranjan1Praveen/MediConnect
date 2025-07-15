"use client";
import React, { useState, useEffect } from "react";

export default function AppTongueDisease() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);

  useEffect(() => {
    // Check if speech synthesis is supported
    setIsSpeechSupported('speechSynthesis' in window);
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPrediction("");
  };

  const speakText = (text) => {
    if (!isSpeechSupported) {
      console.warn("Speech synthesis not supported");
      return;
    }

    try {
      const synth = window.speechSynthesis;
      // Cancel any ongoing speech
      synth.cancel();
      
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "hi-IN"; // Speak in Hindi
      
      // Add error handling
      utter.onerror = (event) => {
        console.error("SpeechSynthesisUtterance error:", event);
      };
      
      synth.speak(utter);
    } catch (err) {
      console.error("Speech synthesis error:", err);
    }
  };

  const getGeminiResponse = async (prediction) => {
    // ... (keep your existing getGeminiResponse implementation)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    setPrediction("");

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const predicted = data.prediction.toLowerCase(); // Convert to lowercase for consistent comparison
      setPrediction(predicted);

      let message = "";
      const seriousLabels = ["black", "geographic"];

      if (seriousLabels.includes(predicted)) {
        message = await getGeminiResponse(predicted);
      } else {
        message = `आपकी जीभ की स्थिति '${predicted}' पाई गई है। चिंता न करें, यह सामान्य हो सकती है, लेकिन स्वस्थ जीवनशैली बनाए रखें।`;
      }

      console.log("Message to speak:", message); // Debug log
      speakText(message);
    } catch (err) {
      console.error("Prediction failed", err);
      setPrediction("Error occurred.");
      speakText("कुछ त्रुटि हुई है। कृपया पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Tongue Disease Predictor</h1>
      {!isSpeechSupported && (
        <div className="text-yellow-500 mb-4">
          Note: Voice feedback is not supported in your browser
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="bg-white text-black p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {prediction && (
        <div className="mt-6">
          <h2 className="text-xl text-green-400">Prediction: {prediction}</h2>
        </div>
      )}
    </div>
  );
}