import React, { useContext, useEffect, useState } from 'react';
import './MatchCard.scss';

import { CircleFlag } from 'react-circle-flags';
import CountryDict from '../YourBets/MyBets/CountryDict';
import { GiDervishSwords } from 'react-icons/gi';
import Button from 'react-bootstrap/Button';
import { Match, UserContext } from '../../App';
import { Bet } from '../YourBets/MyBets/MyBets';
import BetModal from '../Matchrow/BetModal';
import styled, { keyframes } from 'styled-components';
import { isMobile } from 'react-device-detect';
import Alert from 'react-bootstrap/Alert';

export interface MatchCardProps {
    homeTeam: string,
    awayTeam: string,
    date: string,
    stadium?: string,
    group?: string,
    match: Match
}

function getDayFromDate(date: string) {
    const daysShortcut = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = new Date(date).getDay();
    return daysShortcut[dayIndex];

}

const MatchCard: React.FC<MatchCardProps> = ({ homeTeam, awayTeam, date, stadium, group, match }) => {
    const [dateExact, time] = date.split('T');
    const day = getDayFromDate(date);
    const userCtx = useContext(UserContext);
    const [userBets, setUserBets] = useState<Bet[] | null>(null)
    const API_URL = process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === 'true' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;
    const [betChange, setBetChange] = useState<number>(0);
    const isBetNew = userBets !== null && userBets.length > 0 ? userBets.filter((bet) => bet.matchId === match.id) : null;
    const isBetExisting = isBetNew !== null && isBetNew.length !== 0 && isBetNew[0].homeTeamScoreBet !== undefined;
    const [showBet, setShowBet] = useState<boolean>(false);
    const [modalValue, setModalValue] = useState<{ homeScore: string, awayScore: string }>({ homeScore: '', awayScore: '' });
    const [showAlert, setAlert] = useState<boolean>(false);
    function handleClose() {
        setShowBet(false)
    }

    function handleOpen() {
        setShowBet(true);
    }


    useEffect(() => {
        const getUserBets = async () => {
            const userName = userCtx.userLocalData
                ? userCtx.userLocalData.username
                : "";
            if(userName !== ""){
                const allUserBets = await (
                    await fetch(API_URL + `api/Bets/User/${userName}`)
                ).json();
                setUserBets(allUserBets);
            }
            
        };
        getUserBets();
    }, [betChange]);

    return (
        <div style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '2vh' }}>
            <div className='text-date-match'>
                <div style={{ gridColumn: '2/10' }}>{stadium} - {day} {time.slice(0, 5)} ({group})</div>
                <div className='homepage-button-container'>
                    {userCtx.isUserSigned ?  <Button
                        variant={isBetExisting ? 'warning' : 'primary'}
                        className='homepage-button-bet'
                        onClick={handleOpen}

                    >
                        {isBetExisting ? 'Edit' : 'Bet'}

                    </Button> :
                    null}
                   
                </div>

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
            {showBet && <BetModal
                showBet={showBet}
                handleClose={handleClose}
                modalValue={modalValue}
                groupMatch={match}
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
        </div>

    )
}

export default MatchCard;

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