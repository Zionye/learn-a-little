"use client"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import Question from "@/components/Question"
import Answer from "@/components/Answer"
import { useCourse, useFailedCount } from "@/store/useCourse"

// const failedCountTotal = 3
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

// export default function Main(){
//   // const { questionWord, answerWord, answerSoundmark } = useCourse()
//   // console.log('useCourseStore: ', useCourseStore);
//   const [currentMode, setCurrentMode] = useState<'loading' | 'question' | 'answer'>('loading')

//   const failedCount = useRef(0)
//   const statementIndex = useRef(0)
//   const currentCourse = useRef<any>({})
  
//   let questionWord = ""
//   let answerWord = ""
//   let answerSoundmark = ""

//   useEffect(()=>{
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/course`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const res = await response.json();
//         console.log('res: ', res);

//         currentCourse.current = res.data
//         setCurrentMode('question')
//         // updateWord()
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData()
//   },[])

//   const updateWord = ()=>{
//     if(!currentCourse.current.statements) return

//     const { chinese, english, soundmark } = currentCourse.current.statements[statementIndex.current]
//     questionWord = chinese
//     answerWord = english
//     answerSoundmark = soundmark
//   }

//   const handleToNextStatement = ()=>{
//     statementIndex.current++
//     setCurrentMode('question')
//   }

//   const checkCorrect = (input: string)=>{
//     return input === answerWord
//   }

//   const handleCheckAnswer = (userInput: string)=>{
//     if(checkCorrect(userInput)){
//       console.log('正确')
//       setCurrentMode('answer')
//     } else {
//       console.log('错误')
//       // setInptValue('')
//       failedCount.current++

//       console.log('failedCount.current : ', failedCount.current );
//       if(failedCount.current >= failedCountTotal){
//         failedCount.current = 0
//         setCurrentMode('answer')
//       }
//     }
//   }

//   updateWord()

//   return <div>
//     {currentMode === 'question' ? (
//       <Question word={questionWord} onCheckAnswer={handleCheckAnswer} />
//     ) : (
//       <Answer word={answerWord} soundmark={answerSoundmark} onToNextStatement={handleToNextStatement} />
//     )}
//   </div>
// }

export default function Home(){
  const [currentMode, setCurrentMode] = useState<'loading' | 'question' | 'answer'>('question')

  const { increaseFailedCount  } = useFailedCount()
  const { toNextStatement, fetchCourse, getCurrentStatement, checkCorrect } = useCourse()
  // const { checkCorrect } = useActions(useCourse())

  // const currentStatement = getCurrentStatement()

  useEffect(() => {
    fetchCourse()
  }, []);

  const handleToNextStatement = ()=>{
    toNextStatement()
    setCurrentMode('question')
  }
  const handleCheckAnswer = (userInput: string)=>{
    if(checkCorrect(userInput)){
      console.log('正确')
      setCurrentMode('answer')
    } else {
      console.log('错误')
      increaseFailedCount(()=>{
        setCurrentMode('answer')
      })
    }
  }

  return (
    <div className="container mx-auto flex h-full flex-1 flex-col items-center justify-center pb-10 h-96 mt-40">
      <div className="container relative mx-auto flex h-full flex-col items-center">
        <div className="container flex flex-grow items-center justify-center">
          <div className="container flex h-full w-full flex-col items-center justify-center">
            <div className="container flex flex-grow flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center pb-1 pt-4">
                {currentMode === 'question' ? (
                  <Question 
                    word={getCurrentStatement()?.chinese} 
                    onCheckAnswer={handleCheckAnswer} 
                  />
                ) : (
                  <Answer 
                  word={getCurrentStatement()?.english} 
                  soundmark={getCurrentStatement()?.soundmark} 
                  onToNextStatement={handleToNextStatement} 
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
