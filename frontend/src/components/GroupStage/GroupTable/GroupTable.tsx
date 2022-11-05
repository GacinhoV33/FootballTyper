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
    goalsFor: number,
    goalsAgainst: number,
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
  groupTableData?.sort((team2, team1) => team1.points - team2.points ? team1.points - team2.points : (team1.goalsFor - team1.goalsAgainst) - (team2.goalsFor - team2.goalsAgainst) )  
  return (
    <div className='body-table'>
      <Table striped style={{tableLayout: 'fixed'}}>
        <thead >
          <tr>
              <th style={{width: '5%'}}></th>
              <th style={{width: '5%', textAlign: 'right'}}>Country</th>
              <th></th>
              <th>Win</th>
              <th>Loss</th>
              <th>Draw</th>
              <th>Goals</th>
              <th>Points</th>
              <th></th>
            </tr>
          </thead>
        <tbody className='textCenter'>
          {groupTableData ? groupTableData.map(({name, points, won, drawn, lost, goalsAgainst, goalsFor}, index) => {
            const mainColor = JSON.parse(countriesColors.get(name as string) as string).mainColor.value
            const secondColor = JSON.parse(countriesColors.get(name as string) as string).secondColor.value
            const thirdColor = JSON.parse(countriesColors.get(name as string) as string).thirdColor.value
            const gradString = {
              backgroundImage: `linear-gradient(to right, rgba${mainColor.slice(0, -1)}, 0.6), rgba${secondColor.slice(0, -1)}, 0.6)`
          }
            return(
            <tr 
            key={index} 
            onClick={() => setChosenCountries({homeCountry: name, awayCountry: chosenCountries.awayCountry})}
            style={name === chosenCountries.homeCountry  || name === chosenCountries.awayCountry ? gradString : undefined}
            >
              <td style={{ height: '4rem'}}><h5 style={{paddingTop: '0.4rem'}}>{index + 1}.</h5></td>
              <td> <CountryIcon size='lg' countryName={name} />  </td>
              <td style={{fontWeight: '600', alignItems: 'center', height: ''}}>
                  {name}
              </td>
              <td><strong>{won}</strong></td>
              <td><strong>{lost}</strong></td>
              <td><strong>{drawn}</strong></td>
              <td><strong ><span>{goalsFor}</span> : <span>{goalsAgainst}</span></strong></td>
              <td><h5>{points}</h5></td>
            </tr>
        )}) : null}
        </tbody>
        
      </Table>
    </div>
  )
}

export default GroupTable;
