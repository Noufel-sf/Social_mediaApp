import type { User, Post, Story, FriendRequest, Message } from "./Types";

const STORAGE_KEY = "cozmeet_mock_database_v2";

export interface MockDatabase {
  users: User[];
  posts: Post[];
  stories: Story[];
  friendRequests: FriendRequest[];
  messages: Message[];
  currentUserId: string | null;
}

const INITIAL_USERS: User[] = [
  {
    _id: "user_noufel",
    username: "Noufel",
    nickname: "@noufel_dev",
    email: "noufel@example.com",
    bio: "Passionate Full-Stack Developer & UI/UX enthusiast. Building modern reactive web experiences 🚀",
    ProfileImg: "/profile-1.jpg",
    CoverImg: "/coverimg.jpg",
    friends: [],
    Posts: [],
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "user_edem",
    username: "Edem Quist",
    nickname: "@edem",
    email: "edem@example.com",
    bio: "Software Engineer & Open Source contributor. Coffee & Code ☕",
    ProfileImg: "/profile.jpg",
    CoverImg: "/coverimg.jpg",
    friends: [],
    Posts: [],
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "user_franca",
    username: "Franca Delia",
    nickname: "@franca",
    email: "franca@example.com",
    bio: "Product Designer & Digital Artist 🎨 Exploring minimalist aesthetics.",
    ProfileImg: "/profile-3.jpg",
    CoverImg: "/coverimg.jpg",
    friends: [],
    Posts: [],
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "user_daniella",
    username: "Daniella Jackson",
    nickname: "@daniella",
    email: "daniella@example.com",
    bio: "Marketing strategist, globe trotter & photography lover 📷✈️",
    ProfileImg: "/profile-1.jpg",
    CoverImg: "/coverimg.jpg",
    friends: [],
    Posts: [],
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "user_alex",
    username: "Alex Rivera",
    nickname: "@arivera",
    email: "alex@example.com",
    bio: "Mobile App Developer | React Native & Flutter geek 📱",
    ProfileImg: "/profile.jpg",
    CoverImg: "/coverimg.jpg",
    friends: [],
    Posts: [],
    createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "user_sarah",
    username: "Sarah Connor",
    nickname: "@sarah_c",
    email: "sarah@example.com",
    bio: "Cybersecurity Analyst & tech speaker 🛡️ Always curious.",
    ProfileImg: "/profile-3.jpg",
    CoverImg: "/coverimg.jpg",
    friends: [],
    Posts: [],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const INITIAL_POSTS: Post[] = [
  {
    _id: "post_1",
    content: "Excited to share that our new React web application is running flawlessly! Clean UI, dark mode support, and smooth responsiveness throughout. What do you all think? 🚀✨",
    Author: INITIAL_USERS[0],
    PostCovers: ["/Post.jpg"],
    likes: 42,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "post_2",
    content: "Weekend road trip up to the mountain hills. Nothing clears the mind like fresh morning air and good friends! 🌄",
    Author: INITIAL_USERS[1],
    PostCovers: ["/coverimg.jpg"],
    likes: 87,
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "post_3",
    content: "Just finished redesigning our brand interface guidelines. Focusing on typography, soft glass shadows, and vibrant accent highlights! 🎨✨",
    Author: INITIAL_USERS[2],
    PostCovers: ["/story-5.jpg"],
    likes: 129,
    createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "post_4",
    content: "Golden hour capture from yesterday's sunset photoshoot. Truly magical light! 📸🌇",
    Author: INITIAL_USERS[3],
    PostCovers: ["/Post.jpg"],
    likes: 64,
    createdAt: new Date(Date.now() - 50 * 60 * 60 * 1000).toISOString(),
  },
];

const INITIAL_STORIES: Story[] = [
  {
    _id: "story_1",
    caption: "Morning coffee grind ☕",
    author_id: INITIAL_USERS[0],
    storyFile: "/story.jpg",
  },
  {
    _id: "story_2",
    caption: "New wireframes coming together 🎨",
    author_id: INITIAL_USERS[2],
    storyFile: "/story-5.jpg",
  },
  {
    _id: "story_3",
    caption: "Nature walk vibes 🌿",
    author_id: INITIAL_USERS[1],
    storyFile: "/coverimg.jpg",
  },
  {
    _id: "story_4",
    caption: "Photoshoot sneak peek ✨",
    author_id: INITIAL_USERS[3],
    storyFile: "/Post.jpg",
  },
  {
    _id: "story_5",
    caption: "Coding late into the night 💻",
    author_id: INITIAL_USERS[4],
    storyFile: "/profile-1.jpg",
  },
];

const INITIAL_FRIEND_REQUESTS: FriendRequest[] = [
  {
    _id: "freq_1",
    senderId: INITIAL_USERS[4], // Alex Rivera
    recieverId: INITIAL_USERS[0], // Noufel
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  },
];

const INITIAL_MESSAGES: Message[] = [
  {
    _id: "msg_1",
    senderId: INITIAL_USERS[1], // Edem
    receiverId: INITIAL_USERS[0], // Noufel
    text: "Hey Noufel! How's the project coming along?",
    delivered: true,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "msg_2",
    senderId: INITIAL_USERS[0], // Noufel
    receiverId: INITIAL_USERS[1], // Edem
    text: "Hey Edem! It's going great, just finished mocking all frontend services and it runs super fast without any backend!",
    delivered: true,
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    _id: "msg_3",
    senderId: INITIAL_USERS[1], // Edem
    receiverId: INITIAL_USERS[0], // Noufel
    text: "Awesome work! That's so much easier for testing and demoing 🙌",
    delivered: true,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    _id: "msg_4",
    senderId: INITIAL_USERS[2], // Franca
    receiverId: INITIAL_USERS[0], // Noufel
    text: "Hi! Check out the new design assets when you get a chance.",
    delivered: true,
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
  },
];

class MockDbService {
  private db: MockDatabase;

  constructor() {
    this.db = this.loadFromStorage();
  }

  private loadFromStorage(): MockDatabase {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as MockDatabase;
        if (parsed && parsed.users && parsed.posts) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to read mockDb from localStorage, initializing defaults", e);
    }
    return this.initializeDefaults();
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.db));
    } catch (e) {
      console.warn("Failed to save mockDb to localStorage", e);
    }
  }

  public resetDatabase(): MockDatabase {
    localStorage.removeItem(STORAGE_KEY);
    this.db = this.initializeDefaults();
    this.saveToStorage();
    return this.db;
  }

  private initializeDefaults(): MockDatabase {
    // Set friends linkage
    const users = JSON.parse(JSON.stringify(INITIAL_USERS)) as User[];
    const currentUser = users[0];
    const friend1 = users[1]; // Edem
    const friend2 = users[2]; // Franca
    const friend3 = users[3]; // Daniella

    currentUser.friends = [friend1, friend2, friend3] as any;
    friend1.friends = [currentUser] as any;
    friend2.friends = [currentUser] as any;
    friend3.friends = [currentUser] as any;

    const posts = JSON.parse(JSON.stringify(INITIAL_POSTS)) as Post[];
    currentUser.Posts = [posts[0]];
    friend1.Posts = [posts[1]];
    friend2.Posts = [posts[2]];
    friend3.Posts = [posts[3]];

    const db: MockDatabase = {
      users,
      posts,
      stories: JSON.parse(JSON.stringify(INITIAL_STORIES)),
      friendRequests: JSON.parse(JSON.stringify(INITIAL_FRIEND_REQUESTS)),
      messages: JSON.parse(JSON.stringify(INITIAL_MESSAGES)),
      currentUserId: currentUser._id,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch {
      // ignore
    }

    return db;
  }

  // --- Auth & Users ---
  public getCurrentUser(): User | null {
    if (!this.db.currentUserId) return null;
    return this.getUserById(this.db.currentUserId);
  }

  public setCurrentUser(user: User | null): void {
    this.db.currentUserId = user ? user._id : null;
    this.saveToStorage();
  }

  public getUserById(id: string): User | null {
    const user = this.db.users.find((u) => u._id === id);
    if (!user) return null;

    // Attach current user's posts
    const userPosts = this.db.posts.filter((p) => p.Author?._id === id);
    return {
      ...user,
      Posts: userPosts,
    };
  }

  public login(username: string): { user: User; token: string } {
    const cleanUsername = username.trim().toLowerCase();
    let user = this.db.users.find(
      (u) =>
        u.username.toLowerCase() === cleanUsername ||
        u.email.toLowerCase() === cleanUsername ||
        u.nickname.toLowerCase() === cleanUsername
    );

    if (!user) {
      // Auto-create or pick first user if not matching
      user = this.db.users[0];
    }

    this.db.currentUserId = user._id;
    this.saveToStorage();
    return { user, token: "mock_jwt_token_" + user._id };
  }

  public register(data: {
    username: string;
    email: string;
    nickname?: string;
    password?: string;
  }): User {
    const newUser: User = {
      _id: "user_" + Date.now(),
      username: data.username,
      nickname: data.nickname || `@${data.username.toLowerCase()}`,
      email: data.email,
      bio: "New CozMeet community member 👋",
      ProfileImg: "/profile-placeholder.svg",
      CoverImg: "/coverimg.jpg",
      friends: [],
      Posts: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.db.users.push(newUser);
    this.db.currentUserId = newUser._id;
    this.saveToStorage();
    return newUser;
  }

  public logout(): void {
    this.db.currentUserId = null;
    this.saveToStorage();
  }

  public updateUser(
    id: string,
    updates: { username?: string; bio?: string; ProfileImg?: string }
  ): User {
    const index = this.db.users.findIndex((u) => u._id === id);
    if (index === -1) throw new Error("User not found");

    const updated = {
      ...this.db.users[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.db.users[index] = updated;

    // Update author across posts
    this.db.posts = this.db.posts.map((p) =>
      p.Author?._id === id ? { ...p, Author: updated } : p
    );

    this.saveToStorage();
    return updated;
  }

  public updateUserCover(id: string, coverUrl: string): User {
    const index = this.db.users.findIndex((u) => u._id === id);
    if (index === -1) throw new Error("User not found");

    const updated = {
      ...this.db.users[index],
      CoverImg: coverUrl,
      updatedAt: new Date().toISOString(),
    };
    this.db.users[index] = updated;
    this.saveToStorage();
    return updated;
  }

  // --- Posts ---
  public getPosts(): Post[] {
    // Return latest first
    return [...this.db.posts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public createPost(data: {
    content: string;
    authorId: string;
    postCovers?: string[];
  }): Post {
    const author = this.getUserById(data.authorId) || this.db.users[0];
    const newPost: Post = {
      _id: "post_" + Date.now(),
      content: data.content,
      Author: author,
      PostCovers: data.postCovers || [],
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    this.db.posts.unshift(newPost);

    // Also update user's posts
    const user = this.db.users.find((u) => u._id === author._id);
    if (user) {
      user.Posts = user.Posts ? [newPost, ...user.Posts] : [newPost];
    }

    this.saveToStorage();
    return newPost;
  }

  public deletePost(postId: string): void {
    this.db.posts = this.db.posts.filter((p) => p._id !== postId);
    this.db.users.forEach((u) => {
      if (u.Posts) {
        u.Posts = u.Posts.filter((p) => p._id !== postId);
      }
    });
    this.saveToStorage();
  }

  // --- Stories ---
  public getStories(): Story[] {
    return [...this.db.stories];
  }

  public createStory(data: {
    authorId: string;
    caption: string;
    storyFile: string;
  }): Story {
    const author = this.getUserById(data.authorId) || this.db.users[0];
    const newStory: Story = {
      _id: "story_" + Date.now(),
      caption: data.caption || "",
      author_id: author,
      storyFile: data.storyFile,
    };

    this.db.stories.unshift(newStory);
    this.saveToStorage();
    return newStory;
  }

  // --- Friends & Friend Requests ---
  public getFriends(userId?: string): User[] {
    const targetId = userId || this.db.currentUserId;
    const user = this.db.users.find((u) => u._id === targetId);
    if (!user || !user.friends) {
      // Default to other users
      return this.db.users.filter((u) => u._id !== targetId);
    }

    // friends might be User objects or IDs
    return user.friends
      .map((f: any) => (typeof f === "string" ? this.getUserById(f) : f))
      .filter(Boolean) as User[];
  }

  public getFriendRequests(): FriendRequest[] {
    const currentId = this.db.currentUserId;
    return this.db.friendRequests.filter(
      (req) => req.recieverId?._id === currentId
    );
  }

  public getFriendSuggestions(): User[] {
    const currentId = this.db.currentUserId;
    const friends = this.getFriends(currentId || undefined);
    const friendIds = new Set(friends.map((f) => f._id));
    const pendingSentIds = new Set(
      this.db.friendRequests
        .filter((r) => r.senderId?._id === currentId)
        .map((r) => r.recieverId?._id)
    );

    return this.db.users.filter(
      (u) =>
        u._id !== currentId &&
        !friendIds.has(u._id) &&
        !pendingSentIds.has(u._id)
    );
  }

  public sendFriendRequest(targetUserId: string): FriendRequest {
    const currentUser = this.getCurrentUser();
    const targetUser = this.getUserById(targetUserId);
    if (!currentUser || !targetUser) throw new Error("User not found");

    const newReq: FriendRequest = {
      _id: "freq_" + Date.now(),
      senderId: currentUser,
      recieverId: targetUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.db.friendRequests.push(newReq);
    this.saveToStorage();
    return newReq;
  }

  public acceptFriendRequest(requestId: string): void {
    const req = this.db.friendRequests.find((r) => r._id === requestId);
    if (!req) return;

    const sender = this.getUserById(req.senderId._id);
    const receiver = this.getUserById(req.recieverId._id);

    if (sender && receiver) {
      sender.friends = sender.friends || [];
      receiver.friends = receiver.friends || [];

      if (!sender.friends.some((f: any) => f._id === receiver._id)) {
        sender.friends.push(receiver as any);
      }
      if (!receiver.friends.some((f: any) => f._id === sender._id)) {
        receiver.friends.push(sender as any);
      }
    }

    this.db.friendRequests = this.db.friendRequests.filter(
      (r) => r._id !== requestId
    );
    this.saveToStorage();
  }

  public rejectFriendRequest(requestId: string): void {
    this.db.friendRequests = this.db.friendRequests.filter(
      (r) => r._id !== requestId
    );
    this.saveToStorage();
  }

  // --- Messages ---
  public getMessages(otherUserId: string): Message[] {
    const currentId = this.db.currentUserId;
    return this.db.messages.filter(
      (m) =>
        (m.senderId?._id === currentId && m.receiverId?._id === otherUserId) ||
        (m.senderId?._id === otherUserId && m.receiverId?._id === currentId)
    );
  }

  public addMessage(
    senderId: string,
    receiverId: string,
    text: string
  ): Message {
    const sender = this.getUserById(senderId) || this.db.users[0];
    const receiver = this.getUserById(receiverId) || this.db.users[1];

    const newMsg: Message = {
      _id: "msg_" + Date.now(),
      senderId: sender,
      receiverId: receiver,
      text,
      delivered: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.db.messages.push(newMsg);
    this.saveToStorage();
    return newMsg;
  }
}

export const mockDb = new MockDbService();
