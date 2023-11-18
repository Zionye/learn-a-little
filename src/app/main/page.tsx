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
  const [currentMode, setCurrentMode] = useState<'loading' | 'question' | 'answer'>('loading')

  const failedCount = useRef(0)
  const statementIndex = useRef(0)
  const currentCourse = useRef<any>({})
  
  let questionWord = ""
  let answerWord = ""
  let answerSoundMark = ""

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/course`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const res = await response.json();
        console.log('res: ', res);

        currentCourse.current = res.data
        setCurrentMode('question')
        // updateWord()
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  },[])

  const updateWord = ()=>{
    if(!currentCourse.current.statements) return

    const { chinese, english, soundMark } = currentCourse.current.statements[statementIndex.current]
    questionWord = chinese
    answerWord = english
    answerSoundMark = soundMark
  }

  const handleToNextStatement = ()=>{
    statementIndex.current++
    setCurrentMode('question')
  }

  const checkValidity = (inpt: string)=>{
    return inpt === answerWord
  }

  const handleCheckAnswer = (userInput: string)=>{
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

  updateWord()

  return <div>
    {currentMode === 'question' ? (
      <Question word={questionWord} onCheckAnswer={handleCheckAnswer} />
    ) : (
      <Answer word={answerWord} soundmark={answerSoundMark} onToNextStatement={handleToNextStatement} />
    )}
  </div>
}
