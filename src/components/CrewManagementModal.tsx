import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Search, Lock, Users, Award, Flame } from "lucide-react";
import { crews, Crew } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface CrewManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userStats: {
    maxPR: number;
    badgeCount: number;
    streak: number;
  };
}

export const CrewManagementModal = ({ open, onOpenChange, userStats }: CrewManagementModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [crewName, setCrewName] = useState("");
  const [crewDescription, setCrewDescription] = useState("");
  const [minPR, setMinPR] = useState(0);
  const [minBadges, setMinBadges] = useState(0);
  const [minStreak, setMinStreak] = useState(0);
  const { toast } = useToast();

  const filteredCrews = crews.filter((crew) =>
    crew.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const canJoinCrew = (crew: Crew) => {
    if (!crew.isPrivate || !crew.requirements) return true;
    
    const { minPR: reqPR, minBadges: reqBadges, minStreak: reqStreak } = crew.requirements;
    
    if (reqPR && userStats.maxPR < reqPR) return false;
    if (reqBadges && userStats.badgeCount < reqBadges) return false;
    if (reqStreak && userStats.streak < reqStreak) return false;
    
    return true;
  };

  const handleJoinCrew = (crew: Crew) => {
    if (!canJoinCrew(crew)) {
      toast({
        title: "Requirements Not Met",
        description: "You don't meet the requirements for this private crew.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Joined Crew!",
      description: `You're now a member of ${crew.name}`,
    });
  };

  const handleCreateCrew = () => {
    if (!crewName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a crew name.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Crew Created!",
      description: `${crewName} has been created successfully.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#131629] border-[#1E3A8A]/30 text-white max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Crew Management</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="join" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-[#0A0B14]">
            <TabsTrigger value="join" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1E3A8A] data-[state=active]:to-[#3B82F6]">
              Join a Crew
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1E3A8A] data-[state=active]:to-[#3B82F6]">
              Create New
            </TabsTrigger>
          </TabsList>

          <TabsContent value="join" className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search crews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0A0B14] border-[#1E3A8A]/30 text-white"
              />
            </div>

            {/* Crew List */}
            <div className="space-y-3">
              {filteredCrews.map((crew) => {
                const meetsRequirements = canJoinCrew(crew);
                
                return (
                  <div
                    key={crew.id}
                    className="p-4 bg-[#0A0B14] border border-[#1E3A8A]/30 rounded-lg space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white">{crew.name}</h3>
                          {crew.isPrivate && (
                            <Lock className="w-4 h-4 text-[#3B82F6]" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{crew.description}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Users className="w-3 h-3" />
                          <span>{crew.memberCount} members</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleJoinCrew(crew)}
                        disabled={!meetsRequirements}
                        className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white hover:opacity-90 disabled:opacity-40"
                        size="sm"
                      >
                        Join
                      </Button>
                    </div>

                    {crew.isPrivate && crew.requirements && (
                      <div className="pt-2 border-t border-[#1E3A8A]/20 space-y-1">
                        <p className="text-xs text-gray-500 font-medium">Requirements:</p>
                        <div className="flex flex-wrap gap-2">
                          {crew.requirements.minPR && (
                            <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                              userStats.maxPR >= crew.requirements.minPR
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}>
                              <span>PR: {crew.requirements.minPR}lb+</span>
                            </div>
                          )}
                          {crew.requirements.minBadges && (
                            <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                              userStats.badgeCount >= crew.requirements.minBadges
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}>
                              <Award className="w-3 h-3" />
                              <span>{crew.requirements.minBadges}+ badges</span>
                            </div>
                          )}
                          {crew.requirements.minStreak && (
                            <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                              userStats.streak >= crew.requirements.minStreak
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}>
                              <Flame className="w-3 h-3" />
                              <span>{crew.requirements.minStreak}+ day streak</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="crew-name" className="text-gray-300">
                Crew Name
              </Label>
              <Input
                id="crew-name"
                placeholder="Iron Warriors"
                value={crewName}
                onChange={(e) => setCrewName(e.target.value)}
                className="bg-[#0A0B14] border-[#1E3A8A]/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="crew-description" className="text-gray-300">
                Description
              </Label>
              <Textarea
                id="crew-description"
                placeholder="Describe your crew..."
                value={crewDescription}
                onChange={(e) => setCrewDescription(e.target.value)}
                className="bg-[#0A0B14] border-[#1E3A8A]/30 text-white resize-none"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#0A0B14] rounded-lg border border-[#1E3A8A]/30">
              <div>
                <p className="font-medium text-white">Private Crew</p>
                <p className="text-xs text-gray-400">Set requirements to join</p>
              </div>
              <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
            </div>

            {isPrivate && (
              <div className="space-y-3 p-4 bg-[#0A0B14] rounded-lg border border-[#1E3A8A]/30">
                <p className="text-sm font-medium text-gray-300">Entry Requirements</p>
                
                <div className="space-y-2">
                  <Label htmlFor="min-pr" className="text-gray-400 text-sm">
                    Minimum PR (lbs)
                  </Label>
                  <Input
                    id="min-pr"
                    type="number"
                    placeholder="0"
                    value={minPR || ""}
                    onChange={(e) => setMinPR(parseInt(e.target.value) || 0)}
                    className="bg-[#131629] border-[#1E3A8A]/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min-badges" className="text-gray-400 text-sm">
                    Minimum Badges
                  </Label>
                  <Input
                    id="min-badges"
                    type="number"
                    placeholder="0"
                    value={minBadges || ""}
                    onChange={(e) => setMinBadges(parseInt(e.target.value) || 0)}
                    className="bg-[#131629] border-[#1E3A8A]/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min-streak" className="text-gray-400 text-sm">
                    Minimum Streak (days)
                  </Label>
                  <Input
                    id="min-streak"
                    type="number"
                    placeholder="0"
                    value={minStreak || ""}
                    onChange={(e) => setMinStreak(parseInt(e.target.value) || 0)}
                    className="bg-[#131629] border-[#1E3A8A]/30 text-white"
                  />
                </div>
              </div>
            )}

            <Button
              onClick={handleCreateCrew}
              className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white hover:opacity-90"
            >
              Create Crew
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
