import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { FileDTO, LessonDTO, NewLessonDTO, paths, YamlContent } from "@lessoneditor/contracts";
import { LessonContextModel, LessonContextState } from "./lessonContext.functions";
import ShowSpinner from "../components/ShowSpinner";
import { useUserContext } from "./UserContext";
import { base64StringToBlob, createObjectURL } from "blob-util";
import yaml from "js-yaml";

const LessonContext = React.createContext<LessonContextModel>({} as LessonContextModel);

export const LessonContextProvider = (props: any) => {
  const { state } = useUserContext();
  const { lessonId } = useParams() as any;
  const [lesson, setLesson] = useState<LessonDTO | undefined>(undefined);
  const [files, setFiles] = useState<string[]>([]);
  const [images, setImages] = useState({});
  const [yml, setYml] = useState<any>({
    level: 1,
    license: "CC BY-SA 4.0",
    tags: { grade: [], subject: [], topic: [] },
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchLessonData() {
      try {
        setLoading(true);
        const lesson = await axios.get<LessonDTO>(paths.LESSON.replace(":lessonId", lessonId));
        const yamlFile = await axios.get<FileDTO<YamlContent>>(
          paths.LESSON_FILE.replace(":lessonId", lessonId).replace(":fileName", "lesson")
        );

        const fileNames = await fetchFileList();

        for (const file of fileNames) {
          const ext = file.split(".").pop() === "jpg" ? "jpeg" : file.split(".").pop() ?? "";
          if (!["jpeg", "png", "gif"].includes(ext)) {
            continue;
          }
          const url = paths.LESSON_FILE.replace(":lessonId", lessonId).replace(
            ":fileName",
            file.split(".")[0]
          );

          const imageRes: any = await axios.get(url);
          setImages((prevImages) => ({
            ...prevImages,
            [file]: createObjectURL(base64StringToBlob(imageRes.data, `image/${ext}`)),
          }));
        }

        setYml(yamlFile.data.content);
        setLesson(lesson.data);
        setFiles(fileNames);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLessonData();
  }, []);

  const fetchFileList = async () => {
    const fileNames = await axios.get<string[]>(
      paths.LESSON_FILENAMES.replace(":lessonId", lessonId)
    );

    return fileNames.data;
  };

  const updateYaml = async (lessonId: string, data: YamlContent) => {
    try {
      const updatedFile = await axios.put<FileDTO<any>>(
        paths.LESSON_FILE_UPDATE.replace(":lessonId", lessonId).replace(":fileName", "lesson"),
        { content: data }
      );
      const newData: unknown = yaml.load(updatedFile.data.content);
      setYml(newData);
      return updatedFile.status;
    } catch (error) {
      console.error(error);
      return -1;
    }
  };

  const updatelesson = async (data: NewLessonDTO) => {
    const savedLesson = await axios.put<LessonDTO>(
      paths.USER_LESSON_UPDATE.replace(":userId", state.user!.userId.toString()),
      data
    );
    setLesson(savedLesson.data);
  };

  if (!lesson) {
    return <ShowSpinner />;
  }

  const lessonState: LessonContextState = {
    lesson: lesson,
    files: files,
    yml: yml,
  };

  const context: LessonContextModel = {
    state: lessonState,
    yml,
    setYml: setYml,
    updateLesson: updatelesson,
    updateYaml: updateYaml,
    images,
    setImages,
    setFiles,
    fetchFileList,
    loading,
  };

  return (
    <>
      <LessonContext.Provider value={context}>{props.children}</LessonContext.Provider>
    </>
  );
};
export const useLessonContext = (): LessonContextModel => useContext(LessonContext);
