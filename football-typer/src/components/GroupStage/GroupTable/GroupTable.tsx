import React from 'react';
import './GroupTable.scss';
import CountryIcon  from "../../CountrIcon/CountryIcon";
import { CountryDict } from '../../../helpers/structures';


export interface GroupTableItem {
    countryName: string,
    points: number,
    win: number,
    draw: number,
    loss: number,
}

interface GropuTableProps {
  groupTableData: GroupTableItem[],
}

const GroupTable = ({groupTableData} : GropuTableProps) => {
  return (
    <div className='body'>
      <table className='group-table'>
        <tbody>
          <tr> 
            <th></th>
            <th>Country</th>
            <th>Win</th>
            <th>Loss</th>
            <th>Draw</th>
            <th>Points</th>
          </tr>
          {groupTableData.map(({countryName, points, win, draw, loss}, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td className='icon-name-container'>
                <div style={{flexGrow: 1}}>
                  <CountryIcon size="lg" countryName={countryName} />
                </div>
                <div style={{flexGrow: 2}}>
                  {countryName}
                </div>
              </td>
              <td>{win}</td>
              <td>{loss}</td>
              <td>{draw}</td>
              <td>{points}</td>
            </tr>
        ))}
        </tbody>
        
      </table>
    </div>
  )
}

export default GroupTable;

// TODO : fix Icon 
// better styling