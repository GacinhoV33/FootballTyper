import { userInfo } from "os";
import React from "react";
import "./AdminPanel.scss";

const AdminPanel = () => {
  const apiUrl = "http://localhost:7071/";
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : "";

  const sendHttpRequest = (path: string) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "x-functions-key":
          "G1uaxlb3uCKf158UEaBePBvi5ict7uEadlZ8yLM0kcC8AzFu_wE0zg==",
        userName: user.username,
      },
    };

    fetch(apiUrl + path, requestOptions)
      .then((response) => {
        console.log("response: ", response);
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (path !== "api/PlayMatch") {
          alert(path);
        }
      });
  };

  const handleUpdateMatchScores = () => {
    sendHttpRequest("api/UpdateScoreAfterMatch");
  };

  const handleResetUserScores = () => {
    sendHttpRequest("api/ResetTyperScores");
  };

  const handleUpdateUserScores = () => {
    sendHttpRequest("api/UpdateTyperScores");
  };

  const handlePlayMatch = () => {
    sendHttpRequest("api/PlayMatch");
  };

  const PlayAllGroupMatches = () => {
    sendHttpRequest("api/PlayAllGroupMatches");
  };

  const handleCleanDatabase = () => {
    sendHttpRequest("api/CleanDatabase");
  };

  const handleCleanTableTeams = () => {
    sendHttpRequest("api/CleanTableTeams");
  };

  const handleCleanTableMatches = () => {
    sendHttpRequest("api/CleanTableMatches");
  };

  const handleCleanTableBets = () => {
    sendHttpRequest("api/CleanTableBets");
  };

  const handleInitializeTableTeams = () => {
    sendHttpRequest("api/InitializeTableTeams");
  };

  const handleInitializeTableMatches = () => {
    sendHttpRequest("api/InitializeTableMatches");
  };

  const handleInitializeTableBets = () => {
    sendHttpRequest("api/InitializeTableBets");
  };

  const handleInitializeDatabase = () => {
    sendHttpRequest("api/InitializeDatabase");
  };

  const handleInitEightfinals = () => {
    sendHttpRequest("api/InitializeKnockoutStageEightfinals");
  };

  const handleInitQuarterfinals = () => {
    sendHttpRequest("api/InitializeKnockoutStageQuarterfinals");
  };

  const handlePlayEightfinals = () => {
    sendHttpRequest("api/PlayKnockoutStageEightfinals");
  };

  const handlePlayQuarterfinals = () => {
    sendHttpRequest("api/PlayKnockoutStageQuarterfinals");
  };

  const handleInitSemifinals = () => {
    sendHttpRequest("api/InitializeKnockoutStageSemifinals");
  };

  const handlePlaySemifinals = () => {
    sendHttpRequest("api/PlayKnockoutStageSemifinals");
  };

  const handleInitFinals = () => {
    sendHttpRequest("api/InitializeKnockoutStageFinals");
  };

  const handlePlayFinals = () => {
    sendHttpRequest("api/PlayKnockoutStageFinals");
  };

  const betAllMatches = () => {
    sendHttpRequest("api/BetAllMatches");
  };

  const betFiveMatches = () => {
    sendHttpRequest("api/BetFiveMatches");
  };

  const getTopScorers = () => {
    sendHttpRequest("api/GetTopScorers");
  };

  return (
    <div>
      <div
        className="btn-group btn-matrix"
        role="group"
        aria-label="Four Column Button Matrix"
      >
        <button
          className="btn btn-outline-primary"
          onClick={handleCleanDatabase}
        >
          {" "}
          Clean whole database
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleCleanTableTeams}
        >
          {" "}
          Clean table <b>Teams</b>
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleCleanTableMatches}
        >
          {" "}
          Clean table <b>Matches</b>
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleCleanTableBets}
        >
          {" "}
          Clean table <b>Bets</b>
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleInitializeDatabase}
        >
          {" "}
          Initialize Database
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleInitializeTableTeams}
        >
          {" "}
          Initialize table <b>Teams</b>
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleInitializeTableMatches}
        >
          {" "}
          Initialize table <b>Matches</b>
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleInitializeTableBets}
        >
          {" "}
          Initialize table <b>Bets</b>
        </button>

        <button className="btn btn-outline-primary" onClick={betAllMatches}>
          {" "}
          Bet <b>All</b> Matches
        </button>

        <button className="btn btn-outline-primary" onClick={betFiveMatches}>
          {" "}
          Bet <b>Five</b> Matches
        </button>

        <button className="btn btn-outline-primary" onClick={handlePlayMatch}>
          {" "}
          Play <b>Group</b> match
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={PlayAllGroupMatches}
        >
          {" "}
          Play all <b>Group</b> matches
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleUpdateMatchScores}
        >
          {" "}
          Update <b>Match</b> scores
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleUpdateUserScores}
        >
          {" "}
          Update <b>User</b> scores
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleResetUserScores}
        >
          {" "}
          Reset <b>User</b> scores
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleInitEightfinals}
        >
          {" "}
          Initialize <b>Eightfinals</b> stage
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handlePlayEightfinals}
        >
          {" "}
          Play <b>Eightfinals</b> stage
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleInitQuarterfinals}
        >
          {" "}
          Initialize <b>Quarterfinals</b> stage
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handlePlayQuarterfinals}
        >
          {" "}
          Play <b>Quarterfinals</b> stage
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleInitSemifinals}
        >
          {" "}
          Initialize <b>Semifinals</b> stage
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handlePlaySemifinals}
        >
          {" "}
          Play <b>Semifinals</b> stage
        </button>

        <button className="btn btn-outline-primary" onClick={handleInitFinals}>
          {" "}
          Initialize <b>Finals</b> stage
        </button>

        <button className="btn btn-outline-primary" onClick={handlePlayFinals}>
          {" "}
          Play <b>Finals</b> stage
        </button>

        <button className="btn btn-outline-primary" onClick={getTopScorers}>
          {" "}
          Get Top Scorers
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
