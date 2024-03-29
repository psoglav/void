import clsx from 'clsx';
import { useContext } from 'react';
import { useSelector } from 'react-redux'
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react"

import type { RootState } from '@/store'

import { Button } from "@/components/ui/button"
import { CreateList, ListNavGroup } from '@/components/list'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area';
import { SettingsContext } from '@/components/settings';
import { PoweredBy } from '@/components/powered-by';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Sidebar() {
  const lists = useSelector((state: RootState) => state.main.lists)
  const location = useLocation()
  const isRootPath = location.pathname === '/'
  const isImportant = location.pathname === '/important'
  const { setOpen } = useContext(SettingsContext)

  return (
    <div className='app-drag grid h-full grid-rows-[max-content_1fr_max-content] space-y-2 p-4 pr-1'>
      <div className='flex flex-col gap-4 pr-3'>
        <div className="app-no-drag flex gap-2">
          {!window.isElectronApp ? (
            <a href="https://aspiryx.space" className='grow'>
              <Button
                variant='ghost'
                className="flex size-full justify-start gap-2 uppercase" 
              >
                <Icon icon='ion:arrow-back-outline' />
                <span className="font-bold">HUB</span>
              </Button>
            </a>
          ) : (
            <Button
              variant='ghost'
              className="flex grow justify-start gap-3" 
            >
              <Avatar className='size-6'>
                <AvatarImage src="https://aspiryx.space/logo.svg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="font-bold">Profile</span>
            </Button>
          )}

          
          <Button variant='ghost' size='icon' onClick={() => setOpen(true)}>
            <Icon icon='material-symbols:settings' className='text-xl' />
          </Button>
        </div>

        <div className='app-no-drag flex flex-col gap-2'>
          <Link to='/important'>
            <Button variant={isImportant ? 'ghost-active' : 'ghost'} className={clsx('w-full justify-start', { 'text-muted-foreground': !isImportant })}>
              Important
            </Button>
          </Link>
          <Link to='/'>
            <Button variant={isRootPath ? 'ghost-active' : 'ghost'} className={clsx('w-full justify-start', { 'text-muted-foreground': !isRootPath })}>
              Tasks
            </Button>
          </Link>
        </div>
        <Separator />
      </div>

      <ScrollArea>
        <div className='relative h-full space-y-6 pr-3'>
          <ListNavGroup items={lists} />
        </div>
      </ScrollArea>

      <div className="space-y-2 pr-3">
        <CreateList />
        {!window.isElectronApp && <PoweredBy />}
      </div>
    </div>
  )
}