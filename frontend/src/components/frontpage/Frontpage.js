import React, { useContext } from "react";
import "./frontpage.css";

import ItemList from "./ItemList";
import { UserContext } from "../../contexts/UserContext";
import Navbar from "../navbar/Navbar";

const lessonScreenshots = [
  "lessonsScreenshots/Screenshot 2020-07-12 at 09.42.03.png",
  "lessonsScreenshots/Screenshot 2020-07-12 at 09.42.22.png",
  "lessonsScreenshots/Screenshot 2020-07-12 at 09.42.41.png",
  "lessonsScreenshots/Screenshot 2020-07-12 at 09.42.58.png",
  "lessonsScreenshots/Screenshot 2020-07-12 at 09.43.15.png",
];

const Overview = () => {
  const context = useContext(UserContext);
  const { lessons } = context.user;

  return (
    <div>
      <Navbar />
      <div className="overViewContainer">
        <h3>Lag ny oppgave</h3>
        <div className="ui card">
          <div className="content">
            <a href={"/new-lesson"}>
              <div style={{ height: "200px" }}>
                <i className=" huge plus  icon"></i>
              </div>
            </a>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "grey",
            width: "90%",
            margin: "auto",
            marginTop: "60px",
            marginBottom: "50px",
            height: "2px",
          }}
          className="ui horizontal divider"
        />

        <h3>Mine oppgaver</h3>
        {lessons ? (
          <ItemList items={lessons} lessonScreenshots={lessonScreenshots} />
        ) : (
          <b>Du har ingen kurs</b>
        )}
        <br />
      </div>
    </div>
  );
};
export default Overview;