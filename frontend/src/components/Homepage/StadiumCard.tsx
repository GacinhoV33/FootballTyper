import React, { useEffect, useState } from 'react'
import './StadiumCard.scss';
import Image from 'react-bootstrap/Image'


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
                    <div className='stadium-text'>
                        Name: {stadiumName}
                    </div>
                    <div className='stadium-text'>
                        City: {stadiumLocation}
                    </div>
                    <div>
                      Size: {stadiumSize}
                    </div>
                    <div>

                    </div>

                  </div>
  )
}

export default StadiumCard