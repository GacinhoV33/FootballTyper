import React, { useState } from 'react';
import { Route, Router } from 'react-router-dom';
import './Homepage.scss'
// Components 
import Layout from '../Layout/Layout';
import CountryDict from '../YourBets/MyBets/CountryDict';
import { Team } from '../../App';
import { CircleFlag } from 'react-circle-flags';
// import Carousel  from 'react-bootstrap/Carousel';
//photos
import amhed_bin_ali_stadium from './ahmed_bin_ali_stadium.jpg';
import amhed_bin_ali_stadium2 from './ahmed_bin_ali_stadium2.jpg';
import amhed_bin_ali_stadium3 from './ahmed_bin_ali_stadium3.jpg';
import amhed_bin_ali_stadium4 from './ahmed_bin_ali_stadium4.jpg';

import al_bayt_stadium from './al_bayt_stadium.jpg';
import al_bayt_stadium2 from './al_bayt_stadium2.jpg'
import al_bayt_stadium3 from './al_bayt_stadium3.jpg'
import al_bayt_stadium4 from './al_bayt_stadium4.jpg'
import al_bayt_stadium5 from './al_bayt_stadium5.jpg'

import al_thumama_stadium from './al_thumama_stadium.jpg';
import al_thumama_stadium2 from './al_thumama_stadium2.jpg';
import al_thumama_stadium3 from './al_thumama_stadium3.jpg';
import al_thumama_stadium4 from './al_thumama_stadium4.jpg';
import al_thumama_stadium5 from './al_thumama_stadium5.jpg';

import al_wakrah_stadium from './al_wakrah_stadium.jpg';
import al_wakrah_stadium2 from './al_wakrah_stadium2.jpg';
import al_wakrah_stadium3 from './al_wakrah_stadium3.jpg';
import al_wakrah_stadium4 from './al_wakrah_stadium4.jpg';
import al_wakrah_stadium5 from './al_wakrah_stadium5.jpg';

import education_city_stadium from './education_city_stadium.jpg';
import education_city_stadium2 from './education_city_stadium2.jpg';
import education_city_stadium3 from './education_city_stadium3.jpg';
import education_city_stadium4 from './education_city_stadium4.jpg';
import education_city_stadium5 from './education_city_stadium5.jpg';

import khalifa_stadium from './khalifa_stadium.jpg';
import khalifa_stadium2 from './khalifa_stadium2.jpg';
import khalifa_stadium3 from './khalifa_stadium3.jpg';
import khalifa_stadium4 from './khalifa_stadium4.jpg';
import khalifa_stadium5 from './khalifa_stadium5.jpg';

import lusail_stadium from './lusail_stadium.jpg';
import lusail_stadium2 from './lusail_stadium3.jpg';
import lusail_stadium3 from './lusail_stadium4.jpg';
import lusail_stadium4 from './lusail_stadium4.jpg';
import lusail_stadium5 from './lusail_stadium4.jpg';


import stadium_974 from './stadium_974.jpg'
import stadium_9742 from './stadium_9742.jpg'
import stadium_9743 from './stadium_9743.jpg'
import stadium_9744 from './stadium_9744.jpg'
import stadium_9745 from './stadium_9745.jpg'


import Button from 'react-bootstrap/Button';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import StadiumCard from './StadiumCard';
import MatchCard, { MatchCardProps } from './MatchCard';
import { Match } from '../../App'
import TimeToStartTwo from '../Statistics/TimeToStart';
import News from './News';

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


const dummyMatches: MatchCardProps[] = [{
  homeTeam: 'Poland',
  awayTeam: 'Spain',
  date: '2022-11-20T17:00:00',
},
{
  homeTeam: 'Germany',
  awayTeam: 'Argentina',
  date: '2022-11-20T18:00:00',
},
{
  homeTeam: 'Netherlands',
  awayTeam: 'Mexico',
  date: '2022-11-21T19:00:00',
},
{
  homeTeam: 'Switzerland',
  awayTeam: 'England',
  date: '2022-11-22T17:00:00',
},]

const Homepage: React.FC<HomepageProps> = ({ allTeams, allMatches }) => {
  const validMatches = allMatches !== null ? allMatches.filter((match) => !match.isMatchValid) : null;
  const sortedMatches = validMatches !== null ? validMatches.sort((match1, match2) => new Date(match1.date).getTime() - new Date(match2.date).getTime()) : null
  const matchesToDisplay = sortedMatches !== null ? sortedMatches.splice(0, 4) : null;
  const [isAutoPlay, setAutoPlay] = useState<boolean>(true);
  console.log(matchesToDisplay)
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
          Welcome in Qatar 2022 Typer
        </span>
        <div className='middle-content'>
          <div className='current-matches'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {matchesToDisplay && matchesToDisplay[0].homeTeam !== null ? matchesToDisplay.map((match, index) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MatchCard homeTeam={match.homeTeam.name} awayTeam={match.awayTeam.name} date={match.date} key={index} />
                  <div >
                    <TimeToStartTwo date={match.date} whiteColor />
                  </div>
                </div>
              ))
                :
                // TODO minwitdh of time
                null}
            </div>
          </div>
          <div className='news-component'>
            <News />
          </div>
        </div>

      </div>


      <div style={{ gridColumn: '1/11', gridRow: '3/10' }}>


        <h1> Stadiums </h1>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={isAutoPlay}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={5500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {stadiums.map(({ photo, stadiumName, city, size }, index) => (
            <StadiumCard
              photo={photo}
              index={index}
              key={index}
              stadiumSize={size}
              stadiumName={stadiumName}
              stadiumLocation={city}
              setAutoPlay={setAutoPlay}
            />
          ))}

        </Carousel>
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
},
{
  photo: [al_bayt_stadium, al_bayt_stadium2, al_bayt_stadium3, al_bayt_stadium4],
  stadiumName: 'Al Bayt Stadium',
  size: 60000,
  city: 'Al-Chaur',
},
{
  photo: [al_thumama_stadium, al_thumama_stadium2, al_thumama_stadium3, al_thumama_stadium4, al_thumama_stadium5],
  stadiumName: 'Al Thumama Stadium',
  size: 40000,
  city: 'Ad-Dauha',
},
{
  photo: [al_wakrah_stadium, al_wakrah_stadium2, al_wakrah_stadium3, al_wakrah_stadium4],
  stadiumName: 'Al Janoub Stadium',
  size: 40000,
  city: 'Ad-Wakrah',
},
{
  photo: [education_city_stadium, education_city_stadium2, education_city_stadium3, education_city_stadium4, education_city_stadium5],
  stadiumName: 'Education City Stadium',
  size: 40000,
  city: 'Al-Dauha',
},
{
  photo: [khalifa_stadium, khalifa_stadium2, khalifa_stadium3, khalifa_stadium4, khalifa_stadium5],
  stadiumName: 'Khalifa International Stadium',
  size: 40000,
  city: 'Al-Dauha',
},
{
  photo: [lusail_stadium, lusail_stadium2, lusail_stadium3, lusail_stadium4, lusail_stadium5],
  stadiumName: 'Lusail Stadium',
  size: 80000,
  city: 'Lusail City',
},
{
  photo: [stadium_974, stadium_9742, stadium_9743, stadium_9744, stadium_9745],
  stadiumName: 'Stadium 974',
  size: 40000,
  city: 'Al-Dauha',
},
]
