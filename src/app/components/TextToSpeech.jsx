import React, { useState, useEffect, useRef } from "react";
import { Button } from "@heroui/react";
import { Play, Pause, Square, Volume2 } from "lucide-react";

// Function to clean Markdown syntax
const cleanMarkdown = (text) => {
  return text
    .replace(/[#_*`~>]/g, "") // Remove Markdown symbols
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove links
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/>\s*/g, ""); // Remove blockquotes
};

const TextToSpeech = ({ content }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const utteranceRef = useRef(null);
  const contentRef = useRef(content);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      const defaultVoice = availableVoices.find((voice) =>
        voice.lang.includes("en")
      );
      setSelectedVoice(defaultVoice || availableVoices[0]);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    contentRef.current = content;
    if (isSpeaking) stopSpeech();
  }, [content]);

  const startSpeech = () => {
    if (!contentRef.current || !selectedVoice) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any existing speech

    const cleanContent = cleanMarkdown(contentRef.current);
    const utterance = new SpeechSynthesisUtterance(cleanContent);
    utterance.voice = selectedVoice;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const words = cleanContent.split(/\s+/).filter(Boolean);
        const spokenWords = cleanContent
          .substring(0, event.charIndex)
          .split(/\s+/)
          .filter(Boolean).length;
        setProgress((spokenWords / words.length) * 100);
      }
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setProgress(100);
    };

    utterance.onerror = (event) => {
      console.error("Speech error:", event.error);
      stopSpeech();
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const pauseSpeech = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  };

  const stopSpeech = () => {
    if (isSpeaking || isPaused) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setProgress(0);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex gap-2">
          {!isSpeaking || isPaused ? (
            <Button
              onPress={startSpeech}
              color="primary"
              className="bg-purple-600 text-white hover:bg-purple-700"
              startContent={<Play size={16} />}
            >
              {isPaused ? "Resume" : "Start"}
            </Button>
          ) : (
            <Button
              onPress={pauseSpeech}
              color="warning"
              className="bg-yellow-500 text-white hover:bg-yellow-600"
              startContent={<Pause size={16} />}
            >
              Pause
            </Button>
          )}
          <Button
            onPress={stopSpeech}
            color="danger"
            className="bg-red-500 text-white hover:bg-red-600"
            startContent={<Square size={16} />}
            isDisabled={!isSpeaking && !isPaused}
          >
            Stop
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 size={20} className="text-purple-600" />
          <select
            value={selectedVoice?.name || ""}
            onChange={(e) =>
              setSelectedVoice(
                voices.find((voice) => voice.name === e.target.value)
              )
            }
            className="p-2 border border-purple-300 rounded-md bg-white text-sm"
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-semibold text-purple-600 mb-1">
          Progress: {Math.round(progress)}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          readOnly
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
          style={{
            accentColor: "#9f7aea",
          }}
        />
      </div>
    </div>
  );
};

export default TextToSpeech;
