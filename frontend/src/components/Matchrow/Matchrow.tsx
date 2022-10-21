import React, { useState } from 'react'
import './Matchrow.scss';
import { CircleFlag } from 'react-circle-flags'
import Button from 'react-bootstrap/Button'; 
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { GroupMatch } from '../GroupStage/GroupStage';
export interface MatchrowProps{
    groupMatch: GroupMatch,
}

const Matchrow: React.FC<MatchrowProps> = ({groupMatch}) => {
    const [showBet, setShowBet] = useState<boolean>(false);
    const handleClose = () => setShowBet(false);
    const handleOpen = () => setShowBet(true);
    
    const [date, hour] = groupMatch.date.split('T');
    const day = getDayFromDate(date);
    getDayFromDate(date);
    const [showAlert, setAlert] = useState<boolean>(false);
    function handleSubmit() {
        handleClose();
        setAlert(true);
        setTimeout(() => setAlert(false), 2000);
    }
    return (
    <>
    <div className='match-body'>
        <div style={{height: '4.5rem', border: '2px solid #111231', borderRadius: '5px', boxShadow: '#222342', padding: '0.75rem', margin: '0.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{flex: '1'}}><CircleFlag countryCode={CountryDict.get(groupMatch.homeTeam) as string} height='40px'/></div>
            <div style={{flex: '4', textAlign: 'center'}}><h4>{groupMatch.homeTeam} - {groupMatch.awayTeam}</h4></div>
            <div style={{flex: '1', display: 'flex', justifyContent: 'right'}}><CircleFlag countryCode={CountryDict.get(groupMatch.awayTeam) as string} height='40px'/></div>
            <div style={{flex: '2', flexDirection: 'column', display: 'flex', alignItems: 'center', marginTop: '0.9rem'}}>
                <h6>{date}</h6>
                <p >{hour}</p>
            </div>
            <div style={{flex:' 1.5', textAlign:'center'}}>
                <h6>{day}</h6>
            </div>
            
            <div style={{flexGrow: '1', textAlign: 'right'}}> 
                <Button onClick={handleOpen}>BET</Button>
            </div>
        </div>
    </div>
        {showBet && 
            <Modal show={showBet} onHide={handleClose} centered> 
                <Modal.Title className='modal-header'>
                    <CircleFlag height='45' countryCode={CountryDict.get(groupMatch.homeTeam) as string} style={{marginRight: '1.5rem'}}/>
                        <h4 className='modal-title'> {groupMatch.homeTeam} vs {groupMatch.awayTeam}</h4> 
                    <CircleFlag height='45' countryCode={CountryDict.get(groupMatch.awayTeam) as string} style={{marginLeft: '1.5rem'}}/>
                </Modal.Title>

                <Modal.Body style={{display: 'flex', justifyContent: 'center'}}> 
                    <input className='input-score no-spin' maxLength={2} type="number" /> <h6 style={{position: 'absolute', bottom: '1.4rem'}}> - </h6> <input className='input-score no-spin' maxLength={2} type="number"/> 
        {/* TODO - fix center of VS and make separte component of it */}
                </Modal.Body>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem'}}>
                <Button style={{width: '8rem'}} size='sm' onClick={handleSubmit}> Submit </Button>
                </div>
            </Modal>}
        {showAlert && <div className='correct-submit-alert'> <Alert variant='success'> Match bet submitted correctly </Alert> </div>} 
        </>
  )
}

export default Matchrow

function getDayFromDate(date: string){
    const daysShortcut = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayIndex = new Date(date).getDay();  
    return daysShortcut[dayIndex];
    
}

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
