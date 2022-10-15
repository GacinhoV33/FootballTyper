import React from 'react';
import './GroupIcon.scss';

interface GroupIconProps {
    groupName: string,
    isChosen: boolean,
    setCurrentGroup: (letter: string) => void,

}

const GroupIcon = ({groupName, isChosen, setCurrentGroup}: GroupIconProps) => {
  return (
    <div 
        className={`circle ${isChosen ? 'chosen' : null}`} 
        onClick={() => setCurrentGroup(groupName)}
    >
        <h2>
            {groupName}
        </h2>
    </div>
  )
}

export default GroupIcon;