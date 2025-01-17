import "./item.scss";
import { LessonDTO } from "@lessoneditor/contracts";
import React, { useState } from "react";
import { Button, Card, Icon, Image, Popup } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

import DeleteModal from "../shared/DeleteModal";

interface Props {
  lesson: LessonDTO;
}

const Item: React.FC<Props> = ({ lesson }) => {
  const navigate = useNavigate();
  const [openDeleteLesson, setOpenDeleteLesson] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { removeLesson, previewImage } = useUserContext();

  const submitDate = new Date(lesson.submitted_at).toLocaleDateString();

  const deleteLesson = async () => {
    try {
      setLoading(true);
      await removeLesson(lesson.lessonId);
      setOpenDeleteLesson(false);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const navigateToHome = (lessonId: string) => {
    const target = ["/landingpage", lessonId].join("/");
    navigate(target);
  };

  return (
    <>
      {openDeleteLesson && (
        <DeleteModal
          openDeleteContent={openDeleteLesson}
          setOpenDeleteContent={setOpenDeleteLesson}
          deleteContent={deleteLesson}
          loading={loading}
        />
      )}
      <div className="card-item">
        <Card className="card">
          <Card.Content
            className="card-content"
            onClick={() => navigateToHome(lesson.lessonId.toString())}
          >
            <Image
              className="card-content__image"
              src={previewImage[lesson.lessonId]}
              bordered
              rounded
            />

            <Card.Content className="card-content__content">
              <Card.Header>
                {lesson.lessonTitle ? lesson.lessonTitle : lesson.lessonSlug}
              </Card.Header>
              <Card.Meta>{lesson.courseTitle ? lesson.courseTitle : lesson.courseSlug}</Card.Meta>
              {lesson.submitted && (
                <Popup trigger={<i className="check circle outline"></i>}>
                  <div>
                    <p>Denne oppgaven har blitt sendt inn til Lær Kidsa Koding</p>
                    <p>{`Dato: ${submitDate}`}</p>
                  </div>
                </Popup>
              )}
            </Card.Content>
          </Card.Content>

          <Card.Content className="extra_content">
            <Button
              className="button-mobile"
              icon
              onClick={() => navigateToHome(lesson.lessonId.toString())}
              positive
            >
              <Icon name="folder open" />
            </Button>

            <Button
              className="button-desktop"
              icon
              labelPosition="left"
              onClick={() => navigateToHome(lesson.lessonId.toString())}
              positive
            >
              <Icon name="folder open" />
              Åpne
            </Button>

            <Button
              className="delete-button"
              style={{ background: "none" }}
              icon
              onClick={() => {
                setOpenDeleteLesson(true);
              }}
            >
              <Icon name="delete" />
              Slett
            </Button>
          </Card.Content>
        </Card>
      </div>
    </>
  );
};

export default Item;
