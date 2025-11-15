export interface User {
  id: string;
  name: string;
  username: string;
  photo: string;
  gymGoalPerWeek: number;
  streak: number;
  postedToday: boolean;
  weeklyWorkouts: number;
}

export interface Post {
  id: string;
  userId: string;
  photoUrl: string;
  timestamp: string;
  workoutType?: string;
}

export interface Friend extends User {
  lastWorkoutTime: string;
  pr?: string;
}

export const currentUser: User = {
  id: "1",
  name: "You",
  username: "fitness_user",
  photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
  gymGoalPerWeek: 4,
  streak: 12,
  postedToday: false,
  weeklyWorkouts: 3
};

export const friends: Friend[] = [
  {
    id: "2",
    name: "Mo",
    username: "mo_fitness",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=mo",
    gymGoalPerWeek: 5,
    streak: 15,
    postedToday: true,
    weeklyWorkouts: 5,
    lastWorkoutTime: "2 hours ago",
    pr: "Bench 225lb"
  },
  {
    id: "3",
    name: "Pablo",
    username: "pablo_lifts",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=pablo",
    gymGoalPerWeek: 4,
    streak: 8,
    postedToday: true,
    weeklyWorkouts: 4,
    lastWorkoutTime: "4 hours ago",
    pr: "Deadlift 315lb"
  },
  {
    id: "4",
    name: "Sarah",
    username: "sarahstrong",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    gymGoalPerWeek: 3,
    streak: 21,
    postedToday: true,
    weeklyWorkouts: 3,
    lastWorkoutTime: "1 hour ago"
  },
  {
    id: "5",
    name: "Jake",
    username: "jake_gains",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=jake",
    gymGoalPerWeek: 6,
    streak: 5,
    postedToday: true,
    weeklyWorkouts: 4,
    lastWorkoutTime: "5 hours ago"
  }
];

export const posts: Post[] = [
  {
    id: "1",
    userId: "2",
    photoUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop",
    timestamp: "2 hours ago",
    workoutType: "Push Day"
  },
  {
    id: "2",
    userId: "3",
    photoUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop",
    timestamp: "4 hours ago",
    workoutType: "Legs"
  },
  {
    id: "3",
    userId: "4",
    photoUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop",
    timestamp: "1 hour ago",
    workoutType: "Cardio"
  },
  {
    id: "4",
    userId: "5",
    photoUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop",
    timestamp: "5 hours ago",
    workoutType: "Pull Day"
  }
];

export const badges = [
  { id: "1", name: "7-Day Streak", icon: "🔥", unlocked: true },
  { id: "2", name: "First PR", icon: "💪", unlocked: true },
  { id: "3", name: "Consistency King", icon: "👑", unlocked: false },
  { id: "4", name: "30-Day Streak", icon: "🏆", unlocked: false }
];
