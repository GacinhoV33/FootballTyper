import React from 'react';
import { Route, Router } from 'react-router-dom';
import './Homepage.scss'
// Components 
import Layout from '../Layout/Layout';
import CountryDict from '../YourBets/MyBets/CountryDict';
import { Team } from '../../App';
import { CircleFlag } from 'react-circle-flags';
// import Carousel  from 'react-bootstrap/Carousel';

//photos
import photo4 from './photo4.png';
import photo3 from './photo3.jpg';

import amhed_bin_ali_stadium from './ahmed_bin_ali_stadium.jpg';
import al_bayt_stadium from './al_bayt_stadium.jpg'
import al_thumama_stadium from './al_thumama_stadium.jpg';
import al_wakrah_stadium from './al_wakrah_stadium.jpg';
import education_city_stadium from './education_city_stadium.jpg';
import khalifa_stadium from './khalifa_stadium.jpg';
import lusail_stadium from './lusail_stadium.jpg';
import stadium_974 from './stadium_974.jpg'

import Button from 'react-bootstrap/Button';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import StadiumCard from './StadiumCard';
import MatchCard, { MatchCardProps } from './MatchCard';
export interface HomepageProps {
  allTeams: Team[] | null
}

export interface Stadium {
  photo: string,
  stadiumName: string,
  size: number,
  city: string,
}

const stadiums = [{
  photo: amhed_bin_ali_stadium,
  stadiumName: 'Ahmed Bin Ali Stadium',
  size: 40000,
  city: 'Al-Rayyan',
},
{
  photo: al_bayt_stadium,
  stadiumName: 'Al Bayt Stadium',
  size: 60000,
  city: 'Al-Chaur',
},
{
  photo: al_thumama_stadium,
  stadiumName: 'Al Thumama Stadium',
  size: 40000,
  city: 'Ad-Dauha',
},
{
  photo: al_wakrah_stadium,
  stadiumName: 'Al Janoub Stadium',
  size: 40000,
  city: 'Ad-Wakrah',
},
{
  photo: education_city_stadium,
  stadiumName: 'Education City Stadium',
  size: 40000,
  city: 'Al-Dauha',
},
{
  photo: khalifa_stadium,
  stadiumName: 'Khalifa International Stadium',
  size: 40000,
  city: 'Al-Dauha',
},
{
  photo: lusail_stadium,
  stadiumName: 'Lusail Stadium',
  size: 80000,
  city: 'Lusail City',
},
{
  photo: stadium_974,
  stadiumName: 'Stadium 974',
  size: 40000,
  city: 'Al-Dauha',
},
]


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

const Homepage: React.FC<HomepageProps> = ({ allTeams }) => {

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
        <div className='current-matches'>
          {dummyMatches.map((item, index) => (
            <MatchCard {...item} />
          ))}
        </div>
      </div>

      <div className='login-info'>

      </div>
      <div style={{ gridColumn: '2/8', gridRow: '4/11' }}>


        <h1> Stadiums </h1>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
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
              />
          ))}

        </Carousel>
      </div>
    </div>
  )
}

export default Homepage;