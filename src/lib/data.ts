
export interface Character {
  name: string;
  image: string;
  description: string;
  intimacy: number;
  attributes: {
    talkativeness: number;
    curiosity: number; // interest in surroundings
    friendliness: number;
  };
  traits: string[];
}

export interface User {
  name: string;
  profileImage: string;
  description: string;
  character: Character;
}

export interface Friend {
  id: string;
  name: string;
  profileImage: string;
  description: string;
  intimacy: number;
  traits: string[];
}

export interface Message {
  id: string;
  senderId: string; // 'me' or friendId
  text: string;
  timestamp: Date;
}

// Mock Data
export const currentUser: User = {
  name: "Mike Johns",
  profileImage: "https://images.unsplash.com/photo-1634321942139-b3017166c503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  description: "함께 성장하는 중...",
  character: {
    name: "MoNGee",
    image: "https://images.unsplash.com/photo-1692300556217-204e5c33a09b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    description: "나와 같이 성장하는 친구",
    intimacy: 75,
    attributes: {
      talkativeness: 80,
      curiosity: 65,
      friendliness: 90
    },
    traits: ["수다스러움", "호기심 많음", "다정함"]
  }
};

export const friends: Friend[] = [
  {
    id: "1",
    name: "Lisa Philips",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    description: "매일매일 즐겁게!",
    intimacy: 45,
    traits: ["딸기좋아함", "활발함"]
  },
  {
    id: "2",
    name: "Thomas Cook",
    profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    description: "조용한게 좋아",
    intimacy: 20,
    traits: ["차분함", "독서광"]
  },
  {
    id: "3",
    name: "Sarah Lee",
    profileImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    description: "여행가고 싶다",
    intimacy: 88,
    traits: ["여행러", "맛집탐방"]
  }
];

export const initialMessages: Record<string, Message[]> = {
  "1": [
    { id: "m1", senderId: "1", text: "안녕! 오늘 뭐해?", timestamp: new Date(Date.now() - 100000) },
    { id: "m2", senderId: "me", text: "그냥 쉬고 있어 ㅎㅎ 너는?", timestamp: new Date(Date.now() - 80000) },
    { id: "m3", senderId: "1", text: "나도 뒹굴거리는 중", timestamp: new Date(Date.now() - 50000) },
  ]
};
