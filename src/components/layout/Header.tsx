import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Film,
  Heart,
  Menu,
  Search,
  User,
  Dice5,
  TrendingUp,
  Languages,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores/authStore'
import { useLanguageStore } from '@/stores/languageStore'
import { ROUTES } from '@/utils/constants'

export function Header() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, user, signIn, signOut } = useAuthStore()
  const { language, setLanguage } = useLanguageStore()

  const NAV_ITEMS = [
    { label: t('nav.home'), href: ROUTES.HOME, icon: Film },
    { label: t('nav.top100'), href: '/top100', icon: TrendingUp },
    { label: t('nav.random'), href: '/random', icon: Dice5 },
    { label: t('nav.wishlist'), href: ROUTES.WISHLIST, icon: Heart },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchQuery.trim()
    if (trimmed) {
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(trimmed)}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 items-center gap-4 px-4">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2 font-bold">
          <Film className="size-5" />
          <span className="hidden sm:inline">Movie Picker</span>
        </Link>

        {/* 桌面版導航 */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <Link to={item.href}>
                <item.icon className="size-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        {/* 搜尋列 - 桌面版 */}
        <form
          onSubmit={handleSearch}
          className="ml-auto hidden max-w-sm flex-1 md:flex"
        >
          <div className="relative w-full">
            <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <Input
              type="search"
              placeholder={t('common.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </form>

        {/* 右側操作 */}
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          {/* 語言切換 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Languages className="size-4" />
                <span className="hidden sm:inline">
                  {language === 'zh-TW' ? '繁體中文' : 'English'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage('zh-TW')}>
                繁體中文
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 登入/使用者 */}
          {isAuthenticated ? (
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              <User className="size-4" />
              <span className="hidden sm:inline">
                {user?.displayName ?? t('common.user')}
              </span>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => signIn()}>
              <User className="size-4" />
              <span className="hidden sm:inline">{t('common.login')}</span>
            </Button>
          )}

          {/* 手機版選單 */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">{t('common.menu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Film className="size-5" />
                  Movie Picker
                </SheetTitle>
              </SheetHeader>

              {/* 手機搜尋列 */}
              <form onSubmit={handleSearch} className="px-4">
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
                  <Input
                    type="search"
                    placeholder={t('common.search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </form>

              {/* 手機導航 */}
              <nav className="flex flex-col gap-1 px-4">
                {NAV_ITEMS.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className="justify-start"
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to={item.href}>
                      <item.icon className="size-4" />
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
