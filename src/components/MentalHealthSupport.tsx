
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { 
  Brain, 
  Heart, 
  Activity, 
  Music, 
  Moon, 
  Sun, 
  ThumbsUp, 
  Smile, 
  Frown, 
  Meh, 
  Lightbulb, 
  Calendar, 
  Leaf, 
  MessageSquare, 
  Play, 
  Pause,
  SkipForward,
  Volume2
} from "lucide-react";

interface MeditationSession {
  id: string;
  title: string;
  duration: string;
  category: string;
  image: string;
  description: string;
}

interface MoodEntry {
  date: Date;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  notes?: string;
  sleepHours?: number;
  stressLevel?: number;
  activities?: string[];
}

const MentalHealthSupport: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('mood');
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [stressLevel, setStressLevel] = useState<number>(3);
  const [moodNote, setMoodNote] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [activeSession, setActiveSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([
    { date: new Date(Date.now() - 86400000 * 1), mood: 'good', sleepHours: 7, stressLevel: 4, activities: ['Exercise', 'Reading'] },
    { date: new Date(Date.now() - 86400000 * 2), mood: 'neutral', sleepHours: 6, stressLevel: 6, activities: ['Work', 'Social Media'] },
    { date: new Date(Date.now() - 86400000 * 3), mood: 'great', sleepHours: 8, stressLevel: 2, activities: ['Exercise', 'Family Time', 'Meditation'] },
    { date: new Date(Date.now() - 86400000 * 4), mood: 'bad', sleepHours: 5, stressLevel: 7, activities: ['Work', 'Caffeine'] },
    { date: new Date(Date.now() - 86400000 * 5), mood: 'good', sleepHours: 7.5, stressLevel: 4, activities: ['Reading', 'Music'] },
    { date: new Date(Date.now() - 86400000 * 6), mood: 'neutral', sleepHours: 6.5, stressLevel: 5, activities: ['Work', 'Exercise'] },
  ]);
  
  const activities = [
    'Exercise', 'Work', 'Reading', 'Meditation', 'Social Media', 
    'Family Time', 'Friend Time', 'Music', 'Nature', 'Caffeine'
  ];
  
  const meditationSessions: MeditationSession[] = [
    {
      id: 'med1',
      title: 'Morning Mindfulness',
      duration: '10 min',
      category: 'Mindfulness',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      description: 'Start your day with clarity and purpose through this gentle mindfulness meditation.'
    },
    {
      id: 'med2',
      title: 'Stress Relief Breathing',
      duration: '5 min',
      category: 'Breathing',
      image: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnJlYXRoaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      description: 'A quick breathing exercise designed to reduce stress and anxiety in the moment.'
    },
    {
      id: 'med3',
      title: 'Deep Sleep Relaxation',
      duration: '20 min',
      category: 'Sleep',
      image: 'https://images.unsplash.com/photo-1455642305367-68834a1da7ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xlZXB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      description: 'Prepare your mind and body for a restful night with this calming sleep meditation.'
    },
    {
      id: 'med4',
      title: 'Anxiety Relief',
      duration: '15 min',
      category: 'Anxiety',
      image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      description: 'Gentle guidance to help manage anxiety and find your center during difficult moments.'
    },
    {
      id: 'med5',
      title: 'Body Scan Relaxation',
      duration: '12 min',
      category: 'Relaxation',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVsYXh8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      description: 'Progressive relaxation technique to release tension throughout your entire body.'
    },
    {
      id: 'med6',
      title: 'Gratitude Practice',
      duration: '8 min',
      category: 'Gratitude',
      image: 'https://images.unsplash.com/photo-1447078806655-40579c2520d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhdGl0dWRlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      description: 'Cultivate an attitude of gratitude to enhance wellbeing and positive emotions.'
    }
  ];
  
  const therapists = [
    {
      id: 'therapist1',
      name: 'Dr. Arjun Kapoor',
      specialty: 'Clinical Psychologist',
      experience: '12 years',
      image: 'https://ui-avatars.com/api/?name=Arjun+Kapoor&background=0A84FF&color=fff',
      available: true,
      nextSlot: 'Today, 4:00 PM'
    },
    {
      id: 'therapist2',
      name: 'Dr. Maya Sharma',
      specialty: 'Psychiatrist',
      experience: '8 years',
      image: 'https://ui-avatars.com/api/?name=Maya+Sharma&background=FF9F0A&color=fff',
      available: false,
      nextSlot: 'Tomorrow, 11:30 AM'
    },
    {
      id: 'therapist3',
      name: 'Dr. Raj Malhotra',
      specialty: 'Anxiety Specialist',
      experience: '15 years',
      image: 'https://ui-avatars.com/api/?name=Raj+Malhotra&background=30D158&color=fff',
      available: true,
      nextSlot: 'Today, 6:15 PM'
    }
  ];
  
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'great':
        return <ThumbsUp className="h-6 w-6 text-green-500" />;
      case 'good':
        return <Smile className="h-6 w-6 text-green-400" />;
      case 'neutral':
        return <Meh className="h-6 w-6 text-amber-400" />;
      case 'bad':
        return <Frown className="h-6 w-6 text-orange-500" />;
      case 'terrible':
        return <Frown className="h-6 w-6 text-red-500" fill="currentColor" />;
      default:
        return null;
    }
  };
  
  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'great':
        return 'bg-green-500';
      case 'good':
        return 'bg-green-400';
      case 'neutral':
        return 'bg-amber-400';
      case 'bad':
        return 'bg-orange-500';
      case 'terrible':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };
  
  const handleMoodSelection = (mood: string) => {
    setCurrentMood(mood);
  };
  
  const handleActivityToggle = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };
  
  const handleSubmitMood = () => {
    if (!currentMood) {
      toast({
        title: "Please select a mood",
        description: "You need to select how you're feeling today.",
        variant: "destructive",
      });
      return;
    }
    
    const newEntry: MoodEntry = {
      date: new Date(),
      mood: currentMood as any,
      sleepHours,
      stressLevel,
      activities: selectedActivities,
      notes: moodNote.trim() || undefined
    };
    
    setMoodHistory([newEntry, ...moodHistory]);
    
    // Reset form
    setCurrentMood(null);
    setSleepHours(7);
    setStressLevel(3);
    setSelectedActivities([]);
    setMoodNote('');
    
    toast({
      title: "Mood tracked successfully",
      description: "Your mood entry has been saved to your history.",
    });
  };
  
  const handlePlaySession = (session: MeditationSession) => {
    setActiveSession(session);
    setIsPlaying(true);
    
    toast({
      title: "Session started",
      description: `Now playing: ${session.title}`,
    });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  const calculateMoodTrend = () => {
    if (moodHistory.length < 2) return 'neutral';
    
    const moodValues = {
      'terrible': 1,
      'bad': 2,
      'neutral': 3,
      'good': 4,
      'great': 5
    };
    
    const recentMoods = moodHistory.slice(0, 3);
    const recentAvg = recentMoods.reduce((sum, entry) => sum + moodValues[entry.mood], 0) / recentMoods.length;
    
    const olderMoods = moodHistory.slice(3, 6);
    if (olderMoods.length === 0) return 'neutral';
    
    const olderAvg = olderMoods.reduce((sum, entry) => sum + moodValues[entry.mood], 0) / olderMoods.length;
    
    if (recentAvg > olderAvg + 0.5) return 'improving';
    if (recentAvg < olderAvg - 0.5) return 'declining';
    return 'stable';
  };
  
  const getTrendText = () => {
    const trend = calculateMoodTrend();
    switch (trend) {
      case 'improving':
        return 'Your mood has been improving recently!';
      case 'declining':
        return 'Your mood has been declining recently. Consider trying some self-care activities.';
      case 'stable':
        return 'Your mood has been relatively stable recently.';
      default:
        return '';
    }
  };
  
  const getPersonalizedRecommendations = () => {
    if (moodHistory.length === 0) return [];
    
    const recentMood = moodHistory[0];
    const recommendations = [];
    
    if (recentMood.mood === 'bad' || recentMood.mood === 'terrible') {
      recommendations.push('Try the "Anxiety Relief" meditation session');
      recommendations.push('Schedule a consultation with a mental health specialist');
      
      if (recentMood.sleepHours < 6) {
        recommendations.push('Focus on improving your sleep. Try the "Deep Sleep Relaxation" session');
      }
    }
    
    if (recentMood.stressLevel > 6) {
      recommendations.push('Practice the "Stress Relief Breathing" technique');
      recommendations.push('Consider taking short breaks throughout your day');
    }
    
    if (!recentMood.activities?.includes('Exercise')) {
      recommendations.push('Try to incorporate light exercise into your routine');
    }
    
    if (!recentMood.activities?.includes('Nature')) {
      recommendations.push('Spending time in nature can improve your mood');
    }
    
    // If we don't have specific recommendations based on the data, provide general ones
    if (recommendations.length === 0) {
      recommendations.push('Continue with your current wellness routine');
      recommendations.push('Try the "Morning Mindfulness" session to start your day');
      recommendations.push('Regular gratitude practice can further improve your mood');
    }
    
    return recommendations.slice(0, 3); // Return top 3 recommendations
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mental Health & Wellness</h2>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="mood" className="flex items-center">
            <Heart className="h-4 w-4 mr-2" />
            Mood Tracking
          </TabsTrigger>
          <TabsTrigger value="meditation" className="flex items-center">
            <Brain className="h-4 w-4 mr-2" />
            Meditation
          </TabsTrigger>
          <TabsTrigger value="therapy" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Therapy
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="mood" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>How are you feeling today?</CardTitle>
                <CardDescription>Track your mood and factors that might be affecting it</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label className="mb-2 block">Select your mood</Label>
                  <div className="flex justify-between gap-2">
                    {['great', 'good', 'neutral', 'bad', 'terrible'].map(mood => (
                      <Button
                        key={mood}
                        variant={currentMood === mood ? "default" : "outline"}
                        className="flex-1 flex-col h-auto py-2"
                        onClick={() => handleMoodSelection(mood)}
                      >
                        {mood === 'great' && <ThumbsUp className="h-6 w-6 mb-1" />}
                        {mood === 'good' && <Smile className="h-6 w-6 mb-1" />}
                        {mood === 'neutral' && <Meh className="h-6 w-6 mb-1" />}
                        {mood === 'bad' && <Frown className="h-6 w-6 mb-1" />}
                        {mood === 'terrible' && <Frown className="h-6 w-6 mb-1" fill="currentColor" />}
                        <span className="text-xs capitalize">{mood}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Hours of sleep last night: {sleepHours}</Label>
                  <Slider 
                    value={[sleepHours]} 
                    min={0} 
                    max={12} 
                    step={0.5} 
                    onValueChange={(values) => setSleepHours(values[0])}
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Stress level: {stressLevel}/10</Label>
                  <Slider 
                    value={[stressLevel]} 
                    min={1} 
                    max={10} 
                    step={1} 
                    onValueChange={(values) => setStressLevel(values[0])}
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Activities today (select all that apply)</Label>
                  <div className="flex flex-wrap gap-2">
                    {activities.map(activity => (
                      <Badge 
                        key={activity}
                        variant={selectedActivities.includes(activity) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleActivityToggle(activity)}
                      >
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Notes (optional)</Label>
                  <Textarea 
                    placeholder="Add any notes about your day or mood..."
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmitMood} className="w-full">
                  Save Mood Entry
                </Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Mood History</CardTitle>
                  <CardDescription>Your mood patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[215px]">
                    <div className="space-y-3">
                      {moodHistory.map((entry, index) => (
                        <div key={index} className="flex items-center gap-3 pb-3 border-b last:border-0 last:pb-0">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getMoodColor(entry.mood)}`}>
                            {getMoodIcon(entry.mood)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium capitalize">{entry.mood}</p>
                                <p className="text-xs text-muted-foreground">{formatDate(entry.date)}</p>
                              </div>
                              <div className="text-right text-xs text-muted-foreground">
                                <p>Sleep: {entry.sleepHours}h</p>
                                <p>Stress: {entry.stressLevel}/10</p>
                              </div>
                            </div>
                            {entry.activities && entry.activities.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {entry.activities.slice(0, 3).map((activity, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">{activity}</Badge>
                                ))}
                                {entry.activities.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">+{entry.activities.length - 3}</Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Insights & Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        Mood Trend
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{getTrendText()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                        Personalized Recommendations
                      </p>
                      <ul className="space-y-2">
                        {getPersonalizedRecommendations().map((recommendation, index) => (
                          <li key={index} className="text-sm flex gap-2 items-start">
                            <Leaf className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="meditation" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            {meditationSessions.map(session => (
              <Card key={session.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={session.image} 
                    alt={session.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{session.title}</CardTitle>
                    <Badge variant="outline">{session.duration}</Badge>
                  </div>
                  <CardDescription>{session.category}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">{session.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full gap-2"
                    onClick={() => handlePlaySession(session)}
                  >
                    <Play className="h-4 w-4" />
                    Begin Session
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Meditation Player Dialog */}
          {activeSession && (
            <Dialog open={!!activeSession} onOpenChange={(open) => !open && setActiveSession(null)}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{activeSession.title}</DialogTitle>
                  <DialogDescription>
                    {activeSession.duration} • {activeSession.category}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="aspect-video w-full overflow-hidden rounded-md">
                    <img 
                      src={activeSession.image} 
                      alt={activeSession.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-center">
                      <p className="text-2xl font-medium">9:45</p>
                      <p className="text-xs text-muted-foreground">remaining</p>
                    </div>
                    
                    <Progress value={isPlaying ? 25 : 0} className="h-1" />
                    
                    <div className="flex justify-center items-center gap-4">
                      <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                        <SkipForward className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        className="rounded-full h-12 w-12"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                        <SkipForward className="h-4 w-4" transform="scale(-1, 1)" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Volume2 className="h-4 w-4 text-muted-foreground" />
                      <Slider 
                        value={[volume]} 
                        min={0} 
                        max={100} 
                        step={1} 
                        onValueChange={(values) => setVolume(values[0])}
                      />
                    </div>
                  </div>
                </div>
                
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" onClick={() => setActiveSession(null)} className="sm:flex-1">
                    Close
                  </Button>
                  <Button className="sm:flex-1">Save to Favorites</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>
        
        <TabsContent value="therapy" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Mental Health Consultation</CardTitle>
                <CardDescription>Connect with licensed mental health professionals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {therapists.map(therapist => (
                  <div key={therapist.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img 
                          src={therapist.image} 
                          alt={therapist.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{therapist.name}</p>
                        <p className="text-sm text-muted-foreground">{therapist.specialty}</p>
                        <p className="text-xs text-muted-foreground">{therapist.experience} experience</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {therapist.available ? (
                        <Badge className="mb-2 bg-green-500">Available Now</Badge>
                      ) : (
                        <Badge variant="outline" className="mb-2">Next: {therapist.nextSlot}</Badge>
                      )}
                      <Button size="sm" className="w-full">
                        {therapist.available ? 'Consult Now' : 'Schedule'}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex-col items-start">
                <p className="text-sm text-muted-foreground mb-2">
                  Need urgent mental health support?
                </p>
                <Button variant="outline" asChild className="w-full">
                  <a href="tel:1800599599">
                    Mental Health Helpline: 1800-599-599
                  </a>
                </Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Self-Assessment</CardTitle>
                  <CardDescription>Take a quick assessment to understand your mental health better</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-3 flex gap-3 items-start">
                      <Brain className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Mental Health Screening</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          A comprehensive assessment to identify signs of anxiety, depression, and stress.
                        </p>
                        <Button size="sm">Start Assessment</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3 flex gap-3 items-start">
                      <Activity className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Stress Level Test</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Quickly gauge your current stress levels and get personalized recommendations.
                        </p>
                        <Button size="sm" variant="outline">Take Test</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>Articles and guides for mental well-being</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border rounded-md p-3">
                      <p className="font-medium">Understanding Anxiety</p>
                      <p className="text-sm text-muted-foreground">Learn about common anxiety triggers and coping strategies.</p>
                      <Button variant="link" className="p-0 h-auto mt-1">Read More</Button>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <p className="font-medium">Sleep and Mental Health</p>
                      <p className="text-sm text-muted-foreground">Discover the connection between sleep quality and mental well-being.</p>
                      <Button variant="link" className="p-0 h-auto mt-1">Read More</Button>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <p className="font-medium">Mindfulness for Beginners</p>
                      <p className="text-sm text-muted-foreground">Simple mindfulness techniques you can practice anywhere.</p>
                      <Button variant="link" className="p-0 h-auto mt-1">Read More</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentalHealthSupport;
