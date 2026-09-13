
function UserProfilePostCard({profileimg, username, location}: {profileimg: string, username: string, location: string}) {
  return (
    <div className='flex items-center gap-4'>
        <img src={profileimg} alt="profileimg" />
        <div className="flex flex-col gap-2">
            <h1 className="font-semibold">{username}</h1>
            <h3 className='text-xl text-gray-300 font-bold'>{location}</h3>
        </div>
    </div>
  )
}

export default UserProfilePostCard