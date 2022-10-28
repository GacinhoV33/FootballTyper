import React, { useState } from 'react'
import './Matchrow.scss';
import { CircleFlag } from 'react-circle-flags'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import BetModal from './BetModal';
import styled, { keyframes } from "styled-components";
import { Bet } from '../YourBets/MyBets/MyBets';
import { Match } from '../../App';
import CountryDict from '../YourBets/MyBets/CountryDict';
export interface MatchrowProps {
    groupMatch: Match,
    chosenCountries: { homeCountry: string, awayCountry: string },
    setChosenCountries: React.Dispatch<React.SetStateAction<{
        homeCountry: string;
        awayCountry: string;
    }>>,
    userBets: Bet[] | undefined,
}

const Matchrow: React.FC<MatchrowProps> = ({ groupMatch, chosenCountries, setChosenCountries, userBets}) => {
    const [showBet, setShowBet] = useState<boolean>(false);
    const [showAlert, setAlert] = useState<boolean>(false);

    const handleClose = () => {
        setShowBet(false)
    };
    const handleOpen = () => setShowBet(true);

    const [date, hour] = groupMatch.date.split('T');
    const [modalValue, setModalValue] = useState<{ homeScore: string, awayScore: string }>({ homeScore: '', awayScore: '' });
    const day = getDayFromDate(date);
    getDayFromDate(date);
    
    return (
        <>
            <div className='match-body' onClick={() => setChosenCountries({ homeCountry: groupMatch.homeTeam.name, awayCountry: groupMatch.awayTeam.name })}>
                <div className='main-match-body'>
                    <div style={{ flex: '1' }}>
                        <CircleFlag countryCode={CountryDict.get(groupMatch.homeTeam.name) as string} height='40px' />
                    </div>
                    <div style={{flex: '1', textAlign: 'right'}}>
                        {groupMatch.homeTeamScore === -1 ? <h4>?</h4> : groupMatch.homeTeamScore}
                    </div>
                    <div style={{ flex: '6', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                        <p style={{ marginLeft: '0', marginBottom: '0 ', fontSize: '11px' }}>
                            {date} {day} {hour.slice(0, 5)}
                        </p>
                        <h4 style={{ paddingTop: '0' }}>
                            {groupMatch.homeTeam.name} - {groupMatch.awayTeam.name}
                        </h4>
                    </div>
                    <div style={{flex: '1'}}>
                        {groupMatch.awayTeamScore === -1 ? <h4>?</h4> : groupMatch.awayTeamScore}
                    </div>
                    <div style={{ flex: '1', display: 'flex', justifyContent: 'right' }}>
                        <CircleFlag countryCode={CountryDict.get(groupMatch.awayTeam.name) as string} height='40px' />
                    </div>

                    <div style={{ flexGrow: '1', textAlign: 'right' }}>
                        <Button onClick={handleOpen}>BET</Button>
                    </div>
                </div>
            </div>
            {showBet && <BetModal
                showBet={showBet}
                handleClose={handleClose}
                modalValue={modalValue}
                groupMatch={groupMatch}
                setModalValue={setModalValue}
                setAlert={setAlert}
                userBets={userBets}
            />
            }
            {showAlert ? ((Number(modalValue.homeScore) < 100 && Number(modalValue.homeScore) >= 0 && Number(modalValue.awayScore) >= 0 && Number(modalValue.awayScore) < 100) ?
                <AlertAnimation >
                <Alert variant='success'>
                    <Alert.Heading>Success!</Alert.Heading>
                    Match bet submitted correctly
                </Alert>
                </AlertAnimation>
                :
                <AlertAnimation >
                <Alert variant='danger'>
                    <Alert.Heading>Error!</Alert.Heading>
                    Wrong input
                </Alert>
                </AlertAnimation>

            ) : null}
        </>
    )
}

export default Matchrow

function getDayFromDate(date: string) {
    const daysShortcut = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayIndex = new Date(date).getDay();
    return daysShortcut[dayIndex];

}


//animations
const alertAnimation = keyframes`
from{
    opacity: 1;
    transform: translateY(-10px);
}
to{
    opacity: 0;
    transform: translateY(0px);
}
`
const AlertAnimation = styled.div`
animation-name: ${alertAnimation};
animation-duration: 3s;
width: 15%;
height: 10vh;
position: fixed;
top: 1rem;
right: 2rem;
`