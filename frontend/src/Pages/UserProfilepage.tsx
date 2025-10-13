import { useState } from "react";
import { Camera } from "lucide-react";
import { useTheme } from "../Contexts/DarkModeContext";
import { useAuthStates } from "../ZustandStates/AuthStates";
import { useDirection } from "../hooks/useDirection";
import PostCard from "../Components/PostCard";
import UpdateProfileDialog from "../Components/UpdateProfileDialog";
import UpdateProfileDialogContent from "../Components/UpdateProfileContent";
import AddStoryDialog from "../Components/AddStoryDialog";
import AddStoryContent from "../Components/AddStoryContent";
import ConfirmUserCoverImg from "../Components/ConfirmUserCoverimg";



const UserProfilePage = () => {
  const { forceLTR } = useDirection();
  const { theme } = useTheme();
  const { CurrentUser } = useAuthStates();
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [UserCoverimg, setUserCoverimg] = useState<string>(CurrentUser?.CoverImg);
  console.log("UserCoverimg state:", UserCoverimg);

  const [CoverImgpreview, setCoverImgpreview] = useState<string>(CurrentUser?.CoverImg);
  const [showConfirmCoverimg , setshowConfirmCoverimg] = useState(false);

  // Handle profile image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImgpreview(URL.createObjectURL(file));
      setUserCoverimg(file);
      setshowConfirmCoverimg(true);
    }
  };


  const onClose = () => setIsUpdateDialogOpen(false);

  return (
    <div
      {...forceLTR()}
      className={`w-full min-h-screen ${
        theme === "dark" ? "bg-[#18181b] text-white" : "bg-gray-100"
      }`}
    >
      <div className="relative h-60">
        <img
          src={CoverImgpreview}
          alt="cover"
          className="w-full h-full object-cover"
        />
        <label className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-md shadow text-sm font-medium flex items-center gap-1 cursor-pointer">
          <Camera className="w-4 h-4" />
          Edit Cover Photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>

      <ConfirmUserCoverImg
        onCancel={() => {
          setshowConfirmCoverimg(false);
        }}
        showConfirmCoverimg={showConfirmCoverimg}
        newCover={UserCoverimg}
        userId={CurrentUser?._id || ""}
      />




      {/* Profile Section */}
      <div className="relative max-w-5xl mx-auto px-4">
        <div className="absolute -top-46 left-6 flex items-center gap-5">
          <img
            src={CurrentUser?.ProfileImg || "/user.png"}
            alt={CurrentUser?.username}
            className="w-40 h-40 rounded-full border-4 border-white object-cover"
          />
          <div className="flex flex-col">
            <h1 className="text-4xl capitalize gap-3">
              {CurrentUser?.username}
            </h1>
            <h1 className="text-xl ">{CurrentUser?.nickname}</h1>
          </div>
        </div>

        <div className="mt-50 flex flex-col md:flex-row md:items-center md:justify-between">
          {/* <div>
            <h1 className="text-2xl font-bold">{currentCurrentUser.name}</h1>
            <p>{currentCurrentUser.friends} friends</p>
          </div> */}
          <div className="flex gap-2 mt-3 md:mt-0">
            <button className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 cursor-pointer"
            onClick={() => setIsAddStoryModalOpen(true)}
            >
              Add to Story
            </button>
            <AddStoryDialog
                isOpen={isAddStoryModalOpen}
                onClose={() => setIsAddStoryModalOpen(false)}
            >
                <AddStoryContent setIsModalOpen={setIsAddStoryModalOpen} />
            </AddStoryDialog>

            <button
              className="bg-gray-200 px-4 py-2 rounded-md font-medium cursor-pointer hover:bg-gray-300"
              onClick={() => {
                setIsUpdateDialogOpen(true);
              }}
            >
              Edit Profile
            </button>
          </div>
          
            <UpdateProfileDialog
              isOpen={isUpdateDialogOpen}
              onClose={onClose}
              children={
                <UpdateProfileDialogContent
                  setIsModalOpen={setIsUpdateDialogOpen}
                />
              }
            />
          
        </div>

        {/* Tabs */}
        <div className="mt-6 border-t flex gap-6 text-gray-600 font-medium">
          <button className="py-3 border-b-2 border-blue-600 text-blue-600">
            Posts
          </button>
          <button className="py-3 hover:text-blue-600">More</button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-[40%_60%] gap-6 px-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Bio */}
          <div className="p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2 capitalize">bio</h3>
            <p className="text-sm">{CurrentUser?.bio}</p>
          </div>

          {/* Friends
          <div className="p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Friends</h3>
            <div className="grid grid-cols-3 gap-2">
              {currentCurrentUser.friendsList.slice(0, 6).map((friend, i) => (
                <div key={i} className="text-center">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-full h-24 object-cover rounded"
                  />
                  <p className="text-xs mt-1 truncate">{friend.name}</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/* Right Column (Posts) */}
        <div className="space-y-4">
          {CurrentUser?.Posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
