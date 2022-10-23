import React, { useContext } from 'react';
import './ListRanking.scss';    
import Avatar from '@mui/material/Avatar';
import { User } from '../../App';
import { BsCheck } from "react-icons/bs";
import { BiCheckDouble } from "react-icons/bi"
import { ImCross } from 'react-icons/im';
import { Bet } from '../YourBets/MyBets/MyBets';
import Table  from 'react-bootstrap/Table';
import { UserContext } from '../../App';
import {FaCrown} from 'react-icons/fa';

export interface ListRankingProps {
    leauge: string,
    allUsers: User[],
}

export type UserLastBets = {
    user: User,
    lastBets: Bet[],  //TODO? 
}

const ListRanking: React.FC<ListRankingProps> = ({ leauge, allUsers }) => {

    const userName = useContext(UserContext);
    return (
        <div style={{minWidth: '600px', width: '100%'}}>
            <Table striped>
                <thead>
                    <tr>
                        <th style={{width: '30px'}}>Rank</th>
                        <td style={{width: '30px'}}></td>
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
                        <tr  key={index} style={userName === name ? {boxShadow: '0 5px 10px lightblue', alignItems: 'center', border:'1px solid lightgreen'} : {alignItems: 'center'}}>
                            <td> <h4>{index+1}.</h4> </td>
                            <td> {index === 0 ? <FaCrown style={{color: 'orange'}} size='30'/> : null}</td>
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
        </div>

    );
}

export default ListRanking;