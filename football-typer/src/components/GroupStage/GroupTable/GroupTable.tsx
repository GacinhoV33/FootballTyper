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
  groupTableData: GroupTableItem[]  | null,
  groupTableName: string,
}

const GroupTable = ({groupTableData, groupTableName} : GropuTableProps) => {
  return (
    <div className='body'>
      <table className='group-table'>
        <thead>
              <th></th>
              <th>Country</th>
              <th>Win</th>
              <th>Loss</th>
              <th>Draw</th>
              <th>Points</th>
          </thead>
        <tbody>
          {groupTableData? groupTableData.map(({countryName, points, win, draw, loss}, index) => (
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
        ))
        : <h2>Data not loaded</h2>}
        </tbody>
        
      </table>
    </div>
  )
}

export default GroupTable;

// TODO : fix Icon 
// better styling