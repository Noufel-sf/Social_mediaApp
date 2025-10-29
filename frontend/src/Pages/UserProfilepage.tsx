import { useState , useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
import { getUserProfilePageData } from "../ServisesApi/UserProfileApi";
import type { User, Post } from "../Utils/Types";
import { TailSpin } from "react-loader-spinner";

export default function UserProfilePage() {
  const { forceLTR } = useDirection();
  const { theme } = useTheme();
  const { CurrentUser } = useAuthStates();
  const { id } = useParams<{ id: string }>();

  const {
    data: userDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => getUserProfilePageData(id!),
    enabled: !!id, // only run if id exists
  });
  
  const navigate = useNavigate();
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);


  const [UserCoverimg, setUserCoverimg] = useState<string | File>(
    userDetails?.CoverImg || ""
  );
  const [CoverImgpreview, setCoverImgpreview] = useState<string>(
    userDetails?.CoverImg || ""
  );

  // 🔧 Update cover img when userDetails changes
useEffect(() => {
  if (userDetails?.CoverImg) {
    setCoverImgpreview(userDetails.CoverImg);
    setUserCoverimg(userDetails.CoverImg);
  }
}, [userDetails?.CoverImg]);




  // console.log("user cover img " ,userDetails?.CoverImg);
  
  const [showConfirmCoverimg, setshowConfirmCoverimg] = useState(false);

  if (isLoading)
    return (
      <div className="flex justify-center text-center w-full items-center h-screen">
        <TailSpin
          height="80"
          width="100"
          color={"var(--primary-color)"}
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  if (isError) navigate("/login");

  const isCurrentUser = userDetails?._id === CurrentUser?._id;

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
      {/* Cover Image */}
      <div className="relative h-60">
        <img
          src={CoverImgpreview}
          alt="cover"
          className="w-full h-full object-cover"
        />

        {isCurrentUser && (
          <label className={`absolute bottom-3 right-3 bg-white px-3 py-1 rounded-md shadow text-sm font-medium flex items-center gap-1 cursor-pointer text-black`}>
            <Camera className="w-4 h-4" />
            Edit Cover Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>

      <ConfirmUserCoverImg
        onCancel={() => setshowConfirmCoverimg(false)}
        showConfirmCoverimg={showConfirmCoverimg}
        newCover={UserCoverimg}
        userId={userDetails?._id || ""}
      />

      {/* Profile Section */}
      <div className="relative max-w-5xl mx-auto px-4">
        <div className="mt-12 flex items-center gap-5">
          <img
            src={userDetails?.ProfileImg || "/user.png"}
            alt={userDetails?.username}
            className="w-40 h-40 rounded-full border-4 border-white object-cover"
          />
          <div className="flex flex-col">
            <h1 className="text-4xl capitalize">{userDetails?.username}</h1>
            <h1 className="text-xl">{userDetails?.nickname}</h1>
          </div>
        </div>

        {isCurrentUser && (
          <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 mt-3 md:mt-0">
              <button
                className="bg-[var(--primary-color)] text-white px-4 py-2 cursor-pointer rounded-md font-medium hover:bg-blue-700"
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
                className="bg-gray-200 px-4 py-2 rounded-md font-medium cursor-pointer text-black hover:bg-gray-300"
                onClick={() => setIsUpdateDialogOpen(true)}
              >
                Edit Profile
              </button>

              <UpdateProfileDialog
                isOpen={isUpdateDialogOpen}
                onClose={onClose}
              >
                <UpdateProfileDialogContent
                  setIsModalOpen={setIsUpdateDialogOpen}
                />
              </UpdateProfileDialog>
            </div>
          </div>
        )}

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
          <div className="p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2 capitalize">Bio</h3>
            <p className="text-sm">{userDetails?.bio}</p>
          </div>

          {/* Friends */}
          {userDetails?.friends && userDetails.friends.length > 0 && (
            <div className="p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Friends</h3>
              <div className="grid grid-cols-3 gap-2">
                {userDetails.friends.map((friend: User) => (
                  <div key={friend._id} className="text-center">
                    <img
                      src={friend.ProfileImg || "/user.png"}
                      alt={friend.username}
                      className="w-full h-24 object-cover rounded"
                    />
                    <p className="text-xs mt-1 truncate">{friend.username}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Posts) */}
        <div className="space-y-4">
          {userDetails?.Posts?.map((post: Post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
