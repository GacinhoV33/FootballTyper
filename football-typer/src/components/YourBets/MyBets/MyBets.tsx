import React from 'react';
import './MyBets.scss';

// Data
import { dummyBet } from '../../../helpers/dummyData';

// #TODO Add status to bet which show whether bet is open or closed
// 

const MyBets = () => {
  return (
    <div className='dev-class-mybets'>
        <table className='dev-table'>
            <th>HomeTeam</th>
            <th>HomeTeamScoreBet</th>
            <th>AwayTeam</th>
            <th>AwayTeamScoreBet</th>
            <th>PointsFactor</th>
            {dummyBet.map(({HomeTeam, HomeTeamScoreBet, AwayTeam, AwayTeamScoreBet, PointsFactor, bet_id}, index) => (
                <tr key={bet_id}>
                    <td className='dev-row'>
                        {HomeTeam}
                    </td>
                    <td className='dev-row'>
                        {HomeTeamScoreBet}
                    </td>
                    <td className='dev-row'>
                        {AwayTeam}
                    </td>
                    <td className='dev-row'>
                        {AwayTeamScoreBet}
                    </td>
                    <td className='dev-row'>
                        {PointsFactor}
                    </td>
                </tr>
            ))}
        </table>
        MyBets
    </div>
  )
}

export default MyBets