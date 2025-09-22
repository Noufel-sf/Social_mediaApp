import React from "react";
import { Camera } from "lucide-react";
import { useParams } from "react-router-dom";
import { useTheme } from "../Contexts/DarkModeContext";
import { useQuery } from "@tanstack/react-query";
import { GetUserProfileDetailsById } from "../ServisesApi/UserApi";
import type { User } from "../Utils/Types";
import { sampleUser } from "../Utils/data";

const UserProfilePage = () => {
  const { theme } = useTheme();
  const { id } = useParams();

  const { data: user, isLoading, isError } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => GetUserProfileDetailsById(id!),
    enabled: !!id, // only fetch if id exists
  });

  const currentUser = user || sampleUser;

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center">Error loading user</p>;

  return (
    <div
      className={`w-full min-h-screen ${
        theme === "dark" ? "bg-[#18181b] text-white" : "bg-gray-100"
      }`}
    >
      {/* Cover Photo */}
      <div className="relative h-60">
        <img
          src={currentUser.coverPhoto}
          alt="cover"
          className="w-full h-full object-cover"
        />
        <button className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-md shadow text-sm font-medium flex items-center gap-1 cursor-pointer">
          <Camera className="w-4 h-4" />
          Edit Cover Photo
        </button>
      </div>

      {/* Profile Section */}
      <div className="relative max-w-5xl mx-auto px-4">
        <div className="absolute -top-16 left-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-40 h-40 rounded-full border-4 border-white object-cover"
          />
        </div>

        <div className="mt-24 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{currentUser.name}</h1>
            <p>{currentUser.friends} friends</p>
          </div>
          <div className="flex gap-2 mt-3 md:mt-0">
            <button className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 cursor-pointer">
              Add to Story
            </button>
            <button className="bg-gray-200 px-4 py-2 rounded-md font-medium cursor-pointer hover:bg-gray-300">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-t flex gap-6 text-gray-600 font-medium">
          <button className="py-3 border-b-2 border-blue-600 text-blue-600">
            Posts
          </button>
          <button className="py-3 hover:text-blue-600">Photos</button>
          <button className="py-3 hover:text-blue-600">Videos</button>
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
            <p className="text-sm">{currentUser.bio}</p>
          </div>

          {/* Photos */}
          <div className="p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Photos</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {currentUser.photos.slice(0, 6).map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt="user-photo"
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>

          {/* Friends */}
          <div className="p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Friends</h3>
            <div className="grid grid-cols-3 gap-2">
              {currentUser.friendsList.slice(0, 6).map((friend, i) => (
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
          </div>
        </div>

        {/* Right Column (Posts) */}
        <div className="space-y-4">
          {currentUser.posts.map((post) => (
            <div key={post.id} className="p-4 rounded-lg shadow">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-sm">{currentUser.name}</h4>
                  <p className="text-xs">
                    {new Date(post.createdAt).toDateString()}
                  </p>
                </div>
              </div>
              <p className="text-sm mb-2">{post.content}</p>
              {post.imgUrl && (
                <img
                  src={post.imgUrl}
                  alt="post"
                  className="w-full rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
