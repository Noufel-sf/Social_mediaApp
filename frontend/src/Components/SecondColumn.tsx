import React from 'react'
import StoriesList from './StoreisList'
import PostsList from './PostsList'


function SecondColumn() {
  return (
    // full width on small screens, proportional on larger
    <div className='flex flex-col gap-4 w-full lg:w-[50%] xl:w-[45%]'>
        <StoriesList />
        <PostsList />
    </div>
  )
}

export default SecondColumn