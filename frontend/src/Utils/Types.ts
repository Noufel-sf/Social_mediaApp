

export type User = {
  id: string;
  username: string;
  nickname: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type Story = {
  id: number;
  user: User;
  img: string;
};

export type Post = {
  id: string;
  content: string;
  Author_id: User;
  imgUrl?: string[];
  likes_count?: number;
  comments_count?: number;
  comments?: Comment[];
  likes?: User[];
  createdAt: string;
}

export type Comment = {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}

export type Message = {
  id: string;
  sender: User;
  content: string;
  Lastmessage: string;
  createdAt: string;
}

export type Chat = {
  id: string;
  participants: User[];
  messages: Message[];
  createdAt: string;
}

export type FriendRequest = {
  id: string;
  from: User;
  to: User;
  createdAt: string;
}
