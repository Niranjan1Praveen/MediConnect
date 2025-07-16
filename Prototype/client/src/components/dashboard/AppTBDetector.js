"use client";
import { useState } from "react";

export default function TBCoughDetection() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const FLASK_BACKEND_URL = "http://localhost:5002";
  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const speakHindi = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    speechSynthesis.speak(utterance);
  };

  const getSimplifiedHindi = async (englishText) => {
    const prompt = `
You are a caring medical assistant helping doctors explain medical results to rural patients in India.

Here is the result of a tuberculosis cough analysis tool:

"${englishText}"

Please translate and rephrase this in simple, spoken Hindi that a rural person can easily understand. 
- Make it emotionally supportive and clear.
- Avoid starting with quotes or ellipses.
- Do NOT include any English or technical words.
- Make sure it sounds natural when spoken aloud by a doctor.
- Limit it to 2–3 emotionally caring sentences only.
`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 100,
            },
          }),
        }
      );

      const data = await res.json();
      console.log("Gemini raw response:", data);

      const geminiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (!geminiText || geminiText === "") {
        console.warn("Gemini returned no meaningful content:", data);
        return "परिणाम को सरल हिंदी में समझाया नहीं जा सका।";
      }

      return geminiText;
    } catch (error) {
      console.error("Gemini error:", error);
      return "परिणाम को समझाने में त्रुटि हुई।";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("audio", file);

      const response = await fetch(FLASK_BACKEND_URL, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Request failed");
      }

      setResult(data.result);

      const hindiSpokenVersion = await getSimplifiedHindi(data.result);
      speakHindi(hindiSpokenVersion);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.message || "Failed to analyze the file. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Tuberculosis Cough Detection
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Audio File
          </label>
          <input
            type="file"
            accept=".wav,.mp3,.ogg,.flac"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Supported formats: WAV, MP3, OGG, FLAC
          </p>
        </div>

        <button
          type="submit"
          disabled={isAnalyzing}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isAnalyzing ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Cough"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500">
          <h3 className="text-sm font-medium text-red-700">Error</h3>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-green-700">
            Analysis Result
          </h3>
          <p className="text-sm text-green-600 whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
}
