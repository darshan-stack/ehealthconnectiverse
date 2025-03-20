import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Home, 
  MessageSquare, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  Search,
  Ambulance,
  Hospital,
  BookOpen
} from 'lucide-react';
import ChatInterface, { Message } from '@/components/ChatInterface';
import DoctorDirectory from '@/components/DoctorDirectory';
import ResearchPaperSharing from '@/components/ResearchPaperSharing';
import EmergencyServices from '@/components/EmergencyServices';
import GovernmentSchemes from '@/components/GovernmentSchemes';
import HospitalTracking from '@/components/HospitalTracking';
import { useToast } from "@/components/ui/use-toast";

const DoctorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/doctor/${value === 'dashboard' ? '' : value}`);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="flex-1 overflow-hidden"
        >
          <div className="border-b px-4">
            <TabsList className="h-14">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-background">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="appointments" className="data-[state=active]:bg-background">
                <Calendar className="h-4 w-4 mr-2" />
                Appointments
              </TabsTrigger>
              <TabsTrigger value="patients" className="data-[state=active]:bg-background">
                <Users className="h-4 w-4 mr-2" />
                Patients
              </TabsTrigger>
              <TabsTrigger value="messages" className="data-[state=active]:bg-background">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="records" className="data-[state=active]:bg-background">
                <FileText className="h-4 w-4 mr-2" />
                Records
              </TabsTrigger>
              <TabsTrigger value="emergency" className="data-[state=active]:bg-background">
                <Ambulance className="h-4 w-4 mr-2" />
                Emergency
              </TabsTrigger>
              <TabsTrigger value="research" className="data-[state=active]:bg-background">
                <BookOpen className="h-4 w-4 mr-2" />
                Research
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <TabsContent value="dashboard" className="h-full mt-0">
              <Dashboard />
            </TabsContent>
            <TabsContent value="appointments" className="h-full mt-0">
              <Appointments />
            </TabsContent>
            <TabsContent value="patients" className="h-full mt-0">
              <Patients />
            </TabsContent>
            <TabsContent value="messages" className="h-full mt-0">
              <Messages />
            </TabsContent>
            <TabsContent value="records" className="h-full mt-0">
              <Records />
            </TabsContent>
            <TabsContent value="emergency" className="h-full mt-0">
              <EmergencyServices />
            </TabsContent>
            <TabsContent value="research" className="h-full mt-0">
              <ResearchPaperSharing 
                currentUser={{
                  id: 'doctor_1',
                  name: 'Dr. Sarah Chen',
                  specialty: 'Cardiologist',
                  avatar: '/avatars/doctor.jpg',
                }}
              />
            </TabsContent>
            <TabsContent value="schemes" className="h-full mt-0">
              <GovernmentSchemes />
            </TabsContent>
            <TabsContent value="hospital" className="h-full mt-0">
              <HospitalTracking />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

const Sidebar = ({ activeTab }: { activeTab: string }) => {
  return (
    <div className="w-64 border-r bg-sidebar p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
          E
        </div>
        <h1 className="text-xl font-bold">eHealthWave</h1>
      </div>
      
      <div className="flex-1">
        <nav className="space-y-1">
          <Link 
            to="/doctor" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              activeTab === 'dashboard' 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors'
            }`}
          >
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/doctor/appointments" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              activeTab === 'appointments' 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors'
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span>Appointments</span>
          </Link>
          <Link 
            to="/doctor/patients" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              activeTab === 'patients' 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors'
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Patients</span>
          </Link>
          <Link 
            to="/doctor/messages" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              activeTab === 'messages' 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors'
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </Link>
          <Link 
            to="/doctor/records" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              activeTab === 'records' 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors'
            }`}
          >
            <FileText className="h-5 w-5" />
            <span>Records</span>
          </Link>
          <Link 
            to="/doctor/emergency" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              activeTab === 'emergency' 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors'
            }`}
          >
            <Ambulance className="h-5 w-5" />
            <span>Emergency</span>
          </Link>
          <Link 
            to="/doctor/research" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              activeTab === 'research' 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors'
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span>Research</span>
          </Link>
          <Link 
            to="/doctor/schemes" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              activeTab === 'schemes' 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors'
            }`}
          >
            <FileText className="h-5 w-5" />
            <span>Gov Schemes</span>
          </Link>
          <Link 
            to="/doctor/hospital" 
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              activeTab === 'hospital' 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors'
            }`}
          >
            <Hospital className="h-5 w-5" />
            <span>Hospital Status</span>
          </Link>
        </nav>
      </div>
      
      <div className="border-t pt-4">
        <Link 
          to="/doctor/settings" 
          className={`flex items-center gap-3 px-3 py-2 rounded-md ${
            activeTab === 'settings' 
              ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
              : 'text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors'
          }`}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
        <div className="flex items-center gap-3 mt-4">
          <Avatar>
            <AvatarImage src="/avatars/doctor.jpg" />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Dr. Sarah Chen</p>
            <p className="text-xs text-sidebar-foreground">Cardiologist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="border-b h-14 flex items-center justify-between px-4">
      <div>
        <h2 className="text-lg font-semibold">Doctor Dashboard</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell className="h-4 w-4" />
        </Button>
        <Avatar>
          <AvatarImage src="/avatars/doctor.jpg" />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-2">Today's Appointments</h3>
          <div className="text-3xl font-bold">8</div>
          <p className="text-muted-foreground text-sm mt-2">2 more than yesterday</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-2">Total Patients</h3>
          <div className="text-3xl font-bold">248</div>
          <p className="text-muted-foreground text-sm mt-2">12 new this week</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-2">Unread Messages</h3>
          <div className="text-3xl font-bold">5</div>
          <p className="text-muted-foreground text-sm mt-2">3 urgent</p>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Upcoming Appointments</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>P{i}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Patient Name {i}</p>
                    <p className="text-sm text-muted-foreground">General Checkup</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>10:0{i} AM</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="text-sm">Updated patient records for <span className="font-medium">Patient {i}</span></p>
                  <p className="text-xs text-muted-foreground">{i} hour{i !== 1 ? 's' : ''} ago</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Appointments = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Appointments</h2>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-6 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>P{i}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Patient Name {i}</p>
                    <p className="text-sm text-muted-foreground">General Checkup</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">Today</p>
                    <p className="text-sm text-muted-foreground">10:0{i} AM</p>
                  </div>
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button size="sm">Start</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Patients = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Patients</h2>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-6 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>P{i}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Patient Name {i}</p>
                    <p className="text-sm text-muted-foreground">ID: PAT-100{i}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">View Records</Button>
                  <Button size="sm">Message</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Messages = () => {
  const { toast } = useToast();
  const [activeChat, setActiveChat] = useState<string | null>('patient_123');
  const [showDirectory, setShowDirectory] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello Dr. Chen, I have been experiencing some chest pain lately.',
      sender: 'user',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read'
    },
    {
      id: '2',
      content: "I'm sorry to hear that. Can you describe the pain? Is it sharp or dull? Does it radiate to other areas?",
      sender: 'doctor',
      timestamp: new Date(Date.now() - 3500000)
    },
    {
      id: '3',
      content: "It's a sharp pain, mostly on the left side. Sometimes it goes down my left arm.",
      sender: 'user',
      timestamp: new Date(Date.now() - 3400000),
      status: 'read'
    },
    {
      id: '4',
      content: "That could be concerning. How long have you been experiencing this? And do you have any history of heart problems?",
      sender: 'doctor',
      timestamp: new Date(Date.now() - 3300000)
    }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState([
    {
      id: 'patient_123',
      name: 'John Doe',
      avatar: '/avatars/patient.jpg',
      role: 'Patient',
      lastMessage: "It's a sharp pain, mostly on the left side. Sometimes it goes down my left arm.",
      unread: 0,
      time: '10:45 AM',
      type: 'patient'
    },
    {
      id: 'dr_456',
      name: 'Dr. Priya Sharma',
      avatar: '/avatars/doctor-2.jpg',
      role: 'Neurologist',
      lastMessage: "I'd like your opinion on this patient's brain MRI. Do you see any abnormalities in the temporal lobe?",
      unread: 2,
      time: 'Yesterday',
      type: 'doctor'
    },
    {
      id: 'dr_789',
      name: 'Dr. Anand Verma',
      avatar: '/avatars/doctor-3.jpg',
      role: 'Pediatrician',
      lastMessage: "Thank you for referring that patient. I've scheduled them for a follow-up next week.",
      unread: 0,
      time: 'Yesterday',
      type: 'doctor'
    }
  ]);

  const handleSendMessage = (content: string, attachments?: File[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'doctor',
      timestamp: new Date(),
      status: 'sending'
    };
    
    if (attachments && attachments.length > 0) {
      newMessage.attachments = attachments.map(file => ({
        type: file.type.startsWith('image/') 
          ? 'image' 
          : file.type.startsWith('audio/') 
            ? 'audio' 
            : file.type.startsWith('video/') 
              ? 'video' 
              : 'document',
        url: URL.createObjectURL(file),
        name: file.name
      }));
    }
    
    setMessages([...messages, newMessage]);
    
    // Update the conversation list with the new message
    setConversations(prev => prev.map(conv => 
      conv.id === activeChat 
        ? {...conv, lastMessage: content, time: 'Just now'} 
        : conv
    ));
    
    // Simulate message status changes
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
      ));
      
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        ));
        
        // Simulate typing indicator
        setIsTyping(true);
        
        // Simulate a response
        setTimeout(() => {
          setIsTyping(false);
          
          const responses = [
            "Thank you for the information, doctor. I'll follow your advice.",
            "I appreciate your quick response. When should I come for a follow-up?",
            "Should I take any medication for this in the meantime?",
            "I've had similar pain before but not this intense.",
            "Does this mean I should go to the emergency room?"
          ];
          
          const response: Message = {
            id: (Date.now() + 1).toString(),
            content: responses[Math.floor(Math.random() * responses.length)],
            sender: 'user',
            timestamp: new Date(),
            status: 'delivered'
          };
          
          setMessages(prev => [...prev, response]);
          
          // Update conversation list
          setConversations(prev => prev.map(conv => 
            conv.id === activeChat 
              ? {...conv, lastMessage: response.content, time: 'Just now'} 
              : conv
          ));
          
          // Mark doctor's message as read
          setTimeout(() => {
            setMessages(prev => prev.map(msg => 
              msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
            ));
          }, 1000);
        }, 3000);
      }, 1000);
    }, 1000);
  };
  
  const handleSelectConversation = (id: string) => {
    setActiveChat(id);
    // Clear unread count
    setConversations(prev => prev.map(conv => 
      conv.id === id 
        ? {...conv, unread: 0} 
        : conv
    ));
    
    // In a real app, this would fetch messages for the selected conversation
    // For now, we'll just keep the existing messages
  };
  
  const handleSelectDoctor = (doctor: any) => {
    // Check if we already have a conversation with this doctor
    const existingConversation = conversations.find(conv => conv.id === doctor.id);
    
    if (!existingConversation) {
      // Create a new conversation
      const newConversation = {
        id: doctor.id,
        name: doctor.name,
        avatar: doctor.avatar,
        role: doctor.specialty,
        lastMessage: "New conversation started",
        unread: 0,
        time: 'Just now',
        type: 'doctor'
      };
      
      setConversations([newConversation, ...conversations]);
    }
    
    // Select the conversation
    setActiveChat(doctor.id);
    setShowDirectory(false);
    
    toast({
      title: "Chat started",
      description: `You can now chat with ${doctor.name}`,
    });
  };
  
  const getActiveConversation = () => {
    return conversations.find(conv => conv.id === activeChat) || null;
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-12 gap-0">
          {/* Sidebar with conversations list */}
          <div className="col-span-3 border-r h-full overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Messages</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={() => setShowDirectory(!showDirectory)}
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {!showDirectory ? (
              <div className="divide-y">
                {conversations.map(conversation => (
                  <div 
                    key={conversation.id}
                    className={`p-3 cursor-pointer hover:bg-muted/50 ${activeChat === conversation.id ? 'bg-muted' : ''}`}
                    onClick={() => handleSelectConversation(conversation.id)}
                  >
                    <div className="flex gap-3">
                      <Avatar className="h-12 w-12 relative">
                        <AvatarImage src={conversation.avatar} alt={conversation.name} />
                        <AvatarFallback>{conversation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        {conversation.type === 'doctor' && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-blue-500 border-2 border-white"></div>
                        )}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm truncate">{conversation.name}</h4>
                          <span className="text-xs text-muted-foreground">{conversation.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{conversation.role}</p>
                        <p className="text-xs truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="flex-shrink-0 flex items-start">
                          <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                            {conversation.unread}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <DoctorDirectory onSelectDoctor={handleSelectDoctor} />
            )}
          </div>
          
          {/* Chat area */}
          <div className="col-span-9 h-full flex flex-col">
            <Card className="h-full flex flex-col rounded-none border-0">
              <CardContent className="p-0 flex-1">
                {activeChat ? (
                  <ChatInterface 
                    messages={messages} 
                    onSendMessage={handleSendMessage}
                    placeholder="Type your message..."
                    buttonText="Send"
                    recipientId={activeChat}
                    recipientName={getActiveConversation()?.name || ''}
                    recipientAvatar={getActiveConversation()?.avatar || ''}
                    recipientRole={getActiveConversation()?.role || ''}
                    isTyping={isTyping}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center p-6">
                      <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium text-lg">No conversation selected</h3>
                      <p className="text-muted-foreground mt-1">Select a conversation from the sidebar or start a new one</p>
                      <Button
                        className="mt-4"
                        onClick={() => setShowDirectory(true)}
                      >
                        Find Doctors
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const Records = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Patient Records</h2>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-6 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>P{i}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Patient Name {i}</p>
                    <p className="text-sm text-muted-foreground">Last updated: {i} day{i !== 1 ? 's' : ''} ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button size="sm">Update</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;
