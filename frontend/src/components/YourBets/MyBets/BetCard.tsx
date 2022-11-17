import React, { useState, useContext } from "react";
import "./BetCard.scss";
import { Bet } from "./MyBets";
import Card from "react-bootstrap/Card";
import { CircleFlag } from "react-circle-flags";
import Button from "react-bootstrap/Button";
import { HiBuildingStorefront } from "react-icons/hi2";
import { IoPersonSharp } from "react-icons/io5";
import { AiFillClockCircle } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";
import styled, { keyframes } from "styled-components";
import CountryDict from "./CountryDict";
import { UserContext } from "../../../App";
export interface BetCardProps {
  bet: Bet;
}

const BetCard: React.FC<BetCardProps> = ({ bet }) => {
  const [baseBet, setBaseBet] = useState<{ homeBet: number; awayBet: number }>({
    homeBet: bet.homeTeamScoreBet,
    awayBet: bet.awayTeamScoreBet,
  });
  const [currentBet, setCurrentBet] = useState<{
    homeBet: number;
    awayBet: number;
  }>({ homeBet: bet.homeTeamScoreBet, awayBet: bet.awayTeamScoreBet });
  const betString =
    bet.betResult !== undefined && bet.betResult !== null
      ? bet.betResult === 1
        ? `0 1px 10px lightgreen`
        : bet.betResult === 2
          ? "0 1px 10px darkgreen"
          : `0 1px 10px red`
      : undefined;

  const isAfterTime = new Date(bet.match.date) < new Date();
  const betDisabled =
    baseBet.homeBet === currentBet.homeBet &&
    baseBet.awayBet === currentBet.awayBet;
  const afterDeadline =
    new Date().getTime() > new Date("2022-08-26T16:33:27.1796134").getTime();
  const [date, hour] = bet.match.date
    ? bet.match.date.split("T")
    : ["1999-20-11", "00:00"];
  const userName = useContext(UserContext).userLocalData?.username;
  const API_URL = process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === 'true' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;

  function handleSave() {
    try {
      if (
        currentBet.homeBet < 100 &&
        currentBet.awayBet < 100 &&
        new Date() < new Date(bet.match.date)
      ) {
        //TODO change on bet date
        setBaseBet({
          homeBet: currentBet.homeBet,
          awayBet: currentBet.awayBet,
        });
        const putRequestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: bet.id,
            homeTeamScoreBet: currentBet.homeBet,
            awayTeamScoreBet: currentBet.awayBet,
            betDate: new Date(),
            bettorUserName: userName,
          }),
        };

        fetch(
          API_URL + `api/Bets/${bet.id}`,
          putRequestOptions
        )
          .then((response) => {
            if (response.ok) {
              return response;
            }
            // console.log("reject");
            return Promise.reject(response);
          });
        // .then((data) => {
        //   console.log(data);
        // });
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <CardAnimation>
      <Card
        className="card-style-body"
        style={{
          boxShadow: betString,
        }}
      >
        <Card.Header
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            <CircleFlag
              countryCode={CountryDict.get(bet.match.homeTeam.name) as string}
              className='flag-my-bets'
            />
          </div>
          <span className="score-text">
            {bet.match.homeTeamScore !== -1 ? bet.match.homeTeamScore : "?"} :{" "}
            {bet.match.awayTeamScore !== -1 ? bet.match.awayTeamScore : "?"}
          </span>
          <CircleFlag
            countryCode={CountryDict.get(bet.match.awayTeam.name) as string}
            className='flag-my-bets'

          />
        </Card.Header>
        <Card.Body className="bet-card-body">
          <Card.Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2%",
              }}
            >
              <div
                style={{
                  height: "2.5rem",
                  gridColumn: "1/4",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "0.25rem",
                  marginBottom: "1rem",
                }}
              >
                <input
                  className="bet-input no-spin"
                  placeholder={bet.homeTeamScoreBet.toString()}
                  type="number"
                  min="0"
                  max="30"
                  disabled={isAfterTime}
                  onChange={(e) =>
                    setCurrentBet({
                      homeBet: Number.parseInt(e.target.value),
                      awayBet: currentBet.awayBet,
                    })
                  }
                />
                <h3 style={{ padding: "0 1.5rem" }}>-</h3>
                <input
                  className="bet-input no-spin"
                  type="number"
                  min="0"
                  max="30"
                  disabled={isAfterTime}
                  placeholder={bet.awayTeamScoreBet.toString()}
                  onChange={(e) =>
                    setCurrentBet({
                      homeBet: currentBet.homeBet,
                      awayBet: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div
                style={{
                  gridColumn: "1/4",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <BsFillCalendarDateFill size={20} />
                <span
                  className='bet-card-text'
                >
                  {date}
                </span>
              </div>
              <div
                style={{
                  gridColumn: "1/4",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <AiFillClockCircle size={20} />
                <span
                  className='bet-card-text'
                >
                  {hour.slice(0, 5)}
                </span>
              </div>
              <div
                style={{
                  gridColumn: "1/4",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <HiBuildingStorefront size={20} />
                <span className='bet-card-text'>{bet.match.location}</span>
              </div>
              <div
                style={{
                  gridColumn: "1/4",
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "1.0rem",
                }}
              >
                <IoPersonSharp size={20} />
                {/* {bet.match.referee} */}
                <span className='bet-card-text'>Szymon Marciniak</span>
              </div>
              <div style={{ gridColumn: "1/4" }}>
                {bet.homeTeamScore && bet.awayTeamScore ? (
                  <h4 style={{ textAlign: "center" }}>5 points</h4> // Style points TODO
                ) : (
                  <Button
                    style={{ width: "100%" }}
                    disabled={betDisabled || !afterDeadline}
                    onClick={handleSave}
                    variant={
                      betDisabled || !afterDeadline ? "success" : "primary"
                    }
                  >
                    {betDisabled || !afterDeadline ? "Saved" : "Save"}
                  </Button>
                )}
              </div>
              <div style={{ gridColumn: "1/4" }}>
                <div style={{ height: '3vh' }}>

                </div>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </CardAnimation>
  );
};

export default BetCard;

//animations
const cardAnimation = keyframes`
0%{
  transform: scale(90%); 
  opacity: 1;
}
50%{
  transform: scale(105%);
  opacity: 0.9;
}
100%{
  transform: scale(100%);
}
`;
const CardAnimation = styled.div`
  animation-name: ${cardAnimation};
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
`;
