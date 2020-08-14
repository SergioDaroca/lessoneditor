import React from "react";
import { Button, Popup } from "semantic-ui-react";
import COURSELIST from "components/lessonForm/settingsFiles/COURSELIST";

const CodeButtons = ({
  buttonValues,
  icon,
  title,
  onButtonClick,
  buttonTitle,
  output,
  cursorIntON,
  cursorIntOFF,
  endOutput,
  shortcutKey,
  course,
}) => {
  const responsiveCP = () => {
    const courseNotSlug = COURSELIST.find(({ slug }) => slug === course);

    return (
      <>
        <Popup
          content={title + " (" + shortcutKey + ")"}
          mouseEnterDelay={250}
          mouseLeaveDelay={250}
          trigger={
            icon === "code" ? (
              <Button
                style={
                  buttonValues[buttonTitle]
                    ? {
                        position: "relative",
                        top: "0.1em",
                        paddingTop: "0.25em",
                        paddingBottom: "0.25em",
                        borderRadius: "10px",
                        backgroundColor: "#bbb",
                      }
                    : {
                        position: "relative",
                        top: "0.1em",
                        paddingTop: "0.25em",
                        paddingBottom: "0.25em",
                        borderRadius: "10px",
                        backgroundColor: "rgba(0, 0, 0, 0)",
                      }
                }
                className="CPButton"
                size="big"
                onClick={() =>
                  onButtonClick(
                    buttonTitle,
                    output,
                    cursorIntON,
                    cursorIntOFF,
                    endOutput
                  )
                }
              >
                <div
                  style={{
                    fontSize: "x-large",
                    position: "relative",
                    top: "0.06em",
                    marginLeft: "-1em",
                  }}
                >
                  {"```Kodeblokk(" + courseNotSlug?.courseTitle + ")"}
                </div>
              </Button>
            ) : (
              <Button
                style={
                  buttonValues[buttonTitle]
                    ? {
                        position: "relative",
                        top: "0.1em",
                        paddingTop: "0.25em",
                        paddingBottom: "0.25em",
                        borderRadius: "10px",
                        backgroundColor: "#bbb",
                      }
                    : {
                        position: "relative",
                        top: "0.1em",
                        paddingTop: "0.25em",
                        paddingBottom: "0.25em",
                        borderRadius: "10px",
                        backgroundColor: "rgba(0, 0, 0, 0)",
                      }
                }
                className="CPButton"
                size="big"
                onClick={() =>
                  onButtonClick(
                    buttonTitle,
                    output,
                    cursorIntON,
                    cursorIntOFF,
                    endOutput
                  )
                }
              >
                <div
                  style={{
                    fontSize: "x-large",
                    position: "relative",
                    top: "0.06em",
                    marginLeft: "-1em",
                  }}
                >
                  {"`Inline-kode"}
                </div>
              </Button>
            )
          }
        />
      </>
    );
  };

  return responsiveCP();
};

export default CodeButtons;