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
  const findGroupByLetter = (groupName: string) =>{
    const index = groupTableData.groups.find(group => group.name === groupName);
    if(index !== undefined){
      return index.data;
    }
    else{
      return groupTableData.groups[0].data;
    }
  }
  const [currentGroup, setCurrentGroup] = useState<string>("A");
  const [currentGroupData, setCurrentGroupData] = useState<GroupTableItem[]>(groupTableData.groups[0].data)
  const [currentGroupMatches, setCurrentGroupMatches] = useState<null | GroupMatch[]>(null);
  const reloadData = (letter: string) => {
    /* This function changes current letter, and reloads data for specific group. In future it could be write more accurate*/
    const data = findGroupByLetter(letter);
    setCurrentGroup(letter);
    setCurrentGroupData(data);
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
        groupTableData={currentGroupData}/>
      <GroupStageMatches
        groupMatches={currentGroupMatches}
      />
      <GroupStagePlayerStatistics/>
    </div>
  )
}

export default GroupStage

