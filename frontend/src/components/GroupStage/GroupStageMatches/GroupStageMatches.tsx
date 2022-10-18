import React from 'react'
import './GroupStageMatches.scss';

import  Matchrow  from '../../Matchrow/Matchrow'
import { GroupMatch } from '../GroupStage';
interface GroupStageMatchesProps {
  groupMatches: GroupMatch[] | null,
}

const GroupStageMatches = ({groupMatches} : GroupStageMatchesProps) => {
  return (
    <div style={{width: '45%'}}>
      { groupMatches ? groupMatches.map((item: GroupMatch, index) => (
        <Matchrow groupMatch={item} key={index}/>
      )) : null}
    </div>
  )
}

export default GroupStageMatches