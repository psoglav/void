
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';

import { Button } from '@/components/ui/button'
import { Task } from '@/types';
import TaskItem from './task-item'

interface Props {
  title: string
  tasks: Task[]
  defaultOpen?: boolean
}

export default function TaskGroup({ title, tasks, defaultOpen = false }: Props) {
  const [show, setShow] = useState(tasks.length ? defaultOpen : false)

  useEffect(() => {
    if(!show || !tasks.length) setShow(tasks.length ? defaultOpen : false)
  }, [show, tasks, defaultOpen])

  const renderTasks = (arr: Task[]) => {
    return arr.length ?
      <div className='flex flex-col gap-2'>
        {
          arr
            .map(item => (
              <TaskItem key={item.id} value={item} />
            ))
        }
      </div> : null
  }

  return (
    <div className="space-y-2">
      <Button variant={show ? 'secondary' : 'ghost'} onClick={() => setShow(!show)}>
        <Icon
          icon='material-symbols:keyboard-arrow-down-rounded' 
          className={clsx('mr-1 -rotate-90 text-lg transition-transform', {
            '!rotate-0': show
          })} 
        />
        <span>{ title }</span>
        {tasks.length ? <span className='px-2 text-muted-foreground'>{tasks.length}</span> : null}
      </Button>
      {
        show ? renderTasks(tasks) : null
      }
    </div>
  )
}