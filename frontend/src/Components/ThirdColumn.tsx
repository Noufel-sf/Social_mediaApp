import MessagesList from './MessagesList'
import FriendsRequestsList from './FriendsRequestsList'

function ThirdColumn() {
  return (
    // hidden on small screens; appears from md upwards
    <div className='hidden lg:flex flex-col gap-5 md:w-1/4 lg:w-1/5 xl:w-1/5'>
      <MessagesList />
      <FriendsRequestsList />
    </div>
  )
}

export default ThirdColumn