import { GameDataType } from '@/app/page'
import React, { useState } from 'react'

interface Props {
  idx?: number
  team_name: string, 
  updateData: (playerName: string, playerAge: string, teamName: string, idx?: number) => void,
  name?: string,
  age?: string
}

function PlayerForm ({ idx, name, age, team_name, updateData }:Props) {
  const [playerName, setPlayerName] = useState(name)
  const [playerAge, setPlayerAge] = useState(age)


  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    updateData(playerName!, playerAge!, team_name, idx)
    if(idx === undefined){
      setPlayerName('')
      setPlayerAge('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-wrap mb-2">
        <div className="w-full md:w-2/5 mb-1 md:pr-3">
          <input value={playerName} onChange={(e)=>setPlayerName(e.target.value)} id="name" required type="text" placeholder="Player Name" className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
        </div>
        <div className="w-full md:w-2/5 mb-1 md:pr-3">
          <input value={playerAge} onChange={(e)=>setPlayerAge(e.target.value)} id="age" required type="number" min={1} placeholder="Player Age"  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
        </div>
        <div className="w-full md:w-1/5">
        <button disabled={(playerName?.trim() === name && playerAge === age)} className="bg-purple-500 hover:bg-purple-700 text-white font-bold h-9 py-1 px-3 border border-purple-700 rounded disabled:cursor-not-allowed disabled:opacity-50">
          {(!name && !age) ? "Add": "Save"}
        </button>
        </div>
      </div>
    </form>
  )
}

export default PlayerForm