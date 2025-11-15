import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { AddFriendsFlow } from "@/components/AddFriendsFlow";
import { UserProfileSheet } from "@/components/UserProfileSheet";
import { EditProfileModal } from "@/components/EditProfileModal";
import { CrewManagementModal } from "@/components/CrewManagementModal";
import { PRDetailModal } from "@/components/PRDetailModal";
import { BadgeCard } from "@/components/BadgeCard";
import { currentUser, friends, Friend, badges } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { ArrowLeft, Trophy, UserPlus, Edit, Award } from "lucide-react";

type Tab = "weekly" | "monthly" | "badges";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [hasSeenAddFriends, setHasSeenAddFriends] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("weekly");
  const [selectedUser, setSelectedUser] = useState<Friend | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [crewModalOpen, setCrewModalOpen] = useState(false);
  const [prModalOpen, setPrModalOpen] = useState(false);

  if (!hasSeenAddFriends) {
    return <AddFriendsFlow onComplete={() => setHasSeenAddFriends(true)} />;
  }

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

  const handleUserClick = (user: any) => {
    if (!user.isCurrentUser) {
      setSelectedUser(user as Friend);
      setSheetOpen(true);
    }
  };

  const handlePRClick = (user: Friend) => {
    setSelectedUser(user);
    setPrModalOpen(true);
  };

  const userStats = {
    maxPR: 225,
    badgeCount: badges.filter(b => b.unlocked).length,
    streak: currentUser.streak,
  };

  return (
    <div className="min-h-screen bg-[#0A0B14] pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#0A0B14] via-[#1E3A8A]/20 to-[#0A0B14] border-b border-[#1E3A8A]/30">
        <div className="max-w-2xl mx-auto px-5 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/")} className="p-2 hover:bg-[#131629] rounded-lg transition-all">
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <img src={currentUser.photo} alt={currentUser.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-[#3B82F6]" />
              <div>
                <h2 className="text-white font-bold text-xl">{currentUser.name}</h2>
                <p className="text-gray-400 text-sm">@{currentUser.username}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditProfileOpen(true)} className="p-2 bg-[#131629] border border-[#1E3A8A]/30 rounded-lg hover:border-[#3B82F6]/50 transition-all">
                <Edit className="w-5 h-5 text-[#3B82F6]" />
              </button>
              <button onClick={() => setCrewModalOpen(true)} className="px-4 py-2 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all">
                Join Crew
              </button>
            </div>
          </div>

          <Header title="Leaderboard" subtitle={`You're #${currentUserRank} this week`} />
        </div>

        {/* Tabs */}
        <div className="max-w-2xl mx-auto px-5">
          <div className="flex gap-2 pb-4">
            <button
              onClick={() => setActiveTab("weekly")}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all",
                activeTab === "weekly"
                  ? "bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white"
                  : "bg-[#131629] text-gray-400 hover:bg-[#1a1d35] border border-[#1E3A8A]/30"
              )}
            >
              Weekly
            </button>
            <button
              onClick={() => setActiveTab("monthly")}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all",
                activeTab === "monthly"
                  ? "bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white"
                  : "bg-[#131629] text-gray-400 hover:bg-[#1a1d35] border border-[#1E3A8A]/30"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveTab("badges")}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all",
                activeTab === "badges"
                  ? "bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white"
                  : "bg-[#131629] text-gray-400 hover:bg-[#1a1d35] border border-[#1E3A8A]/30"
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
            {/* Add Friends Button */}
            <button className="w-full bg-[#131629] border border-[#1E3A8A]/30 rounded-xl p-4 flex items-center justify-center gap-2 hover:border-[#3B82F6]/50 transition-all">
              <UserPlus className="w-5 h-5 text-[#3B82F6]" />
              <span className="text-white font-medium">Add More Friends</span>
            </button>

            {/* Your rank card */}
            <div className="bg-gradient-to-br from-[#1E3A8A]/20 to-[#3B82F6]/20 rounded-2xl p-5 border border-[#3B82F6]/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#3B82F6]" />
                  <span className="font-semibold text-white">Your Rank</span>
                </div>
                <span className="text-2xl font-bold text-[#3B82F6]">#{currentUserRank}</span>
              </div>
              <p className="text-sm text-gray-400">
                {currentUser.weeklyWorkouts} of {currentUser.gymGoalPerWeek} workouts completed
              </p>
            </div>

            {/* Crew Rankings */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                Crew Rankings
              </h3>
              {sortedUsers.map((user, index) => (
                <div key={user.id} onClick={() => handleUserClick(user)} className="cursor-pointer">
                  <LeaderboardCard
                    rank={index + 1}
                    name={user.name}
                    photo={user.photo}
                    streak={user.streak}
                    weeklyWorkouts={user.weeklyWorkouts}
                    weeklyGoal={user.gymGoalPerWeek}
                    pr={user.id !== currentUser.id ? (user as any).pr : undefined}
                    isCurrentUser={user.isCurrentUser}
                  />
                </div>
              ))}
            </div>

            {/* PR Section */}
            <div className="space-y-3 mt-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                Recent PRs 🔥
              </h3>
              {friends
                .filter(f => f.pr)
                .slice(0, 3)
                .map(friend => (
                  <div
                    key={friend.id}
                    className="bg-[#131629] border border-[#3B82F6]/30 rounded-xl p-4 flex items-center gap-3"
                  >
                    <img
                      src={friend.photo}
                      alt={friend.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-white">{friend.name}</p>
                      <p className="text-sm text-[#3B82F6] font-medium">{friend.pr}</p>
                    </div>
                    <Trophy className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === "badges" && (
          <div>
            <div className="mb-4 p-4 bg-gradient-to-br from-[#1E3A8A]/30 to-[#3B82F6]/20 rounded-xl border border-[#3B82F6]/30">
              <h3 className="text-white font-semibold mb-2">Badge Collection</h3>
              <p className="text-sm text-gray-400">{badges.filter(b => b.unlocked).length} of {badges.length} badges unlocked</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} onClick={() => navigate(`/leaderboard/badge/${badge.id}`)} />
              ))}
            </div>
          </div>
        )}
      </div>

      <UserProfileSheet user={selectedUser} open={sheetOpen} onOpenChange={setSheetOpen} />
      <EditProfileModal open={editProfileOpen} onOpenChange={setEditProfileOpen} currentPhoto={currentUser.photo} currentName={currentUser.name} currentUsername={currentUser.username} currentGoal={currentUser.gymGoalPerWeek} />
      <CrewManagementModal open={crewModalOpen} onOpenChange={setCrewModalOpen} userStats={userStats} />
      <PRDetailModal open={prModalOpen} onOpenChange={setPrModalOpen} user={selectedUser} />
    </div>
  );
};

export default Leaderboard;
