import React from 'react';
import groupLetters from '../../../helpers/structures';
import './GroupSwitch.scss';

import GroupIcon from './GroupIcon/GroupIcon'

interface GroupSwitchProps {
  groupLetters: string[],
  currentGroup: string,
  setCurrentGroup: (letter: string) => void,
}


const GroupSwitch = ({groupLetters, currentGroup, setCurrentGroup}: GroupSwitchProps) => {
  return (

    <div className='switch-box'>
       {groupLetters.map(letter => 
        <GroupIcon 
          groupName={letter} 
          isChosen={letter === currentGroup}
          key={letter}
          setCurrentGroup={setCurrentGroup}
        />
      )}
    </div>    
    )
}

export default GroupSwitch;