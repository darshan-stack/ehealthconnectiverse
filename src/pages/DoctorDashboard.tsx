import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Home, MessageSquare, Users, FileText, Settings, Bell } from 'lucide-react';
import ChatInterface, { Message } from '@/components/ChatInterface';

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
      <Sidebar />
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
          </div>
        </Tabs>
      </div>
    </div>
  );
};

const Sidebar = () => {
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
          <Link to="/doctor" className="flex items-center gap-3 px-3 py-2 rounded-md bg-sidebar-accent text-sidebar-accent-foreground">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/doctor/appointments" className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
            <Calendar className="h-5 w-5" />
            <span>Appointments</span>
          </Link>
          <Link to="/doctor/patients" className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
            <Users className="h-5 w-5" />
            <span>Patients</span>
          </Link>
          <Link to="/doctor/messages" className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </Link>
          <Link to="/doctor/records" className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
            <FileText className="h-5 w-5" />
            <span>Records</span>
          </Link>
        </nav>
      </div>
      
      <div className="border-t pt-4">
        <Link to="/doctor/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello Dr. Chen, I have been experiencing some chest pain lately.',
      sender: 'user',
      timestamp: new Date(Date.now() - 3600000)
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
      timestamp: new Date(Date.now() - 3400000)
    },
    {
      id: '4',
      content: "That could be concerning. How long have you been experiencing this? And do you have any history of heart problems?",
      sender: 'doctor',
      timestamp: new Date(Date.now() - 3300000)
    }
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'doctor',
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate a response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for the information, doctor. I'll follow your advice.",
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 3000);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        <Card className="h-full flex flex-col">
          <CardContent className="p-0 flex-1">
            <ChatInterface 
              messages={messages} 
              onSendMessage={handleSendMessage}
              placeholder="Type your message..."
              buttonText="Send"
            />
          </CardContent>
        </Card>
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
