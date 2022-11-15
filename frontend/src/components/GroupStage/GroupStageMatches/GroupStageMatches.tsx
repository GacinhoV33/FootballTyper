import React, { useContext, useEffect, useState } from "react";
import "./GroupStageMatches.scss";
import Matchrow from "../../Matchrow/Matchrow";
import { Match, UserContext } from "../../../App";
import Spinner from "react-bootstrap/Spinner";
import { Bet } from "../../YourBets/MyBets/MyBets";
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
  useEffect(() => {
    const getUserBets = async () => {
      const userName = userCtx.userLocalData
        ? userCtx.userLocalData.username
        : "";
      const allUserBets = await (
        await fetch(process.env.REACT_APP_API_URL + `api/Bets/User/${userName}`)
      ).json();
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
