"use client"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import Question from "@/components/Question"
import Answer from "@/components/Answer"

const failedCountTotal = 3
// const courseData = [{
//   name: '第一节课',
//   statements: [
//     {
//       'chinese': '现在',
//       'english': 'now',
//       'soundmark': '/nau/'
//     },
//     {
//       'chinese': '取消， 废除； 删去， 删除； 抵消',
//       'english': 'cancel',
//       'soundmark': "['kænsl]"
//     },
//     {
//       'chinese': '我想要在这里',
//       'english': 'i want to be here',
//       'soundmark': "/ai/ /want/ /te/ /bi/ /hir/"
//     }
//   ]
// }]

export default function Main(){
  const [currentMode, setCurrentMode] = useState<'question' | 'answer'>('question')
  
  // const [courseData, setCourseData] = useState<any[]>([]);
  const [questionWord, setQuestionWord] = useState("");
  const [answerWord, setAnswerWord] = useState("");
  const [answerSoundMark, setAnswerSoundMark] = useState("");

  const failedCount = useRef(0)
  const statementIndex = useRef(0)
  const currentCourse = useRef<any>({})

  useEffect(()=>{
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:3000/api/course');
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/course`);
        // const basePath = process.env.NODE_ENV === "production" ? '/api' : 'http://localhost:3000/api'
        // const response = await fetch(`${basePath}/course`);
        const response = await fetch(`/api/course`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const res = await response.json();
        console.log('res: ', res);

        // setCourseData(res.data);
        currentCourse.current = res.data
        updateWord()
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  },[])

  const updateWord = ()=>{
    const { chinese, english, soundMark } = currentCourse.current.statements[statementIndex.current]
    setQuestionWord(chinese)
    setAnswerWord(english)
    setAnswerSoundMark(soundMark)
  }

  const handleToNextStatement = ()=>{
    statementIndex.current++
    setCurrentMode('question')
    updateWord()
  }

  const checkValidity = (inpt: string)=>{
    return inpt === answerWord
  }

  const handleCheckAnswer = (userInput: string)=>{
    console.log('handle Check Answer')
    if(checkValidity(userInput)){
      console.log('正确')
      setCurrentMode('answer')
    } else {
      console.log('错误')
      // setInptValue('')
      failedCount.current++

      console.log('failedCount.current : ', failedCount.current );
      if(failedCount.current >= failedCountTotal){
        failedCount.current = 0
        setCurrentMode('answer')
      }
    }
  }

  return <div>
    {currentMode === 'question' ? (
      <Question word={questionWord} onCheckAnswer={handleCheckAnswer} />
    ) : (
      <Answer word={answerWord} soundmark={answerSoundMark} onToNextStatement={handleToNextStatement} />
    )}
  </div>
}
