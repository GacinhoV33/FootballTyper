import React, { useContext, useEffect, useState } from "react";
import "./YourBets.scss";
import { Bet } from "./MyBets/MyBets";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import deepcopy from "deepcopy";
// components
import MyBets from "./MyBets/MyBets";
import FiltersMyBets, { BetFilters } from "./Filters/FiltersMyBets";
import { User, UserContext } from "../../App";

export interface YourBetsProps {
  allUserBets: Bet[];
  allUsers: User[] | null;
}
const YourBets: React.FC<YourBetsProps> = ({ allUserBets, allUsers }) => {
  const userCtx = useContext(UserContext);
  const [filterMyBets, setFilterMyBets] = useState<BetFilters[]>(['All']);
  const [betsToShow, setBetsToShow] = useState<Bet[]>(allUserBets);
  const userData = allUsers?.filter(
    (user) => user.id === userCtx.userLocalData.id
  );

  useEffect(() => {
    function sortMyBets() {
      let currentBets = deepcopy(allUserBets);

      if (filterMyBets.indexOf("Group") !== -1 && allUserBets) {
        currentBets = currentBets.filter(
          (bet) => bet.match.stage === 0  
        );
      }
      if (filterMyBets.indexOf("Knockout") !== -1 && allUserBets) {
        currentBets = currentBets.filter(
          (bet) => bet.match.stage > 0
        );
      }
      if (filterMyBets.indexOf("Correct") !== -1 && allUserBets) {
        currentBets = currentBets.filter(
          (bet) => bet.betResult !== undefined && bet.betResult > 0
        );
      } else if (filterMyBets.indexOf("Wrong") !== -1 && allUserBets) {
        currentBets = currentBets.filter(
          (bet) => bet.betResult !== undefined && bet.betResult === 0
        );
      }

      const currentDate = new Date();
      if (filterMyBets.indexOf("Past") !== -1 && allUserBets) {
        currentBets = currentBets.filter(
          (bet) => new Date(bet.match.date) < currentDate
        );
      } else if (filterMyBets.indexOf("Active") !== -1 && allUserBets) {
        currentBets = currentBets.filter(
          (bet) => new Date(bet.match.date) > currentDate
        );
      }
      if (filterMyBets.indexOf("All") !== -1) {
        currentBets = deepcopy(allUserBets);
      }

      currentBets.sort(
        (bet1, bet2) =>
          new Date(bet1.match.date).getTime() - new Date(bet2.match.date).getTime()
      );
      setBetsToShow(currentBets);
    }
    sortMyBets();
  }, [filterMyBets]);

  useEffect(() => {
    const getUserBets = async () => {
      const userName = userCtx.userLocalData
        ? userCtx.userLocalData.username
        : "";
      const allUserBets = await (
        await fetch(process.env.REACT_APP_API_URL + `api/Bets/User/${userName}`)
      ).json();
      allUserBets?.sort(
        (bet1: Bet, bet2: Bet) =>
          new Date(bet1.match.date).getTime() - new Date(bet2.match.date).getTime()
      );
      setBetsToShow(allUserBets);
    };
    getUserBets();
  }, []);

  const correctScores = allUserBets.filter((bet) => bet.betResult === 2);
  const correctResult = allUserBets.filter((bet) => bet.betResult === 1);
  const wrongBets = allUserBets.filter(
    (bet) => bet.betResult === 0 && bet.betResult !== null
  );
  const totalNumberOfEndBets =
    correctScores.length + correctResult.length + wrongBets.length;

  return (
    <div className="my-bets-main">
      <FiltersMyBets
        activeFilters={filterMyBets}
        setActiveFilters={setFilterMyBets}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)" }}>
        <div className="leftBar-yourbets">
          <div style={{ display: "flex" }}>
            <div className="circular-bar-sizing">
              <h6 style={{ color: "#CCCCCC" }}>All Bets</h6>
              <CircularProgressbar
                value={11}
                maxValue={48}
                text={`${allUserBets.length}/48`}
                styles={buildStyles({ textColor: "#CCCCCC" })}
              />
            </div>
            <div className="circular-bar-sizing">
              <h6 style={{ color: "#CCCCCC", display: "inlineBlock" }}>
                Correct Score
              </h6>
              <CircularProgressbar
                value={correctScores.length}
                maxValue={totalNumberOfEndBets}
                //@ts-ignore
                text={`${
                  totalNumberOfEndBets !== 0
                    ? Number(
                        (correctScores.length / totalNumberOfEndBets) * 100
                      ).toFixed(2)
                    : 0.0
                }%`}
                styles={buildStyles({
                  pathColor: "green",
                  textColor: "#CCCCCC",
                })}
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="circular-bar-sizing">
              <h6 style={{ color: "#CCCCCC" }}>Correct Result</h6>
              <CircularProgressbar
                value={correctResult.length}
                maxValue={totalNumberOfEndBets}
                //@ts-ignore
                text={`${
                  totalNumberOfEndBets !== 0
                    ? Number(
                        (correctResult.length / totalNumberOfEndBets) * 100
                      ).toFixed(2)
                    : 0.0
                }%`}
                styles={buildStyles({
                  pathColor: "darkgreen",
                  textColor: "#CCCCCC",
                })}
              />
            </div>
            <div className="circular-bar-sizing">
              <h6 style={{ color: "#CCCCCC" }}>Wrong</h6>
              <CircularProgressbar
                value={wrongBets.length}
                maxValue={totalNumberOfEndBets}
                //@ts-ignore
                text={`${
                  totalNumberOfEndBets !== 0
                    ? Number(
                        (wrongBets.length / totalNumberOfEndBets) * 100
                      ).toFixed(2)
                    : 0.0
                }%`}
                styles={buildStyles({ pathColor: "red", textColor: "#CCCCCC" })}
              />
            </div>
          </div>
        </div>
        <div className="bets-main-content">
          <MyBets allUserBets={betsToShow} />
        </div>
        <div className="rightBar-yourbets">
          <h1>Points: {userData ? userData[0].totalPoints : "2"}</h1>
        </div>
      </div>
    </div>
  );
};

export default YourBets;
