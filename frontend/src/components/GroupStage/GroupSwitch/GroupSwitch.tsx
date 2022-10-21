import React from 'react';
import './GroupSwitch.scss';
import Pagination from 'react-bootstrap/Pagination';


interface GroupSwitchProps {
  groupLetters: string[],
  currentGroup: string,
  setCurrentGroup: (letter: string) => void,
}


const GroupSwitch = ({groupLetters, currentGroup, setCurrentGroup}: GroupSwitchProps) => {
  return (
    <Pagination>
      {groupLetters.map((letter, index) => (
        <Pagination.Item key={letter} active={currentGroup === letter} onClick={() => setCurrentGroup(letter)}> {letter}</Pagination.Item>
      ))}
    </Pagination>
    )
}

export default GroupSwitch;