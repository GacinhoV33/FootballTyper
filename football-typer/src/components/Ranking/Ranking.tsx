import React from 'react';
import { useState } from 'react';
import './Ranking.scss';
import { dummyRanking } from '../../helpers/structures';
// bootstrap
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

export type RankingFilters = 'general' | 'lastDay' | 'groupStage' | 'knockoutStage';

export type RankingProps = {
  currentUserName: string, 
}


const Ranking = ({currentUserName} : RankingProps) => {
  // Here we take data from context #TODO 

  const [filter, setFilter] = useState<RankingFilters>('general')
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
     <Table bordered hover style={{width: '75%'}}>
          <thead>
              <tr>
                <th style={{width: '5%'}}>Place</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
            {dummyRanking.data.map(({userName, points}, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{userName}</td>
                <td>{points}</td>
              </tr>
            ))}
            </tbody>
        </Table>
    </div>
   
  )
}

export default Ranking