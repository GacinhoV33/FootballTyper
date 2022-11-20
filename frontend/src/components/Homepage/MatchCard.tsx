import React from 'react';
import './MatchCard.scss';

import { CircleFlag } from 'react-circle-flags';
import CountryDict from '../YourBets/MyBets/CountryDict';
import { GiDervishSwords } from 'react-icons/gi';

export interface MatchCardProps {
    homeTeam: string,
    awayTeam: string,
    date: string,
    stadium?: string,
    group?: string,
}

function getDayFromDate(date: string) {
    const daysShortcut = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = new Date(date).getDay();
    return daysShortcut[dayIndex];

}

const MatchCard: React.FC<MatchCardProps> = ({ homeTeam, awayTeam, date, stadium, group }) => {
    const [dateExact, time] = date.split('T');
    const day = getDayFromDate(date);
    return (
        <div style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '2vh' }}>
            <div className='text-date-match'>
                {stadium} - {day} {time.slice(0, 5)} ({group})
            </div>
            <div className='match-card'>

                <div className='team left-team'>
                    {homeTeam}
                </div>

                <div className='left-flag'>
                    <CircleFlag className='flag-matchcard' countryCode={CountryDict.get(homeTeam) as string} />
                </div>

                <div className='vs-pill'>
                    <div style={{ display: 'flex', height: '6vh', width: '4vw', textAlign: 'center', alignItems: 'center', borderRadius: '1vw', color: 'white', justifyContent: 'center' }}>
                        <GiDervishSwords style={{ height: '4vh', minHeight: '40px', minWidth: '30px' }} />
                    </div>
                </div>

                <div className='right-flag'>
                    <CircleFlag className='flag-matchcard' countryCode={CountryDict.get(awayTeam) as string} />
                </div>

                <div className='team right-team'>
                    {awayTeam}
                </div>


            </div>
        </div>

    )
}

export default MatchCard