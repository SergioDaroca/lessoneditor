import moxios from "moxios";
import { paths } from "@lessoneditor/api-interfaces";
import { UserContext, UserContextProvider } from "./UserContext";
import TestRenderer from "react-test-renderer";

const nanoid = function () {
  return Math.random().toString(36).substring(7);
};
describe("UserContext", function () {
  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install();
  });

  moxios.stubRequest(paths.USER, {
    status: 200,
    response: {
      username: "TestName",
    },
  });
  moxios.stubRequest(paths.LESSON, {
    status: 200,
    response: {
      lessonId: nanoid(),
    },
  });
  const testLesson = {
    lessonId: nanoid(),
    course: "microbit",
    lesson: "one-thing",
    lessonTitle: "Hello One Thing",
  };

  moxios.stubRequest(paths.USER_LESSONS, {
    status: 200,
    response: [
      testLesson,
      {
        lessonId: nanoid(),
        course: "macrobit",
        lesson: "another-thing",
        lessonTitle: "Hello Another Thing",
      },
    ],
  });

  afterEach(function () {
    moxios.uninstall();
  });
  it("should mount", async () => {
    const { act } = TestRenderer;
    let contextValue: any = {};
    await act(async () => {
      await TestRenderer.create(
        <UserContextProvider>
          <UserContext.Consumer>
            {(value: any) => {
              contextValue = value;
              return <></>;
            }}
          </UserContext.Consumer>
        </UserContextProvider>
      );
    });
    expect(contextValue.user.username).toBe("TestName");
    expect(contextValue.lessons.length).toBe(2);
    await act(async () => {
      await contextValue.addLesson("nanobit", "third-thing", "Hello Third Thing");
    });
    expect(contextValue.lessons.length).toBe(3);
    moxios.wait(function () {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: [] }).then((d) => console.log([]));
    });
    await act(async () => {
      await contextValue.removeLesson(testLesson.lessonId);
    });
    expect(contextValue.lessons.length).toBe(2);
  });
});
