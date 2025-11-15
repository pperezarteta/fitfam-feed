import { cn } from "@/lib/utils";
import { Trophy, TrendingUp } from "lucide-react";

interface LeaderboardCardProps {
  rank: number;
  name: string;
  photo: string;
  streak: number;
  weeklyWorkouts: number;
  weeklyGoal: number;
  pr?: string;
  isCurrentUser?: boolean;
  className?: string;
}

export const LeaderboardCard = ({ 
  rank,
  name, 
  photo, 
  streak, 
  weeklyWorkouts,
  weeklyGoal,
  pr,
  isCurrentUser = false,
  className 
}: LeaderboardCardProps) => {
  const progress = (weeklyWorkouts / weeklyGoal) * 100;
  
  return (
    <div 
      className={cn(
        "bg-[#131629] border border-[#1E3A8A]/30 rounded-xl p-4 transition-all hover:border-[#3B82F6]/50",
        isCurrentUser && "ring-2 ring-[#3B82F6]",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {/* Rank */}
        <div className="flex-shrink-0 w-8 text-center">
          {rank <= 3 ? (
            <Trophy className={cn(
              "w-6 h-6 mx-auto",
              rank === 1 && "text-yellow-500",
              rank === 2 && "text-gray-400",
              rank === 3 && "text-amber-700"
            )} />
          ) : (
            <span className="text-lg font-bold text-gray-400">#{rank}</span>
          )}
        </div>

        {/* Avatar */}
        <img 
          src={photo} 
          alt={name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-[#1E3A8A]"
        />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-white truncate">{name}</p>
            {isCurrentUser && (
              <span className="text-xs bg-[#3B82F6]/10 text-[#3B82F6] px-2 py-0.5 rounded-full font-medium">
                You
              </span>
            )}
          </div>
          
          {/* Progress bar */}
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{weeklyWorkouts}/{weeklyGoal} workouts</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-[#1E3A8A]/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          {/* PR Badge */}
          {pr && (
            <div className="mt-2 flex items-center gap-1 text-xs text-[#3B82F6]">
              <TrendingUp className="w-3 h-3" />
              <span className="font-medium">{pr}</span>
            </div>
          )}
        </div>

        {/* Streak */}
        {streak > 0 && (
          <div className="text-center">
            <div className="text-xl">🔥</div>
            <div className="text-xs font-semibold text-gray-400">{streak}d</div>
          </div>
        )}
      </div>
    </div>
  );
};
