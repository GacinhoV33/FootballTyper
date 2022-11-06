import React from 'react'
import Button from 'react-bootstrap/Button'
import './StadiumCard.scss';


export interface StadiumCardProps {
    photo: string,
    describtion?: string,
    stadiumSize?: number,
    stadiumLocation?: string,
    index: number,
}

const StadiumCard: React.FC<StadiumCardProps> = ({photo, describtion, stadiumSize, stadiumLocation, index}) => {
  return (
   
                <div className='stadium-card'>
                    <img src={photo} alt={index.toString()} className='' style={{width: 'inherit', height: '33vh', minWidth: '150px', minHeight: '150px'}}/>
                    <div>
                        Stadium: NAME

                    </div>
                  </div>
  )
}

export default StadiumCard