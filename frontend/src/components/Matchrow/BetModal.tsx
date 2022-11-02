import React, { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Match, UserContext } from '../../App';
import { CircleFlag } from 'react-circle-flags'
import './BetModal.scss';
import { Bet } from '../YourBets/MyBets/MyBets';
import CountryDict from '../YourBets/MyBets/CountryDict';
export interface BetModalProps {
    showBet: boolean,
    handleClose: () => void,
    modalValue: { homeScore: string, awayScore: string },
    groupMatch: Match,
    setModalValue: React.Dispatch<React.SetStateAction<{
        homeScore: string;
        awayScore: string;
    }>>,
    setAlert: React.Dispatch<React.SetStateAction<boolean>>,
    userBets: Bet[] | undefined,

}

const BetModal: React.FC<BetModalProps> = ({ showBet, handleClose, modalValue, groupMatch, setModalValue, setAlert, userBets }) => {

    const userName = useContext(UserContext).userLocalData?.username;
    function handleSubmit() {
        console.log(userBets)
        let betId: Bet[] = [];
        if(userBets){
            betId = userBets.filter((bet) => bet.matchId === groupMatch.id);
        }
        // const betId = userBets.filter((bet) => bet.matchId === groupMatch.id);
        console.log(betId);
        if (betId !== undefined && userBets) {
            const putRequestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "id": betId[0].id,
                        "homeTeamScoreBet": modalValue.homeScore,
                        "awayTeamScoreBet": modalValue.awayScore,
                        "betDate": new Date().toString(),
                        "bettorUserName": userName, // TODO - is this needed?

                    }
                )
            };
            fetch(`api/Bets/${betId[0].id}`, putRequestOptions)
                .then((response) => {
                    console.log("response: ", response);
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response);
                })
                .then((data) => console.log(data));
            console.log(putRequestOptions.body)
        }
        else {
            const postRequestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "homeTeamScoreBet": 1,
                        "awayTeamScoreBet": 2,
                        "matchId": groupMatch.id,
                        "bettorUserName": userName,
                        "betDate": new Date().toString(),
                    }
                )
            };

            fetch('api/Bets', postRequestOptions)
                .then((response) => {
                    console.log("response: ", response);
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response);
                })
                .then((data) => console.log(data));
        }
        handleClose();
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000);
    }
    return (
            <Modal show={showBet} onHide={handleClose} centered>
                <Modal.Title className='modal-header'>
                    <CircleFlag height='45' countryCode={CountryDict.get(groupMatch.homeTeam.name) as string} style={{ marginRight: '1.5rem' }} />
                    <h4 className='modal-title'> {groupMatch.homeTeam.name} vs {groupMatch.awayTeam.name}</h4>
                    <CircleFlag height='45' countryCode={CountryDict.get(groupMatch.awayTeam.name) as string} style={{ marginLeft: '1.5rem' }} />
                </Modal.Title>

                <Modal.Body style={{ display: 'flex', justifyContent: 'center' }}>
                    <input
                        className='input-score no-spin'
                        maxLength={2}
                        type="number"
                        value={modalValue.homeScore}
                        onChange={(e) => setModalValue({ homeScore: e.target.value, awayScore: modalValue.awayScore })}
                    />
                    <h6 style={{ position: 'absolute', bottom: '1.4rem' }}> - </h6>
                    <input
                        className='input-score no-spin'
                        maxLength={2} type="number"
                        value={modalValue.awayScore}
                        onChange={(e) => setModalValue({ homeScore: modalValue.homeScore, awayScore: e.target.value })}
                    />
                    {/* TODO - fix center of VS and make separte component of it */}
                </Modal.Body>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <Button style={{ width: '8rem' }} size='sm' onClick={handleSubmit}> Submit </Button>
                </div>
            </Modal>
    )
}

export default BetModal;