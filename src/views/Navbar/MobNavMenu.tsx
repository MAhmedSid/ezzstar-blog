'use client'
import React, { useState, useRef } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { X, Menu } from 'lucide-react'
import Link from 'next/link'

const MobNavMenu = () => {
  const [open, setOpen] = useState(false)
  const toggleMenu = () => {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  return (
    <DropdownMenu onOpenChange={toggleMenu}>
      <DropdownMenuTrigger className="block tablet:hidden">
        {open === false ? (
          <Menu className="h-9  w-9 flex-[0.1] rounded-md border-2 border-pri_blue stroke-pri_blue  animate-in" />
        ) : (
          <X  className="h-9 w-9  flex-[0.1] rounded-md border-2 border-pri_blue stroke-pri_blue  animate-in" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <div className=" bg-gradient-to-b from-pri_yellow  to-pri_blue p-[2px]">
          <div className="flex flex-col items-center justify-center rounded-md bg-black text-white  child-hover:text-pri_yellow ">
            <DropdownMenuItem>
              <Link href={'/'} className='text-lg' >HOME</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/world'} className='text-lg' >GAMES</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/nft'} className='text-lg' >ANIME</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/events'} className='text-lg' >BLOGS</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/merch'} className='text-lg' >EVENTS</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/future'} className='text-lg' >ACCOUNT</Link>
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MobNavMenu
