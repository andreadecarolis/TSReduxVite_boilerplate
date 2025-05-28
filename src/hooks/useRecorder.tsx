import { useRef, useState } from "react";
import { getSpeechToText, notify } from "@/utils/common.utils";

const useRecorder = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  /* #region handlers */
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.webm");

      setLoading(true);

      getSpeechToText(formData)
        .then((data: { text: string; status: number }) => {
          setTranscript(data.text);
        })
        .catch(() => {
          notify("Failed to transcribe audio", "error");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };
  /* #endregion */

  return { loading, recording, startRecording, stopRecording, transcript };
};

export default useRecorder;
