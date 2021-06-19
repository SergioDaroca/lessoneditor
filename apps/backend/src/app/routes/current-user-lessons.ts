import {paths} from "@lessoneditor/api-interfaces";
import loadFile from "../storage/load-file";
import resolveUrlTemplate from "../utils/resolve-url-template";
import upsertUserLessons from "../lesson/upsert-user-lessons";




const currentUserLessons = (app) => {
    app.post(paths.USER_LESSONS, async (req, res) => {
        await upsertUserLessons(req.body, req.user.username);
        res.send("ok");
    });
    app.get(paths.USER_LESSONS, async (req, res) => {
        try {
            const result = await loadFile([
                "users",
                req.user.username,
                "lessons.json",
            ]);
            if (result) {
                const lessons = JSON.parse(result);
                lessons.forEach(
                    (lesson) =>
                        (lesson.thumb = resolveUrlTemplate(paths.DISPLAY_FILE, {
                            lessonId: lesson.lessonId,
                            file: "preview.png",
                        }))
                );
                res.send(lessons);
            } else {
                res.send([]);
            }
        } catch (e) {
            console.log(__filename,e.message);
            if (e.response && e.response.status === 404) {
                res.send([]);
            } else {
                res.send(e.message);
            }
        }
    });
}

export default currentUserLessons
