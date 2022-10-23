import React, { InputHTMLAttributes, useRef, useState } from 'react';
import './FilterLeauge.scss';
import TextField from '@mui/material/TextField';
// import SearchIcon from "@material-ui/icons/Search";
// import CloseIcon from "@material-ui/icons/Close";
import {ImSearch} from 'react-icons/im';
import {MdClose} from 'react-icons/md';
import Dropdown from 'react-bootstrap/Dropdown';
import { CSSTransition } from 'react-transition-group';
export interface FilterLeaugeProps {
  currentFilter: string, 
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>,
}

const FilterLeauge: React.FC<FilterLeaugeProps> = ({currentFilter, setCurrentFilter}) => {
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

export default FilterLeauge;

const leaugesNames = ['main', 'clownLeauge', 'randomLeauge']