import "./mdtextarea.scss";
import { ChangeEvent, Dispatch, FC, KeyboardEvent, MouseEvent, Ref, SetStateAction } from "react";
import ContentPlaceholder from "./ContentPlaceholder";
import { listController, TABcontroller } from "./utils/mdTextAreaControllers";

interface MDTextAreaProps {
  editorRef: Ref<HTMLTextAreaElement>;
  mdText: string;
  buttonValues: Record<string, boolean>;
  listButtonValues: {
    bTitle: string;
    output: string;
    cursorInt: number;
  };
  cursorPositionStart: number;
  setCursorPosition: (positionStart: number, positionEnd: number) => void;
  setMdText: Dispatch<SetStateAction<string>>;
  setButtonValues: Dispatch<SetStateAction<Record<string, boolean>>>;
  setCursor: (pos1: number, pos2: number) => void;
  setUndoAndUndoPosition: (mdText: string, position: number) => void;
  setRedoAndRedoPosition: (mdText: string, position: number) => void;
  resetButtons: () => void;
}

const MDTextArea: FC<MDTextAreaProps> = ({
  editorRef,
  mdText,
  buttonValues,
  listButtonValues,
  cursorPositionStart,
  setCursorPosition,
  setMdText,
  setButtonValues,
  setCursor,
  setUndoAndUndoPosition,
  setRedoAndRedoPosition,
  resetButtons,
}) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setRedoAndRedoPosition(mdText, cursorPositionStart);
    setCursor(event.target.selectionStart, event.target.selectionEnd);
    const inputText = event.target.value;

    setMdText(inputText);
    if (inputText[cursorPositionStart] === " " || inputText[cursorPositionStart] === "\n") {
      setUndoAndUndoPosition(inputText, cursorPositionStart);
    }
  };

  const onTextareaSelect = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
    setCursor(start, end);
  };
  const onTextareaMouseDown = (event: MouseEvent<HTMLTextAreaElement>) => {
    resetButtons();
  };

  const onTextareaKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      listController(
        event,
        buttonValues,
        listButtonValues,
        mdText,
        cursorPositionStart,
        setButtonValues,
        setMdText,
        setCursorPosition
      );

      if (buttonValues["heading"]) {
        setButtonValues((prevButtonValues: Record<string, boolean>) => ({
          ...prevButtonValues,
          heading: !buttonValues["heading"],
        }));
      }

      if (mdText.slice(cursorPositionStart, cursorPositionStart + 3) === " {.") {
        let i = cursorPositionStart;
        while (mdText[i] !== "\n") {
          i++;
        }
        setCursorPosition(i, i);
      }
    }

    if (event.key === "Tab") {
      event.preventDefault();
      TABcontroller(
        setUndoAndUndoPosition,
        mdText,
        cursorPositionStart,
        setMdText,
        setCursorPosition
      );
    }

    if (["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(event.key)) {
      resetButtons();
    }
  };

  return (
    <>
      {typeof mdText === "undefined" ? (
        <ContentPlaceholder />
      ) : (
        <textarea
          autoFocus
          ref={editorRef}
          className="text-area"
          value={mdText}
          onChange={handleChange}
          onKeyDown={onTextareaKeyDown}
          onMouseDown={onTextareaMouseDown}
          onSelect={onTextareaSelect}
        />
      )}
    </>
  );
};

export default MDTextArea;
