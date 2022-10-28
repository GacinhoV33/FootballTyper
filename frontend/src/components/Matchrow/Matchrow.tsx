import React, { useRef, useState } from 'react'
import './Matchrow.scss';
import { CircleFlag } from 'react-circle-flags'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { GroupMatch } from '../GroupStage/GroupStage';
import BetModal from './BetModal';
import styled, { keyframes } from "styled-components";

export interface MatchrowProps {
    groupMatch: GroupMatch,
    chosenCountries: { homeCountry: string, awayCountry: string },
    setChosenCountries: React.Dispatch<React.SetStateAction<{
        homeCountry: string;
        awayCountry: string;
    }>>,
}

const Matchrow: React.FC<MatchrowProps> = ({ groupMatch, chosenCountries, setChosenCountries }) => {
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
            <div className='match-body' onClick={() => setChosenCountries({ homeCountry: groupMatch.homeTeam, awayCountry: groupMatch.awayTeam })}>
                <div className='main-match-body'>
                    <div style={{ flex: '1' }}>
                        <CircleFlag countryCode={CountryDict.get(groupMatch.homeTeam) as string} height='40px' />
                    </div>
                    <div style={{flex: '1', textAlign: 'right'}}>
                        {groupMatch.homeTeamScore === -1 ? <h4>?</h4> : groupMatch.homeTeamScore}
                    </div>
                    <div style={{ flex: '6', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                        <p style={{ marginLeft: '0', marginBottom: '0 ', fontSize: '11px' }}>
                            {date} {day} {hour.slice(0, 5)}
                        </p>
                        <h4 style={{ paddingTop: '0' }}>
                            {groupMatch.homeTeam} - {groupMatch.awayTeam}
                        </h4>
                    </div>
                    <div style={{flex: '1'}}>
                        {groupMatch.awayTeamScore === -1 ? <h4>?</h4> : groupMatch.awayTeamScore}
                    </div>
                    <div style={{ flex: '1', display: 'flex', justifyContent: 'right' }}>
                        <CircleFlag countryCode={CountryDict.get(groupMatch.awayTeam) as string} height='40px' />
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