import React from 'react'
import MatchBet from './MatchBet/MatchBet';
import './KnockoutStage.scss';
import { CircleFlag } from 'react-circle-flags';
// import { Bracket, IRoundProps } from 'react-brackets';
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import { text } from 'stream/consumers';
import Button from 'react-bootstrap/Button';

// import React from 'react';
const dummyData = {
  firstCountryName: 'Poland', // Country Type?
  secondCountryName: 'Germany',
  firstCountryScore: '2', // Score type? 
  secondCountryScore: '1',
  firstCountryCode: 'es',
  secondCountryCode: 'pl',
}



const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }: IRenderSeedProps) => {
  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not

  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 14, width: '20vw' }}>
      <SeedItem style={{display: 'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <SeedTeam style={{ color: 'red' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
              <CircleFlag countryCode='pl' height='30' />
              {seed.teams[0]?.name || 'NO TEAM '}
            </div>

          </SeedTeam>
          <SeedTeam>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
              <CircleFlag countryCode='es' height='30' />
              {seed.teams[1]?.name || 'NO TEAM '}
            </div>
            {/* icon of ??? TODO */}
          </SeedTeam>
        </div>
        <div style={{paddingRight: '1vw'}}>
          <Button>
            Bet
          </Button>
        </div>
      </SeedItem>
    </Seed>
  );
};

export interface KnockoutStageProps {

}

// export type RoundTitleProps = {
//   title: string | Element,
//   roundIdx: number,
// }
// const RoundTitle: React.FC<RoundTitleProps> = ({title, roundIdx}) => {
//   return(
//     <h3 style={{color: 'white'}}>
//         {title}
//     </h3>
//   )
// }

const KnockoutStage: React.FC<KnockoutStageProps> = ({ }) => {
  return (
    <div className='knockout-main'>
      <Bracket rounds={rounds} renderSeedComponent={CustomSeed} roundClassName={'round-styles'} />
    </div>
  )
}

export default KnockoutStage;


const rounds: IRoundProps[] = [
  {
    title: '1/8',
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team B' }],
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
      },
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team B' }],
      },
      {
        id: 4,
        date: new Date().toDateString(),
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
      },
      {
        id: 5,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team B' }],
      },
      {
        id: 6,
        date: new Date().toDateString(),
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
      },
      {
        id: 7,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team B' }],
      },
      {
        id: 8,
        date: new Date().toDateString(),
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
      },
    ],
  },
  {
    title: 'Quarter Final',
    seeds: [
      {
        id: 9,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 10,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 11,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 12,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
    ],
  },
  {
    title: 'Semi Final',
    seeds: [
      {
        id: 13,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
      {
        id: 14,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
    ],
  },
  {
    title: 'Final',
    seeds: [
      {
        id: 15,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      }
    ],
  },
];