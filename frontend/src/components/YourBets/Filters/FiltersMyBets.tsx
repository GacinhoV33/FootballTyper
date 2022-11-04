import React from 'react';
import './FiltersMyBets.scss';
import Button from 'react-bootstrap/Button';
import deepcopy from 'deepcopy';

//@ts-ignore

export type BetFilters = 'All' | 'Correct' | 'Wrong' | 'GroupStage' | 'KnockoutStage' | 'Active' | 'Past';
const filterTypes: BetFilters[] = ['All', 'Correct', 'Wrong', 'GroupStage', 'KnockoutStage', 'Active', 'Past' ]
export interface FiltersMyBetsProps {
  activeFilters: BetFilters[],
  setActiveFilters: React.Dispatch<React.SetStateAction<BetFilters[]>>,
}

const FiltersMyBets: React.FC<FiltersMyBetsProps> = ({ activeFilters, setActiveFilters }) => {
  function handleFilterChange(filter: BetFilters) {
    let newFilters = deepcopy(activeFilters);
    const index = newFilters.indexOf(filter);

    if (index > -1) {
      newFilters.length === 1 ? newFilters = ['All'] : newFilters.splice(index, 1);
      setActiveFilters(newFilters);
    }
    else {
      const correctIdx = newFilters.indexOf('Correct');
      const wrongIdx = newFilters.indexOf('Wrong')
      const groupstageIdx = newFilters.indexOf('GroupStage')
      const knockoutIdx = newFilters.indexOf('KnockoutStage')
      const activeIdx = newFilters.indexOf('Active')
      const pastIdx = newFilters.indexOf('Past')
      const allIdx = newFilters.indexOf('All')
      if (filter === 'Correct') {
        if (wrongIdx !== -1) {
          newFilters.splice(wrongIdx, 1);
        }
        if (allIdx !== -1) {
          newFilters.splice(allIdx, 1);
        }
        newFilters.push(filter);
        setActiveFilters(newFilters);
      }
      else if(filter === 'Past'){
        if (activeIdx !== -1) {
          newFilters.splice(activeIdx, 1);
        }
        if (allIdx !== -1) {
          newFilters.splice(allIdx, 1);
        }
        if (correctIdx !== -1) {
          newFilters.splice(correctIdx, 1);
        }  
        if (wrongIdx !== -1) {
          newFilters.splice(wrongIdx, 1);
        }
        newFilters.push(filter);
        setActiveFilters(newFilters);
      }
      else if(filter === 'Active'){
        if (pastIdx !== -1) {
          newFilters.splice(pastIdx, 1);
        }
        if (allIdx !== -1) {
          newFilters.splice(allIdx, 1);
        }
        if (correctIdx !== -1) {
          newFilters.splice(correctIdx, 1);
        }  
        if (wrongIdx !== -1) {
          newFilters.splice(wrongIdx, 1);
        }
        newFilters.push(filter);
        setActiveFilters(newFilters);
    }
      else if (filter === 'Wrong') {
        if (correctIdx !== -1) {
          newFilters.splice(correctIdx, 1);
        }
        if (allIdx !== -1) {
          newFilters.splice(allIdx, 1);
        }
        if (activeIdx !== -1) {
          newFilters.splice(activeIdx, 1);
        }
        if (pastIdx !== -1) {
          newFilters.splice(pastIdx, 1);
        }
        newFilters.push(filter);
        setActiveFilters(newFilters);
      }
      else if (filter === 'KnockoutStage') {
        if (groupstageIdx !== -1) {
          newFilters.splice(groupstageIdx, 1);
        }
        if (allIdx !== -1) {
          newFilters.splice(allIdx, 1);
        }
        newFilters.push(filter);
        setActiveFilters(newFilters);
      }
      else if (filter === 'GroupStage') {
        if (knockoutIdx !== -1) {
          newFilters.splice(knockoutIdx, 1);
        }
        if (allIdx !== -1) {
          newFilters.splice(allIdx, 1);
        }
        newFilters.push(filter);
        setActiveFilters(newFilters);
      }
      else if (filter === 'All') {
        newFilters = ['All'];
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
          style={{ margin: '0.5rem', borderRadius: '2rem', width: '10rem' }}
          className={activeFilters.indexOf(filterName) !== -1 ? 'filter-active' : undefined}
        >
          {filterName}
        </Button>
      ))}
    </div>
  )
}

export default FiltersMyBets
