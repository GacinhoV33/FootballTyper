import React, { HTMLAttributes, useState } from 'react';
import { Route, Router } from 'react-router-dom';
import './Homepage.scss'
// Components 
import CountryDict from '../YourBets/MyBets/CountryDict';
import { Team } from '../../App';
import { CircleFlag } from 'react-circle-flags';
import Iframe from 'react-iframe'
//photos
import amhed_bin_ali_stadium from './images/ahmed_bin_ali_stadium.jpg';
import amhed_bin_ali_stadium2 from './images/ahmed_bin_ali_stadium2.jpg';
import amhed_bin_ali_stadium3 from './images/ahmed_bin_ali_stadium3.jpg';
import amhed_bin_ali_stadium4 from './images/ahmed_bin_ali_stadium4.jpg';

import al_bayt_stadium from './images/al_bayt_stadium.jpg';
import al_bayt_stadium2 from './images/al_bayt_stadium2.jpg'
import al_bayt_stadium3 from './images/al_bayt_stadium3.jpg'
import al_bayt_stadium4 from './images/al_bayt_stadium4.jpg'
import al_bayt_stadium5 from './images/al_bayt_stadium5.jpg'

import al_thumama_stadium from './images/al_thumama_stadium.jpg';
import al_thumama_stadium2 from './images/al_thumama_stadium2.jpg';
import al_thumama_stadium3 from './images/al_thumama_stadium3.jpg';
import al_thumama_stadium4 from './images/al_thumama_stadium4.jpg';
import al_thumama_stadium5 from './images/al_thumama_stadium5.jpg';

import al_wakrah_stadium from './images/al_wakrah_stadium.jpg';
import al_wakrah_stadium2 from './images/al_wakrah_stadium2.jpg';
import al_wakrah_stadium3 from './images/al_wakrah_stadium3.jpg';
import al_wakrah_stadium4 from './images/al_wakrah_stadium4.jpg';
import al_wakrah_stadium5 from './images/al_wakrah_stadium5.jpg';

import education_city_stadium from './images/education_city_stadium.jpg';
import education_city_stadium2 from './images/education_city_stadium2.jpg';
import education_city_stadium3 from './images/education_city_stadium3.jpg';
import education_city_stadium4 from './images/education_city_stadium4.jpg';
import education_city_stadium5 from './images/education_city_stadium5.jpg';

import khalifa_stadium from './images/khalifa_stadium.jpg';
import khalifa_stadium2 from './images/khalifa_stadium2.jpg';
import khalifa_stadium3 from './images/khalifa_stadium3.jpg';
import khalifa_stadium4 from './images/khalifa_stadium4.jpg';
import khalifa_stadium5 from './images/khalifa_stadium5.jpg';

import lusail_stadium from './images/lusail_stadium.jpg';
import lusail_stadium2 from './images/lusail_stadium3.jpg';
import lusail_stadium3 from './images/lusail_stadium4.jpg';
import lusail_stadium4 from './images/lusail_stadium4.jpg';
import lusail_stadium5 from './images/lusail_stadium4.jpg';


import stadium_974 from './images/stadium_974.jpg'
import stadium_9742 from './images/stadium_9742.jpg'
import stadium_9743 from './images/stadium_9743.jpg'
import stadium_9744 from './images/stadium_9744.jpg'
import stadium_9745 from './images/stadium_9745.jpg'

import ball from './images/ball.png';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import StadiumCard from './StadiumCard';
import MatchCard, { MatchCardProps } from './MatchCard';
import { Match } from '../../App'
import TimeToStart from '../Statistics/TimeToStart';
import News from './News';
import { Bet } from '../YourBets/MyBets/MyBets';


export interface HomepageProps {
  allTeams: Team[] | null,
  allMatches: Match[] | null,
}

export interface Stadium {
  photo: string[],
  stadiumName: string,
  size: number,
  city: string,
}


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const winners: string[] = ['Daniel Bajorek', 'Michał Maksymowicz', 'Kuba Jarowski']

const Homepage: React.FC<HomepageProps> = ({ allTeams, allMatches }) => {
  const validMatches = allMatches !== null ? allMatches.filter((match) => new Date(match.date) > new Date()) : null;
  const sortedMatches = validMatches !== null ? validMatches.sort((match1, match2) => new Date(match1.date).getTime() - new Date(match2.date).getTime()) : null
  const matchesToDisplay = sortedMatches !== null ? sortedMatches.splice(0, 4) : null;
  const [isAutoPlay, setAutoPlay] = useState<boolean>(true);
  return (
    <div className='homepage-main'>
      <div className='flags'>
        {
          allTeams?.map(({ name }, index) => (
            <CircleFlag countryCode={CountryDict.get(name) as string} key={index} className='flag' />
          ))
        }
      </div>
      <div className='content-body'>
        <span className='welcome-text'>
          <img src={ball} style={{ height: '7vh' }} />
          Welcome to Qatar 2022 Typer
          <img src={ball} style={{ height: '7vh' }} />
        </span>
        <h2 className='soon-matches'> Soon</h2>

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>

          <div className='current-matches'>
          <h1 style={{color: '#EEE', textAlign: 'center'}}>Winners</h1>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              {winners.map((winner, index) => (
                <div style={{fontSize: '2.25vw', color: '#EEE', margin: '2vh'}}>
                  {index+1}. {winner}
                </div>
              ))}
              {/* {matchesToDisplay && matchesToDisplay.length !== 0  ? matchesToDisplay.map((match, index) => (
                
                  match.homeTeam !== null  && match.awayTeam !== null ? 
                  <div className='match-card-homepage' key={index}>
                  <MatchCard
                    homeTeam={match.homeTeam.name}
                    awayTeam={match.awayTeam.name}
                    date={match.date}
                    key={index}
                    stadium={match.location}
                    group={match.group}
                    match={match}
                    roundNumber={match.roundNumber}
                  />
                  <div className='time-to-start-navbar'>
                    <TimeToStart date={match.date} whiteColor />
                  </div>
                </div>
                : null 
                
                
              ))
                :
                null} */}
            </div>
          </div>
          {/* <div className='ball-video'>
            <span className='ball-text'>Good Luck & Enjoy </span>
            <Iframe
              url="https://www.youtube.com/embed/pRpeEdMmmQ0"
              className="iframe-styling"
              position="relative"

            />
          </div> */}
        </div>


        <div style={{ gridColumn: '1/11', gridRow: '3/10', marginTop: '3vh', justifyContent: 'center' }}>


          <h1 style={{ color: '#EEE', textAlign: 'center', }}> Stadiums </h1>
          <div className='carousel-media'>
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={false}
              responsive={responsive}
              infinite={true}
              autoPlay={isAutoPlay}
              autoPlaySpeed={5000}
              keyBoardControl={true}
              transitionDuration={1500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
            >
              {stadiums.map(({ photo, stadiumName, city, size, opened, architect }, index) => (
                <StadiumCard
                  photo={photo}
                  index={index}
                  key={index}
                  stadiumSize={size}
                  stadiumName={stadiumName}
                  stadiumLocation={city}
                  setAutoPlay={setAutoPlay}
                  opened={opened}
                  architect={architect}
                />
              ))}

            </Carousel>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Homepage;


const stadiums = [{
  photo: [amhed_bin_ali_stadium, amhed_bin_ali_stadium2, amhed_bin_ali_stadium3, amhed_bin_ali_stadium4],
  stadiumName: 'Ahmed Bin Ali Stadium',
  size: 40000,
  city: 'Al-Rayyan',
  opened: '18 December 2020',
  architect: 'Pattern Design'

},
{
  photo: [al_bayt_stadium, al_bayt_stadium2, al_bayt_stadium3, al_bayt_stadium4],
  stadiumName: 'Al Bayt Stadium',
  size: 60000,
  city: 'Al-Chaur',
  opened: '30 November 2021',
  architect: '-'
},
{
  photo: [al_thumama_stadium, al_thumama_stadium2, al_thumama_stadium3, al_thumama_stadium4, al_thumama_stadium5],
  stadiumName: 'Al Thumama Stadium',
  size: 40000,
  city: 'Ad-Dauha',
  opened: '21 October 2021',
  architect: 'Ibrahim M. Jaidah'
},
{
  photo: [al_wakrah_stadium, al_wakrah_stadium2, al_wakrah_stadium3, al_wakrah_stadium4],
  stadiumName: 'Al Janoub Stadium',
  size: 40000,
  city: 'Ad-Wakrah',
  opened: '16 May 2019',
  architect: 'Zaha Hadid'
},
{
  photo: [education_city_stadium, education_city_stadium2, education_city_stadium3, education_city_stadium4, education_city_stadium5],
  stadiumName: 'Education City Stadium',
  size: 40000,
  city: 'Al-Dauha',
  opened: '15 June 2020',
  architect: 'Fenwick Iribarren Architects'
},
{
  photo: [khalifa_stadium, khalifa_stadium2, khalifa_stadium3, khalifa_stadium4, khalifa_stadium5],
  stadiumName: 'Khalifa International Stadium',
  size: 40000,
  city: 'Al-Dauha',
  opened: '1976(2017)',
  architect: 'Dar Al-Handasah'
},
{
  photo: [lusail_stadium, lusail_stadium2, lusail_stadium3, lusail_stadium4, lusail_stadium5],
  stadiumName: 'Lusail Stadium',
  size: 80000,
  city: 'Lusail City',
  opened: '22 November 2021',
  architect: 'Foster + Partners & Populous'
},
{
  photo: [stadium_974, stadium_9742, stadium_9743, stadium_9744, stadium_9745],
  stadiumName: 'Stadium 974',
  size: 40000,
  city: 'Al-Dauha',
  opened: '30 November 2021',
  architect: 'Fenwick Iribarren Architects'
},
]

interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
  allow?: string;
  allowFullScreen?: boolean;
  allowTransparency?: boolean;
  frameBorder?: number | string;
  height?: number | string;
  marginHeight?: number;
  marginWidth?: number;
  name?: string;
  sandbox?: string;
  scrolling?: string;
  seamless?: boolean;
  src?: string;
  srcDoc?: string;
  width?: number | string;
}