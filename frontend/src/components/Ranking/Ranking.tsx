import React, { useEffect } from "react";
import { useState } from "react";
import "./Ranking.scss";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import FilterRanking from "./FilterRanking";
import FilterLeague from "./FilterLeague";
import ListRanking from "./ListRanking";
import { User } from "../../App";
import LoadingLayout from "../LoadingLayout/LoadingLayout";

export type LeaugeName = {
  leaugeName: string;
  leaugeId: number;
  leaugeUsers: User[];
};
export type RankingFilters =
  | "general"
  | "lastDay"
  | "groupStage"
  | "knockoutStage"
  | "none";

export type RankingProps = {};

const Ranking: React.FC<RankingProps> = ({}) => {
  const [filter, setFilter] = useState<RankingFilters>("none");
  const [leagueFilter, setLeagueFilter] = useState<string>("main");
  const [usersToDisplay, setUsersToDisplay] = useState<User[]>([]);
  const [generalMain, setGeneralMain] = useState<User[]>([]);
  const API_URL =
    process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === "true"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;

  useEffect(() => {
    const fetchData = async () => {
      const generalMainData: User[] = await (
        await fetch(API_URL + `api/Score/All/main`)
      ).json();
      generalMainData.sort(
        (user1, user2) => user1.positionDict.main - user2.positionDict.main
      );
      setGeneralMain(generalMainData);
      setFilter("general");
    };
    fetchData();
  }, []);

  useEffect(() => {
    const manageChange = async () => {
      if (leagueFilter === "main") {
        switch (filter) {
          case "general":
            setUsersToDisplay(generalMain);
            break;
          case "lastDay":
            const lastDayMainData: User[] = await (
              await fetch(API_URL + `api/Score/LastDay/main`)
            ).json();
            lastDayMainData.sort(
              (user1, user2) =>
                user1.positionDict.main - user2.positionDict.main
            );
            setUsersToDisplay(lastDayMainData);
            break;
          case "groupStage":
            const groupStageMainData: User[] = await (
              await fetch(API_URL + `api/Score/Groupstage/main`)
            ).json();
            groupStageMainData.sort(
              (user1, user2) =>
                user1.positionDict.main - user2.positionDict.main
            );
            setUsersToDisplay(groupStageMainData);
            break;
          case "knockoutStage":
            const knockoutMainData: User[] = await (
              await fetch(API_URL + `api/Score/Knockout/main`)
            ).json();
            knockoutMainData.sort(
              (user1, user2) =>
                user1.positionDict.main - user2.positionDict.main
            );
            setUsersToDisplay(knockoutMainData);
            break;
        }
      } else {
        switch (filter) {
          case "general":
            const generalClownData: User[] = await (
              await fetch(API_URL + `api/Score/All/clownLeague`)
            ).json();
            generalClownData.sort(
              (user1, user2) =>
                user1.positionDict.clownLeague - user2.positionDict.clownLeague
            );
            setUsersToDisplay(generalClownData);
            break;
          case "lastDay":
            const lastDayClownData: User[] = await (
              await fetch(API_URL + `api/Score/LastDay/clownLeague`)
            ).json();
            lastDayClownData.sort(
              (user1, user2) =>
                user1.positionDict.clownLeague - user2.positionDict.clownLeague
            );
            setUsersToDisplay(lastDayClownData);
            break;
          case "groupStage":
            const groupStageClownData: User[] = await (
              await fetch(API_URL + `api/Score/Groupstage/clownLeague`)
            ).json();
            groupStageClownData.sort(
              (user1, user2) =>
                user1.positionDict.clownLeague - user2.positionDict.clownLeague
            );
            setUsersToDisplay(groupStageClownData);
            break;
          case "knockoutStage":
            const knockoutClownData: User[] = await (
              await fetch(API_URL + `api/Score/Knockout/clownLeague`)
            ).json();
            knockoutClownData.sort(
              (user1, user2) =>
                user1.positionDict.clownLeague - user2.positionDict.clownLeague
            );
            setUsersToDisplay(knockoutClownData);
            break;
        }
      }
    };
    manageChange();
  }, [filter, leagueFilter]);

  return (
    <div className="ranking-main-body">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FilterRanking activeFilter={filter} setActiveFilter={setFilter} />
          <FilterLeague
            currentFilter={leagueFilter}
            setCurrentFilter={setLeagueFilter}
          />
        </div>
      </div>
      {usersToDisplay.length === 0 && filter !== "lastDay" ? (
        <LoadingLayout componentName="Ranking" />
      ) : (
        <div className="list-ranking">
          <ListRanking
            allUsers={usersToDisplay}
            league={leagueFilter}
            filter={filter}
          />
        </div>
      )}
    </div>
  );
};

export default Ranking;
