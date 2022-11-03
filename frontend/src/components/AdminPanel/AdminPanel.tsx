import React from 'react';
// import './AdminPanel.scss';

const AdminPanel = () => {

  const apiUrl = 'http://localhost:7071/'

  const handleUpdateScores = () => {

    const requestOptions = {
      method: 'GET',
      headers: {
        'x-functions-key': 'G1uaxlb3uCKf158UEaBePBvi5ict7uEadlZ8yLM0kcC8AzFu_wE0zg=='
      }
    };

    fetch(apiUrl + 'api/UpdateScoreAfterMatch', requestOptions)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => console.log(data));
  }

  const handlePlayMatch = () => {

    const requestOptions = {
      method: 'GET',
      headers: {
        'x-functions-key': 'G1uaxlb3uCKf158UEaBePBvi5ict7uEadlZ8yLM0kcC8AzFu_wE0zg=='
      }
    };

    fetch(apiUrl + 'api/PlayMatch', requestOptions)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => console.log(data));
  }

  const handleCleanDatabase = () => {
    alert("Not implemented yet")
  }

  const handleInitializeDatabase = () => {
    alert("Not implemented yet")
  }

  return (
    <div>
      <div style={{ float: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handleUpdateScores}> Update scores</button>
      </div>
      <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handleCleanDatabase}> Clean Database</button>
      </div>
      <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handleInitializeDatabase}> Initialize Database</button>
      </div>
      <div style={{ float: 'left', clear: 'left' }}>
        <button style={{ margin: '10px', padding: '10px' }} onClick={handlePlayMatch}> Play match</button>
      </div>
    </div>
  )
}

export default AdminPanel