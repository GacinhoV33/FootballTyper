import React, { useEffect, useState } from 'react';
import './GroupStage.scss';

// components
import GroupStageMatches from './GroupStageMatches/GroupStageMatches';
import GroupStagePlayerStatistics from './GroupStagePlayerStatistics/GroupStagePlayerStatistics';
import GroupSwitch from './GroupSwitch/GroupSwitch';
import GroupTable from './GroupTable/GroupTable';
// interfaces
import {GroupTableItem} from './GroupTable/GroupTable';

// structures
import groupLetters from '../../helpers/structures';
import { groupTableData } from '../../helpers/structures';
// Fetch: In this component we should use data from context that contains info about groups 

export interface GroupMatch {

}


const GroupStage = () => {

  const [currentGroup, setCurrentGroup] = useState<string>("A");
  const [currentGroupData, setCurrentGroupData] = useState<GroupTableItem[] | null>(null)
  const [currentGroupMatches, setCurrentGroupMatches] = useState<null | GroupMatch[]>(null);

  const reloadData = (letter: string) => {
    /* This function changes current letter, and reloads data for specific group. In future it could be write more accurate*/
    // const data = findGroupByLetter(letter);
    setCurrentGroup(letter);

    fetch(`/api/Match/GetGroupData?group=${letter}`)
    .then(response => response.json())
    .then(output => {
      setCurrentGroupData(output.groupMatches);
    })

  }

  console.log("CurrentGroupMatches", currentGroupMatches);
  return (
    <div className='dev-class-group-stage'>
      <GroupSwitch 
        groupLetters={groupLetters}
        currentGroup={currentGroup}
        setCurrentGroup={reloadData}
        />
      <GroupTable 
        groupTableData={currentGroupData}
        groupTableName={currentGroup}
        />
      <GroupStageMatches
        groupMatches={currentGroupMatches}
      />
      <GroupStagePlayerStatistics/>
    </div>
  )
}

export default GroupStage

