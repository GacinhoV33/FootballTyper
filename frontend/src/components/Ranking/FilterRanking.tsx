import React from 'react'
import Button from 'react-bootstrap/esm/Button';
import { isMobile } from 'react-device-detect';
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
                <Button active={activeFilter === filterName} key={filterName} onClick={() => handleFiltrChange(filterName)} className='filter-button'>
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
const filterNames: string[] = ['General', 'Last Day', 'Group', 'Knockout']