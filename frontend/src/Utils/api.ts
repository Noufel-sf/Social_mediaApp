import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from "axios";
import { mockDb } from "./mockDb";

export const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

// Helper to convert File to compressed Data URL (prevents localStorage quota errors)
const fileToDataUrl = (file: File | Blob, maxWidth = 1400, quality = 0.85): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (typeof result !== "string" || !result.startsWith("data:image")) {
        resolve(result);
        return;
      }
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        } else {
          resolve(result);
        }
      };
      img.onerror = () => resolve(result);
      img.src = result;
    };
    reader.onerror = () => resolve("/coverimg.jpg");
    reader.readAsDataURL(file);
  });
};

// Custom Axios Mock Adapter
api.defaults.adapter = async (config: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
  // Simulate network latency for natural UI transitions
  await new Promise((resolve) => setTimeout(resolve, 150));

  let rawUrl = config.url || "";
  // Strip protocol and host if present
  let url = rawUrl.replace(/^https?:\/\/[^\/]+/, "");
  // Strip /api prefix if present
  url = url.replace(/^\/api(\/|$)/, "/");
  // Normalize consecutive slashes
  url = url.replace(/\/+/g, "/");
  if (!url.startsWith("/")) {
    url = "/" + url;
  }

  const method = (config.method || "get").toLowerCase();
  console.log(`[Mock API] 📡 ${method.toUpperCase()} ${url}`, config.data);

  const createResponse = (data: any, status = 200): AxiosResponse => ({
    data,
    status,
    statusText: status === 200 ? "OK" : "Error",
    headers: {},
    config,
  });

  try {
    // ---------------- AUTH ROUTES ----------------
    if (url === "/auth/currentuser" && method === "get") {
      const user = mockDb.getCurrentUser();
      if (!user) {
        return Promise.reject({
          response: createResponse({ message: "No active user session" }, 401),
          status: 401,
          message: "No active user session",
        });
      }
      return createResponse(user);
    }

    if (url === "/auth/login" && method === "post") {
      let data = config.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          // ignore
        }
      }
      const username = data?.username || "Noufel";
      const { user } = mockDb.login(username);
      return createResponse({ user, message: "Login successful" });
    }

    if (url === "/auth/register" && method === "post") {
      let data = config.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          // ignore
        }
      }
      const newUser = mockDb.register({
        username: data.username,
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      });
      return createResponse(newUser);
    }

    if (url === "/auth/logout" && method === "post") {
      mockDb.logout();
      return createResponse({ message: "Logged out successfully" });
    }

    // Cover image update: /auth/update/usercoverimg/:id
    if (url.startsWith("/auth/update/usercoverimg/") && method === "put") {
      const userId = url.split("/").pop() || "";
      let coverUrl = "/coverimg.jpg";

      if (config.data instanceof FormData) {
        const file = config.data.get("CoverImg");
        if (file instanceof Blob || (file && typeof file === "object")) {
          coverUrl = await fileToDataUrl(file as File);
        } else if (typeof file === "string" && file.length > 0) {
          coverUrl = file;
        }
      } else if (config.data && typeof config.data === "object") {
        const raw = (config.data as any).CoverImg;
        if (raw instanceof Blob) {
          coverUrl = await fileToDataUrl(raw);
        } else if (typeof raw === "string" && raw.length > 0) {
          coverUrl = raw;
        }
      }

      const updated = mockDb.updateUserCover(userId, coverUrl);
      return createResponse({ user: updated, message: "Cover image updated" });
    }

    // User profile update: /auth/update/:id
    if (url.startsWith("/auth/update/") && method === "put") {
      const userId = url.split("/").pop() || "";
      let username: string | undefined;
      let bio: string | undefined;
      let profileImg: string | undefined;

      if (config.data instanceof FormData) {
        username = config.data.get("username") as string || undefined;
        bio = config.data.get("bio") as string || undefined;
        const file = config.data.get("ProfileImg");
        if (file instanceof File) {
          profileImg = await fileToDataUrl(file);
        }
      } else if (config.data) {
        let parsed = config.data;
        if (typeof parsed === "string") parsed = JSON.parse(parsed);
        username = parsed.username;
        bio = parsed.bio;
        profileImg = parsed.ProfileImg;
      }

      const updated = mockDb.updateUser(userId, {
        username,
        bio,
        ProfileImg: profileImg,
      });
      return createResponse({ user: updated, message: "User profile updated" });
    }

    // Single User profile view: /auth/:id
    if (url.startsWith("/auth/") && method === "get") {
      const userId = url.split("/").pop() || "";
      const user = mockDb.getUserById(userId);
      if (!user) {
        return createResponse({ message: "User not found" }, 404);
      }
      return createResponse({ user });
    }

    // ---------------- POSTS ROUTES ----------------
    if (url === "/posts/all" && method === "get") {
      const posts = mockDb.getPosts();
      return createResponse({ posts });
    }

    if (url === "/posts/create" && method === "post") {
      let content = "";
      let author = "";
      const postCovers: string[] = [];

      if (config.data instanceof FormData) {
        content = (config.data.get("content") as string) || "";
        author = (config.data.get("Author") as string) || "";
        const files = config.data.getAll("PostCovers");
        for (const f of files) {
          if (f instanceof File) {
            const dataUrl = await fileToDataUrl(f);
            postCovers.push(dataUrl);
          } else if (typeof f === "string") {
            postCovers.push(f);
          }
        }
      } else if (config.data) {
        let parsed = config.data;
        if (typeof parsed === "string") parsed = JSON.parse(parsed);
        content = parsed.content || "";
        author = parsed.Author || "";
        if (Array.isArray(parsed.PostCovers)) {
          postCovers.push(...parsed.PostCovers);
        }
      }

      if (postCovers.length === 0) {
        postCovers.push("/Post.jpg");
      }

      const newPost = mockDb.createPost({
        content,
        authorId: author,
        postCovers,
      });
      return createResponse({ post: newPost, message: "Post created successfully" });
    }

    if (url.startsWith("/posts/delete/") && method === "delete") {
      const postId = url.split("/").pop() || "";
      mockDb.deletePost(postId);
      return createResponse({ message: "Post deleted successfully" });
    }

    // ---------------- STORIES ROUTES ----------------
    if (url === "/stories/all" && method === "get") {
      const stories = mockDb.getStories();
      return createResponse(stories);
    }

    if (url === "/stories/create" && method === "post") {
      let authorId = "";
      let caption = "";
      let storyFile = "/story.jpg";

      if (config.data instanceof FormData) {
        authorId = (config.data.get("Author_id") as string) || "";
        caption = (config.data.get("caption") as string) || "";
        const file = config.data.get("storyFile");
        if (file instanceof File) {
          storyFile = await fileToDataUrl(file);
        }
      }

      const newStory = mockDb.createStory({
        authorId,
        caption,
        storyFile,
      });
      return createResponse(newStory);
    }

    // ---------------- FRIENDS & REQUESTS ROUTES ----------------
    if (url === "/friends/suggestions" && method === "get") {
      const friendSuggestions = mockDb.getFriendSuggestions();
      return createResponse({ friendSuggestions });
    }

    if (url === "/friends/all" && method === "get") {
      const friendRequests = mockDb.getFriendRequests();
      return createResponse({ friendRequests });
    }

    if (url === "/friends/list" && method === "get") {
      const friends = mockDb.getFriends();
      return createResponse({ friends });
    }

    if (url.startsWith("/friends/send/") && method === "post") {
      const targetUserId = url.split("/").pop() || "";
      const req = mockDb.sendFriendRequest(targetUserId);
      return createResponse({ friendRequest: req, message: "Friend request sent" });
    }

    if (url.startsWith("/friends/accept/") && method === "put") {
      const requestId = url.split("/").pop() || "";
      mockDb.acceptFriendRequest(requestId);
      return createResponse({ message: "Friend request accepted" });
    }

    if (url.startsWith("/friends/reject/") && method === "put") {
      const requestId = url.split("/").pop() || "";
      mockDb.rejectFriendRequest(requestId);
      return createResponse({ message: "Friend request rejected" });
    }

    // ---------------- MESSAGES ROUTES ----------------
    if (url.startsWith("/messages/") && method === "get") {
      const otherUserId = url.split("/").pop() || "";
      const messages = mockDb.getMessages(otherUserId);
      return createResponse(messages);
    }

    // Fallback for unhandled mock endpoints
    console.warn(`[Mock API] ⚠️ Unhandled endpoint: ${method.toUpperCase()} ${url}`);
    return createResponse({ success: true });
  } catch (error: any) {
    console.error(`[Mock API] ❌ Error handling ${method.toUpperCase()} ${url}:`, error);
    return Promise.reject({
      response: createResponse({ message: error.message || "Internal Mock Error" }, 500),
      message: error.message,
    });
  }
};

export default api;