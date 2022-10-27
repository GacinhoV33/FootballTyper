import React from 'react'
import './GroupStageMatches.scss';
import Matchrow  from '../../Matchrow/Matchrow'
import { GroupMatch } from '../GroupStage';

import Spinner from 'react-bootstrap/Spinner'
interface GroupStageMatchesProps {
  groupMatches: GroupMatch[] | null,
  chosenCountries: {homeCountry: string, awayCountry: string},
  setChosenCountries: React.Dispatch<React.SetStateAction<{
    homeCountry: string;
    awayCountry: string;
}>>,

}

const GroupStageMatches = ({groupMatches, chosenCountries, setChosenCountries} : GroupStageMatchesProps) => {
  return (
    <div className='group-stage-matches-content'>
      { groupMatches ? groupMatches.map((item: GroupMatch, index) => (
        <Matchrow groupMatch={item} key={index} chosenCountries={chosenCountries} setChosenCountries={setChosenCountries}/>
      )) : <Spinner animation='border' />
      }
    </div>
  )
}

export default GroupStageMatches