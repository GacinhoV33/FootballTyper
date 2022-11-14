import React from 'react';
import './GroupSwitch.scss';
import Pagination from 'react-bootstrap/Pagination';
import styled, { keyframes } from "styled-components";

interface GroupSwitchProps {
  groupLetters: string[],
  currentGroup: string,
  setCurrentGroup: (letter: string) => void,
}


const GroupSwitch = ({groupLetters, currentGroup, setCurrentGroup}: GroupSwitchProps) => {
  return (
    <SwitchAnimation>
    <Pagination size='lg' >
      {groupLetters.map((letter, index) => (
        <Pagination.Item 
        key={letter} 
        active={currentGroup === letter} 
        onClick={() => setCurrentGroup(letter)}   
        className='paginationItemStyle'     
        > 
        {letter}
        </Pagination.Item>
      ))}
    </Pagination>
    </SwitchAnimation>

    )
}

export default GroupSwitch;

const switchAnimation = keyframes`
from{
  transform: scale(50%);
}
to{
  transform: scale(100%);
}
`

const SwitchAnimation = styled.div`
  animation-duration: 1s;
  animation-name: ${switchAnimation};
  padding-top: 1.5rem;
`