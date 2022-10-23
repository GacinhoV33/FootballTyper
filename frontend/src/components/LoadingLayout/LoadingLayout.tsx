import React from 'react';
import './LoadingLayout.scss';
import Spinner from 'react-bootstrap/Spinner';

export interface LoadingLayoutProps {
    componentName: string,
}
const LoadingLayout: React.FC<LoadingLayoutProps> = ({componentName}) => {
  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
        <h1>{componentName} loading...</h1>
        <Spinner animation='border' />
    </div>
  )
}

export default LoadingLayout