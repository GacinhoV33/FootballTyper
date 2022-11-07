import React from 'react';
import './MatchCard.scss';

import { CircleFlag } from 'react-circle-flags';
import CountryDict from '../YourBets/MyBets/CountryDict';
import Badge from 'react-bootstrap/Badge'
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
                <CircleFlag className='flag' countryCode={CountryDict.get(homeTeam) as string} />
            </div>
            
            <div className='vs-pill'>
                <div style={{ height: '6vh', width: '4vw', fontSize: '1.75vw', textAlign: 'center', alignItems: 'center', borderRadius: '1vw', background: '#a176c1' }}>
                    VS
                </div>
            </div>

            <div className='right-flag'>
                <CircleFlag className='flag' countryCode={CountryDict.get(awayTeam) as string} />
            </div>

            <div className='team right-team'>
                {awayTeam}
            </div>


        </div>
    )
}

export default MatchCard