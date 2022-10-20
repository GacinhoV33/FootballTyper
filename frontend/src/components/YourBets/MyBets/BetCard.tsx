import React from 'react'
import './BetCard.scss';
import {Bet} from './MyBets'
import Card from 'react-bootstrap/Card';
import { CircleFlag } from 'react-circle-flags';

export interface BetCardProps{
  bet: Bet,
  gridId: {row: number, column: number},
}

const BetCard: React.FC<BetCardProps> = ({bet, gridId}) => {

    const betString = bet.successfulBet !== undefined ? (bet.successfulBet ? `0 1px 10px lightgreen` : `0 1px 10px red`) : undefined;
    return (
      <Card style={{borderRadius: '25px', boxShadow: betString}}>
        <Card.Header style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}> 
            <CircleFlag countryCode='pl' style={{paddingRight: '1.5rem'}} height='75'/>
              {/* <h3> ? : ? </h3> */}
              <h3>{bet.homeTeamScore ? bet.homeTeamScore : '?'} : {bet.awayTeamScore ? bet.awayTeamScore : '?'}</h3>
            <CircleFlag countryCode='es' style={{paddingLeft: '1.5rem'}} height='75'/>
        </Card.Header>
        <Card.Body className='bet-card-body' style={{}}>
            {/* {bet.successfulBet ? 'yes' : 'no'} */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10%'}}>
                <div style={{height: '50px', gridColumn: '1/4', display: 'flex', justifyContent: 'center'}}>
                    <input className='bet-input' disabled placeholder={bet.homeTeamScoreBet.toString()}/>
                    <h3>-</h3>
                    <input className='bet-input' placeholder={bet.awayTeamScoreBet.toString()}/>
                </div>
                <div style={{}}></div>
                <div style={{}}></div>
            </div>
        </Card.Body>
      </Card>
         )
}

export default BetCard;


export let CountryDict = new Map<string , string>();
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