import React, { useState } from 'react';
import './BetCard.scss';
import { Bet } from './MyBets';
import Card from 'react-bootstrap/Card';
import { CircleFlag } from 'react-circle-flags';
import Button from 'react-bootstrap/Button';
import { HiBuildingStorefront } from 'react-icons/hi2';
import { IoPersonSharp } from 'react-icons/io5';
import { AiFillClockCircle } from 'react-icons/ai';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import styled, { keyframes } from "styled-components";

export interface BetCardProps {
  bet: Bet,
}

const BetCard: React.FC<BetCardProps> = ({ bet }) => {
  console.log(bet)
  const [baseBet, setBaseBet] = useState<{ homeBet: number, awayBet: number }>({ homeBet: bet.homeTeamScoreBet, awayBet: bet.awayTeamScoreBet })
  const [currentBet, setCurrentBet] = useState<{ homeBet: number, awayBet: number }>({ homeBet: bet.homeTeamScoreBet, awayBet: bet.awayTeamScoreBet })
  const betString = bet.successfulBet !== undefined ? (bet.successfulBet ? `0 1px 10px lightgreen` : `0 1px 10px red`) : undefined;
  // const betString = bet.successfulBet !== undefined ? (bet.successfulBet === 1 ? `0 1px 10px lightgreen` : (bet.successfulBet === 2 ? '0 1px 10px darkgreen' :`0 1px 10px red`) : undefined;

  const betDisabled = baseBet.homeBet === currentBet.homeBet && baseBet.awayBet === currentBet.awayBet; 
  const afterDeadline =  new Date().getTime() > new Date('2022-08-26T16:33:27.1796134').getTime()
  // const [date, hour] = bet.match.date ? bet.match.date.split('T') : ['1999-20-11', '00:00']
  function handleSave() {
    try {
      if (currentBet.homeBet < 100 && currentBet.awayBet < 100 && new Date().getTime() < new Date('2022-08-26T16:33:27.1796134').getTime()) { //TODO change on bet date
        setBaseBet({ homeBet: currentBet.homeBet, awayBet: currentBet.awayBet });
        const id = 1307
        const userName = "testUser1";
        const putRequestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "id" : id,
                    "homeTeamScoreBet": currentBet.homeBet,
                    "awayTeamScoreBet": currentBet.awayBet,
                    "betDate": new Date(),
                    "bettorUserName": userName,
                }
            )
        };

        fetch(`api/Bets/${id}`, putRequestOptions)
            .then((response) => {
                console.log("response: ", response);
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then((data) => console.log(data));
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  return (
    <CardAnimation>
    <Card style={{ borderRadius: '25px', boxShadow: betString, height: '105%'}}>
      <Card.Header style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex' }}><CircleFlag countryCode='pl' style={{ paddingRight: '1.5rem' }} height='75' /></div>
        <h3>{bet.homeTeamScore ? bet.homeTeamScore : '?'} : {bet.awayTeamScore ? bet.awayTeamScore : '?'}</h3>
        <CircleFlag countryCode='es' style={{ paddingLeft: '1.5rem' }} height='75' />
      </Card.Header>
      <Card.Body className='bet-card-body'>
        <Card.Text>
        {/* {bet.successfulBet ? 'yes' : 'no'} */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2%'}}>
        <div style={{ height: '2.5rem', gridColumn: '1/4', display: 'flex', justifyContent: 'center' , marginTop: '0.25rem', marginBottom: '1rem'}}>
            <input className='bet-input'
              placeholder={bet.homeTeamScoreBet.toString()}
              type='number'
              min='0'
              max='30'
              onChange={e => setCurrentBet({ homeBet: Number.parseInt(e.target.value), awayBet: currentBet.awayBet })}
            />
            <h3 style={{padding:'0 1.5rem'}}>-</h3>
            <input
              className='bet-input'
              type='number'
              min='0'
              max='30'
              placeholder={bet.awayTeamScoreBet.toString()}
              onChange={e => setCurrentBet({ homeBet: currentBet.homeBet, awayBet: Number.parseInt(e.target.value) })}
            />
          </div>
          <div style={{ gridColumn: '1/4', display: 'flex', flexDirection: 'row'}}>
            <BsFillCalendarDateFill size={20}/>
            {/* <span style={{fontWeight: '500', marginRight: '0.4rem', paddingLeft: '0.4rem'}}>{date}</span> */}
            <span style={{fontWeight: '500', marginRight: '0.4rem', paddingLeft: '0.4rem'}}>{'23-11-2022'}</span>

          </div>
          <div style={{ gridColumn: '1/4', display: 'flex', flexDirection: 'row'}}>
            <AiFillClockCircle size={20}/>
            <span style={{fontWeight: '500', marginRight: '0.4rem', paddingLeft: '0.4rem'}}>{'17:00'}</span>
            {/* <span style={{fontWeight: '500', marginRight: '0.4rem', paddingLeft: '0.4rem'}}>{hour.slice(0, 5)}</span> */}
          </div>
          <div style={{ gridColumn: '1/4', display: 'flex', flexDirection: 'row'}}>
            <HiBuildingStorefront size={20}/>
            {/* <h6 style={{paddingLeft: '0.4rem'}}>{bet.match.location}</h6> */}
            <h6 style={{paddingLeft: '0.4rem'}}>{'Al-Kaida'}</h6>

          </div>
          <div style={{ gridColumn: '1/4', display: 'flex', flexDirection: 'row'}}>
            <IoPersonSharp size={20} />
            {/* {bet.match.referee} */}
            <h6 style={{paddingLeft: '0.4rem'}}>Szymon Marciniak</h6>
          </div>
          <div style={{ gridColumn: '1/4'}}>
            {bet.homeTeamScore && bet.awayTeamScore ? <h4 style={{ textAlign: 'center' }}>5 points</h4> : // Style points TODO
              <Button style={{ width: '100%', marginTop: '1rem' }} disabled={betDisabled || afterDeadline} onClick={handleSave} variant={betDisabled || afterDeadline ? 'success' : 'primary'}>
                {(betDisabled || !afterDeadline) ? 'Saved' : 'Save'}
              </Button>
            }
          </div>
        </div>
        </Card.Text>
      </Card.Body>
    </Card>
    </CardAnimation>
  )
}

export default BetCard;

//animations
const cardAnimation = keyframes`
0%{
  transform: scale(90%); 
  opacity: 1;
}
50%{
  transform: scale(105%);
  opacity: 0.9;
}
100%{
  transform: scale(100%);
}
`
const CardAnimation = styled.div`
  animation-name: ${cardAnimation};
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
`

export let CountryDict = new Map<string, string>();
CountryDict.set('Ecuador', 'ec')
CountryDict.set('Netherlands', 'nl')
CountryDict.set('Qatar', 'qa')
CountryDict.set('Senegal', 'sn')
CountryDict.set('Poland', 'pl')
CountryDict.set('England', 'gb-eng')
CountryDict.set('Wales', 'gb-wls')
CountryDict.set('Argentina', 'ar')
CountryDict.set('Mexico', 'mx')
CountryDict.set('Saudi Arabia', 'sa')
CountryDict.set('Tunisia', 'tn')
CountryDict.set('Iran', 'ir')
CountryDict.set('France', 'fr')
CountryDict.set('Australia', 'au')
CountryDict.set('Germany', 'de')
CountryDict.set('Japan', 'jp')
CountryDict.set('Spain', 'es')
CountryDict.set('Costa Rica', 'cr')
CountryDict.set('Morocco', 'ma')
CountryDict.set('Croatia', 'hr')
CountryDict.set('Belgium', 'be')
CountryDict.set('Canada', 'ca')
CountryDict.set('Switzerland', 'ch')
CountryDict.set('Brazil', 'br')
CountryDict.set('Serbia', 'rs')
CountryDict.set('Cameroon', 'cm')
CountryDict.set('Uruguay', 'uy')
CountryDict.set('Korea Republic', 'kr')
CountryDict.set('Portugal', 'pt')
CountryDict.set('Ghana', 'gh')
CountryDict.set('USA', 'us')
CountryDict.set('Greece', 'gr')
CountryDict.set('Denmark', 'dk')
CountryDict.set('Greece', 'gr')