import React from 'react'
import './StadiumCard.scss';
import Image from 'react-bootstrap/Image'


export interface StadiumCardProps {
    photo: string,
    stadiumName: string,
    describtion?: string,
    stadiumSize?: number,
    stadiumLocation?: string,
    index: number,
}

const StadiumCard: React.FC<StadiumCardProps> = ({photo, describtion, stadiumSize, stadiumLocation, index}) => {
  return (
   
                <div className='stadium-card'>
                    <img src={photo} alt={index.toString()} style={{width: '15vw', minWidth: '150px', minHeight: '150px'}}/>
                    <div>
                        Stadium: NAME

                    </div>
                  </div>
  )
}

export default StadiumCard