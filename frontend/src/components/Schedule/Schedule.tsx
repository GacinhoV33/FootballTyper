import React, {useState, useEffect, useContext} from 'react';
// import { AppCtx } from '../../App';

import './Schedule.scss';
import { Team } from '../../App';
import Table from 'react-bootstrap/Table';

// to fix -> some id are numbers some id's are strings

interface ScheduleItem {
  awayTeam: Team,
  awayTeamScore: number,
  date: string,
  homeTeam: Team,
  group: string,
  homeTeamScore: number,
  id: number,
  isMatchValid: true,
  location: string,
  matchNumber: number,
  referee: string | null,
  roundNumber: number,
  town: string | null,
}

// const fetchSchedule = (setScheduleData: React.Dispatch<React.SetStateAction<ScheduleItem[] | null>>) => {
//   fetch(`/api/Match/GetGroupMatches`)
//   .then(response => response.json()
//   .then(output => setScheduleData(output)))
//   .catch(err => console.log(err))
// }

const Schedule = () => {
  // const data = useContext(AppCtx);
  const data = null;
  const [scheduleData, setScheduleData] = useState<ScheduleItem[] | null>(data);

  console.log("Thats's Schedule Data", scheduleData);
  console.log("Thats context: ", data);
  return (
    <div className='body'>
      {scheduleData ? 
      <Table className='table-schedule' striped>
        <thead>
          <th className='home-team'>Home Team</th>
          <th>Score</th>
          <th className='away-team'>Away Team</th>
          <th>Group</th>
          <th>Date</th>
          <th>Location</th>
          <th>Referee</th>
          <th>Town</th>
        </thead>
        <tbody>
        {scheduleData.map(({awayTeam, awayTeamScore, homeTeamScore, homeTeam, date, location, referee, town, group}, index) => (
          <tr key={index}>
            <td>{homeTeam.name}</td>
            <td className='score'>{homeTeamScore} - {awayTeamScore}</td>
            <td className='away-team'>{awayTeam.name}</td>
            <td className='group'>{group.charAt(6)}</td>
            <td className='date'>{date}</td>
            <td>{location}</td>
            <td>{referee}</td>
            <td>{town}</td>
          </tr>
        ))}
        </tbody>
      </Table>
      : <h2> Data not loaded!!!</h2> }
      {/* If data not found - fetch data from component */}
    </div>
  )
}

export default Schedule