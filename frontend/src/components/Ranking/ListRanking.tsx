import React, { useContext } from 'react';
import './ListRanking.scss';
import Avatar from '@mui/material/Avatar';
import { User } from '../../App';
import { BsCheck } from "react-icons/bs";
import { BiCheckDouble } from "react-icons/bi"
import { ImCross } from 'react-icons/im';
import Table from 'react-bootstrap/Table';
import { UserContext } from '../../App';
import { FaCrown } from 'react-icons/fa';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';
import { MdOutlineHorizontalRule } from 'react-icons/md';

import avatar1 from './avatar1.jpg';
import avatar2 from './avatar2.png';

export interface ListRankingProps {
    league: string,
    allUsers: User[],
}

const ListRanking: React.FC<ListRankingProps> = ({ allUsers, league }) => {
    const yesterdayStatus = true;
    const userCtx = useContext(UserContext);
    const blobLink = `https://footballtypersa.blob.core.windows.net/imgs/`;
    return (
        <div className='ranking-table'>
            <Table striped>
                <thead className='table-main'>
                    <tr>
                        <th style={{ width: '30px' }}>Rank</th>
                        <td style={{ width: '30px' }}></td>
                        <th> User </th>
                        <th> Points </th>
                        <OverlayTrigger
                            overlay={
                                <Tooltip id={'correctscores'}>
                                    Correct Bet Score
                                </Tooltip>
                            }
                            placement='top-start'
                        >
                            <th>
                                CBS
                            </th>
                        </OverlayTrigger>
                        <OverlayTrigger
                            overlay={
                                <Tooltip id={'correctresults'}>
                                    Correct Bet
                                </Tooltip>
                            }
                            placement='top-start'
                        >
                            <th>
                                CB
                            </th>
                        </OverlayTrigger>
                        <OverlayTrigger
                            overlay={
                                <Tooltip id={'wrongbets'}>
                                    Wrong Bets
                                </Tooltip>
                            }
                            placement='top-start'
                        >
                            <th>
                                WB
                            </th>
                        </OverlayTrigger>
                        <OverlayTrigger
                            overlay={
                                <Tooltip id={'last5matches'}>
                                    Last 5 user bets
                                </Tooltip>
                            }
                            placement='top-start'
                        >
                            <th style={{ textAlign: 'center' }}>
                                Form
                            </th>
                        </OverlayTrigger>
                    </tr>
                </thead>
                <tbody className='ranking-row-content'>
                    {allUsers.map(({ totalPoints, username, totalCorrectWinnerBets, totalWrongBets, totalExactScoreBets, lastFiveBets, rankStatusDict, imgLink }, index) =>{ 
                        type ObjectKey = keyof typeof rankStatusDict;
                        const leagueName = league as ObjectKey;
                        const userRankingStatus = rankStatusDict ? rankStatusDict[leagueName] : 0;
                        // const avatar = imgLink ? 
                            
                        return(
                        <tr key={index} style={userCtx.userLocalData?.username === username ? { boxShadow: '0 10px 10px lightblue', alignItems: 'center' } : { alignItems: 'center' }}>
                            <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly',  margin: '0 0 !important' , padding: '0px 0px !important'}}>
                                {
                                userRankingStatus > 0 ? <VscTriangleUp  style={{ color: 'green'}} size={10}/> : 
                                (userRankingStatus < 0 ? <VscTriangleDown size={10} style={{ color: 'red',  margin: '0 0 !important' , padding: '0px 0px !important'}}/> 
                                : <span style={{ marginBottom: '0px !important' , padding: '0px 0px !important' }}>-</span>)
                                // : <MdOutlineHorizontalRule size={20}/>)

                                }
                                <p style={{fontSize: '2vh', fontWeight: '450',  margin: '0 0 !important' , padding: '0 0 !important'}}>{index + 1}</p>
                                {/* <h4>{index + 1}</h4> */}
                            </td>
                            <td> {index === 0 ? <FaCrown style={{ color: 'orange', alignItems: 'center'}} size='25' /> : null}</td>
                            <td>
                                <OverlayTrigger
                                    overlay={
                                        <Tooltip style={{opacity: '1'}}>
                                            <img src={avatar2} style={{ height: '15vh', width: '15vh', borderRadius: '7.5vh' }} alt={index.toString()} />
                                            <div >{username}</div>
                                        </Tooltip>
                                    }
                                    placement='top-start'
                                >
                                    <Avatar style={{ height: '30px', width: '30px', float: 'left', marginRight: '0.9vw' }} src={imgLink ? blobLink + imgLink : undefined} alt={username} />
                                </OverlayTrigger>
                                {username}
                            </td>
                            <td> {totalPoints}</td>
                            <td> {totalExactScoreBets}</td>
                            <td> {totalCorrectWinnerBets}</td>
                            <td> {totalWrongBets}</td>
                            <td style={{ textAlign: 'center' }}>
                                {
                                    lastFiveBets !== "" ?
                                        lastFiveBets?.split(',').map(Number).map((userBet, index) => {
                                            switch (userBet) {
                                                case 0:
                                                    return <ImCross style={{ color: 'red', margin: '0 0.5vw' }} size='20' key={index} />
                                                case 1:
                                                    return <BsCheck style={{ color: 'lightgreen' }} size='40' key={index} />
                                                case 2:
                                                    return <BiCheckDouble style={{ color: 'green' }} size='40' key={index} />
                                            }
                                        })
                                        : null
                                }
                            </td>
                        </tr>
                    )})
                    }
                </tbody>
            </Table>
        </div>

    );
}

export default ListRanking;