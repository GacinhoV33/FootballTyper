import React from 'react';
import { useState } from 'react';
import './Ranking.scss';
import { dummyRanking } from '../../helpers/structures';
// bootstrap
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterRanking from './FilterRanking';
import FilterLeauge from './FilterLeauge';
import ListGroup from 'react-bootstrap/ListGroup';


export type User = {} // TODO make it correct

export type LeaugeName = {
  leaugeName: string,
  leaugeId: number,
  leaugeUsers: User,
}
export type RankingFilters = 'general' | 'lastDay' | 'groupStage' | 'knockoutStage';

export type RankingProps = {
  currentUserName: string,
}

const Ranking = ({ currentUserName }: RankingProps) => {
  // Here we take data from context #TODO 

  const [filter, setFilter] = useState<RankingFilters>('general')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <FilterRanking activeFilter={filter} setActiveFilter={setFilter} userName={currentUserName} />
        <FilterLeauge />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', minWidth: '500px' }}>
        <ListGroup>
          <ListGroup.Item>
            first
          </ListGroup.Item>
          <ListGroup.Item>
            first
          </ListGroup.Item>
        </ListGroup>

          
      </div>
    </div>


  )
}

export default Ranking