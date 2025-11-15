import { Header } from "@/components/Header";
import { StreakBadge } from "@/components/StreakBadge";
import { SecondaryButton } from "@/components/SecondaryButton";
import { currentUser, posts } from "@/data/mockData";
import { Settings, Calendar } from "lucide-react";

const Profile = () => {
  // Mock user photos
  const userPhotos = posts.slice(0, 9);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <Header title="Profile" />
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-6 space-y-6">
        {/* User Info */}
        <div className="bg-card rounded-2xl shadow-card p-6">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={currentUser.photo}
              alt={currentUser.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{currentUser.name}</h2>
              <p className="text-sm text-muted-foreground">@{currentUser.username}</p>
              <div className="mt-3">
                <StreakBadge streak={currentUser.streak} />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{currentUser.weeklyWorkouts}</p>
              <p className="text-xs text-muted-foreground">This week</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{currentUser.gymGoalPerWeek}</p>
              <p className="text-xs text-muted-foreground">Weekly goal</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{currentUser.streak}</p>
              <p className="text-xs text-muted-foreground">Day streak</p>
            </div>
          </div>
        </div>

        {/* Weekly Goal Card */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-5 border-2 border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Weekly Goal</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            You're aiming for {currentUser.gymGoalPerWeek} workouts per week
          </p>
          <SecondaryButton fullWidth>
            Update Goal
          </SecondaryButton>
        </div>

        {/* Progress Gallery */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Your Progress
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {userPhotos.map((post, index) => (
              <div
                key={index}
                className="aspect-square bg-muted rounded-xl overflow-hidden shadow-card"
              >
                <img
                  src={post.photoUrl}
                  alt="Workout"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
            {/* Add more placeholder */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`placeholder-${i}`}
                className="aspect-square bg-muted/50 rounded-xl flex items-center justify-center border-2 border-dashed border-border"
              >
                <span className="text-3xl">+</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
