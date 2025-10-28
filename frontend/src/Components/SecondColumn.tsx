import React, { Suspense } from 'react'
import StoriesList from './StoreisList'
import PostsList from './PostsList'


function SecondColumn() {
  return (
    // full width on small screens, proportional on larger
    <div className='flex flex-col gap-4 w-full lg:w-[50%] xl:w-[45%]'>
        <StoriesList />
        <Suspense>
        <PostsList />
        </Suspense>
    </div>
  )
}

export default SecondColumn