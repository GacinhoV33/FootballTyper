import React from 'react';
import './FiltersMyBets.scss';
import DropDown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

export type BetFilters = 'All' | 'Correct' | 'Wrong' | 'GroupStage' | 'KnockoutStage';
const filterTypes: BetFilters[] = ['All', 'Correct' , 'Wrong' , 'GroupStage', 'KnockoutStage']
export interface FiltersMyBetsProps{
  activeFilter: BetFilters,
  setActiveFilter: React.Dispatch<React.SetStateAction<BetFilters>>,

}


const FiltersMyBets: React.FC<FiltersMyBetsProps> = ({activeFilter, setActiveFilter}) => {
  function handleFilterChange(filter: BetFilters){
    setActiveFilter(filter);
  }
  return (
    <div className='filter-box'>
        {filterTypes.map((filterName, index) => (
            <Button 
            active={activeFilter === filterName} 
            key={filterName} 
            onClick={() => handleFilterChange(filterName)} 
            style={{margin: '0.5rem', borderRadius: '2rem'}}
            className={activeFilter === filterName ? 'filter-active' : undefined}
            >
                {filterName}
            </Button>
        ))}
    </div>
  )
}

export default FiltersMyBets

