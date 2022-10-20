import React from 'react';
import { useState } from 'react';
import './Ranking.scss';
import { dummyRanking } from '../../helpers/structures';
// bootstrap
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterRanking from './FilterRanking';
import FilterLeauge from './FilterLeauge';


export type User = {} // TODO make it correct

export type LeaugeName =  {
  leaugeName: string,
  leaugeId: number,
  leaugeUsers: User,
}
export type RankingFilters = 'general' | 'lastDay' | 'groupStage' | 'knockoutStage';

export type RankingProps = {
  currentUserName: string, 
}

const Ranking = ({currentUserName} : RankingProps) => {
  // Here we take data from context #TODO 

  const [filter, setFilter] = useState<RankingFilters>('general')
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <FilterRanking activeFilter={filter} setActiveFilter={setFilter} userName={currentUserName}/>
          <FilterLeauge/>
        </div>
       
        <div style={{display: 'flex', justifyContent: 'center', minWidth: '500px'}}>
          <Table bordered hover striped>
                <thead>
                    <tr>
                      <th style={{width: '5%'}}>Place</th>
                      <th>User</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody >
                  {dummyRanking.data.map(({userName, points}, index) => (
                    <tr style={currentUserName === userName ? {backgroundColor: 'lightGreen', fontWeight: '500'} : {}} key={index}>
                      <td>{index+1}</td>
                      <td>{userName}</td>
                      <td>{points}</td>
                    </tr>
                  ))}
                  </tbody>
            </Table>
        </div>
    </div>
    
   
  )
}

export default Ranking