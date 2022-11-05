import React from 'react';
// import './AdminPanel.scss';

const AdminPanel = () => {

  const apiUrl = 'http://localhost:7071/'

  const sendHttpRequest = (path: string) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'x-functions-key': 'G1uaxlb3uCKf158UEaBePBvi5ict7uEadlZ8yLM0kcC8AzFu_wE0zg=='
      }
    };

    fetch(apiUrl + path, requestOptions)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => console.log(data));
  }

  const handleUpdateScores = () => {
    sendHttpRequest('api/UpdateScoreAfterMatch');
  }

  const handlePlayMatch = () => {
    sendHttpRequest('api/PlayMatch')
  }

  const handleCleanDatabase = () => {
    sendHttpRequest('api/CleanDatabase')
  }

  const handleCleanTableTeams = () => {
    sendHttpRequest('api/CleanTableTeams')
  }

  const handleCleanTableMatches = () => {
    sendHttpRequest('api/CleanTableMatches')
  }

  const handleCleanTableBets = () => {
    sendHttpRequest('api/CleanTableBets')
  }

  const handleInitializeTableTeams = () => {
    sendHttpRequest('api/InitializeTableTeams')
  }

  const handleInitializeTableMatches = () => {
    sendHttpRequest('api/InitializeTableMatches')
  }

  const handleInitializeTableBets = () => {
    sendHttpRequest('api/InitializeTableBets')
  }
  const handleInitializeDatabase = () => {
    sendHttpRequest('api/InitializeDatabase')
  }

  return (
    <div>
      <div style={{ float: 'left', clear: 'left' }}>
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
        <button style={{ margin: '10px', padding: '10px' }} onClick={handleUpdateScores}> Update scores</button>
      </div>
    </div>
  )
}

export default AdminPanel