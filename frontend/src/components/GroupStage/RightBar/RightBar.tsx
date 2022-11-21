import React, { useEffect, useState } from 'react';
import './RightBar.scss';
import Table from 'react-bootstrap/Table';
import { BiFootball } from 'react-icons/bi';
import { TbRectangleVertical } from 'react-icons/tb';
import { dummyPlayerData, ScoreStatistic } from '../LeftBar/LeftBar';
import { Player } from '../LeftBar/LeftBar';
import styled, { keyframes } from "styled-components";

export interface RightBarProps {
  chosenCountries: { homeCountry: string, awayCountry: string },
  currentGroup: string,

}



const RightBar: React.FC<RightBarProps> = ({ chosenCountries, currentGroup }) => {
  const API_URL = process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === 'true' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;
  const [stats, setStats] = useState<ScoreStatistic[] | null>(null);
  useEffect(() => {

    const getStats = async () => {
      const scoreStats = await (
        await fetch(API_URL + `/api/Statistics/TopScorers/Group/${currentGroup}`)
      ).json();
      setStats(scoreStats)
      console.log(scoreStats)
    }
    getStats();
  }, [currentGroup]);

  return (
    <>
        <h2 style={{  textAlign: 'center', color: '#DDD', paddingTop: '4rem' }}> GROUP {currentGroup} </h2>
      <RightBarAnimation>


        <Table>
          <tbody className='right-bar-statistics'>
            {stats ? stats.map(({ name, goals, assists, yellowCards, redCards }: ScoreStatistic, index: number) => (
              <tr style={{ textAlign: 'center' }} key={index}>
                <td style={{ fontWeight: '500' }}>{index + 1}</td>
                <td style={{ textAlign: 'left' }}>{name}</td>
                <td> <BiFootball size={20} /> {goals}</td>
                <td><span style={{ fontWeight: '500', color: 'chocolate' }}> A </span>{assists}</td>
                <td> <TbRectangleVertical size={20} style={{ color: '#EDED22' }} fill={'#FEFE22'} /> {yellowCards}</td>
                <td> <TbRectangleVertical size={20} style={{ color: '#ED1111' }} fill={'#FE0000'} /> {redCards}  </td>
              </tr>
            )) : null}
          </tbody>
        </Table>
      </RightBarAnimation>
    </>
  )
}

export default RightBar;

//animations

const rightBarAnimation = keyframes`
from{
    transform: translateX(5rem);
}
to{
    transform: translateX(0rem);
}
`;

const RightBarAnimation = styled.div`
    animation-name: ${rightBarAnimation};
    animation-duration: 1s;
    display: flex;
    align-items: flex-start !important;
    flex-direction: column;
    padding-top: 0.8rem;
    padding-right: 1rem;
    animation-timing-function: ease-in-out;
    height: 75vh;
    scroll-behavior: smooth;
    width: 15vw;
    ::-webkit-scrollbar {
      display: none;
    }


`