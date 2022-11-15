import React, { useEffect, useState } from 'react';
import './StadiumCard.scss';
import Image from 'react-bootstrap/Image';
import { FaCity } from 'react-icons/fa';
import { BsPeopleFill, BsFillCalendarCheckFill } from 'react-icons/bs';
import { RiBuilding3Fill } from 'react-icons/ri'
export interface StadiumCardProps {
  photo: string[],
  stadiumName: string,
  opened: string,
  architect: string,
  index: number,
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>,
  describtion?: string,
  stadiumSize?: number,
  stadiumLocation?: string,
}

const StadiumCard: React.FC<StadiumCardProps> = ({ photo, describtion, stadiumSize, stadiumLocation, index, stadiumName, setAutoPlay, architect, opened }) => {
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number>(0);
  const [currentPhoto, setCurrentPhoto] = useState<string>(photo[currentPhotoIdx]);

  function handleClick() {
    setAutoPlay(false);

    if (currentPhotoIdx === photo.length - 1) {
      setCurrentPhotoIdx(0);
    }
    else {
      setCurrentPhotoIdx(prev => prev + 1);
    }
    setTimeout(() => {
      setAutoPlay(true)
    }, 5000
    )
  }

  useEffect(() => {
    setCurrentPhoto(photo[currentPhotoIdx])
  }, [currentPhotoIdx])
  return (

    <div className='stadium-card' >
      <div onClick={() => handleClick()} className='image-container'>
        <img src={currentPhoto} alt={index.toString()} className='image-stadium' />
      </div>
      <div className='bottom-card'>
        <div className='stadium-text-name'>
          <span>{stadiumName}</span>
        </div>
        <div className='info'>
          <div className='row'>
            <div className='stadium-text-city'>
              <FaCity size={'1.5vw'} />
              {stadiumLocation}
            </div>
            <div className='stadium-text-size'>
              <BsPeopleFill size={'1.5vw'} />{stadiumSize}
            </div>
          </div>
          <div className='row'>
            <div className='opened'>
              <BsFillCalendarCheckFill size={'1.5vw'} style={{marginRight: '0.5vw'}}/>
              {opened}
            </div>
            <div className='architect'>
              <RiBuilding3Fill size={'1.5vw'} style={{marginRight: '0.5vw'}}/>
              {architect}
            </div>
          </div>
        </div>

      </div>


    </div>
  )
}

export default StadiumCard