import { useState } from "react";

const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = async (text: string) => {
    setIsSpeaking(true);
    try {
      const response = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        console.error("Speech API failed:", await response.json());
      }
    } catch (error) {
      console.error("Speech request failed", error);
    } finally {
      setIsSpeaking(false);
    }
  };

  return { speak, isSpeaking };
};

export default useSpeech;
