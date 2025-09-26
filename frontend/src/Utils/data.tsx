import { HiChatAlt } from "react-icons/hi";

export const Messages = [
  {
    id: 1,
    user: {
            name: "Edem Quist",
            Username: "edem_quist",
            Usernickname: "edem",
            email: "edem@example.com",
            imageUrl: "/profile-1.jpg",
            bio: "Software Developer"
        }, 
    lastMessage: "Just woke up bruh",
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: 2,
    user: {
            name: "Franca Delia",
            Username: "franca_delia",
            Usernickname: "franca",
            email: "franca@example.com",
            imageUrl: "/profile-1.jpg",
            bio: "Software Developer"
        }, 
    lastMessage: "Received bruh. Thanks!",
    isOnline: true,
    unreadCount: 0,
  },
  {
    id: 3,
    user: {
            name: "Daniella Jackson",
            Username: "daniella_jackson",
            Usernickname: "daniella",
            email: "daniella@example.com",
            imageUrl: "/profile-1.jpg",
            bio: "Software Developer"
        }, 
    lastMessage: "2 new messages",
    isOnline: false,
    unreadCount: 2,
  },
];


export const Posts = [
  {
    id: 1,
      Author: {
            id: "1",
            name: "Edem Quist",
            Username: "edem_quist",
            Usernickname: "edem",
            email: "edem@example.com",
            imageUrl: "/profile-1.jpg",
            bio: "Software Developer"
        }, 
    content: "Just woke up bruh",
    imgUrl: "/Post.jpg",
    createdAt: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
      Author: {
            id: "2",
            name: "Franca Delia",
            Username: "franca_delia",
            Usernickname: "franca",
            email: "franca@example.com",
            imageUrl: "/profile-1.jpg",
            bio: "Software Developer"
        }, 
    content: "Received bruh. Thanks!",
    imgUrl: "/Post.jpg",
    createdAt: "2023-10-02T12:00:00Z",
  },
  {
    id: 3,
    Author: {
        id: "3",
        name: "Daniella Jackson",
        Username: "daniella_jackson",
        Usernickname: "daniella",
        email: "daniella@example.com",
        imageUrl: "/profile-1.jpg",
        bio: "Marketing Specialist"
    },
    content: "2 new messages",
    imgUrl: "/Post.jpg",
    createdAt: "2023-10-03T12:00:00Z",
  },
];

export const Friends = [
  {
    id: 1,
     user: {
            id: "1",
            name: "Edem Quist",
            Username: "edem_quist",
            Usernickname: "edem",
            email: "edem@example.com",
            imageUrl: "/profile-1.jpg",
            bio: "Software Developer"
        }, 
    avatar: "/profile-1.jpg",
    isOnline: false,
  },
  {
    id: 2,
    name: "Franca Delia",
      user: {
            id: "2",
            name: "Edem Quist",
            Username: "edem_quist",
            Usernickname: "edem",
            email: "edem@example.com",
            imageUrl: "/profile-1.jpg",
            bio: "Software Developer"
        }, 
    avatar: "/profile-1.jpg",
    isOnline: true,
  },
  {
    id: 3,
      user: {
            id: "3",
            name: "Daniella Jackson",
            Username: "daniella_jackson",
            Usernickname: "daniella",
            email: "daniella@example.com",
            imageUrl: "/profile-1.jpg",
            bio: "Software Developer"
        }, 
    avatar: "/profile-1.jpg",
    isOnline: false,
  },
];

export const FriendRequests = [
  {
    _id: 1,
    senderId: {
      _id: 2,
      username: "Franca Delia",
      imageUrl: "/profile.jpg",
    },
    receiverId: {
      _id: 1,
      username: "Edem Quist",
      imageUrl: "/profile.jpg",
    },
    createdAt: "2023-10-01T12:00:00Z",
  },
  {
    _id: 2,
    senderId: {
      _id: 3,
      username: "Daniella Jackson",
      imageUrl: "/profile.jpg",
    },
    receiverId: {
      _id: 1,
      username: "Edem Quist",
      imageUrl: "/profile.jpg",
    },
    createdAt: "2023-10-02T12:00:00Z",
  },
  {
    _id: 3,
    senderId: {
      _id: 2,
      username: "Franca Delia",
      imageUrl: "/profile.jpg",
    },
    receiverId: {
      _id: 3,
      username: "Daniella Jackson",
      imageUrl: "/profile.jpg",
    },
    createdAt: "2023-10-03T12:00:00Z",
  },
];

export const Storys = [
    {
        id: 1, 
        user: {
            id: "1",
            name: "Edem Quist",
            Username: "edem_quist",
            Usernickname: "edem",
            email: "edem@example.com",
            imageUrl: "/profile-1.jpg",
            bio: "Software Developer"
        }, 
        img: "/story.jpg"
    },
    {
        id: 2, 
        user: {
            id: "2",
            name: "Franca Delia",
            Username: "franca_delia",
            Usernickname: "franca",
            email: "franca@example.com",
            imageUrl: "/profile-2.jpg",
            bio: "Designer"
        }, 
        img: "/story.jpg"
    },
    {
        id: 3, 
        user: {
            id: "3",
            name: "Daniella Jackson",
            Username: "daniella_jackson",
            Usernickname: "daniella",
            email: "daniella@example.com",
            imageUrl: "/profile-3.jpg",
            bio: "Marketing Specialist"
        }, 
        img: "/story.jpg"
    },
    {
        id: 3, 
        user: {
            id: "3",
            name: "Daniella Jackson",
            Username: "daniella_jackson",
            Usernickname: "daniella",
            email: "daniella@example.com",
            imageUrl: "/profile-3.jpg",
            bio: "Marketing Specialist"
        }, 
        img: "/story.jpg"
    },
    {
        id: 3, 
        user: {
            id: "3",
            name: "Daniella Jackson",
            Username: "daniella_jackson",
            Usernickname: "daniella",
            email: "daniella@example.com",
            imageUrl: "/profile-3.jpg",
            bio: "Marketing Specialist"
        }, 
        img: "/story.jpg"
    },
    {
        id: 3, 
        user: {
            id: "3",
            name: "Daniella Jackson",
            Username: "daniella_jackson",
            Usernickname: "daniella",
            email: "daniella@example.com",
            imageUrl: "/profile-3.jpg",
            bio: "Marketing Specialist"
        }, 
        img: "/story.jpg"
    },
    {
        id: 3, 
        user: {
            id: "3",
            name: "Daniella Jackson",
            Username: "daniella_jackson",
            Usernickname: "daniella",
            email: "daniella@example.com",
            imageUrl: "/profile-3.jpg",
            bio: "Marketing Specialist"
        }, 
        img: "/story.jpg"
    },
    {
        id: 3, 
        user: {
            id: "3",
            name: "Daniella Jackson",
            Username: "daniella_jackson",
            Usernickname: "daniella",
            email: "daniella@example.com",
            imageUrl: "/profile-3.jpg",
            bio: "Marketing Specialist"
        }, 
        img: "/story.jpg"
    },



]


export const SidebarrItems = [
    {id:1, textKey:"home", icon:<HiChatAlt />, link:"/home"},
    {id:2, textKey:"messages", icon:<HiChatAlt />, link:"/messages"},
    {id:3, textKey:"friends", icon:<HiChatAlt />, link:"/friends"},
    {id:4, textKey:"profile", icon:<HiChatAlt />, link:"/profile"},
    {id:5, textKey:"settings", icon:<HiChatAlt />, link:"/settings"},
];


export const sampleUser = {
  name: "John Doe",
  avatar: "/profile.jpg",
  coverPhoto: "/coverimg.jpg",
  friends: 320,
  bio: "Full-stack developer | Coffee lover ☕ | Traveler ✈️",
  photos: ["/Post.jpg", "/Post.jpg", "/Post.jpg", "/Post.jpg", "/Post.jpg", "/Post.jpg"],
  friendsList: [
    { name: "Alice", avatar: "/story-5.jpg" },
    { name: "Bob", avatar: "/story.jpg" },
    { name: "Sarah", avatar: "/profile-1.jpg" },
  ],
  posts: [
    { id: 1, content: "Just launched my new project 🚀", createdAt: "2025-09-15", imgUrl: "/Post.jpg" },
    { id: 2, content: "What a beautiful sunset 🌅", createdAt: "2025-09-14", imgUrl: "/Post.jpg" },
  ],
};


export const chats = [
  {
    id: 1,
    user: { name: "Alice", avatar: "/profile-1.jpg" },
    lastMessage: "See you soon!",
    messages: [
      { senderId: "1", text: "Hey John!" },
      { senderId: "me", text: "Hi Alice, how are you?" },
      { senderId: "1", text: "Doing great, thanks!" },
    ],
  },
  {
    id: 2,
    user: { name: "Bob", avatar: "profile.jpg" },
    lastMessage: "Let's meet tomorrow",
    messages: [
      { senderId: "2", text: "Yo, what's up?" },
      { senderId: "me", text: "All good, working on a project." },
    ],
  },
];


export const currentUser = {
  id: "me",
  name: "John Doe",
  avatar: "/profile-1.jpg",
};