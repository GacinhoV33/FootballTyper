import React from 'react';
import './GroupTable.scss';
import CountryIcon  from "../../CountrIcon/CountryIcon";
import { CountryDict } from '../../../helpers/structures';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
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

    <div className='body-table'>
      <Table striped>
        <thead >
              <th></th>
              <th>Country</th>
              <th>Win</th>
              <th>Loss</th>
              <th>Draw</th>
              <th>Points</th>
          </thead>
        <tbody>
          {dummyData.map(({countryName, points, win, draw, loss}, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>
                  <CountryIcon size="lg" countryName={countryName} />             
                  {countryName}
              </td>
              <td>{win}</td>
              <td>{loss}</td>
              <td>{draw}</td>
              <td>{points}</td>
            </tr>
        ))}
        </tbody>
        
      </Table>
    </div>
  )
}

export default GroupTable;

// TODO : fix Icon 
// better styling
const dummyData: GroupTableItem[]  = [{
  countryName: 'Poland',
  points: 3,
  win: 1, 
  draw: 0, 
  loss: 1, 
},
{
  countryName: 'Poland',
  points: 3,
  win: 1, 
  draw: 0, 
  loss: 1, 
},
{
  countryName: 'Poland',
  points: 3,
  win: 1, 
  draw: 0, 
  loss: 1, 
},
{
  countryName: 'Poland',
  points: 3,
  win: 1, 
  draw: 0, 
  loss: 1, 
}
]
