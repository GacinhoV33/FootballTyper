import React from 'react';
import './GroupTable.scss';
import CountryIcon  from "../../CountrIcon/CountryIcon";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import countriesColors from '../../AnimatedLetters/CountriesColors';
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
  
  
  const highlightedItem = {backgroundColor: '#DEDE00'}
  return (

    <div className='body-table'>
      <Table striped style={{tableLayout: 'fixed'}}>
        <thead >
          <tr>
              <th style={{width: '5%'}}></th>
              <th>Country</th>
              <th>Win</th>
              <th>Loss</th>
              <th>Draw</th>
              <th>Points</th>
            </tr>
          </thead>
        <tbody>
          {groupTableData ? groupTableData.map(({name, points, won, drawn, lost}, index) => {
            // const highlightedItem = {backgroundImage: `linear-gradient(to right, ${JSON.parse(countriesColors.get(name ) as string).mainColor.value},${JSON.parse(countriesColors.get(name)as string).secondColor.value})`}
            return(
            <tr 
            key={index} 
            onClick={() => setChosenCountries({homeCountry: name, awayCountry: chosenCountries.awayCountry})}
            style={name === chosenCountries.homeCountry  || name === chosenCountries.awayCountry ? highlightedItem : undefined}
            >
              <td style={{ height: '4rem'}}><h5>{index + 1}.</h5></td>
              <td style={{display: 'flex', gap: '0.7rem', fontWeight: '500', alignItems: 'center', height: '4.06rem'}}>
                  <CountryIcon size='md' countryName={name} />             
                  {name}
              </td>
              <td><strong>{won}</strong></td>
              <td><strong>{lost}</strong></td>
              <td><strong>{drawn}</strong></td>
              <td><h5>{points}</h5></td>
            </tr>
        )}) : null}
        </tbody>
        
      </Table>
    </div>
  )
}

export default GroupTable;
