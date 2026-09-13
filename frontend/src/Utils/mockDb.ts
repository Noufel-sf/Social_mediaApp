import type { User, Post, Story, FriendRequest, Message } from "./Types";

const STORAGE_KEY = "cozmeet_mock_database_v6";

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
    bio: "Full-Stack Dev & Anime enthusiast 🚀 Building reactive web apps with React, TypeScript & Tailwind. Always down for anime & tech debates! ☕",
    ProfileImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
    CoverImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=80",
    friends: [],
    Posts: [],
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "user_kenji",
    username: "Kenji Sato",
    nickname: "@kenji_anime",
    email: "kenji@example.com",
    bio: "Digital Illustrator & Manga fanart creator 🎨 Studio Ghibli, MHA & Shonen fanatic. Currently sketching Deku & cyberpunk scenes ✨",
    ProfileImg: "/midoriya.jpg",
    CoverImg: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1400&q=80",
    friends: [],
    Posts: [],
    createdAt: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "user_aoi",
    username: "Aoi Tanaka",
    nickname: "@aoi_codes",
    email: "aoi@example.com",
    bio: "Frontend Ninja & UI designer 💻 Loving React 19, TypeScript, and dark neon aesthetics. Solo Leveling reader 🗡️",
    ProfileImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    CoverImg: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1400&q=80",
    friends: [],
    Posts: [],
    createdAt: new Date(Date.now() - 190 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "user_alex",
    username: "Alex Rivera",
    nickname: "@arivera_dev",
    email: "alex@example.com",
    bio: "DevOps & Cloud Architect ☁️ Linux geek, mechanical keyboard collector & Cyberpunk 2077 player 🎮",
    ProfileImg: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&q=80",
    CoverImg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&q=80",
    friends: [],
    Posts: [],
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "user_daniella",
    username: "Daniella Jackson",
    nickname: "@daniella_j",
    email: "daniella@example.com",
    bio: "Tech Product Manager & Photography lover 📸 Exploring Tokyo & Kyoto aesthetics 🌸",
    ProfileImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    CoverImg: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1400&q=80",
    friends: [],
    Posts: [],
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "user_edem",
    username: "Edem Quist",
    nickname: "@edem_dev",
    email: "edem@example.com",
    bio: "Open-source contributor & Web3 builder ☕ Coffee, Vim keybindings, and chill lofi beats 🎧",
    ProfileImg: "/profile.jpg",
    CoverImg: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80",
    friends: [],
    Posts: [],
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "user_sarah",
    username: "Sarah Connor",
    nickname: "@sarah_c",
    email: "sarah@example.com",
    bio: "Cybersecurity Analyst & AI researcher 🛡️ Neon cyber aesthetics & sci-fi manga reader.",
    ProfileImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    CoverImg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&q=80",
    friends: [],
    Posts: [],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const INITIAL_POSTS: Post[] = [
  {
    _id: "post_1",
    content: "Late night coding session with lo-fi beats and dark mode! 💻✨ Just migrated our entire state flow to Zustand and client-side mock DB. The responsiveness feels instant! What theme do you all code with? Tokyo Night or Catppuccin?",
    Author: INITIAL_USERS[0],
    PostCovers: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80"
    ],
    likes: 142,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "post_2",
    content: "Plus Ultra! 💥 Just finished this new digital art of Deku training at U.A. High! What's your favorite My Hero Academia arc or moment so far? 🥦⚡",
    Author: INITIAL_USERS[1], // Kenji
    PostCovers: [
      "/midoriya.jpg"
    ],
    likes: 342,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "post_3",
    content: "Upgraded my developer battlestation this weekend! 🖥️ Ultra-wide curved monitor, custom 65% mechanical keyboard with tactile switches, and warm ambient neon backlight. Productivity jumped 200%! 🚀",
    Author: INITIAL_USERS[3], // Alex
    PostCovers: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80"
    ],
    likes: 310,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "post_4",
    content: "Tokyo rainy evening walk through Akihabara 🌧️🌸 The neon lights reflecting off the asphalt look straight out of a Makoto Shinkai anime movie! Truly inspiring atmosphere for creative projects.",
    Author: INITIAL_USERS[4], // Daniella
    PostCovers: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&q=80"
    ],
    likes: 195,
    createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "post_5",
    content: "Designed this futuristic cyberpunk anime interface concept! 🎨✨ Combining glassmorphism cards, glowing cyan accents, and high-contrast typography. Let me know what you think!",
    Author: INITIAL_USERS[2], // Aoi
    PostCovers: [
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&q=80"
    ],
    likes: 218,
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "post_6",
    content: "Weekend cybersecurity challenge solved! 🛡️ Remember to always sanitize your inputs and never expose secrets in frontend bundles. Happy hacking everyone! 💻",
    Author: INITIAL_USERS[6], // Sarah
    PostCovers: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80"
    ],
    likes: 85,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  }
];

const INITIAL_STORIES: Story[] = [
  {
    _id: "story_1",
    caption: "Coffee & Code ☕",
    author_id: INITIAL_USERS[0],
    storyFile: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
  },
  {
    _id: "story_2",
    caption: "Manga sketching 🎨",
    author_id: INITIAL_USERS[1],
    storyFile: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80",
  },
  {
    _id: "story_3",
    caption: "Neon Tokyo vibes 🌸",
    author_id: INITIAL_USERS[4],
    storyFile: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&q=80",
  },
  {
    _id: "story_4",
    caption: "Battlestation glow 💻",
    author_id: INITIAL_USERS[3],
    storyFile: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
  },
  {
    _id: "story_5",
    caption: "Anime marathon tonight! 🍿",
    author_id: INITIAL_USERS[2],
    storyFile: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&q=80",
  },
  {
    _id: "story_6",
    caption: "New keyboard build ⌨️",
    author_id: INITIAL_USERS[5],
    storyFile: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  },
];

const INITIAL_FRIEND_REQUESTS: FriendRequest[] = [
  {
    _id: "freq_1",
    senderId: INITIAL_USERS[6], // Sarah
    recieverId: INITIAL_USERS[0], // Noufel
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
];

const INITIAL_MESSAGES: Message[] = [
  {
    _id: "msg_1",
    senderId: INITIAL_USERS[1], // Kenji
    receiverId: INITIAL_USERS[0], // Noufel
    text: "Hey Noufel! Have you checked out the new Solo Leveling episode yet? 🔥",
    delivered: true,
    createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
  },
  {
    _id: "msg_2",
    senderId: INITIAL_USERS[0], // Noufel
    receiverId: INITIAL_USERS[1], // Kenji
    text: "Yes!! The animation during the boss fight was absolutely insane! Studio went all out 🗡️",
    delivered: true,
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
  },
  {
    _id: "msg_3",
    senderId: INITIAL_USERS[1], // Kenji
    receiverId: INITIAL_USERS[0], // Noufel
    text: "Haha totally! Also loved the new mock DB setup in your web app, runs blazing fast ⚡",
    delivered: true,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    _id: "msg_4",
    senderId: INITIAL_USERS[2], // Aoi
    receiverId: INITIAL_USERS[0], // Noufel
    text: "Hey! Let me know when you have time to check out the new UI layout I pushed 🎨",
    delivered: true,
    createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
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
    const users = JSON.parse(JSON.stringify(INITIAL_USERS)) as User[];
    const currentUser = users[0]; // Noufel
    const friend1 = users[1];     // Kenji
    const friend2 = users[2];     // Aoi
    const friend3 = users[3];     // Alex
    const friend4 = users[4];     // Daniella

    currentUser.friends = [friend1, friend2, friend3, friend4] as any;
    friend1.friends = [currentUser] as any;
    friend2.friends = [currentUser] as any;
    friend3.friends = [currentUser] as any;
    friend4.friends = [currentUser] as any;

    const posts = JSON.parse(JSON.stringify(INITIAL_POSTS)) as Post[];
    currentUser.Posts = [posts[0]];
    friend1.Posts = [posts[1]];
    friend3.Posts = [posts[2]];
    friend4.Posts = [posts[3]];
    friend2.Posts = [posts[4]];

    const db: MockDatabase = {
      users,
      posts,
      stories: JSON.parse(JSON.stringify(INITIAL_STORIES)),
      friendRequests: JSON.parse(JSON.stringify(INITIAL_FRIEND_REQUESTS)),
      messages: JSON.parse(JSON.stringify(INITIAL_MESSAGES)),
      currentUserId: null,
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
      ProfileImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
      CoverImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=80",
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
      return this.db.users.filter((u) => u._id !== targetId);
    }

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
