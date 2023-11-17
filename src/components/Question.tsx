import { ChangeEvent, useState } from "react"

export default function Question({
  word, 
  onCheckAnswer
}: {
  word: string, 
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
    <div>
      {word}
      <div>
        <input 
          className="bg-red-500" 
          type="text" 
          value={inptValue} 
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}