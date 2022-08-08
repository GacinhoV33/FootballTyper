import React from 'react';
import './GroupStage.scss';

// components
import GroupStageMatches from './GroupStageMatches/GroupStageMatches';
import GroupStagePlayerStatistics from './GroupStagePlayerStatistics/GroupStagePlayerStatistics';
import GroupSwitch from './GroupSwitch/GroupSwitch';
import GroupTable from './GroupTable/GroupTable';


const GroupStage = () => {
  return (
    <div className='dev-class-group-stage'>
      <GroupSwitch/>
      <GroupTable/>
      <GroupStageMatches/>
      <GroupStagePlayerStatistics/>
    </div>
  )
}

export default GroupStage