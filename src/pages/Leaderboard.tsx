import { useState } from "react";
import { Header } from "@/components/Header";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { currentUser, friends } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Trophy, Award } from "lucide-react";

type Tab = "weekly" | "monthly" | "badges";

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("weekly");

  // Combine current user with friends and sort by progress
  const allUsers = [
    { ...currentUser, isCurrentUser: true },
    ...friends.map(f => ({ ...f, isCurrentUser: false }))
  ];

  const sortedUsers = [...allUsers].sort((a, b) => {
    const progressA = (a.weeklyWorkouts / a.gymGoalPerWeek) * 100;
    const progressB = (b.weeklyWorkouts / b.gymGoalPerWeek) * 100;
    return progressB - progressA;
  });

  const currentUserRank = sortedUsers.findIndex(u => u.isCurrentUser) + 1;

  const badges = [
    { name: "7-Day Streak", icon: "🔥", description: "Work out 7 days in a row", unlocked: true },
    { name: "First PR", icon: "💪", description: "Log your first personal record", unlocked: true },
    { name: "Consistency King", icon: "👑", description: "Hit your weekly goal for 4 weeks", unlocked: false },
    { name: "30-Day Streak", icon: "🏆", description: "Work out 30 days in a row", unlocked: false },
    { name: "Team Player", icon: "🤝", description: "Motivate 5 friends", unlocked: false }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-2xl mx-auto px-5 py-4">
          <Header title="Leaderboard" subtitle={`You're #${currentUserRank} this week`} />
        </div>

        {/* Tabs */}
        <div className="max-w-2xl mx-auto px-5">
          <div className="flex gap-2 pb-3">
            <button
              onClick={() => setActiveTab("weekly")}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all",
                activeTab === "weekly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              )}
            >
              Weekly
            </button>
            <button
              onClick={() => setActiveTab("monthly")}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all",
                activeTab === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveTab("badges")}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all",
                activeTab === "badges"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              )}
            >
              Badges
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-6">
        {/* Weekly/Monthly View */}
        {(activeTab === "weekly" || activeTab === "monthly") && (
          <div className="space-y-6">
            {/* Your rank card */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-5 border-2 border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Your Rank</span>
                </div>
                <span className="text-2xl font-bold text-primary">#{currentUserRank}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentUser.weeklyWorkouts} of {currentUser.gymGoalPerWeek} workouts completed
              </p>
            </div>

            {/* Crew Rankings */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Crew Rankings
              </h3>
              {sortedUsers.map((user, index) => (
                <LeaderboardCard
                  key={user.id}
                  rank={index + 1}
                  name={user.name}
                  photo={user.photo}
                  streak={user.streak}
                  weeklyWorkouts={user.weeklyWorkouts}
                  weeklyGoal={user.gymGoalPerWeek}
                  pr={user.id !== currentUser.id ? (user as any).pr : undefined}
                  isCurrentUser={user.isCurrentUser}
                />
              ))}
            </div>

            {/* PR Section */}
            <div className="space-y-3 mt-8">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Recent PRs 🔥
              </h3>
              {friends
                .filter(f => f.pr)
                .slice(0, 3)
                .map(friend => (
                  <div
                    key={friend.id}
                    className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-center gap-3"
                  >
                    <img
                      src={friend.photo}
                      alt={friend.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{friend.name}</p>
                      <p className="text-sm text-accent font-medium">{friend.pr}</p>
                    </div>
                    <Trophy className="w-5 h-5 text-accent" />
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Badges View */}
        {activeTab === "badges" && (
          <div className="space-y-3">
            <div className="bg-card rounded-2xl shadow-card p-5 text-center">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="font-bold text-foreground mb-1">Badge Collection</h3>
              <p className="text-sm text-muted-foreground">
                Unlock achievements by crushing your goals
              </p>
            </div>

            <div className="grid gap-3 mt-6">
              {badges.map((badge) => (
                <div
                  key={badge.name}
                  className={cn(
                    "bg-card rounded-xl shadow-card p-4 flex items-center gap-4 transition-all",
                    badge.unlocked ? "border-2 border-success" : "opacity-60"
                  )}
                >
                  <div className="text-3xl">{badge.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{badge.name}</p>
                      {badge.unlocked && (
                        <Award className="w-4 h-4 text-success" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </div>
                  {badge.unlocked && (
                    <div className="text-xs font-semibold text-success bg-success/10 px-3 py-1 rounded-full">
                      Unlocked
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
