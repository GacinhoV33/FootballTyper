import React from 'react';
import './LeftBar.scss';
import Table from 'react-bootstrap/Table';
import { BiFootball } from 'react-icons/bi';
import { TbRectangleVertical } from 'react-icons/tb';

export interface LeftBarProps {
    chosenCountries: { homeCountry: string, awayCountry: string },

}

const LeftBar: React.FC<LeftBarProps> = ({ chosenCountries }) => {
    return (
        <div className='left-bar'>
            <h2 style={{ textAlign: 'center' }}>Top Scores</h2>
            <Table>
                <tbody>
                    {dummyPlayerData.map(({ playerName, goals, assists, team, yellowCards, redCards, imgPath }, index) => (

                        <tr style={{textAlign: 'center'}}>
                            <td style={{fontWeight: '500'}}>{index + 1}</td>
                            <td style={{textAlign: 'left'}}>{playerName}</td>
                            <td><BiFootball size={20} />{goals}</td>
                            <td> <span style={{fontWeight: '500', color: 'chocolate'}}>A</span> {assists} </td>
                            <td> <TbRectangleVertical size={20} style={{ color: '#EDED22' }} fill={'#FEFE22'} /> {yellowCards}</td>
                            <td><TbRectangleVertical size={20} style={{ color: '#ED1111' }} fill={'#FE0000'} /> {redCards} </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
        </div>
    )
}
{/* TODO  - goals as a icon of ball, assists (find good icon), team as a rectangle flag, yellow cards as a yellow card icon same with red, img Path if dataBase with img of players on mundial*/ }

export default LeftBar;


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
        goals: 5,
        assists: 1,
        team: 'Portugal',
        yellowCards: 2,
        redCards: 0,
        imgPath: 'noPath'
    },
    {
        playerName: 'Leo Messi',
        goals: 2,
        assists: 3,
        team: 'Argentina',
        yellowCards: 0,
        redCards: 0,
        imgPath: 'noPath'
    },
    {
        playerName: 'Neymar Jr',
        goals: 0,
        assists: 1,
        team: 'Brasil',
        yellowCards: 1,
        redCards: 1,
        imgPath: 'noPath'
    },
    {
        playerName: 'Cristiano Ronaldo',
        goals: 5,
        assists: 1,
        team: 'Portugal',
        yellowCards: 2,
        redCards: 0,
        imgPath: 'noPath'
    },
    {
        playerName: 'Cristiano Ronaldo',
        goals: 5,
        assists: 1,
        team: 'Portugal',
        yellowCards: 2,
        redCards: 0,
        imgPath: 'noPath'
    },
    {
        playerName: 'Cristiano Ronaldo',
        goals: 5,
        assists: 1,
        team: 'Portugal',
        yellowCards: 2,
        redCards: 0,
        imgPath: 'noPath'
    },
]