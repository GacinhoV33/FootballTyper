import React, { useState } from 'react'
import './Matchrow.scss';
import { CircleFlag } from 'react-circle-flags'
import Button from 'react-bootstrap/Button'; 
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

export interface MatchrowProps{
    firstName: string,
    secondName: string,
    firstScore: number | null,
    secondScore: number | null,
    userID: string, // type? 
    date: string, // type DATE create! TODO 
}

const Matchrow: React.FC<MatchrowProps> = ({firstName, secondName, firstScore, secondScore, userID, date}) => {
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
    <div style={{height: '3rem', border: '2px solid #111231', borderRadius: '5px', boxShadow: '#222342', padding: '0.75rem', margin: '0.5rem'}}>
        <CircleFlag countryCode='pl' height='35'/>
        {firstName} - {secondName}
        <CircleFlag countryCode='es' height='35'/>
        <Button onClick={handleOpen}>BET</Button>
        {showBet && 
            <Modal show={showBet} onHide={handleClose} centered> 
                <Modal.Title className='modal-header'>
                    <CircleFlag height='20' countryCode='pl' style={{marginRight: '1.5rem'}}/>
                        <h4 className='modal-title'> {firstName} vs {secondName}</h4> 
                    <CircleFlag height='20' countryCode='es' style={{marginLeft: '1.5rem'}}/>
                </Modal.Title>

                <Modal.Body style={{display: 'flex', justifyContent: 'center'}}> 
                    <input className='input-score no-spin' maxLength={2} type="number" /> <h6 style={{position: 'absolute', bottom: '1.4rem'}}> - </h6> <input className='input-score no-spin' maxLength={2} type="number"/> 
{/* TODO - fix center of VS  */}
                </Modal.Body>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem'}}>
                 <Button style={{width: '8rem'}} size='sm' onClick={handleSubmit}> Submit </Button>
                </div>
            </Modal>}
        {showAlert && <div className='correct-submit-alert'> <Alert variant='success'> Match bet submitted correctly </Alert> </div>} 
        {/* TODO - add fading out */}
    </div>
  )
}

export default Matchrow