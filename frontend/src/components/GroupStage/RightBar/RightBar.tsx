import React from 'react';
import './RightBar.scss';


export interface RightBarProps{
    chosenCountries: {homeCountry: string, awayCountry: string},
}

const RightBar: React.FC<RightBarProps> = ({chosenCountries}) => {
  return (
    <div>RightBar</div>
  )
}

export default RightBar