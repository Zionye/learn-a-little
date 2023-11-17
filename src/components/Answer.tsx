import React from 'react'

const Answer = ({
  word,
  soundmark,
  onToNextStatement
}: {
  word: string,
  soundmark: string, 
  onToNextStatement: ()=>void
}) => {
  const audioSrc = `https://dict.youdao.com/dictvoice?audio=${word}&type=1`
  return (
    <div>
      <div>
        {word}
        {soundmark}
      </div>
      <figure> 
        <figcaption>Listen to:</figcaption>
        <audio autoPlay controls src={audioSrc}> 
          <a href={audioSrc}> Download audio </a> 
        </audio>
      </figure>
      <button onClick={onToNextStatement}>next</button>
    </div>
  )
}

export default Answer