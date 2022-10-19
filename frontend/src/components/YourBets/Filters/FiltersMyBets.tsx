import React from 'react';
import './FiltersMyBets.scss';
import DropDown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

//@ts-ignore
import * as deepcopy from 'deepcopy';

export type BetFilters = 'All' | 'Correct' | 'Wrong' | 'GroupStage' | 'KnockoutStage';
const filterTypes: BetFilters[] = ['All', 'Correct' , 'Wrong' , 'GroupStage', 'KnockoutStage']
export interface FiltersMyBetsProps{
  activeFilters: BetFilters[],
  setActiveFilters: React.Dispatch<React.SetStateAction<BetFilters[]>>,
}

const FiltersMyBets: React.FC<FiltersMyBetsProps> = ({activeFilters, setActiveFilters}) => {
  function handleFilterChange(filter: BetFilters){
    const newFilters = deepcopy(activeFilters);
    const index = newFilters.indexOf(filter);
    if(index > -1){
      newFilters.splice(index, 1);
      setActiveFilters(newFilters);
    }
    else{
      if(filter === 'Correct'){
        const wrongIdx = newFilters.indexOf('Wrong');
        if(wrongIdx !== -1){
          newFilters.splice(wrongIdx, 1);
        }
        newFilters.push(filter);
        setActiveFilters(newFilters);
      }
      else if(filter === 'Wrong'){
        const correctIdx = newFilters.indexOf('Correct');
        if(correctIdx !== -1){
          newFilters.splice(correctIdx, 1);
        }
        newFilters.push(filter);
        setActiveFilters(newFilters);
      }
      else if(filter === 'KnockoutStage'){
        const groupStageIdx = newFilters.indexOf('GroupStage');
        if(groupStageIdx !== -1){
          newFilters.splice(groupStageIdx, 1);
        }
        newFilters.push(filter);
        setActiveFilters(newFilters);
      }
      else if(filter === 'GroupStage'){
        const knockoutStageIdx = newFilters.indexOf('KnockoutStage');
        if(knockoutStageIdx !== -1){
          newFilters.splice(knockoutStageIdx, 1);
        }
        newFilters.push(filter);
        setActiveFilters(newFilters);
      }
      else{
        newFilters.push(filter);
        setActiveFilters(newFilters);
      }
    }
  }
  return (
    <div className='filter-box'>
        {filterTypes.map((filterName, index) => (
            <Button 
            active={activeFilters.indexOf(filterName) !== -1} 
            key={filterName} 
            onClick={() => handleFilterChange(filterName)} 
            style={{margin: '0.5rem', borderRadius: '2rem', width: '10rem'}}
            className={activeFilters.indexOf(filterName) !== -1 ? 'filter-active' : undefined}
            >
                {filterName}
            </Button>
        ))}
    </div>
  )
}

export default FiltersMyBets
