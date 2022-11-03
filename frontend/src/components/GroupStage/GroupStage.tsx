import React, { useContext, useEffect, useState } from 'react';
import { Match } from '../../App';
import './GroupStage.scss';

// components
import GroupStageMatches from './GroupStageMatches/GroupStageMatches';
import GroupStagePlayerStatistics from './GroupStagePlayerStatistics/GroupStagePlayerStatistics';
import GroupSwitch from './GroupSwitch/GroupSwitch';
import GroupTable from './GroupTable/GroupTable';
// interfaces
import {GroupTableItem} from './GroupTable/GroupTable';
import LeftBar from './LeftBar/LeftBar';
import RightBar from './RightBar/RightBar';
// Fetch: In this component we should use data from context that contains info about groups 

// export interface GroupMatch extends Match {
//   homeTeam: string,
//   awayTeam: string, 
//   homeTeamScore: number, 
//   awayTeamScore: number, 
//   date: string,
//   stadium: string, 
//   referee: string, 
//   group: string,
// }

export interface GroupStageProps {
  groupMatches: any,
  dataTeams: any
}

const GroupStage: React.FC<GroupStageProps> = ({groupMatches, dataTeams}) => {
 
  let letterToNumber = new Map<string , string>();
  for(let i = 0; i<8 ; i++) {
    letterToNumber.set(groupLetters[i], `${i}`);
  }
  const [currentGroup, setCurrentGroup] = useState<string>("A");
  const [currentGroupData, setCurrentGroupData] = useState<GroupTableItem[] | null>(null)
  const [currentGroupMatches, setCurrentGroupMatches] = useState<Match[] | null>(null);
  const [chosenCountries, setChosenCountries] = useState<{homeCountry: string, awayCountry: string}>({homeCountry: 'none', awayCountry: 'none'});
  useEffect(() => {
    setCurrentGroupMatches(groupMatches[Number(letterToNumber.get(currentGroup))])
    setCurrentGroupData(dataTeams[Number(letterToNumber.get(currentGroup))])

  }, [currentGroup])

  const reloadData = (letter: string) => {
    /* This function changes current letter, useEffect is responsible for reloading it in another components*/
    setCurrentGroup(letter);
  }
  return (
    <div className='group-stage'>
      <div className='group-stage-left'>
        <LeftBar chosenCountries={chosenCountries}/>
      </div>
      <div className='group-stage-center'>
        <GroupSwitch 
          groupLetters={groupLetters}
          currentGroup={currentGroup}
          setCurrentGroup={reloadData}
          />
        <GroupTable 
          groupTableData={currentGroupData}
          groupTableName={currentGroup}
          chosenCountries={chosenCountries}
          setChosenCountries={setChosenCountries}
          />
        <GroupStageMatches
          groupMatches={currentGroupMatches}
          chosenCountries={chosenCountries}
          setChosenCountries={setChosenCountries}
        />
        <GroupStagePlayerStatistics/>
      </div>
      <div className='group-stage-right'>
        <RightBar chosenCountries={chosenCountries} currentGroup={currentGroup}/>
      </div>
    </div>
  )
}



export default GroupStage

export const groupLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
