import { ChangeEvent, useState } from "react"

export default function Question({
  word, 
  onCheckAnswer
}: {
  word: string | undefined, 
  onCheckAnswer: (userInput: string)=>void
}){
  console.log('Question 组件')
  const [inptValue, setInptValue] = useState('')
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setInptValue(e.target.value)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === 'Enter'){
      onCheckAnswer(inptValue)
      setInptValue("")
    }
  }

  return (
    <div className="text-5xl text-center mb-20 mt-10">
      <div className="text-fuchsia-500 dark:text-gray-50">
        {word}
      </div>
      <div>
        <input 
          className="border-solid border-2 border-sky-500 bg-fuchsia-100 rounded-lg mt-8 mb-11 indent-1 h-10 text-2xl" 
          type="text" 
          value={inptValue} 
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}