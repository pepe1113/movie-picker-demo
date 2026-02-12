import { useParams } from 'react-router-dom'

export function Component() {
  const { id } = useParams()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">電影詳情</h1>
      <p className="text-muted-foreground mt-2">電影 ID: {id}</p>
    </div>
  )
}
