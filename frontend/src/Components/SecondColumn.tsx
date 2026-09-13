import { Suspense } from 'react'
import StoriesList from './StoreisList'
import PostsList from './PostsList'
import PostComposer from './PostComposer'
import { useAuthStates } from '../ZustandStates/AuthStates'


function SecondColumn() {
  const { CurrentUser } = useAuthStates();
  return (
    // full width on small screens, proportional on larger
    <div className='flex flex-col gap-4 w-full lg:w-[50%] xl:w-[45%]'>
        <StoriesList />
        <PostComposer
             userAvatar={CurrentUser?.ProfileImg || "/user.png"}
          />

        <Suspense fallback={<div>Loading posts...</div>}>
        <PostsList />
        </Suspense>
    </div>
  )
}

export default SecondColumn