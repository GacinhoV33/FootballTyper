import React, { useEffect, useState } from 'react';
import './LeftBar.scss';
import Table from 'react-bootstrap/Table';
import { BiFootball } from 'react-icons/bi';
import { TbRectangleVertical } from 'react-icons/tb';
import styled, { keyframes } from "styled-components";
import countriesColors from '../../AnimatedLetters/CountriesColors';
export interface LeftBarProps {
    chosenCountries: { homeCountry: string, awayCountry: string },
}

export type ScoreStatistic = {
    id: number,
    name: string,
    group: string,
    goals: number,
    assists: number,
    yellowCards: number,
    redCards: number
    team: string | null
}

const LeftBar: React.FC<LeftBarProps> = ({ chosenCountries }) => {

    const API_URL = process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === 'true' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;
    const [stats, setStats] = useState<ScoreStatistic[] | null>(null);
    useEffect(() => {

        const getStats = async () => {
            const scoreStats = await (
                await fetch(API_URL + `/api/Statistics/TopScorers`)
            ).json();
            setStats(scoreStats)
        }
        getStats();
    }, []);

    return (
        <>
            <h2 style={{ textAlign: 'center', color: '#DDD', paddingTop: '4rem' }}>Top Scores</h2>
            <LeftBarAnimation>
                <Table>
                    <tbody className='groupstage-player-statistics'>
                        {stats ? stats.map(({ name, goals, assists, yellowCards, redCards, team }: ScoreStatistic, index) => {
                            const mainColor = team ? JSON.parse(countriesColors.get(team as string) as string).mainColor.value : '(255, 0, 0)';
                            const secondColor = team ? JSON.parse(countriesColors.get(team as string) as string).secondColor.value : '(255, 255, 255)'
                            const gradString = {
                                backgroundImage: `linear-gradient(to right, rgba${mainColor.slice(0, -1)}, 0.6), rgba${secondColor.slice(0, -1)}, 0.6)`,
                                textAlign: 'center'
                            }
                            return (
                                <tr
                                    //@ts-ignore
                                    style={team === chosenCountries.homeCountry || team === chosenCountries.awayCountry ? gradString : { textAlign: 'center' }}
                                    key={index} >
                                    <td style={{ fontWeight: '500', verticalAlign: 'middle' }}>{index + 1}</td>
                                    <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>{name}</td>
                                    <td style={{ verticalAlign: 'middle' }}> <BiFootball size={20} style={{ color: '#CCC' }} />{goals}</td>
                                    <td style={{ verticalAlign: 'middle' }}> <span style={{ fontWeight: '500', color: '#EEE' }}>A</span> {assists} </td>
                                    <td style={{ verticalAlign: 'middle' }}> <TbRectangleVertical size={20} style={{ color: '#EDED22' }} fill={'#FEFE22'} /> {yellowCards}</td>
                                    <td style={{ verticalAlign: 'middle' }}><TbRectangleVertical size={20} style={{ color: '#ED1111' }} fill={'#FE0000'} /> {redCards} </td>
                                </tr>
                            )
                        }) : null}
                    </tbody>

                </Table>
            </LeftBarAnimation>
        </>
    )
}
export default LeftBar;

//animations

const leftBarAnimation = keyframes`
from{
    transform: translateX(-5rem);
}
to{
    transform: translateX(0rem);
}
`;

const LeftBarAnimation = styled.div`
    animation-name: ${leftBarAnimation};
    overflow-y: scroll;
    height: 75vh;
    scroll-behavior: smooth;
    animation-duration: 1s;
    display: flex;
    align-items: flex-start !important;
    flex-direction: column;
    padding-top: 0.8rem;
    padding-left: 1rem;
    animation-timing-function: ease-in-out;
    ::-webkit-scrollbar {
        display: none;
      }
`

export interface Player {
    playerName: string,
    goals: number,
    assists: number,
    team: string,
    yellowCards: number,
    redCards: number,
    imgPath?: string,
}

export const dummyPlayerData: Player[] = [
    {
        playerName: 'Cristiano Ronaldo',
        goals: 0,
        assists: 0,
        team: 'Portugal',
        yellowCards: 0,
        redCards: 0,
        imgPath: 'noPath'
    },
    {
        playerName: 'Leo Messi',
        goals: 0,
        assists: 0,
        team: 'Argentina',
        yellowCards: 0,
        redCards: 0,
        imgPath: 'noPath'
    },
    {
        playerName: 'Neymar Jr',
        goals: 0,
        assists: 0,
        team: 'Brasil',
        yellowCards: 0,
        redCards: 0,
        imgPath: 'noPath'
    },
    {
        playerName: 'Robert Lewandowski',
        goals: 0,
        assists: 0,
        team: 'Poland',
        yellowCards: 0,
        redCards: 0,
        imgPath: 'noPath'
    },
    {
        playerName: 'Karim Benzema',
        goals: 0,
        assists: 0,
        team: 'France',
        yellowCards: 0,
        redCards: 0,
        imgPath: 'noPath'
    },
    {
        playerName: 'Kylian Mbappe',
        goals: 0,
        assists: 0,
        team: 'France',
        yellowCards: 0,
        redCards: 0,
        imgPath: 'noPath'
    },
]