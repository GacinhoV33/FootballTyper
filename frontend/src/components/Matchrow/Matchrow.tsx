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
import CountryDictShortcuts from '../YourBets/CountryDictShortcuts';
import countriesColors from '../AnimatedLetters/CountriesColors';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { BsCheck, BsCheckCircle } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { BiCheckDouble } from 'react-icons/bi';
import { isMobile } from 'react-device-detect';
export interface MatchrowProps {
    groupMatch: Match,
    chosenCountries: { homeCountry: string, awayCountry: string },
    setChosenCountries: React.Dispatch<React.SetStateAction<{
        homeCountry: string;
        awayCountry: string;
    }>>,
    userBets: Bet[] | null,
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


    const isBetNew = userBets !== null && userBets.length > 0 ? userBets.filter((bet) => bet.matchId === groupMatch.id) : null;
    const isBetExisting = isBetNew !== null && isBetNew.length !== 0 && isBetNew[0].homeTeamScoreBet !== undefined;
    const mainColorHome = JSON.parse(countriesColors.get(groupMatch.homeTeam.name as string) as string).mainColor.value
    const secondColorHome = JSON.parse(countriesColors.get(groupMatch.homeTeam.name as string) as string).secondColor.value
    const thirdColorHome = JSON.parse(countriesColors.get(groupMatch.homeTeam.name as string) as string).thirdColor.value

    const mainColorAway = JSON.parse(countriesColors.get(groupMatch.awayTeam.name as string) as string).mainColor.value
    const secondColorAway = JSON.parse(countriesColors.get(groupMatch.awayTeam.name as string) as string).secondColor.value
    const thirdColorAway = JSON.parse(countriesColors.get(groupMatch.awayTeam.name as string) as string).thirdColor.value
   
    const buttonOpacity = groupMatch.isMatchValid ? '0' : '1';
    const alpha = 0.4;
    const gradString = `linear-gradient(to right, rgba${mainColorHome.slice(0, -1)}, ${alpha}), rgba${secondColorHome.slice(0, -1)}, ${alpha}), rgba${thirdColorHome.slice(0, -1)}, 0.2), rgba${mainColorAway.slice(0, -1)}, ${alpha}), rgba${secondColorAway.slice(0, -1)}, ${alpha}), rgba${thirdColorAway.slice(0, -1)}, ${alpha}))`
    let colorIcon;
    if (isBetNew !== null && isBetNew.length > 0) {
        if (isBetNew[0].betResult !== undefined) {
            if (isBetNew[0].betResult === 2) {
                colorIcon = 'darkgreen'
            }
            else if (isBetNew[0].betResult === 1) {
                colorIcon = 'lightgreen'
            }
            else {
                colorIcon = 'red';
            }
        }
    }
    else {
        colorIcon = 'red'
    }

    const textColor = '#CCCCCC'
    return (
        <>
            <div className='match-body' onClick={() => setChosenCountries({ homeCountry: groupMatch.homeTeam.name, awayCountry: groupMatch.awayTeam.name })}>
                <div
                    className='match-content'
                    style={{
                        backgroundImage: gradString,
                    }}>
                    <div style={{ flex: '1' }}>
                        <CircleFlag countryCode={CountryDict.get(groupMatch.homeTeam.name) as string} className='flag-matchrow' />
                    </div>
                    <div style={{ flex: '1', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <OverlayTrigger
                                placement='top'
                                overlay={
                                    <Tooltip id={'scorehometip'}>
                                        This is your {groupMatch.homeTeam.name} bet.
                                    </Tooltip>
                                }>
                                {isBetExisting ? <p style={{ padding: '0 0.3vw', color: textColor }}> ({isBetNew[0]?.homeTeamScoreBet})</p> : <p></p>}
                            </OverlayTrigger>
                            {
                                groupMatch.homeTeamScore === -1 ?
                                    <span style={{ color: textColor, fontSize: '3.5vh' }}>?</span> :
                                    <span style={{ color: textColor, fontSize: '3.5vh' }}>{groupMatch.homeTeamScore}</span>
                            }
                        </div>

                    </div>
                    <div style={{ flex: '6', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                        <p style={{ marginLeft: '0', marginBottom: '0 ', fontSize: '1.1vh', color: textColor }}>
                            {date} {day} {hour.slice(0, 5)}
                        </p>
                        <span style={{ paddingTop: '0', color: textColor, fontSize: '2.5vh', fontWeight: '500' }}>

                            {isMobile ?
                                <span style={{ fontSize: '2.2vh' }}>{CountryDictShortcuts.get(groupMatch.homeTeam.name)} - {CountryDictShortcuts.get(groupMatch.awayTeam.name)} </span> :
                                <span>{groupMatch.homeTeam.name} - {groupMatch.awayTeam.name}</span>
                            }
                        </span>
                    </div>
                    <div style={{ flex: '1' }}>
                        <div style={{ display: 'flex' }}>
                            {groupMatch.awayTeamScore === -1
                                ? <span style={{ color: textColor, fontSize: '3.5vh' }}>?</span>
                                : <span style={{ color: textColor, fontSize: '3.5vh' }}>{groupMatch.awayTeamScore}</span>}
                            <OverlayTrigger
                                placement='top'
                                overlay={
                                    <Tooltip id={'scoreawaytip'}>
                                        This is your {groupMatch.awayTeam.name} bet.
                                    </Tooltip>
                                }>
                                {isBetExisting ? <p style={{ padding: '0 0.3vw', color: textColor }}>({isBetNew[0]?.awayTeamScoreBet})</p> : <p></p>}
                            </OverlayTrigger>

                        </div>

                    </div>

                    <div style={{ flex: '1', display: 'flex', justifyContent: 'right' }}>
                        <CircleFlag countryCode={CountryDict.get(groupMatch.awayTeam.name) as string} className='flag-matchrow' />
                    </div>

                    <div style={{ flexGrow: '1', textAlign: 'right' }}>
                        {
                            new Date(groupMatch.date) > new Date() ?
                                <Button
                                    onClick={handleOpen}
                                    variant={isBetExisting ? 'warning' : 'primary'}
                                    style={isMobile ? { width: '7.5vh', opacity: buttonOpacity, height: '5vh' } : { width: '5.5vh', opacity: buttonOpacity, minWidth: '3.5rem', minHeight: '3.5vh', height: '4vh' }}
                                    disabled={groupMatch.isMatchValid}
                                >
                                    {isBetExisting ? 'Edit' : 'Bet'}
                                </Button> : (groupMatch.isMatchValid ?
                                (
                                    colorIcon === 'lightgreen' ? <BsCheck size={40} style={{ color: colorIcon }} />
                                        : (colorIcon === 'darkgreen' ? <BiCheckDouble size={40} style={{ color: colorIcon }} />
                                            : <ImCross size={30} style={{ color: colorIcon, marginRight: '0.5rem' }} />)

                                ) : null)
                        }
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
    const daysShortcut = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
const AlertAnimation = isMobile ? styled.div`
animation-name: ${alertAnimation};
animation-duration: 5s;
width: 70%;
height: 7vh;
position: fixed;
bottom: 5%;
right: 15%;
` : styled.div`
animation-name: ${alertAnimation};
animation-duration: 5s;
width: 15%;
height: 8vh;
position: fixed;
bottom: 3rem;
right: 2rem;
`