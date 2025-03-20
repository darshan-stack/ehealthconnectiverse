
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Music, Play, Pause, SkipForward, SkipBack, Heart, Volume2, Youtube, ArrowUpRight, Clock, Smile, Frown, Meh, ThumbsUp, List, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock relaxation music data from YouTube
const youtubeVideos = [
  {
    id: 'y7e-GC-o_e4',
    title: 'Relaxing Music with Nature Sounds - Waterfall HD',
    channel: 'Meditation Music',
    duration: '3:00:15',
    views: '14M',
    thumbnail: 'https://img.youtube.com/vi/y7e-GC-o_e4/hqdefault.jpg'
  },
  {
    id: '77ZozI0rw7w',
    title: 'Relaxing Piano Music: Sleep, Study, Stress Relief, Meditation',
    channel: 'Yellow Brick Cinema',
    duration: '2:59:48',
    views: '22M',
    thumbnail: 'https://img.youtube.com/vi/77ZozI0rw7w/hqdefault.jpg'
  },
  {
    id: 'lFcSrYw-ARY',
    title: 'Deep Sleep Music: Ocean Waves, Fall Asleep Fast',
    channel: 'Sleep Easy Relax',
    duration: '3:06:19',
    views: '9M',
    thumbnail: 'https://img.youtube.com/vi/lFcSrYw-ARY/hqdefault.jpg'
  },
  {
    id: 'V1RPi2MYptM',
    title: 'Beautiful Relaxing Music for Stress Relief',
    channel: 'Meditation Relaxation',
    duration: '2:23:14',
    views: '12M',
    thumbnail: 'https://img.youtube.com/vi/V1RPi2MYptM/hqdefault.jpg'
  },
];

// Mock Spotify playlists
const spotifyPlaylists = [
  {
    id: '37i9dQZF1DX3Ogo9pFvBkY',
    name: 'Ambient Relaxation',
    description: 'Calm ambient and soft instrumental music',
    coverImage: 'https://i.scdn.co/image/ab67706f00000002d9e2e0086ee1a794b511d5e9',
    songs: 50,
    duration: '2hr 45min'
  },
  {
    id: '37i9dQZF1DWSiZVO2J6WeI',
    name: 'Peaceful Piano',
    description: 'Peaceful piano to help you slow down, breathe, and relax',
    coverImage: 'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a4',
    songs: 224,
    duration: '13hr 25min'
  },
  {
    id: '37i9dQZF1DX4PP3DA4J0N8',
    name: 'Daily Wellness',
    description: 'Music and wellness to get you through your day',
    coverImage: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebcfc10e4a33b20ec6448807bb/3/en/default',
    songs: 75,
    duration: '4hr 10min'
  },
  {
    id: '37i9dQZF1DX9uKNf5jGX6m',
    name: 'Relaxing Meditation',
    description: 'Ambient for deep relaxation and meditation',
    coverImage: 'https://i.scdn.co/image/ab67706f000000025fafad3a15dcad8f61d81d34',
    songs: 66,
    duration: '3hr 53min'
  },
];

// Motivational quotes
const motivationalQuotes = [
  {
    quote: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
    author: "Unknown"
  },
  {
    quote: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious. Having feelings doesn't make you a negative person. It makes you human.",
    author: "Lori Deschene"
  },
  {
    quote: "Mental health problems don't define who you are. They are something you experience, but they are not you.",
    author: "Dr. Gail Saltz"
  },
  {
    quote: "There is hope, even when your brain tells you there isn't.",
    author: "John Green"
  },
  {
    quote: "You are not alone in this journey. Millions are walking alongside you, even when you can't see them.",
    author: "Mental Health Foundation"
  }
];

// Mood tracking options
const moodOptions = [
  { value: "happy", label: "Happy", icon: <Smile className="text-green-500" /> },
  { value: "neutral", label: "Neutral", icon: <Meh className="text-amber-500" /> },
  { value: "sad", label: "Sad", icon: <Frown className="text-blue-500" /> },
  { value: "anxious", label: "Anxious", icon: <Loader2 className="text-purple-500" /> },
  { value: "energetic", label: "Energetic", icon: <ThumbsUp className="text-orange-500" /> }
];

// Daily activities for mental wellness
const dailyActivities = [
  { id: "act1", name: "5-Minute Meditation", completed: false, description: "Take 5 minutes to focus on your breath and clear your mind" },
  { id: "act2", name: "Daily Gratitude", completed: false, description: "Write down three things you're grateful for today" },
  { id: "act3", name: "Physical Movement", completed: false, description: "Take a short walk or do some stretching exercises" },
  { id: "act4", name: "Connect with Someone", completed: false, description: "Have a meaningful conversation with a friend or family member" },
  { id: "act5", name: "Digital Detox", completed: false, description: "Spend 30 minutes away from screens and digital devices" }
];

const MentalHealthSupport: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentVideoId, setCurrentVideoId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [selectedMood, setSelectedMood] = useState("");
  const [moodNote, setMoodNote] = useState("");
  const [activities, setActivities] = useState(dailyActivities);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [completedActivities, setCompletedActivities] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Function to toggle YouTube video playing
  const handlePlayVideo = (videoId: string) => {
    setCurrentVideoId(videoId);
    setShowVideoDialog(true);
  };
  
  // Function to handle mood tracking
  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood);
    toast({
      title: "Mood Tracked",
      description: `Your mood has been recorded as ${mood}.`,
    });
  };
  
  // Function to submit mood note
  const handleMoodNoteSubmit = () => {
    if (moodNote.trim()) {
      toast({
        title: "Note Saved",
        description: "Your mood note has been saved.",
        variant: "success",
      });
      setMoodNote("");
    }
  };
  
  // Function to toggle activity completion
  const handleToggleActivity = (activityId: string) => {
    setActivities(activities.map(activity => {
      if (activity.id === activityId) {
        const newCompleted = !activity.completed;
        
        // Update completed activities count
        setCompletedActivities(prev => newCompleted ? prev + 1 : prev - 1);
        
        return {
          ...activity,
          completed: newCompleted
        };
      }
      return activity;
    }));
  };
  
  // Function to cycle through quotes
  const handleNextQuote = () => {
    setCurrentQuoteIndex((currentQuoteIndex + 1) % motivationalQuotes.length);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mental Health Support</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={handleNextQuote}
            className="border-primary/30 text-primary"
          >
            New Quote
          </Button>
        </div>
      </div>
      
      {/* Daily Quote Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <p className="text-lg italic mb-4 text-slate-700">
              "{motivationalQuotes[currentQuoteIndex].quote}"
            </p>
            <p className="text-sm text-slate-500">
              — {motivationalQuotes[currentQuoteIndex].author}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="music">Relaxing Music</TabsTrigger>
          <TabsTrigger value="tracker">Mood Tracker</TabsTrigger>
          <TabsTrigger value="activities">Daily Activities</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Music className="h-5 w-5 text-primary" />
                  Relaxation Music
                </CardTitle>
                <CardDescription>Listen to relaxing music to reduce stress and anxiety</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  {youtubeVideos.slice(0, 2).map(video => (
                    <div 
                      key={video.id} 
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => handlePlayVideo(video.id)}
                    >
                      <div className="w-16 h-16 rounded overflow-hidden relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate text-sm">{video.title}</h4>
                        <p className="text-xs text-muted-foreground">{video.channel}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{video.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-primary"
                  onClick={() => setActiveTab("music")}
                >
                  View All Music
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Smile className="h-5 w-5 text-primary" />
                  Mood Tracker
                </CardTitle>
                <CardDescription>Track your mood patterns over time</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between mb-4">
                  {moodOptions.map(mood => (
                    <button
                      key={mood.value}
                      className={`flex flex-col items-center p-2 rounded-lg ${
                        selectedMood === mood.value ? 'bg-primary/10 border border-primary/30' : 'hover:bg-slate-50'
                      }`}
                      onClick={() => handleMoodSelection(mood.value)}
                    >
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mb-1">
                        {React.cloneElement(mood.icon, { className: `h-6 w-6 ${selectedMood === mood.value ? 'text-primary' : ''}` })}
                      </div>
                      <span className="text-xs">{mood.label}</span>
                    </button>
                  ))}
                </div>
                <Input
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  placeholder="Add note about your mood..."
                  className="mb-2"
                />
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleMoodNoteSubmit}
                  disabled={!moodNote.trim()}
                  className="w-full"
                >
                  Save Mood
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <List className="h-5 w-5 text-primary" />
                      Daily Wellness Activities
                    </CardTitle>
                    <CardDescription>Complete these activities to improve your mental well-being</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    {completedActivities}/{activities.length} Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={(completedActivities / activities.length) * 100} className="h-2 mb-4" />
                <div className="space-y-3">
                  {activities.slice(0, 3).map(activity => (
                    <div 
                      key={activity.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => handleToggleActivity(activity.id)}
                    >
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                        activity.completed ? 'bg-green-500 border-green-500' : 'border-slate-300'
                      }`}>
                        {activity.completed && <ThumbsUp className="h-3 w-3 text-white" />}
                      </div>
                      <div>
                        <h4 className={`font-medium text-sm ${activity.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {activity.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-primary"
                  onClick={() => setActiveTab("activities")}
                >
                  View All Activities
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Music Tab */}
        <TabsContent value="music" className="space-y-4">
          <Tabs defaultValue="youtube" className="w-full">
            <TabsList className="w-full max-w-md mb-4">
              <TabsTrigger value="youtube" className="flex-1">
                <Youtube className="h-4 w-4 mr-2" />
                YouTube
              </TabsTrigger>
              <TabsTrigger value="spotify" className="flex-1">
                <Music className="h-4 w-4 mr-2" />
                Spotify
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="youtube" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {youtubeVideos.map(video => (
                  <Card key={video.id} className="hover:shadow-md transition-shadow overflow-hidden">
                    <div className="aspect-video relative cursor-pointer" onClick={() => handlePlayVideo(video.id)}>
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-1">{video.title}</h3>
                      <p className="text-sm text-muted-foreground">{video.channel}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{video.duration}</span>
                        </div>
                        <span>{video.views} views</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="spotify" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {spotifyPlaylists.map(playlist => (
                  <Card key={playlist.id} className="hover:shadow-md transition-shadow overflow-hidden">
                    <div className="flex h-full">
                      <div className="w-1/3 aspect-square">
                        <img 
                          src={playlist.coverImage} 
                          alt={playlist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4 flex-1">
                        <h3 className="font-medium line-clamp-1">{playlist.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{playlist.description}</p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Music className="h-3 w-3" />
                            <span>{playlist.songs} songs</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{playlist.duration}</span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-3"
                          onClick={() => window.open(`https://open.spotify.com/playlist/${playlist.id}`, '_blank')}
                        >
                          Open in Spotify
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        {/* Mood Tracker Tab */}
        <TabsContent value="tracker" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Track Your Mood</CardTitle>
              <CardDescription>Keeping track of your mood can help identify patterns and triggers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-5 gap-2">
                {moodOptions.map(mood => (
                  <button
                    key={mood.value}
                    className={`flex flex-col items-center p-3 rounded-lg ${
                      selectedMood === mood.value ? 'bg-primary/10 border border-primary/30' : 'hover:bg-slate-50 border border-transparent'
                    }`}
                    onClick={() => handleMoodSelection(mood.value)}
                  >
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                      {React.cloneElement(mood.icon, { className: `h-7 w-7 ${selectedMood === mood.value ? 'text-primary' : ''}` })}
                    </div>
                    <span className="text-sm font-medium">{mood.label}</span>
                  </button>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Add a note about your current mood</h3>
                <textarea
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  placeholder="How are you feeling today? What might have influenced your mood?"
                  className="w-full min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground"
                />
              </div>
              
              <Button 
                onClick={handleMoodNoteSubmit}
                disabled={!selectedMood || !moodNote.trim()}
                className="w-full"
              >
                Save Mood Entry
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Mood History</CardTitle>
              <CardDescription>Your recent mood entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-muted-foreground">Start tracking your mood to see your history here.</p>
                <p className="text-sm text-muted-foreground mt-1">Regular tracking helps identify patterns over time.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Daily Wellness Activities</CardTitle>
                  <CardDescription>Complete these activities to improve your mental well-being</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                  {completedActivities}/{activities.length} Completed
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={(completedActivities / activities.length) * 100} className="h-2 mb-6" />
              <div className="space-y-4">
                {activities.map(activity => (
                  <div 
                    key={activity.id}
                    className={`p-4 rounded-lg border ${
                      activity.completed ? 'bg-green-50 border-green-200' : 'hover:bg-slate-50 cursor-pointer'
                    }`}
                    onClick={() => handleToggleActivity(activity.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-5 w-5 rounded-full border flex-shrink-0 flex items-center justify-center mt-0.5 ${
                        activity.completed ? 'bg-green-500 border-green-500' : 'border-slate-300'
                      }`}>
                        {activity.completed && <ThumbsUp className="h-3 w-3 text-white" />}
                      </div>
                      <div>
                        <h4 className={`font-medium ${activity.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {activity.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* YouTube Video Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {youtubeVideos.find(v => v.id === currentVideoId)?.title || "Relaxing Music"}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentalHealthSupport;
