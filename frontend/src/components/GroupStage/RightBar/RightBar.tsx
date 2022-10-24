import React from 'react';
import './RightBar.scss';
import Table from 'react-bootstrap/Table';
import {BiFootball} from 'react-icons/bi';
import { TbRectangleVertical } from 'react-icons/tb';
import {dummyPlayerData} from '../LeftBar/LeftBar';
import { Player } from '../LeftBar/LeftBar';
export interface RightBarProps{
    chosenCountries: {homeCountry: string, awayCountry: string},
    currentGroup: string,

}


const RightBar: React.FC<RightBarProps> = ({chosenCountries, currentGroup}) => {
  return (
    <div className='right-bar'>
      <div style={{display: 'flex'}}>
        <h2 style={{textAlign: 'center'}}>Top Scores</h2>
        <h3> GROUP {currentGroup} </h3>
      </div>
    
    <Table>
        <tbody>
        {dummyPlayerData.map(({playerName, goals, assists, team, yellowCards, redCards, imgPath} : Player, index: number) => (
            <tr>
            <td>{index+1}</td>
            <td>{playerName}</td>
            <td>{goals} <BiFootball size={20}/></td>
            <td>{assists} A</td>
            <td>{yellowCards} <TbRectangleVertical size={20} style={{color:'#EDED22'}} fill={'#FEFE22'}/> </td>
            <td>{redCards} <TbRectangleVertical size={20} style={{color:'#ED1111'}} fill={'#FE0000'}/> </td>

            {/* <div style={{fontWeight: '700'}}>{index+1} {playerName}</div>
            {goals}<BiFootball size={20}/> {assists} {team} */}
            </tr>
        ))}
    </tbody>

    </Table>
</div>
  )
}

export default RightBar