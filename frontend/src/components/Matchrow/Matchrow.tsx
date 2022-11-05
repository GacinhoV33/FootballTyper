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
import countriesColors from '../AnimatedLetters/CountriesColors';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export interface MatchrowProps {
    groupMatch: Match,
    chosenCountries: { homeCountry: string, awayCountry: string },
    setChosenCountries: React.Dispatch<React.SetStateAction<{
        homeCountry: string;
        awayCountry: string;
    }>>,
    userBets?: Bet[] | undefined,
    setBetChange: React.Dispatch<React.SetStateAction<number>>
}

const Matchrow: React.FC<MatchrowProps> = ({ groupMatch, chosenCountries, setChosenCountries, userBets, setBetChange }) => {
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


    const isBetNew = userBets?.filter((bet) => bet.matchId === groupMatch.id)
    const isBetExisting = isBetNew !== undefined && isBetNew.length !== 0 && isBetNew[0]?.homeTeamScoreBet !== undefined;
    const mainColorHome = JSON.parse(countriesColors.get(groupMatch.homeTeam.name as string) as string).mainColor.value
    const secondColorHome = JSON.parse(countriesColors.get(groupMatch.homeTeam.name as string) as string).secondColor.value
    const thirdColorHome = JSON.parse(countriesColors.get(groupMatch.homeTeam.name as string) as string).thirdColor.value

    const mainColorAway = JSON.parse(countriesColors.get(groupMatch.awayTeam.name as string) as string).mainColor.value
    const secondColorAway = JSON.parse(countriesColors.get(groupMatch.awayTeam.name as string) as string).secondColor.value
    const thirdColorAway = JSON.parse(countriesColors.get(groupMatch.awayTeam.name as string) as string).thirdColor.value
    // const gradString = `linear-gradient(to right, rgba${mainColor.slice(0, -1)}, 0.1), rgba${secondColor.slice(0, -1)}, 0.1)`;
    // const gradString = `radial-gradient(
    //     farthest-side at top left,
    //     rgba${mainColorHome.slice(0, -1)}, 0.4),
    //     transparent
    //   ),
    //   radial-gradient(
    //     farthest-corner at bottom left,
    //     rgba${secondColorHome.slice(0, -1)}, 0.4),
    //     transparent
    //   ),
    //   radial-gradient(
    //     farthest-corner at top right,
    //     rgba${mainColorAway.slice(0, -1)}, 0.4), 
    //     transparent
    //   ),
    //   radial-gradient(
    //     farthest-corner at bottom right,
    //     rgba${secondColorAway.slice(0, -1)}, 0.4), 
    //     transparent 
    //   )`
    const alpha = 0.4;
    const gradString = `linear-gradient(to right, rgba${mainColorHome.slice(0, -1)}, ${alpha}), rgba${secondColorHome.slice(0, -1)}, ${alpha}), rgba${thirdColorHome.slice(0, -1)}, 0.2), rgba${mainColorAway.slice(0, -1)}, ${alpha}), rgba${secondColorAway.slice(0, -1)}, ${alpha}), rgba${thirdColorAway.slice(0, -1)}, ${alpha}))`
    return (
        <>
            <div className='match-body' onClick={() => setChosenCountries({ homeCountry: groupMatch.homeTeam.name, awayCountry: groupMatch.awayTeam.name })}>
                <div style={{
                    height: '4.5rem',
                    border: '2px solid #111231',
                    borderRadius: '5px',
                    boxShadow: '#222342',
                    padding: '0.75rem',
                    margin: '0.5rem',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: '540px',
                    backgroundImage: gradString,
                }}>
                    <div style={{ flex: '1' }}>
                        <CircleFlag countryCode={CountryDict.get(groupMatch.homeTeam.name) as string} height='40px' />
                    </div>
                    <div style={{ flex: '1', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                        <OverlayTrigger
                            placement='top'
                            overlay={
                                <Tooltip id={'scorehometip'}>
                                    This is your {groupMatch.homeTeam.name} bet.
                                </Tooltip>
                            }>
                            {isBetExisting ? <p style={{ margin: '0px !important' }}> {isBetNew[0]?.homeTeamScoreBet}</p> : <p style={{ margin: '0px !important' }}>-</p>}
                        </OverlayTrigger>
                        {groupMatch.homeTeamScore === -1 ? <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>?</span> : <span>{groupMatch.homeTeamScore}</span>}
                    </div>
                    <div style={{ flex: '6', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                        <p style={{ marginLeft: '0', marginBottom: '0 ', fontSize: '11px' }}>
                            {date} {day} {hour.slice(0, 5)}
                        </p>
                        <h4 style={{ paddingTop: '0' }}>
                            {groupMatch.homeTeam.name} - {groupMatch.awayTeam.name}
                        </h4>
                    </div>
                    <div style={{ flex: '1' }}>
                        <OverlayTrigger
                            placement='top'
                            overlay={
                                <Tooltip id={'scoreawaytip'}>
                                    This is your {groupMatch.awayTeam.name} bet.
                                </Tooltip>
                            }>
                            {isBetExisting ? <p style={{ margin: '0px !important' }}>{isBetNew[0]?.awayTeamScoreBet}</p> : <p style={{ margin: '0px !important' }}>-</p>}
                        </OverlayTrigger>
                        {groupMatch.awayTeamScore === -1 ? <h4>?</h4> : <h4>{groupMatch.awayTeamScore}</h4>}
                    </div>

                    <div style={{ flex: '1', display: 'flex', justifyContent: 'right' }}>
                        <CircleFlag countryCode={CountryDict.get(groupMatch.awayTeam.name) as string} height='40px' />
                    </div>

                    <div style={{ flexGrow: '1', textAlign: 'right' }}>
                        <Button onClick={handleOpen} variant={isBetExisting ? 'warning' : 'primary'} style={{ width: '3.5rem' }}>{isBetExisting ? 'Edit' : 'Bet'}</Button>
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
                setBetChange={setBetChange}
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
    opacity: 0.1;
    transform: translateY(0px);
}
`
const AlertAnimation = styled.div`
animation-name: ${alertAnimation};
animation-duration: 5s;
width: 15%;
height: 8vh;
position: fixed;
bottom: 3rem;
right: 2rem;
`