import React from 'react';
import './FilterLeague.scss';
import Dropdown from 'react-bootstrap/Dropdown';
export interface FilterLeagueProps {
  currentFilter: string, 
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>,
}

const FilterLeague: React.FC<FilterLeagueProps> = ({currentFilter, setCurrentFilter}) => {
  return (
      <Dropdown style={{paddingBottom: '1rem', marginLeft: '3rem'}}>
        <Dropdown.Toggle variant='secondary' style={{width: '10rem', paddingBottom: '0.2rem'}}>
          {currentFilter}
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
          {leaugesNames.map((name, index) => (
            <Dropdown.Item onClick={() => setCurrentFilter(name)} key={name}>
                {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
  )
}

export default FilterLeague;

const leaugesNames = ['main', 'clownLeague', 'randomLeague']