import React, { useState } from 'react'
import './Matchrow.scss';
import { CircleFlag } from 'react-circle-flags'
import Button from 'react-bootstrap/Button'; 
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Popover from 'react-bootstrap/Popover';
import {FcInfo} from 'react-icons/fc'
export interface MatchrowProps{
    firstName: string,
    secondName: string,
    firstScore: number | null,
    secondScore: number | null,
    userID: string, // type? 
    date: string, // type DATE create! TODO 
    hour: string,
}

const Matchrow: React.FC<MatchrowProps> = ({firstName, secondName, firstScore, secondScore, userID, date, hour}) => {
    const [showBet, setShowBet] = useState<boolean>(false);
    const handleClose = () => setShowBet(false);
    const handleOpen = () => setShowBet(true);
    
    const [showAlert, setAlert] = useState<boolean>(false);
    
    function handleSubmit() {
        handleClose();
        console.log('Submitted')
        setAlert(true);
        setTimeout(() => setAlert(false), 2000);
    }
    return (
    <>
    <div className='match-body'>
    <div style={{height: '4.5rem', border: '2px solid #111231', borderRadius: '5px', boxShadow: '#222342', padding: '0.75rem', margin: '0.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{flexGrow: '1'}}><CircleFlag countryCode='pl' height='40px'/></div>
        <div style={{flexGrow: '3', textAlign: 'center'}}><h4>{firstName} - {secondName}</h4></div>
        <div style={{flexGrow: '1', display: 'flex', justifyContent: 'right'}}><CircleFlag countryCode='es' height='40px'/></div>
        <div style={{flexGrow: '2'}}><div style={{position: 'relative', top: '0.55rem', textAlign: 'right'}}><h6>{date}</h6> <p style={{textAlign: 'right'}}>{hour}</p></div></div>
        {/* <div style={{flexGrow: '2'}}><h6>{date}</h6></div> */}
        <div style={{flexGrow: '1', textAlign: 'right'}}> 
            <Button onClick={handleOpen}>BET</Button>
            <FcInfo size={30} style={{marginLeft: '0.5rem'}}/>

        </div>

           
        {/* TODO - add fading out */}
    </div>
    </div>
        {showBet && 
            <Modal show={showBet} onHide={handleClose} centered> 
                <Modal.Title className='modal-header'>
                    <CircleFlag height='45' countryCode='pl' style={{marginRight: '1.5rem'}}/>
                        <h4 className='modal-title'> {firstName} vs {secondName}</h4> 
                    <CircleFlag height='45' countryCode='es' style={{marginLeft: '1.5rem'}}/>
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