import React from "react";
import "./AdminPanel.scss";

const AdminPanel = () => {
  const apiUrl = "http://localhost:7071/";

  const sendHttpRequest = (path: string) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "x-functions-key":
          "G1uaxlb3uCKf158UEaBePBvi5ict7uEadlZ8yLM0kcC8AzFu_wE0zg==",
      },
    };

    fetch(apiUrl + path, requestOptions)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (path !== "api/PlayMatch") {
          alert(path);
        }
        console.log(data);
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

  const handlePlayAllMathes = () => {
    sendHttpRequest("api/PlayAllMatches");
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

  return (
    <div>
      {/* <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handleCleanDatabase}> Clean whole database</button>
      </div>
      <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handleCleanTableTeams}> Clean table <b>Teams</b></button>
      </div>
      <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handleCleanTableMatches}> Clean table <b>Matches</b></button>
      </div>
      <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handleCleanTableBets}> Clean table <b>Bets</b></button>
      </div>
      <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handleInitializeDatabase}> Initialize Database</button>
      </div>
      <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handleInitializeTableTeams}> Initialize table <b>Teams</b></button>
      </div>
      <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handleInitializeTableMatches}> Initialize table <b>Matches</b></button>
      </div>
      <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handleInitializeTableBets}> Initialize table <b>Bets</b></button>
      </div>
      <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handlePlayMatch}> Play match</button>
      </div>
      <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handlePlayAllMathes}> Play all matches</button>
      </div>
      <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handleUpdateMatchScores}> Update <b>Match</b> scores</button>
      </div>
      <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handleUpdateUserScores}> Update <b>User</b> scores</button>
      </div>
      <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handleResetUserScores}> Reset <b>User</b> scores</button>
      </div> */}

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
        <button className="btn btn-outline-primary" onClick={handlePlayMatch}>
          {" "}
          Play match
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={handlePlayAllMathes}
        >
          {" "}
          Play all matches
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
      </div>
    </div>
  );
};

export default AdminPanel;
