import React from 'react';
import './GroupTable.scss';
import CountryIcon  from "../../CountrIcon/CountryIcon";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
export interface GroupTableItem {
    name: string,
    points: number,
    won: number,
    drawn: number,
    lost: number,
    group: string,
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
          <tr>
              <th>.</th>
              <th>Country</th>
              <th>Win</th>
              <th>Loss</th>
              <th>Draw</th>
              <th>Points</th>
            </tr>
          </thead>
        <tbody>
          {groupTableData ? groupTableData.map(({name, points, won, drawn, lost}, index) => (
            <tr key={index}>
              <td><h5>{index + 1}.</h5></td>
              <td>
                  <CountryIcon size="lg" countryName={name} />             
                  {name}
              </td>
              <td>{won}</td>
              <td>{lost}</td>
              <td>{drawn}</td>
              <td><h5>{points}</h5></td>
            </tr>
        )) : null}
        </tbody>
        
      </Table>
    </div>
  )
}

export default GroupTable;

// TODO : fix Icon 
// better styling
// const dummyData: GroupTableItem[]  = [{
//   countryName: 'Poland',
//   points: 3,
//   win: 1, 
//   draw: 0, 
//   loss: 1, 
//   group: 'A'
// },
// {
//   countryName: 'Poland',
//   points: 3,
//   win: 1, 
//   draw: 0, 
//   loss: 1, 
//   group: 'A'
// },
// {
//   countryName: 'Poland',
//   points: 3,
//   win: 1, 
//   draw: 0, 
//   loss: 1, 
//   group: 'A'

// },
// {
//   countryName: 'Poland',
//   points: 3,
//   win: 1, 
//   draw: 0, 
//   loss: 1, 
//   group: 'A'

// }
// ]
