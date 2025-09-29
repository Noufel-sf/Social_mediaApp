import { Post } from './Types';


export type User = {
  _id: string;
  username: string;
  nickname: string;
  email: string;
  ProfileImg: string;
  CoverImg: string;
  friends: FriendRequest[];
  Posts: Post[];
  bio: string;
  createdAt: string;
  updatedAt: string;
};

export type Story = {
  _id: number;
  user: User;
  img: string;
};

export type Post = {
  _id: string;
  content: string;
  Author_id: User;
  PostCovers?: string[];
  // likes_count?: number;
  // comments_count?: number;
  comments?: Comment[];
  // likes?: User[];
  createdAt: string;
}

export type Comment = {
  _id: string;
  content: string;
  author: User;
  createdAt: string;
}

export type Message = {
  _id: string;
  senderId: User;
  receiverId: User;
  text: string;
  delivered: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Chat = {
  _id: string;
  participants: User[];
  messages: Message[];
  createdAt: string;
}

export type FriendRequest = {
  _id: string;
  senderId: User;
  recieverId: User;
  createdAt: string;
  updatedAt: string;
}
