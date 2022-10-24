import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { CircleFlag } from 'react-circle-flags'
import { GroupMatch } from '../GroupStage/GroupStage';
import './BetModal.scss';

export interface BetModalProps {
    showBet: boolean,
    handleClose: () => void,
    modalValue: { homeScore: string, awayScore: string },
    groupMatch: GroupMatch,
    setModalValue: React.Dispatch<React.SetStateAction<{
        homeScore: string;
        awayScore: string;
    }>>,
    setAlert: React.Dispatch<React.SetStateAction<boolean>>,

}

const BetModal: React.FC<BetModalProps> = ({ showBet, handleClose, modalValue, groupMatch, setModalValue, setAlert }) => {

    function handleSubmit() {
        handleClose();
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 2000);
    }
    return (

        <div>
            <Modal show={showBet} onHide={handleClose} centered>
                <Modal.Title className='modal-header'>
                    <CircleFlag height='45' countryCode={CountryDict.get(groupMatch.homeTeam) as string} style={{ marginRight: '1.5rem' }} />
                    <h4 className='modal-title'> {groupMatch.homeTeam} vs {groupMatch.awayTeam}</h4>
                    <CircleFlag height='45' countryCode={CountryDict.get(groupMatch.awayTeam) as string} style={{ marginLeft: '1.5rem' }} />
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
        </div>
    )
}

export default BetModal;


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