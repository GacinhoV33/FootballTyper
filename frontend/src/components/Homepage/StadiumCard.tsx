import React, { useEffect, useState } from 'react';
import './StadiumCard.scss';
import Image from 'react-bootstrap/Image';
import { FaCity } from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';
export interface StadiumCardProps {
    photo: string[],
    stadiumName: string,
    describtion?: string,
    stadiumSize?: number,
    stadiumLocation?: string,
    index: number,
    setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>,
}

const StadiumCard: React.FC<StadiumCardProps> = ({photo, describtion, stadiumSize, stadiumLocation, index, stadiumName, setAutoPlay}) => {
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number>(0);
  const [currentPhoto, setCurrentPhoto] = useState<string>(photo[currentPhotoIdx]);

  function handleClick(){
    setAutoPlay(false);

    if(currentPhotoIdx === photo.length - 1){
      setCurrentPhotoIdx(0);
    }
    else{
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
                        <img src={currentPhoto} alt={index.toString()} style={{width: '31vw', height: '20vw'}} />
                    </div>
                    <div className='bottom-card'>
                      <div className='stadium-text-name'>
                          <h4>{stadiumName}</h4>
                      </div>
                      <div className='stadium-text-city'>
                          <FaCity size={'1.5vw'}/>
                            {stadiumLocation}
                      </div>
                      <div className='stadium-text-size'>
                          <BsPeopleFill size={'1.5vw'}/>{stadiumSize}
                      </div>
                      <div>

                      </div>
                    </div>
                    

                  </div>
  )
}

export default StadiumCard