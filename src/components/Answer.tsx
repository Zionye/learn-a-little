import React, { useEffect, useRef } from 'react'

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
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const onPlaySound = ()=>{
    if (audioRef.current) {
      audioRef.current.play();
    }
  }

  useEffect(() => {
    onPlaySound()
  }, []);

  return (
    <div className="text-center mb-20 mt-10">
      <div className="text-5xl mb-3 text-fuchsia-500 dark:text-gray-50">
        {word}

        {/* 点击这个 SVG 图标触发播放音频 */}
        <svg
          className="w-7 h-7 inline-block ml-1 cursor-pointer"
          onClick={onPlaySound}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M342.4 384H128v256h214.4L576 826.8V197.2L342.4 384zM64 320h256L640 64v896L320 704H64V320z m640 256h256v-64H704v64z m16.8 159.5l181 181 45.3-45.3-181-181-45.3 45.3z m33.9-343.9l181-181-45.3-45.3-181 181 45.3 45.3z"
            fill="#666666"
          ></path>
        </svg>
        {/* 定义一个隐藏的音频元素 */}
        <audio src={audioSrc} ref={audioRef} /> 

        <div className="text-2xl text-slate-600">{soundmark}</div>{" "}
      </div>
      {/* <figure> 
        <audio autoPlay controls src={audioSrc} ref={audioRef}> 
          <a href={audioSrc}> Download audio </a> 
        </audio>
      </figure> */}
      <button
        className="border-solid border-2 border-slate-400 bg-slate-100 dark:bg-fuchsia-500 rounded-lg mt-8 mb-11 indent-1 h-10 text-2xl pl-10 pr-10 hover:bg-slate-200"
        onClick={onToNextStatement}
      >
        next
      </button>
    </div>
  )
}

export default Answer