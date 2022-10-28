//@ts-nocheck
import React from 'react';
import './LoadingLayout.scss';
import Spinner from 'react-bootstrap/Spinner';
import Loader from 'react-loaders';
export interface LoadingLayoutProps {
    componentName: string,
}

const LoadingLayout: React.FC<LoadingLayoutProps> = ({componentName}) => {
  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '45vh'}}>
        <div style={{display:'flex'}}>
          <h1>{componentName} loading...</h1>
          <Spinner animation='border' />
        </div>
        
        {/* <Loader type="pacman" style={{width: '500px', height:'200px'}}/>  TODO */}
    </div>
  )
}

export default LoadingLayout