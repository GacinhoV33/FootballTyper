import React, { useContext, useEffect, useState } from 'react'
import './KnockoutStage.scss';
import { CircleFlag } from 'react-circle-flags';
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import Button from 'react-bootstrap/Button';
import { Match, UserContext } from '../../App';
import trofeum from './trofeum.png';
import CountryDict from '../YourBets/MyBets/CountryDict';
import BetModal from '../Matchrow/BetModal';
import { Bet } from '../YourBets/MyBets/MyBets';
import styled, { keyframes } from 'styled-components';
import Alert from 'react-bootstrap/Alert';
import { BsCheck } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { BiCheckDouble } from 'react-icons/bi';
import { isMobile } from 'react-device-detect';
import Matchrow from '../Matchrow/Matchrow';
// export interface IRenderSeedPropsExt extends IRenderSeedProps{
//   hookToUpdate: 
// }

const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }: IRenderSeedProps) => {

  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not
  const wonTeam = seed.groupMatch.homeTeamScore !== -1 ? (seed.groupMatch.homeTeamScore > seed.groupMatch.awayTeamScore ? 1 : 0) : null;
  const styleWonTeam = { color: 'gold', fontWeight: '500', fontSize: '2vh' };
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [betChange, setBetChange] = useState<number>(0);
  const [modalValue, setModalValue] = useState<{ homeScore: string, awayScore: string }>({ homeScore: '', awayScore: '' });

  const isBetAllowed = (!seed.isMatchPlayed) && seed.teams[0].name !== '' && seed.teams[1].name !== ''; //TODO set time
  const [userBets, setUserBets] = useState<Bet[] | null>(seed.userBets);
  const isBetNew = userBets !== null && userBets.length > 0 ? userBets.filter((bet: Bet) => bet.matchId === seed.groupMatch.id) : null;
  const [isBetExisting, setIsBetExisting] = useState<boolean>(isBetNew !== null && isBetNew.length !== 0 && isBetNew[0].homeTeamScoreBet !== undefined);
  const userCtx = useContext(UserContext);
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
        <div style={{ width: '75%' }}>
          <SeedTeam style={wonTeam === 1 ? styleWonTeam : undefined}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', justifyContent: 'space-between', width: '100%' }}>
              <div>
                <CircleFlag countryCode={CountryDict.get(seed.teams[0].name as string) as string} height='30' style={{ marginRight: '0.5vw' }} />
                {seed.teams[0]?.name || '-'}
                <span className={wonTeam === 1 ? 'won-team-score team-text' : 'team-text'}>{seed.groupMatch.homeTeamScore !== -1 ? seed.groupMatch.homeTeamScore : null}</span>
              </div>
              <div style={{ color: 'white', fontWeight: '300', fontSize: '1.1rem' }}>
                {betChange !== 0 ? modalValue.homeScore : (isBetExisting ? `(${isBetNew !== null ? isBetNew[0].homeTeamScoreBet : null})` : null)}
              </div>
            </div>

          </SeedTeam>
          <SeedTeam style={wonTeam === 0 ? styleWonTeam : undefined}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', justifyContent: 'space-between', width: '100%' }}>
              <div >
                <CircleFlag countryCode={CountryDict.get(seed.teams[1].name as string) as string} height='30' style={{ marginRight: '0.5vw' }} />
                {seed.teams[1]?.name || '-'}
                <span className={wonTeam === 0 ? 'won-team-score team-text' : 'team-text'}>{seed.groupMatch.awayTeamScore !== -1 ? seed.groupMatch.awayTeamScore : null}</span>
              </div>
              <div style={{ color: 'white', fontWeight: '300', fontSize: '1.1rem' }}>

                {betChange !== 0 ? modalValue.awayScore : (isBetExisting && isBetNew !== null ? `(${isBetNew[0].awayTeamScoreBet})` : null)}
              </div>

            </div>
          </SeedTeam>
        </div>
        <div style={{ paddingRight: '1vw' }}>
          {
            !seed.groupMatch.isMatchValid ? <Button
              variant={isBetExisting || betChange !== 0 ? 'warning' : 'primary'}
              onClick={() => handleBet()}
              disabled={!isBetAllowed}
            >
              {isBetExisting || betChange !== 0 ? 'Edit' : 'Bet'}
            </Button>
              : (isBetExisting && isBetNew ?
                (isBetNew[0].betResult === 1 ? <BsCheck size={40} style={{ color: 'lightgreen' }} /> : (
                  isBetNew[0].betResult === 2 ? <BiCheckDouble size={40} style={{ color: 'darkgreen' }} />
                    : <ImCross size={20} style={{ color: 'red', marginRight: '0.5rem' }} />)
                ) : null)
          }
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
          userBets={userBets}
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
export interface MobilePhoneKnockoutProps {
  rounds: IRoundProps[] | undefined,
}
const MobilePhoneKnockout: React.FC<MobilePhoneKnockoutProps> = ({ rounds }) => {
  // const [oneEightMatches, setOneEightMatches] = useState<Match[]>([]);
  // const [quaterFinalMatches, setQuaterFinalMatches] = useState<Match[]>([]);
  // const [semiFinalMatches, setSemiFinalMatches] = useState<Match[]>([]);
  // const [finalMatch, setFinalMatch] = useState<Match[]>([]);
  // const [thirdPlaceMatch, setThirdPlaceMatch] = useState<Match[]>();
  const userCtx = useContext(UserContext);
  const API_URL = process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === 'true' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;
  const [chosenCountries, setChosenCountries] = useState<{homeCountry: string, awayCountry: string}>({homeCountry: '', awayCountry: 'string'})
  const [betChange, setBetchange] = useState<number>(0);
  const [userBets, setUserBets] = useState<Bet[]>([]);
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
  }, [betChange]);


  // Todo check data between displaying -> especially whether Team is updated -> Make it in Matchrow
  return (
    <div>
      {rounds ? rounds[0].seeds.map(({groupMatch}, index) => (
        <div className='phone-knockout-body' key={index}>
            <Matchrow groupMatch={groupMatch} chosenCountries={chosenCountries} setChosenCountries={setChosenCountries} setBetChange={setBetchange} userBets={userBets}/>
        </div>
      )) : null}
    </div>
  )
}


const KnockoutStage: React.FC<KnockoutStageProps> = ({ allMatches }) => {
  const [userBets, setUserBets] = useState<Bet[] | null>(null);
  const userCtx = useContext(UserContext);
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
        },
        {
          title: 'Quarter Final',
          seeds: seedsQuarter,
        },
        {
          title: 'Semi Final',
          seeds: seedsSemi,
        },
        {
          title: 'Final',
          seeds: seedsFinal,
        },
      ]
      return rounds;
    }
  }

  const rounds = createData();
  return (
    <>
      {isMobile ?
        (<div className='knockout-main'>
          {
            rounds !== undefined && rounds !== null
              ? <Bracket
                rounds={rounds}
                renderSeedComponent={CustomSeed}
                roundClassName={'round-styles'}

              />
              : null
          }
        </div>) :
        <MobilePhoneKnockout rounds={rounds} />
      }
    </>
  )
}

export default KnockoutStage;

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