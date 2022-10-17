import React, { useContext, useEffect, useState } from 'react';
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
import {AppCtx}  from '../../App';
// Fetch: In this component we should use data from context that contains info about groups 

export interface GroupMatch {
  homeTeam: string,
  awayTeam: string, 
  homeTeamScore: number, 
  awayTeamScore: number, 
  date: string,
  hour: string, 
  stadium: string, 
  referee: string, 
  group: string,
}

export interface GroupStageProps {
  groupMatches: any,
}

const GroupStage: React.FC<GroupStageProps> = ({groupMatches}) => {
 
  let letterToNumber = new Map<string , string>();
  for(let i = 0; i<8 ; i++) {
    letterToNumber.set(groupLetters[i], `${i}`);
  }
  const [currentGroup, setCurrentGroup] = useState<string>("A");
  const [currentGroupData, setCurrentGroupData] = useState<GroupTableItem[] | null>(null)
  // console.log(Number('0'))
  const [currentGroupMatches, setCurrentGroupMatches] = useState<GroupMatch[] | null>(null);

  useEffect(() => {
    setCurrentGroupMatches(groupMatches[Number(letterToNumber.get(currentGroup))])
  }, [currentGroup])

  const reloadData = (letter: string) => {
    /* This function changes current letter, and reloads data for specific group. In future it could be write more accurate*/
    // const data = findGroupByLetter(letter);
    setCurrentGroup(letter);
    setCurrentGroupMatches(groupMatches)

  }
  return (
    <div className='group-stage'>
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

