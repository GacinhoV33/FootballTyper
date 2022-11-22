import React, { useContext, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Match, UserContext } from "../../App";
import { CircleFlag } from "react-circle-flags";
import "./BetModal.scss";
import { Bet } from "../YourBets/MyBets/MyBets";
import CountryDict from "../YourBets/MyBets/CountryDict";
import { isMobile } from "react-device-detect";
import Alert from 'react-bootstrap/Alert';
import styled, { keyframes } from "styled-components";
export interface BetModalProps {
  showBet: boolean;
  handleClose: () => void;
  modalValue: { homeScore: string; awayScore: string };
  groupMatch: Match;
  setModalValue: React.Dispatch<
    React.SetStateAction<{
      homeScore: string;
      awayScore: string;
    }>
  >;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  userBets: Bet[] | null;
  setBetChange: React.Dispatch<React.SetStateAction<number>>;
}

const BetModal: React.FC<BetModalProps> = ({
  showBet,
  handleClose,
  modalValue,
  groupMatch,
  setModalValue,
  setAlert,
  userBets,
  setBetChange,
}) => {
  const userName = useContext(UserContext).userLocalData?.username;
  let betId: Bet[] = [];
  const input1 = useRef<HTMLInputElement | null>(null);
  const input2 = useRef<HTMLInputElement | null>(null);
  const API_URL = process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === 'true' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;
  const [showAlert, setShowAlert] = useState<boolean>(false);
  function handleSubmit() {
    if (input1.current?.value !== '' && input2.current?.value !== '') {
      if (userBets) {
        betId = userBets.filter((bet) => bet.matchId === groupMatch.id);
      }
      if (betId.length > 0 && userBets) {
        const putRequestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: betId[0].id,
            homeTeamScoreBet: Number(modalValue.homeScore),
            awayTeamScoreBet: Number(modalValue.awayScore),
            betDate: new Date(),
          }),
        };
        fetch(
          API_URL + `api/Bets/${betId[0].id}`,
          putRequestOptions
        ).then((response) => {
          if (response.ok) {
            setBetChange((prev) => prev + 1);
          }
        });
      } else {
        const postRequestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            homeTeamScoreBet: modalValue.homeScore,
            awayTeamScoreBet: modalValue.awayScore,
            matchId: groupMatch.id,
            bettorUserName: userName,
            betDate: new Date(),
          }),
        };

        fetch(
          API_URL + "api/Bets",
          postRequestOptions
        ).then((response) => {
          if (response.ok) {
            setBetChange((prev) => prev + 1);
            return response.json();
          }

          return Promise.reject(response);
        });
      }
      handleClose();
      setShowAlert(false)
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
        
      }, 3000);
    } else{
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false);
        
      }, 5000);
    }
  }
  const currentBet = userBets ? userBets.filter((bet) => bet.matchId === groupMatch.id) : [];
  return (
    <Modal show={showBet} onHide={handleClose} centered>
      <Modal.Title className="modal-header">
        <CircleFlag
          height="45"
          countryCode={CountryDict.get(groupMatch.homeTeam.name) as string}
          style={{ marginRight: "1.5rem" }}
        />
        {isMobile ?
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              {groupMatch.homeTeam.name}
            </div>
            <div>
              vs
            </div>
            <div>
              {groupMatch.awayTeam.name}
            </div>
          </div>
          : <h4 className="modal-title">
            {" "}
            {groupMatch.homeTeam.name} vs {groupMatch.awayTeam.name}
          </h4>}

        <CircleFlag
          height="45"
          countryCode={CountryDict.get(groupMatch.awayTeam.name) as string}
          style={{ marginLeft: "1.5rem" }}
        />
      </Modal.Title>

      <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
        <input
          className="input-score no-spin"
          maxLength={2}
          type="number"
          placeholder={currentBet.length !== 0 ? currentBet[0].homeTeamScoreBet.toString() : undefined}
          ref={input1}
          onChange={(e) =>
            setModalValue({
              homeScore: e.target.value,
              awayScore: modalValue.awayScore,
            })
          }
        />
        <h6 style={{ position: "absolute", bottom: "1.4rem" }}> - </h6>
        <input
          className="input-score no-spin"
          maxLength={2}
          ref={input2}
          type="number"
          placeholder={currentBet.length !== 0 ? currentBet[0].awayTeamScoreBet.toString() : undefined}
          onChange={(e) =>
            setModalValue({
              homeScore: modalValue.homeScore,
              awayScore: e.target.value,
            })
          }
        />
      </Modal.Body>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        <Button style={{ width: "8rem" }} size="sm" onClick={handleSubmit}>
          Submit
        </Button>

        {showAlert ?   <AlertAnimation >
                    <Alert variant='danger'>
                        <Alert.Heading>Error!</Alert.Heading>
                        Fill All Inputs
                    </Alert>
                </AlertAnimation> : null}
      </div>
    </Modal>
  );
};

export default BetModal;

const alertAnimation = keyframes`
from{
    opacity: 1;
    transform: translateY(-10px);
}
to{
    opacity: 0.0;
    transform: translateY(0px);
}
`
const AlertAnimation = isMobile ? styled.div`
animation-name: ${alertAnimation};
animation-duration: 5s;
width: 70%;
height: 7vh;
position: fixed;
top: 10vh;
` : styled.div`
animation-name: ${alertAnimation};
animation-duration: 5s;
width: 15%;
height: 8vh;
position: fixed;
top: 9vh;
`