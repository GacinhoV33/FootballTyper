import React, { useContext, useEffect, useState } from "react";
import "./GroupStageMatches.scss";
import Matchrow from "../../Matchrow/Matchrow";
import { Match, UserContext } from "../../../App";
import Spinner from "react-bootstrap/Spinner";
import { Bet } from "../../YourBets/MyBets/MyBets";
import { requestHandler } from "../../../utils";

interface GroupStageMatchesProps {
  groupMatches: Match[] | null;
  chosenCountries: { homeCountry: string; awayCountry: string };
  setChosenCountries: React.Dispatch<
    React.SetStateAction<{
      homeCountry: string;
      awayCountry: string;
    }>
  >;
}

const GroupStageMatches = ({
  groupMatches,
  chosenCountries,
  setChosenCountries,
}: GroupStageMatchesProps) => {
  const userCtx = useContext(UserContext);
  const [userBets, setUserBets] = useState<Bet[] | null>(null);
  const [betChange, setBetChange] = useState<number>(0);
  const requestBetsOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };

  const API_URL =
    process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === "true"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;
  useEffect(() => {
    const getUserBets = async () => {
      const userName = userCtx.userLocalData
        ? userCtx.userLocalData.username
        : "";

      const allUserBetsRequest = fetch(
        API_URL + `api/Bets/User/${userName}`,
        requestBetsOptions
      );
      const allUserBets = await requestHandler(allUserBetsRequest);

      setUserBets(allUserBets);
    };
    getUserBets();
  }, [betChange]);
  return (
    <div className="group-stage-matches-content">
      {groupMatches ? (
        groupMatches.map((item: Match, index) => (
          <Matchrow
            groupMatch={item}
            key={index}
            chosenCountries={chosenCountries}
            setChosenCountries={setChosenCountries}
            userBets={userBets}
            setBetChange={setBetChange}
          />
        ))
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
};

export default GroupStageMatches;
