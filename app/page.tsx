import GameCard from "@/components/GameCard"

export interface GameDataType {
  game: string,
  teams: Array<{
    team_name: string,
    players: Array<{ name: string, age: number }>
  }>,
}

export async function getGameData() {
  const res = await fetch('https://mocki.io/v1/b4544a37-0765-405f-baf6-6675845d5a0e', {cache:"force-cache"})
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data: GameDataType[] = await getGameData()
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-10">
      {data?.map(({game, teams})=>(
        <GameCard key={game} {...{game, teams}} />
      ))}
      {!data?.length && <h1 className="text-2xl font-semibold">No Data Found</h1>}
    </main>
  )
}
