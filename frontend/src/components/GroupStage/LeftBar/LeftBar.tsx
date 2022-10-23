import React from 'react';
import './LeftBar.scss';
import List from 'react-bootstrap/Listgroup';


export interface LeftBarProps{
    chosenCountries: {homeCountry: string, awayCountry: string},

}

const LeftBar: React.FC<LeftBarProps> = ({chosenCountries}) => {
  return (
    <div className='left-bar'>
        <List>
            {dummyPlayerData.map(({playerName, goals, assists, team, yellowCards, redCards, imgPath}, index) => (
                <List.Item>
                {/* TODO  - goals as a icon of ball, assists (find good icon), team as a rectangle flag, yellow cards as a yellow card icon same with red, img Path if dataBase with img of players on mundial*/}
                <h4>{playerName}</h4>
                {goals} {assists} {team}
                </List.Item>
            ))}
        </List>
    </div>
  )
}

export default LeftBar;


export interface Player{
    playerName: string,
    goals: number,
    assists: number,
    team: string, 
    yellowCards: number,
    redCards: number,
    imgPath?: string,
}

const dummyPlayerData: Player[] = [
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