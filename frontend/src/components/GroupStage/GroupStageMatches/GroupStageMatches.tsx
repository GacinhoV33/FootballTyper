import React from 'react'
import './GroupStageMatches.scss';

import { GroupMatch } from '../GroupStage';

interface GroupStageMatchesProps {
  groupMatches: GroupMatch[] | null,
}

const GroupStageMatches = ({groupMatches} : GroupStageMatchesProps) => {
  return (
    <div className='dev-class-stage-matches'>
      GroupStageMatches
    </div>
  )
}

export default GroupStageMatches