import React from 'react';
import './MatchCard.scss';

import { CircleFlag } from 'react-circle-flags';
import CountryDict from '../YourBets/MyBets/CountryDict';
import {GiDervishSwords} from 'react-icons/gi';

export interface MatchCardProps {
    homeTeam: string,
    awayTeam: string,
    date: string,

}


const MatchCard: React.FC<MatchCardProps> = ({ homeTeam, awayTeam, date }) => {

    return (
        <div className='match-card'>

            <div className='team left-team'>
                {homeTeam}
            </div>
            
            <div className='left-flag'>
                <CircleFlag className='flag-matchcard' countryCode={CountryDict.get(homeTeam) as string} />
            </div>
            
            <div className='vs-pill'>
                <div style={{display: 'flex', height: '6vh', width: '4vw', fontSize: '1.75vw', textAlign: 'center', alignItems: 'center', borderRadius: '1vw', color: 'white', justifyContent: 'center'}}>
                    <GiDervishSwords style={{height: '4vh', minHeight: '40px', minWidth: '30px'}}/>
                </div>
            </div>

            <div className='right-flag'>
                <CircleFlag className='flag-matchcard' countryCode={CountryDict.get(awayTeam) as string} />
            </div>

            <div className='team right-team'>
                {awayTeam}
            </div>


        </div>
    )
}

export default MatchCard