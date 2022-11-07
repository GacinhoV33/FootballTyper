import React from 'react'
import Button from 'react-bootstrap/esm/Button';
import './FilterRanking.scss';
import { RankingFilters } from './Ranking';

const FilterRanking: React.FC<FilterRankingProps> = ({ activeFilter, setActiveFilter }) => {

    function handleFiltrChange(filterName: RankingFilters) {
        if (!(filterName === activeFilter)) {
            setActiveFilter(filterName)
        }
    }
    return (
        <div className='filter-box'>
            {filterTypes.map((filterName, index) => (
                <Button size='lg' active={activeFilter === filterName} key={filterName} onClick={() => handleFiltrChange(filterName)} style={{width: '8vw', margin: '0.5rem', borderRadius: '2rem' }}>
                    {filterNames[index]}
                </Button>
            ))}
        </div>
    )
}

export default FilterRanking;

export interface FilterRankingProps {
    activeFilter: RankingFilters,
    setActiveFilter: React.Dispatch<React.SetStateAction<RankingFilters>>,
}

const filterTypes: RankingFilters[] = ['general', 'lastDay', 'groupStage', 'knockoutStage']
const filterNames: string[] = ['General', 'Last Day', 'Groupstage', 'Knockout']