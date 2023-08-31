'use client'
import Image from 'next/image'
import React from 'react'
import logo from '/public/images/logo.webp'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobNavMenu from './MobNavMenu'

const Navbar = () => {
  const path = usePathname()

  return (
    <header className="flex w-full items-center justify-between gap-y-2 px-6 py-4 tablet:gap-x-10 lcd:gap-x-24 font-medium text-white  tablet:justify-center lp:px-24 lp:text-lg">
      <nav className=" hidden gap-x-4 child-hover:text-pri_yellow tablet:flex  lp:gap-x-12 lcd:gap-x-16 child:lcd:text-lg">
        <Link href={'/'} className={`${path === '/' && 'text-pri_yellow'}`}>
          HOME
        </Link>
        <Link href={'/gaming'} className={`${path === '/world' && 'text-pri_yellow'}`}>
          GAMES
        </Link>
        <Link href={'/anime'} className={`${path === '/nft' && 'text-pri_yellow'}`}>
          ANIME
        </Link>
      </nav>
      <Image
        priority
        src={logo}
        alt="EZZSTAR logo"
        className="  max-w-[220px]  "
      />

      <nav className=" hidden gap-x-4 child-hover:text-pri_yellow tablet:flex  lp:gap-x-12 lcd:gap-x-16 child:lcd:text-lg">
        <Link href={'/blogs'} className={`${path === '/events' && 'text-pri_yellow'}`}>
          BLOGS
        </Link>
        <Link href={'/events'} className={`${path === '/merch' && 'text-pri_yellow'}`}>
          EVENTS
        </Link>
        <Link href={'/account'} className={`${path === '/future' && 'text-pri_yellow'}`}>
          ACCOUNT
        </Link>
      </nav>
      <MobNavMenu />
    </header>
  )
}

export default Navbar
