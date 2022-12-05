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
  maxBets: number;
}
const YourBets: React.FC<YourBetsProps> = ({ allUserBets, allUsers, maxBets }) => {
  const userCtx = useContext(UserContext);
  const [filterMyBets, setFilterMyBets] = useState<BetFilters[]>(['All']);
  const [betsToShow, setBetsToShow] = useState<Bet[]>(allUserBets);
  const userData = allUsers?.filter(
    (user) => user.id === userCtx.userLocalData.id
  );
  const API_URL = process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === 'true' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;
  const requestBetsOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };

  useEffect(() => {
    const getUserBets = async () => {
      const userName = userCtx.userLocalData
        ? userCtx.userLocalData.username
        : "";

      const allUserBets = await (
        await fetch(API_URL + `api/Bets/User/${userName}`, requestBetsOptions)
      ).json();

      let currentBets = deepcopy(allUserBets);

      if (filterMyBets.indexOf("Group") !== -1 && allUserBets) {
        currentBets = currentBets.filter(
          (bet: Bet) => bet.match.stage === 0
        );
      }
      if (filterMyBets.indexOf("Knockout") !== -1 && allUserBets) {
        currentBets = currentBets.filter(
          (bet: Bet) => bet.match.stage > 0
        );
      }
      if (filterMyBets.indexOf("Correct") !== -1 && allUserBets) {
        currentBets = currentBets.filter(
          (bet: Bet) => bet.betResult !== undefined && bet.betResult > 0
        );
      } else if (filterMyBets.indexOf("Wrong") !== -1 && allUserBets) {
        currentBets = currentBets.filter(
          (bet: Bet) => bet.betResult !== undefined && bet.betResult === 0
        );
      }

      const currentDate = new Date();
      if (filterMyBets.indexOf("Past") !== -1 && allUserBets) {
        currentBets = currentBets.filter(
          (bet: Bet) => new Date(bet.match.date) < currentDate
        );
      } else if (filterMyBets.indexOf("Active") !== -1 && allUserBets) {
        currentBets = currentBets.filter(
          (bet: Bet) => bet.betResult === null
        );
      }
      if (filterMyBets.indexOf("All") !== -1) {
        currentBets = deepcopy(allUserBets);
      }

      currentBets.sort(
        (bet1: Bet, bet2: Bet) =>
          bet1.betResult - bet2.betResult
      );
      currentBets.sort(
        (bet1: Bet, bet2: Bet) =>
          new Date(bet2.betDate).getTime() - new Date(bet1.betDate).getTime()
      );
      setBetsToShow(currentBets);
    };
    getUserBets();
  }, [filterMyBets]);

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

      setBetsToShow(currentBets);
    }
    sortMyBets();
  }, [filterMyBets]);



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
                value={allUserBets.length}
                maxValue={maxBets}
                text={`${allUserBets.length}/${maxBets}`}
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
                text={`${totalNumberOfEndBets !== 0
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
                text={`${totalNumberOfEndBets !== 0
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
                text={`${totalNumberOfEndBets !== 0
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
