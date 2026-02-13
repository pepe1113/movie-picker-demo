import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/utils/constants'

export function Component() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-20">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-muted-foreground text-lg">找不到這個頁面</p>
      <Button asChild>
        <Link to={ROUTES.HOME}>回到首頁</Link>
      </Button>
    </div>
  )
}
