
import { useSelector } from 'react-redux'

import type { RootState } from '@/store'
import type { Task } from '@/types/task';

import TaskItem from '@/components/task-item'
import TaskGroup from '@/components/task-group';

function TaskList() {
  const tasks = useSelector((state: RootState) => state.main.tasks)

  const completedTasks = tasks.filter(item => item.completed)
  const uncompletedTasks = tasks.filter(item => !item.completed)

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
    <div className="space-y-4 p-2 py-4 lg:px-16">
      {
        renderTasks(uncompletedTasks)
      }
      <TaskGroup tasks={completedTasks} title='Completed' />
    </div>
  )
}

export default TaskList