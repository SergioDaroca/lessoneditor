import { useEffect, useRef, useState, FC } from "react";
import { SAVED, SAVING } from "./settingsFiles/languages/editor_NO";

interface AutosaveProps {
  mdText: string;
  saveEditorText: () => void;
}

const Autosave: FC<AutosaveProps> = ({ mdText, saveEditorText }) => {
  const [autoSaveMessage, setAutoSaveMessage] = useState("");

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      saveEditorText();
      setAutoSaveMessage(SAVED);
      setTimeout(() => {
        setAutoSaveMessage("");
      }, 1000);
    }, 500);

    return () => {
      clearTimeout(timeoutHandler);
      setAutoSaveMessage(SAVING);
    };
  }, [mdText]);

  return (
    <>
      <p>{autoSaveMessage}</p>
    </>
  );
};

export default Autosave;