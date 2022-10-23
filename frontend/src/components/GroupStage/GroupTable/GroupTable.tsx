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
  chosenCountries: {homeCountry: string, awayCountry: string},
  setChosenCountries: React.Dispatch<React.SetStateAction<{
    homeCountry: string;
    awayCountry: string;
}>>,
}

const GroupTable = ({groupTableData, groupTableName, chosenCountries, setChosenCountries} : GropuTableProps) => {
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
            <tr key={index} onClick={() => setChosenCountries({homeCountry: name, awayCountry: chosenCountries.awayCountry})}>
              <td><h5>{index + 1}.</h5></td>
              <td >
                  <CountryIcon size='md' countryName={name} />             
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
