import React, { useEffect, useState } from 'react';
import './AnimatedLetters.scss';
import Loader from 'react-loaders'

export interface AnimatedLettersProps{
    // letterClass: any,
    strToDisplay: string,
    idx: number,
}

const AnimatedLetters: React.FC<AnimatedLettersProps> = ({strToDisplay, idx}) => {
    const strArray = strToDisplay.split('');
    console.log(strArray);
    const [letterClass, setLetterClass] = useState('text-animate')
    //@ts-ignore
    useEffect(() => {
        setTimeout(() => {
          setLetterClass('text-animate-hover')
        }, 3000)
      }, [])
    return (
    <span>
      {strArray.map((char, i) => (
            <h1 key={char + i} className={`${letterClass} _${i + idx}`}>{char}</h1>
      ))}
    </span>
  )
}

export default AnimatedLetters