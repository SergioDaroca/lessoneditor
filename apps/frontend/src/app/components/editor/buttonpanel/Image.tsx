import { RenderButtons } from "./buttoncontroller/views/RenderButtons";

import { useHotkeys } from "react-hotkeys-hook";

import { KEY_COMBINATIONS as KEY, media as config } from "./buttoncontroller/settings/buttonConfig";
import { FC, RefObject } from "react";

interface ImageProps {
  editorRef: RefObject<HTMLTextAreaElement>;
  uploadImageRef: RefObject<HTMLInputElement>;
  setUndoAndUndoPosition: (mdText: string, position: number) => void;
  mdText: string;
  cursorPositionStart: number;
}

const Image: FC<ImageProps> = ({ editorRef, uploadImageRef }) => {
  useHotkeys(
    KEY.media.image,
    (event) => {
      event.preventDefault();

      handleButtonClick();
    },
    {}
  );
  const handleButtonClick = () => {
    uploadImageRef.current ? uploadImageRef.current.click() : "";
    editorRef.current ? editorRef.current.focus() : "";
    return;
  };
  return (
    <div className="image_button_group">
      <RenderButtons
        isON={false}
        icon={config.image.icon}
        title={config.image.title}
        handleButtonClick={handleButtonClick}
        buttonSlug={config.image.slug}
        shortcutKey={config.image.shortcut}
      />
    </div>
  );
};

export default Image;
