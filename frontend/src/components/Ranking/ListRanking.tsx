import React from 'react';
import './ListRanking.scss';    
import Avatar from '@mui/material/Avatar';
import { User } from '../../App';
import { BsCheck } from "react-icons/bs";
import { BiCheckDouble } from "react-icons/bi"
import { ImCross } from 'react-icons/im';
import { Bet } from '../YourBets/MyBets/MyBets';
import Table  from 'react-bootstrap/Table';


export interface ListRankingProps {
    leauge: string,
    allUsers: User[],
}

export type UserLastBets = {
    user: User,
    lastBets: Bet[],  //TODO? 
}

const ListRanking: React.FC<ListRankingProps> = ({ leauge, allUsers }) => {


    return (
        <div style={{minWidth: '600px', width: '100%'}}>
            <Table striped>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th> User </th>
                        <th> Points </th>
                        <th>CBS</th>
                        <th>CB</th>
                        <th>WB</th>
                        <th style={{textAlign: 'center'}}>Form</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map(({ totalPoints, name, totalCorrectWinnerBet, totalWrongBet, totalExactScoreBet }, index) => (
                        <tr style={{alignItems: 'center'}} key={index}>
                            <td> <h4>{index+1}.</h4> </td>
                            <td> <Avatar style={{height: '30px', width: '30px', float: 'left', marginRight: '1rem'}}/>{name}</td>
                            <td> {totalPoints}</td>
                            <td> {totalExactScoreBet}</td>
                            <td> {totalCorrectWinnerBet}</td>
                            <td> {totalWrongBet}</td>
                            <td style={{textAlign: 'center'}}>{[1, 2, 3, 4].map((i) => i % 2 === 0 ? <BsCheck style={{color: 'green'}} size='40'/> : <BiCheckDouble style={{color:'lightgreen'}} size='40'/>)}
                         <ImCross style={{color: 'red'}} size='20'/></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* <div style={{border: '2px solid #000', height: '5vh', display: 'flex', flexDirection: 'row', justifyContent:'flex-start', marginBottom: '100px'}}>
                <div  style={{flexGrow: '3', marginRight: '3.6rem'}}></div>
                <div style={{flexGrow: '1'}}> <h6>Points</h6> </div>
                <div style={{flexGrow: '1', textAlign: 'left'}}> <h6>CBS</h6>  </div>
                <div style={{flexGrow: '1'}}> CB </div>
                <div style={{flexGrow: '1'}}> WB </div>
                <div style={{flexGrow: '2'}}> Last 5 Bets </div>
            </div> */}
            {/* {sortedUsers.map(({ totalPoints, name, totalCorrectWinnerBet, totalWrongBet, totalExactScoreBet }, index) => (
                <div style={{ borderBottom: '1px solid #445544', height: '5.5vh', width: '1000px', marginBottom: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div style={{ marginRight: '1.25rem', flexGrow: '1' }}><h4>{index + 1}.</h4></div>
                    {/* {index === 0 ? <FaCrown style={{color: 'orange', flexGrow: '1', marginRight: '0.17rem'}} size='25'/> : <div style={{flexGrow: '3'}}></div>} */}
                        {/* <Avatar />
                    <div style={{ marginLeft: '1.25rem', paddingTop: '4px', flexGrow: '8' }}><h5>{name}</h5></div>
                    <div style={{ marginLeft: '1.25rem', paddingTop: '4px', flexGrow: '5' }}><h5>{totalPoints}</h5></div>
                    <div style={{ marginLeft: '1.25rem', paddingTop: '4px', flexGrow: '5' }}><h5>{totalCorrectWinnerBet}</h5></div>
                    <div style={{ marginLeft: '1.25rem', paddingTop: '4px', flexGrow: '5' }}><h5>{totalExactScoreBet}</h5></div>
                    <div style={{ marginLeft: '1.25rem', paddingTop: '4px',flexGrow: '5' }}><h5>{totalWrongBet}</h5></div>
                    <div style={{ marginLeft: '1.25rem', paddingTop: '4px', flexGrow: '8'}}>
                         {[1, 2, 3, 4].map((i) => i % 2 === 0 ? <BsCheck style={{color: 'green'}} size='40'/> : <BiCheckDouble style={{color:'lightgreen'}} size='40'/>)}
                         <ImCross style={{color: 'red'}} size='20'/>
                    </div>
                </div>
            ))} */}
            {/* {sortedUsers.map(({ totalPoints, name, totalCorrectWinnerBet, totalWrongBet, totalExactScoreBet }, index) => (
                <div style={{ borderBottom: '1px solid #445544', height: '5.5vh', width: '1000px', marginBottom: '10px', display: 'grid', gridTemplateColumns: '14 1fr', gridTemplateRows: '1 5.5vh', textAlign: 'center'}}>
                    <div style={{ marginRight: '1.25rem', gridColumn: '1', display: 'contents'}}><h4>{index + 1}.</h4></div>
                    <div style={{ gridColumn: '2/4' }}><Avatar style={{height: '30px', width: '30px'}}/></div>
                    <div style={{ gridColumn: '4/8' }}><h5 style={{textAlign: 'start'}}>{name}</h5></div>
                    <div style={{ gridColumn: '8' }}><h5>{totalPoints}</h5></div>
                    <div style={{ gridColumn: '9' }}><h5>{totalCorrectWinnerBet}</h5></div>
                    <div style={{ gridColumn: '10' }}><h5>{totalExactScoreBet}</h5></div>
                    <div style={{ gridColumn: '11' }}><h5>{totalWrongBet}</h5></div>
                    <div style={{ gridColumn: '12/14'}}>
                         {[1, 2, 3, 4].map((i) => i % 2 === 0 ? <BsCheck style={{color: 'green'}} size='40'/> : <BiCheckDouble style={{color:'lightgreen'}} size='40'/>)}
                         <ImCross style={{color: 'red'}} size='20'/>
                    </div>
                </div>
            ))} */}
        </div>

    );
}

export default ListRanking;