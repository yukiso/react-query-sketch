import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { User } from './interfaces'
import './App.css'


function App() {
  const [users, setUsers] = useState<[User] | null>()
  const { isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () =>
      fetch('https://random-data-api.com/api/v2/users?size=30&response_type=json').then(
        res => res.json() as Promise<[User]>
      ),
    // set state on success
    onSuccess: setUsers,
    // refetch every 10 sec
    refetchInterval: 10 * 1000,
    // keep fresh for 5 sec
    staleTime: 5 * 1000
  })

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div className="App">
      <h1>List</h1>
      {users?.map(user => (
        <div key={user.uid}>
          {user.username} - {user.date_of_birth}
        </div>
      ))}
    </div>
  )
}

export default App
