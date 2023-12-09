"use client"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import Question from "@/components/Question"
import Answer from "@/components/Answer"
import { useCourse, useFailedCount } from "@/store/useCourse"
import Header from "@/components/Header"

export default function Home(){
  // const { data: session } = useSession()
  // console.log('useSession session: ---> ', session);

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

  // if(!session){
  //   return (
  //     <div>
  //       <Link href="/api/auth/signin">
  //         Sign in with GitHub
  //       </Link>
  //     </div>
  //   )
  // }

  return (
    <div>
      <Header></Header>
      
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
    </div>
  )
}
