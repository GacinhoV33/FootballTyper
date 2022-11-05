//@ts-nocheck
import React from 'react';
import './LoadingLayout.scss';
import Spinner from 'react-bootstrap/Spinner';
import logo_player from './logo_player.png';
export interface LoadingLayoutProps {
    componentName: string,
}

const LoadingLayout: React.FC<LoadingLayoutProps> = ({componentName}) => {
  return (
        <div className='main-content-loading'>
          <img src={logo_player} alt='logoPlayer' height='100vh'/>
          <div className='loading-text'>
            <h1>{componentName} loading...</h1>
            <Spinner animation='border' />
          </div>
          
        </div>
        
  )
}

export default LoadingLayout