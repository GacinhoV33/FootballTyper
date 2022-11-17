
import React, { useContext, useEffect, useState } from 'react'
import MatchBet from './MatchBet/MatchBet';
import './KnockoutStage.scss';
import { CircleFlag } from 'react-circle-flags';
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import { text } from 'stream/consumers';
import Button from 'react-bootstrap/Button';
import { Match, UserContext } from '../../App';
import trofeum from './trofeum.png';
import CountryDict from '../YourBets/MyBets/CountryDict';
import BetModal from '../Matchrow/BetModal';
import { Bet } from '../YourBets/MyBets/MyBets';
import styled, { keyframes } from 'styled-components';
import Alert from 'react-bootstrap/Alert';

export interface CustomIRenderSeedProps extends IRenderSeedProps {
  setBetChange: React.Dispatch<React.SetStateAction<number>>,
}

const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }: IRenderSeedProps) => {
  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not
  // const wonTeam = seed.isMatchPlayed as number;
  const wonTeam = seed.groupMatch.homeTeamScore > seed.groupMatch.awayTeamScore ? 1 : 0;
  // seed.groupMatch;
  const styleWonTeam = { color: 'gold', fontWeight: '500', fontSize: '2vh' };
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [betChange, setBetChange] = useState<number>(0);
  const [modalValue, setModalValue] = useState<{ homeScore: string, awayScore: string }>({ homeScore: '', awayScore: '' });

  const isBetAllowed = (!seed.isMatchPlayed) && seed.teams[0].name !== '' && seed.teams[1].name !== ''; //TODO set time

  const isBetNew = seed.userBets !== null && seed.userBets.length > 0 ? seed.userBets.filter((bet: Bet) => bet.matchId === seed.groupMatch.id) : null;
  const isBetExisting = isBetNew !== null && isBetNew.length !== 0 && isBetNew[0].homeTeamScoreBet !== undefined;
  function handleClose() {
    setShowModal(false);
  }
  function handleBet() {
    setShowModal(true);
  }
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 14, width: '20vw' }}>
      {seed.groupMatch.matchNumber === 64 ? <img src={trofeum} style={{ zIndex: '0', width: '250px', height: '350px', position: 'absolute', top: '5vh' }} />
        : null
      }
      <SeedItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <SeedTeam style={wonTeam == 0 ? styleWonTeam : undefined}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
              <CircleFlag countryCode={CountryDict.get(seed.teams[0].name as string) as string} height='30' />
              {seed.teams[0]?.name || '-'}
            </div>

          </SeedTeam>
          <SeedTeam style={wonTeam == 1 ? styleWonTeam : undefined}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
              <CircleFlag countryCode={CountryDict.get(seed.teams[1].name as string) as string} height='30' />
              {seed.teams[1]?.name || '-'}
            </div>
          </SeedTeam>
        </div>
        <div style={{ paddingRight: '1vw' }}>
          <Button
            variant={isBetExisting ? 'warning' : 'primary'}
            onClick={() => handleBet()}
            disabled={!isBetAllowed}
          >
            {isBetExisting ? 'Edit' : 'Bet'}
          </Button>
        </div>
      </SeedItem>
      {
        showModal ? <BetModal
          showBet={showModal}
          handleClose={handleClose}
          modalValue={modalValue}
          setModalValue={setModalValue}
          groupMatch={seed.groupMatch}
          setAlert={setShowAlert}
          setBetChange={setBetChange}
          userBets={seed.userBets}
        />
          : null
      }

      {showAlert ? ((Number(modalValue.homeScore) < 100 && Number(modalValue.homeScore) >= 0 && Number(modalValue.awayScore) >= 0 && Number(modalValue.awayScore) < 100) ?
        <AlertAnimation >
          <Alert variant='success'>
            <Alert.Heading>Success!</Alert.Heading>
            Match bet submitted correctly
          </Alert>
        </AlertAnimation>
        :
        <AlertAnimation >
          <Alert variant='danger'>
            <Alert.Heading>Error!</Alert.Heading>
            Wrong input
          </Alert>
        </AlertAnimation>

      ) : null}


    </Seed>
  );
};

export interface KnockoutStageProps {
  allMatches: Match[] | null,

}

const KnockoutStage: React.FC<KnockoutStageProps> = ({ allMatches }) => {
  const [userBets, setUserBets] = useState<Bet[] | null>(null);
  const userCtx = useContext(UserContext);
  const [betChange2, setBetChange2] = useState<number>(0);
  const API_URL = process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === 'true' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;

  useEffect(() => {
    const getUserBets = async () => {
      const userName = userCtx.userLocalData
        ? userCtx.userLocalData.username
        : "";
      const allUserBets = await (
        await fetch(API_URL + `api/Bets/User/${userName}`)
      ).json();
      setUserBets(allUserBets);
    };
    getUserBets();
  }, []);
  function createData() {
    const oneEightMatches = allMatches?.filter((match) => match.stage === 1);
    const seedsOneEight = oneEightMatches !== null && oneEightMatches !== undefined ? oneEightMatches.map((match) => {
      return (
        {
          id: match.id,
          date: match.date,
          teams: [{ name: match.homeTeam ? match.homeTeam.name : '' }, { name: match.awayTeam ? match.awayTeam.name : '' }],
          isMatchPlayed: match.isMatchValid,
          groupMatch: match,
          userBets: userBets,
        }
      )
    }
    ) : null;

    const quarterMatches = allMatches?.filter((match) => match.stage === 2);
    const seedsQuarter = quarterMatches !== null && quarterMatches !== undefined ? quarterMatches.map((match) => {
      return (
        {
          id: match.id,
          date: match.date,
          teams: [{ name: match.homeTeam ? match.homeTeam.name : '' }, { name: match.awayTeam ? match.awayTeam.name : '' }],
          isMatchPlayed: match.isMatchValid,
          groupMatch: match,
          userBets: userBets,
        }
      )
    }
    ) : null;

    const semiMatches = allMatches?.filter((match) => match.stage === 3);
    const seedsSemi = semiMatches !== null && semiMatches !== undefined ? semiMatches.map((match) => {
      return (
        {
          id: match.id,
          date: match.date,
          teams: [{ name: match.homeTeam ? match.homeTeam.name : '' }, { name: match.awayTeam ? match.awayTeam.name : '' }],
          isMatchPlayed: match.isMatchValid,
          groupMatch: match,
          userBets: userBets,
        }
      )
    }
    ) : null;

    const final = allMatches?.filter((match) => match.matchNumber === 64);
    const seedsFinal = final !== null && final !== undefined ? final.map((match) => {
      return (
        {
          id: match.id,
          date: match.date,
          teams: [{ name: match.homeTeam ? match.homeTeam.name : '' }, { name: match.awayTeam ? match.awayTeam.name : '' }],
          isMatchPlayed: match.isMatchValid,
          groupMatch: match,
          userBets: userBets,
        }
      )
    }
    ) : null;

    if (seedsOneEight && seedsQuarter && seedsSemi && seedsFinal) {
      const rounds: IRoundProps[] = [
        {
          title: '1/8',
          seeds: seedsOneEight,
          setBetChange: setBetChange2
        },
        {
          title: 'Quarter Final',
          seeds: seedsQuarter,
          setBetChange: setBetChange2
        },
        {
          title: 'Semi Final',
          seeds: seedsSemi,
          setBetChange: setBetChange2
        },
        {
          title: 'Final',
          seeds: seedsFinal,
          setBetChange: setBetChange2
        },
      ]
      return rounds;
    }
  }

  const rounds = createData();
  return (
    <div className='knockout-main'>
      {
        rounds !== undefined && rounds !== null
          ? <Bracket
            rounds={rounds}
            renderSeedComponent={CustomSeed}
            roundClassName={'round-styles'}

          />
          : null
      }
    </div>
  )
}

export default KnockoutStage;


const roundsFall: IRoundProps[] = [
  {
    title: '1/8',
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team B' }],
        isMatchPlayed: false,
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
        isMatchPlayed: true,
      },
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team B' }],
        isMatchPlayed: true,
      },
      {
        id: 4,
        date: new Date().toDateString(),
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
        isMatchPlayed: true,
      },
      {
        id: 5,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team B' }],
        isMatchPlayed: true,
      },
      {
        id: 6,
        date: new Date().toDateString(),
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
        isMatchPlayed: true,
      },
      {
        id: 7,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team B' }],
        isMatchPlayed: true,
      },
      {
        id: 8,
        date: new Date().toDateString(),
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
        isMatchPlayed: true,
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
        isMatchPlayed: true,

      },
      {
        id: 10,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
        isMatchPlayed: true,

      },
      {
        id: 11,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
        isMatchPlayed: true,

      },
      {
        id: 12,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
        isMatchPlayed: true,

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
        isMatchPlayed: true,

      },
      {
        id: 14,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
        isMatchPlayed: true,

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
        isMatchPlayed: true,
      }
    ],
  },
];

const alertAnimation = keyframes`
from{
    opacity: 1;
    transform: translateY(-10px);
}
to{
    opacity: 0.1;
    transform: translateY(0px);
}
`
const AlertAnimation = styled.div`
animation-name: ${alertAnimation};
animation-duration: 5s;
width: 15%;
height: 8vh;
position: fixed;
bottom: 3rem;
right: 2rem;
`