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
  prDetails?: {
    exercise: string;
    weight: number;
    reps: number;
    date: string;
  };
  recentPhotos: string[];
}

export interface Crew {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  memberCount: number;
  requirements?: {
    minPR?: number;
    minBadges?: number;
    minStreak?: number;
  };
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  category: "consistency" | "social" | "achievement";
  requirement: {
    type: "workouts" | "friends" | "invites" | "streak";
    count: number;
  };
  animationType: "squat" | "bench" | "deadlift" | "pushup";
  animationDuration: number;
  progress?: number;
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
    name: "Mark",
    username: "mark_fitness",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=mark",
    gymGoalPerWeek: 5,
    streak: 15,
    postedToday: true,
    weeklyWorkouts: 5,
    lastWorkoutTime: "2 hours ago",
    pr: "Bench 225lb",
    prDetails: {
      exercise: "Bench Press",
      weight: 225,
      reps: 1,
      date: "2024-11-10",
    },
    recentPhotos: [
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=400&fit=crop",
    ],
  },
  {
    id: "3",
    name: "Moises",
    username: "moises_lifts",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=moises",
    gymGoalPerWeek: 4,
    streak: 8,
    postedToday: true,
    weeklyWorkouts: 4,
    lastWorkoutTime: "4 hours ago",
    pr: "Deadlift 315lb",
    prDetails: {
      exercise: "Deadlift",
      weight: 315,
      reps: 1,
      date: "2024-11-12",
    },
    recentPhotos: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1534368420009-621bfab424a8?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    ],
  },
  {
    id: "4",
    name: "Maria",
    username: "maria_strong",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    gymGoalPerWeek: 3,
    streak: 21,
    postedToday: true,
    weeklyWorkouts: 3,
    lastWorkoutTime: "1 hour ago",
    prDetails: {
      exercise: "Squat",
      weight: 185,
      reps: 5,
      date: "2024-11-08",
    },
    recentPhotos: [
      "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558017487-06bf9f82613a?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1579758682665-53a1a614eea6?w=400&h=400&fit=crop",
    ],
  },
  {
    id: "5",
    name: "Pablo",
    username: "pablo_gains",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=pablo",
    gymGoalPerWeek: 6,
    streak: 5,
    postedToday: true,
    weeklyWorkouts: 4,
    lastWorkoutTime: "5 hours ago",
    recentPhotos: [
      "https://images.unsplash.com/photo-1623874228601-f4193c7b1818?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=400&h=400&fit=crop",
    ],
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

export const badges: Badge[] = [
  {
    id: "first-rep",
    name: "First Rep",
    icon: "🎯",
    description: "Record your first workout",
    unlocked: true,
    category: "achievement",
    requirement: { type: "workouts", count: 1 },
    animationType: "squat",
    animationDuration: 2000,
    progress: 1,
  },
  {
    id: "early-bird",
    name: "Early Bird",
    icon: "🌅",
    description: "Complete 5 morning workouts",
    unlocked: true,
    category: "consistency",
    requirement: { type: "workouts", count: 5 },
    animationType: "bench",
    animationDuration: 2500,
    progress: 5,
  },
  {
    id: "week-warrior",
    name: "7-Day Warrior",
    icon: "🔥",
    description: "Maintain a 7-day streak",
    unlocked: false,
    category: "consistency",
    requirement: { type: "streak", count: 7 },
    animationType: "bench",
    animationDuration: 2500,
    progress: 5,
  },
  {
    id: "night-owl",
    name: "Night Owl",
    icon: "🦉",
    description: "Complete 5 evening workouts",
    unlocked: false,
    category: "consistency",
    requirement: { type: "workouts", count: 5 },
    animationType: "pushup",
    animationDuration: 2000,
    progress: 2,
  },
  {
    id: "month-master",
    name: "Month Master",
    icon: "💎",
    description: "Maintain a 30-day streak",
    unlocked: false,
    category: "consistency",
    requirement: { type: "streak", count: 30 },
    animationType: "squat",
    animationDuration: 2000,
    progress: 12,
  },
  {
    id: "century-club",
    name: "Century Club",
    icon: "💯",
    description: "Complete 100 workouts",
    unlocked: false,
    category: "achievement",
    requirement: { type: "workouts", count: 100 },
    animationType: "deadlift",
    animationDuration: 3000,
    progress: 47,
  },
  {
    id: "iron-will",
    name: "Iron Will",
    icon: "🏋️",
    description: "Maintain a 50-day streak",
    unlocked: false,
    category: "consistency",
    requirement: { type: "streak", count: 50 },
    animationType: "bench",
    animationDuration: 2500,
    progress: 12,
  },
  {
    id: "weekend-warrior",
    name: "Weekend Warrior",
    icon: "⚔️",
    description: "Complete all weekend workouts for 4 weeks",
    unlocked: false,
    category: "consistency",
    requirement: { type: "workouts", count: 8 },
    animationType: "squat",
    animationDuration: 2000,
    progress: 3,
  },
  {
    id: "first-friend",
    name: "First Friend",
    icon: "🤝",
    description: "Add your first friend",
    unlocked: false,
    category: "social",
    requirement: { type: "friends", count: 1 },
    animationType: "pushup",
    animationDuration: 2000,
    progress: 0,
  },
  {
    id: "growing-crew",
    name: "Growing Crew",
    icon: "👥",
    description: "Add 5 friends to your crew",
    unlocked: false,
    category: "social",
    requirement: { type: "friends", count: 5 },
    animationType: "bench",
    animationDuration: 2500,
    progress: 3,
  },
  {
    id: "squad-leader",
    name: "Squad Leader",
    icon: "👨‍👩‍👧‍👦",
    description: "Add 10 friends to your crew",
    unlocked: false,
    category: "social",
    requirement: { type: "friends", count: 10 },
    animationType: "deadlift",
    animationDuration: 3000,
    progress: 3,
  },
  {
    id: "recruiter",
    name: "Recruiter",
    icon: "📢",
    description: "Invite 3 friends who join",
    unlocked: false,
    category: "social",
    requirement: { type: "invites", count: 3 },
    animationType: "squat",
    animationDuration: 2000,
    progress: 0,
  },
  {
    id: "party-starter",
    name: "Party Starter",
    icon: "🎉",
    description: "Create your first crew",
    unlocked: false,
    category: "social",
    requirement: { type: "workouts", count: 1 },
    animationType: "pushup",
    animationDuration: 2000,
    progress: 0,
  },
  {
    id: "crew-captain",
    name: "Crew Captain",
    icon: "👑",
    description: "Join a crew with 10+ members",
    unlocked: false,
    category: "social",
    requirement: { type: "friends", count: 1 },
    animationType: "bench",
    animationDuration: 2500,
    progress: 0,
  },
  {
    id: "social-butterfly",
    name: "Social Butterfly",
    icon: "🦋",
    description: "Add 25 friends",
    unlocked: false,
    category: "social",
    requirement: { type: "friends", count: 25 },
    animationType: "pushup",
    animationDuration: 2000,
    progress: 3,
  },
  {
    id: "personal-best",
    name: "Personal Best",
    icon: "⭐",
    description: "Set your first PR",
    unlocked: false,
    category: "achievement",
    requirement: { type: "workouts", count: 1 },
    animationType: "deadlift",
    animationDuration: 3000,
    progress: 0,
  },
  {
    id: "pr-king",
    name: "PR King",
    icon: "👑",
    description: "Set 5 personal records",
    unlocked: false,
    category: "achievement",
    requirement: { type: "workouts", count: 5 },
    animationType: "squat",
    animationDuration: 2000,
    progress: 2,
  },
  {
    id: "heavy-hitter",
    name: "Heavy Hitter",
    icon: "💪",
    description: "Lift 200+ lbs in any exercise",
    unlocked: false,
    category: "achievement",
    requirement: { type: "workouts", count: 1 },
    animationType: "bench",
    animationDuration: 2500,
    progress: 0,
  },
  {
    id: "versatile",
    name: "Versatile Athlete",
    icon: "🎪",
    description: "Complete 5 different workout types",
    unlocked: false,
    category: "achievement",
    requirement: { type: "workouts", count: 5 },
    animationType: "pushup",
    animationDuration: 2000,
    progress: 2,
  },
  {
    id: "marathon",
    name: "Marathon Session",
    icon: "⏱️",
    description: "Complete a 3+ hour workout",
    unlocked: false,
    category: "achievement",
    requirement: { type: "workouts", count: 1 },
    animationType: "deadlift",
    animationDuration: 3000,
    progress: 0,
  },
  {
    id: "consistency-champion",
    name: "Consistency Champion",
    icon: "🏆",
    description: "Hit weekly goal 4 weeks in a row",
    unlocked: false,
    category: "consistency",
    requirement: { type: "workouts", count: 4 },
    animationType: "squat",
    animationDuration: 2000,
    progress: 1,
  },
];

export const crews: Crew[] = [
  {
    id: "1",
    name: "Iron Warriors",
    description: "Elite lifters pushing heavy weight",
    isPrivate: true,
    memberCount: 24,
    requirements: {
      minPR: 300,
      minBadges: 5,
      minStreak: 14,
    },
  },
  {
    id: "2",
    name: "Morning Grinders",
    description: "Early birds who crush workouts before sunrise",
    isPrivate: false,
    memberCount: 156,
  },
  {
    id: "3",
    name: "Consistency Kings",
    description: "No excuses, just results",
    isPrivate: true,
    memberCount: 48,
    requirements: {
      minStreak: 30,
      minBadges: 3,
    },
  },
  {
    id: "4",
    name: "Fitness Fam",
    description: "Supportive community for all fitness levels",
    isPrivate: false,
    memberCount: 342,
  },
];

export const potentialFriends = [
  {
    id: "6",
    name: "Alex",
    username: "alex_fit",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    mutualFriends: 3
  },
  {
    id: "7",
    name: "Jordan",
    username: "jordan_strong",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
    mutualFriends: 5
  },
  {
    id: "8",
    name: "Sam",
    username: "sam_gains",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=sam",
    mutualFriends: 2
  }
];

export const todaysWorkouts = [
  { exercise: "Bench Press", sets: 4, reps: 8, weight: 185 },
  { exercise: "Incline Dumbbell Press", sets: 3, reps: 10, weight: 70 },
  { exercise: "Cable Flyes", sets: 3, reps: 12, weight: 35 },
  { exercise: "Tricep Dips", sets: 3, reps: 15, weight: 0 },
];
