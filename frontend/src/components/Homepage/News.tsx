import React from 'react'
import './News.scss'
export interface NewsProps{

}

const News: React.FC<NewsProps> = ({}) => {
  return (
    <div className='news-content'>
        <div className='news-main'>
                <h4 style={{color: 'white'}}>News Component</h4>
        </div>
    </div>
  )
}

export default News