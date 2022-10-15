import React from 'react'
import './GroupStageMatches.scss';

import { GroupMatch } from '../GroupStage';
import  Matchrow  from '../../Matchrow/Matchrow'
interface GroupStageMatchesProps {
  groupMatches: GroupMatch[] | null,
}

const dummyData = [{
    firstName: 'Poland',
    secondName: 'Spain',
    firstScore: 1,
    secondScore: 2,
    userID: 'hwsdys', // type? 
    date: '18-11-2022', // type DATE create! TODO 
},
{
  firstName: 'Poland',
  secondName: 'Spain',
  firstScore: 1,
  secondScore: 2,
  userID: 'hwsdys', // type? 
  date: '18-11-2022', // type DATE create! TODO 
},
{
  firstName: 'Poland',
  secondName: 'Spain',
  firstScore: 1,
  secondScore: 2,
  userID: 'hwsdys', // type? 
  date: '18-11-2022', // type DATE create! TODO 
},
{
  firstName: 'Poland',
  secondName: 'Spain',
  firstScore: 1,
  secondScore: 2,
  userID: 'hwsdys', // type? 
  date: '18-11-2022', // type DATE create! TODO 
}]

const GroupStageMatches = ({groupMatches} : GroupStageMatchesProps) => {
  return (
    <div className='dev-class-stage-matches'>
      {dummyData.map((item, index) => (
        <Matchrow {...item}/>
      ))}
    </div>
  )
}

export default GroupStageMatches