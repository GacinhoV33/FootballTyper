import React from 'react';
import './FilterLeague.scss';
import Dropdown from 'react-bootstrap/Dropdown';
export interface FilterLeagueProps {
  currentFilter: string, 
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>,
}

const FilterLeague: React.FC<FilterLeagueProps> = ({currentFilter, setCurrentFilter}) => {
  return (
      <Dropdown style={{paddingBottom: '1.5vh', marginLeft: '1vw'}}>
        <Dropdown.Toggle variant='secondary' className='dropdown-rank-button'>
          {currentFilter}
        </Dropdown.Toggle>
        
        <Dropdown.Menu className='dropdown-rank-menu'>
          {leaugesNames.map((name, index) => (
            <Dropdown.Item onClick={() => setCurrentFilter(name)} key={name} className='dropdown-rank-item'>
                {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
  )
}

export default FilterLeague;

const leaugesNames = ['main', 'clownLeague', 'randomLeague']