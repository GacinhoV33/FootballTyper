import React from 'react';
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters';


const CurrentDay = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  let currentDay = -1
  if(month === 11){
    currentDay = day - 20;
  }
  else if(month === 12){
    currentDay = day + 11
  }

  return (
    <div>
        <AnimatedLetters
        strToDisplay={`Day ${currentDay}`}
        idx={5}
        />
    </div>
  )
}

export default CurrentDay