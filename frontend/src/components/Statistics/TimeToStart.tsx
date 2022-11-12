import React from 'react'
import { useEffect, useMemo, useState } from "react";
import './TimeToStart.scss';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export interface TimeToStartProps{
    date?: string,
    whiteColor?: boolean,
}

const TimeToStart: React.FC<TimeToStartProps> = ({date, whiteColor = false}) => {
    const deadline = date ? date : new Date("2022-11-20T17:00:00").toString()
    const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
    const [time, setTime] = useState(parsedDeadline - Date.now());

    useEffect(() => {
        const interval = setInterval(
            () => setTime(parsedDeadline - Date.now()),
            1000,
        );

        return () => clearInterval(interval);
    }, [parsedDeadline]);


    return (
        <div className={whiteColor ? 'timer white' : 'timer'}>
            {Object.entries({
                Days: time / DAY,
                Hours: (time / HOUR) % 24,
                Minutes: (time / MINUTE) % 60,
                Seconds: (time / SECOND) % 60,
            }).map(([label, value]) => (
                <div key={label} className="col-4">
                    <div className="box">
                        <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
                        <span className="text">{label}</span>
                    </div>
                    <div className='border-box-r'>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TimeToStart;