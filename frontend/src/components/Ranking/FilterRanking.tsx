import React from 'react'
import Button from 'react-bootstrap/esm/Button';
import './FilterRanking.scss';
import { RankingFilters } from './Ranking';

const FilterRanking: React.FC<FilterRankingProps> = ({activeFilter, setActiveFilter}) => {

    function handleFiltrChange(filterName: RankingFilters){
        if(!(filterName === activeFilter)){
            setActiveFilter(filterName)
        }
    } 
  return (
    <div className='filter-box'>
        {filterTypes.map((filterName, index) => (
            <Button size='lg' active={activeFilter === filterName} key={filterName} onClick={() => handleFiltrChange(filterName)} style={{margin: '0.5rem', borderRadius: '2rem'}}>
                {filterName}
            </Button>
        ))}
    </div>
  )
}

export default FilterRanking;

export interface FilterRankingProps {
    activeFilter: RankingFilters,
    setActiveFilter: React.Dispatch<React.SetStateAction<RankingFilters>>,
    userName: string, 
}

const filterTypes: RankingFilters[] = ['general', 'lastDay' , 'groupStage' , 'knockoutStage']
