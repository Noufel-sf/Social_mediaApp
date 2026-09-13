export type User = {
  _id: string;
  username: string;
  nickname: string;
  email: string;
  ProfileImg: string;
  CoverImg: string;
  friends: (User | FriendRequest | any)[];
  Posts: Post[];
  bio: string;
  createdAt: string;
  updatedAt: string;
};

export type Story = {
  _id: string;
  caption?: string;
  author_id?: User;
  storyFile?: string;
  user?: {
    id?: string;
    name?: string;
    Username: string;
    Usernickname?: string;
    email?: string;
    imageUrl?: string;
    bio?: string;
  };
  img?: string;
};

export type Post = {
  _id: string;
  content: string;
  Author: User;
  PostCovers?: string[];
  likes?: number | any[];
  comments?: Comment[];
  createdAt: string;
};

export type Comment = {
  _id: string;
  content: string;
  author: User;
  createdAt: string;
};

export type Message = {
  _id: string;
  senderId: User;
  receiverId: User; 
  text: string;
  delivered: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Chat = {
  _id: string;
  senderId: User;
  receiverId: User;
  messages: Message[];
  createdAt: string;
};

export type FriendRequest = {
  _id: string;
  senderId: User;
  recieverId: User;
  createdAt: string;
  updatedAt: string;
};
