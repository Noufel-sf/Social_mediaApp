import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, ArrowLeft, Calendar, UserCheck, Check, X } from "lucide-react";
import { useTheme } from "../Contexts/DarkModeContext";
import { useAuthStates } from "../ZustandStates/AuthStates";
import { useDirection } from "../hooks/useDirection";
import Topbar from "../Components/TopBar";
import PostCard from "../Components/PostCard";
import UpdateProfileDialog from "../Components/UpdateProfileDialog";
import UpdateProfileDialogContent from "../Components/UpdateProfileContent";
import AddStoryDialog from "../Components/AddStoryDialog";
import AddStoryContent from "../Components/AddStoryContent";
import ConfirmUserCoverImg from "../Components/ConfirmUserCoverimg";
import { getUserProfilePageData } from "../ServisesApi/UserProfileApi";
import type { Post } from "../Utils/Types";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import api from "../Utils/api";

export default function UserProfilePage() {
  const { forceLTR } = useDirection();
  const { theme } = useTheme();
  const { CurrentUser } = useAuthStates();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const coverInputRef = useRef<HTMLInputElement>(null);

  const {
    data: userDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => getUserProfilePageData(id!),
    enabled: !!id,
  });

  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isSavingCover, setIsSavingCover] = useState(false);

  const [UserCoverimg, setUserCoverimg] = useState<string | File>(
    userDetails?.CoverImg || ""
  );
  const [CoverImgpreview, setCoverImgpreview] = useState<string>(
    userDetails?.CoverImg || ""
  );

  useEffect(() => {
    if (userDetails?.CoverImg) {
      setCoverImgpreview(userDetails.CoverImg);
      setUserCoverimg(userDetails.CoverImg);
    }
  }, [userDetails?.CoverImg]);

  const [showConfirmCoverimg, setshowConfirmCoverimg] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Topbar />
        <div className="flex-1 flex justify-center items-center">
          <TailSpin
            height="60"
            width="60"
            color={"var(--primary-color)"}
            ariaLabel="loading"
          />
        </div>
      </div>
    );
  }

  if (isError || !userDetails) {
    return (
      <div className="flex flex-col min-h-screen">
        <Topbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <h2 className="text-2xl font-bold">User profile not found</h2>
          <p className="text-slate-500 dark:text-zinc-400">
            The profile you are looking for might have been removed or does not exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home Feed
          </Link>
        </div>
      </div>
    );
  }

  const isCurrentUser = Boolean(
    CurrentUser?._id && (CurrentUser._id === id || CurrentUser._id === userDetails?._id)
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImgpreview(URL.createObjectURL(file));
      setUserCoverimg(file);
      setshowConfirmCoverimg(true);
      e.target.value = "";
    }
  };

  const handleCancelCover = () => {
    setCoverImgpreview(userDetails?.CoverImg || CurrentUser?.CoverImg || "");
    setUserCoverimg(userDetails?.CoverImg || CurrentUser?.CoverImg || "");
    setshowConfirmCoverimg(false);
  };

  const handleSaveCover = async () => {
    if (!UserCoverimg || !CurrentUser?._id) return;
    setIsSavingCover(true);

    const form = new FormData();
    form.append("CoverImg", UserCoverimg);

    try {
      const targetUserId = userDetails?._id || CurrentUser._id;
      const res = await api.put(`/auth/update/usercoverimg/${targetUserId}`, form);
      const updatedUser = res.data.user;

      useAuthStates.getState().setCurrentUser(updatedUser);
      setCoverImgpreview(updatedUser.CoverImg);
      setUserCoverimg(updatedUser.CoverImg);
      setshowConfirmCoverimg(false);

      await queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      await queryClient.invalidateQueries({ queryKey: ["userProfile", targetUserId] });

      toast.success("Cover photo updated successfully!");
    } catch (err) {
      toast.error("Failed to update cover photo");
      console.error(err);
    } finally {
      setIsSavingCover(false);
    }
  };

  const onClose = () => setIsUpdateDialogOpen(false);

  return (
    <div
      {...forceLTR()}
      className={`w-full min-h-screen flex flex-col transition-colors duration-200 ${
        theme === "dark"
          ? "bg-[var(--dark-bg)] text-zinc-100"
          : "bg-[#f8fafc] text-slate-900"
      }`}
    >
      {/* Universal TopBar */}
      <Topbar />

      <main className="flex-1 pb-16">
        {/* Navigation Breadcrumb / Back Bar */}
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium text-slate-700 dark:text-zinc-200 bg-white/80 dark:bg-zinc-800/80 hover:bg-slate-100 dark:hover:bg-zinc-700 border border-slate-200/80 dark:border-zinc-700 shadow-sm backdrop-blur-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-500" /> Back to Feed
          </Link>

          <span className="text-xs text-slate-400 dark:text-zinc-500 font-mono">
            {isCurrentUser ? "Your Profile" : `@${userDetails.username}`}
          </span>
        </div>

        {/* Cover Banner */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 dark:border-zinc-800/60 bg-slate-200 dark:bg-zinc-800">
            <img
              src={CoverImgpreview}
              alt="Profile Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {isCurrentUser && (
              <div className="absolute bottom-4 right-4 z-40">
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {showConfirmCoverimg ? (
                  <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-xl animate-in fade-in duration-150">
                    <button
                      type="button"
                      onClick={handleCancelCover}
                      disabled={isSavingCover}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 hover:bg-white/30 text-white cursor-pointer transition disabled:opacity-50"
                    >
                      <X className="w-3.5 h-3.5" /> Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveCover}
                      disabled={isSavingCover}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-sm transition disabled:opacity-50"
                    >
                      <Check className="w-3.5 h-3.5" /> {isSavingCover ? "Saving..." : "Save Cover"}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    className="bg-black/60 hover:bg-black/80 active:scale-95 text-white backdrop-blur-md px-4 py-2 rounded-full shadow-lg text-xs sm:text-sm font-medium flex items-center gap-2 cursor-pointer transition border border-white/20"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Edit Cover</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Cover Change Confirmation Bar (Top fallback) */}
        <ConfirmUserCoverImg
          onCancel={handleCancelCover}
          onSuccess={(newUrl) => {
            setCoverImgpreview(newUrl);
            setUserCoverimg(newUrl);
            setshowConfirmCoverimg(false);
          }}
          showConfirmCoverimg={showConfirmCoverimg}
          newCover={UserCoverimg}
          userId={userDetails?._id || CurrentUser?._id || ""}
        />

        {/* Profile Info Header */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-20">
          <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20">
            {/* Avatar & Identifiers */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white dark:border-zinc-900 shadow-xl overflow-hidden bg-white dark:bg-zinc-800 flex-shrink-0 z-30">
                <img
                  src={userDetails?.ProfileImg || "/user.png"}
                  alt={userDetails?.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mb-2">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight capitalize">
                    {userDetails?.username}
                  </h1>
                  <span className="p-1 rounded-full bg-indigo-500/10 text-indigo-500">
                    <UserCheck className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {userDetails?.nickname || `@${userDetails.username.toLowerCase()}`}
                </p>
                <p className="text-xs text-slate-400 dark:text-zinc-500 flex items-center justify-center sm:justify-start gap-1 mt-1">
                  <Calendar className="w-3.5 h-3.5" /> Joined {new Date(userDetails.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Profile Action Buttons */}
            {isCurrentUser ? (
              <div className="flex items-center justify-center gap-2.5 pb-2">
                <button
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold text-sm shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
                  onClick={() => setIsAddStoryModalOpen(true)}
                >
                  + Add Story
                </button>

                <AddStoryDialog
                  isOpen={isAddStoryModalOpen}
                  onClose={() => setIsAddStoryModalOpen(false)}
                >
                  <AddStoryContent setIsModalOpen={setIsAddStoryModalOpen} />
                </AddStoryDialog>

                <button
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 rounded-full font-semibold text-sm border border-slate-200 dark:border-zinc-700 transition cursor-pointer"
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
            ) : (
              <div className="flex items-center justify-center gap-2.5 pb-2">
                <Link
                  to="/messages"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold text-sm shadow-sm transition cursor-pointer"
                >
                  Message
                </Link>
              </div>
            )}
          </div>

          {/* Clean Segment Tabs */}
          <div className="mt-8 border-b border-slate-200 dark:border-zinc-800 flex gap-8">
            <button className="pb-3 border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
              Posts ({userDetails?.Posts?.length || 0})
            </button>
            <button className="pb-3 text-slate-500 dark:text-zinc-400 hover:text-indigo-500 text-sm font-medium transition">
              About
            </button>
            <button className="pb-3 text-slate-500 dark:text-zinc-400 hover:text-indigo-500 text-sm font-medium transition">
              Friends ({userDetails?.friends?.length || 0})
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-[38%_62%] gap-6 px-4">
          {/* Left Column (Bio + Friends) */}
          <div className="space-y-5">
            {/* Bio Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm">
              <h3 className="font-bold text-sm tracking-wide uppercase text-slate-500 dark:text-zinc-400 mb-2.5">
                Bio
              </h3>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
                {userDetails?.bio || "No bio added yet."}
              </p>
            </div>

            {/* Friends Card */}
            {userDetails?.friends && userDetails.friends.length > 0 && (
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-zinc-100">
                      Friends
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-zinc-500">
                      {userDetails.friends.length} friends
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {userDetails.friends.map((friend: any) => (
                    <Link
                      to={`/userprofile/${friend._id}`}
                      key={friend._id}
                      className="group flex flex-col items-center text-center p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/60 transition"
                    >
                      <img
                        src={friend.ProfileImg || "/user.png"}
                        alt={friend.username}
                        className="w-16 h-16 object-cover rounded-xl shadow-xs group-hover:scale-105 transition-transform"
                      />
                      <p className="text-xs font-medium mt-1.5 truncate w-full text-slate-700 dark:text-zinc-300 group-hover:text-indigo-500">
                        {friend.username}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Posts List) */}
          <div className="space-y-4">
            {userDetails?.Posts && userDetails.Posts.length > 0 ? (
              userDetails.Posts.map((post: Post) => (
                <PostCard key={post._id} post={post} />
              ))
            ) : (
              <div className="p-8 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm">
                <p className="text-slate-400 dark:text-zinc-500 text-sm">
                  No posts published yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
