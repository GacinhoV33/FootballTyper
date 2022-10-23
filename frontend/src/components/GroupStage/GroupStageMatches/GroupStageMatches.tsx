import React from 'react'
import './GroupStageMatches.scss';
import    Matchrow  from '../../Matchrow/Matchrow'
import { GroupMatch } from '../GroupStage';

import Spinner from 'react-bootstrap/Spinner'
interface GroupStageMatchesProps {
  groupMatches: GroupMatch[] | null,
}

const GroupStageMatches = ({groupMatches} : GroupStageMatchesProps) => {
  return (
    <div style={{width: '45%'}}>
      { groupMatches ? groupMatches.map((item: GroupMatch, index) => (
        <Matchrow groupMatch={item} key={index}/>
      )) : <Spinner animation='border' />}
    </div>
  )
}

export default GroupStageMatches