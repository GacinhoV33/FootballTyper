import React, { useState } from 'react';
import './TimeToStart.scss';




const TimeToStart = () => {
    const currentDate = new Date();
    const worldCupDate = new Date("2022-11-20T17:00:00.738Z");
    // const timeRemaining = dhm(Math.abs(currentDate.getTime() - worldCupDate.getTime()))
    const [timeRemaining, setTimeRemaining] = useState(dhm(Math.abs(currentDate.getTime() - worldCupDate.getTime())))
  return (
    <div style={{width: '40rem', height: '3rem', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)'}}>
        <div style={{gridColumn: '1/5', gridRow: '1'}}>
            <h2> Tournament starts in</h2>
        </div>
        <div style={{gridColumn: '5/6', gridRow: '1'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div>
                    <h2>{timeRemaining[0]}</h2>
                </div>
                <div>
                    <h6>Days</h6>
                </div>
            </div> 
        </div>
        <div style={{gridColumn: '6/7', gridRow: '1'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div>
                    <h2 >{timeRemaining[1]}</h2>
                </div>
                <div>
                    <h6>Hours</h6>
                </div>
            </div> 
        </div>
        <div style={{gridColumn: '7/7', gridRow: '1'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div>
                    <h2>{timeRemaining[2]}</h2>
                </div>
                <div>
                    <h6>Minutes</h6>
                </div>
            </div> 
        </div>
  
    </div>
  )
}

export default TimeToStart;

function dhm(t: number){
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000),
        pad = function(n: number){ return n < 10 ? '0' + n : n; };
  if( m === 60 ){
    h++;
    m = 0;
  }
  if( h === 24 ){
    d++;
    h = 0;
  }
  return [d, pad(h), pad(m)];
  }
  