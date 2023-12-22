'use client'
import { GameDataType } from "@/app/page";
import PlayerForm from "./PlayerForm";
import { useEffect, useState } from "react";

function GameCard ({ game, teams}: GameDataType) {
  const [gameDetails, setGameDetails] = useState(teams)
  
  // Storing game into browser local storage
  useEffect(()=>{

    if(typeof window !== "undefined" && window.localStorage){
      let gameData = JSON.parse(localStorage.getItem(game)!);
      if(!gameData){
        localStorage.setItem(game, JSON.stringify(teams));
      }else {
        setGameDetails(gameData)
      }
    }
  },[])

  const updateData = (playerName: string, playerAge: string, teamName: string, idx?: number) => {
    const data = gameDetails.map(({team_name, players})=>{
      if(team_name === teamName) {
        return {
          team_name,
          players: (idx !== undefined) ? players.map((item, i) => i === idx ? {name: playerName, age: playerAge}: item) 
                                      : [{name: playerName, age: playerAge}, ...players]
        }
      }
      return {team_name, players}
    })
    setGameDetails(data)

    localStorage.setItem(game, JSON.stringify(data));
    
  }

  return (
    <>
    <div key={game} className="mb-3 border border-gray-200 rounded-lg shadow overflow-hidden">
      <div className="mb-2 p-2 bg-gray-300">
        <h2 className="mb-0 text-2xl font-bold tracking-tight text-black">{game}</h2>
      </div>
      {gameDetails?.map(({team_name, players})=>(
        <div key={team_name} className="p-3">
          <h3 className="text-lg font-medium text-gray-700">{team_name} ({players?.length})</h3>
          <div className="p-2 overflow-y-scroll h-60">
            <PlayerForm name="" age="" {...{team_name, updateData}} />
            {players?.map(({name, age}, idx)=><PlayerForm key={`${idx}-${name}`} {...{idx, name, age, team_name, updateData}} />)}
          </div>
        </div>
      ))}
    </div>
  </>
  );
};

export default GameCard;