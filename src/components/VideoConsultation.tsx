
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Video, Phone, MessageSquare, Calendar, Clock, X, PhoneCall, VideoIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Fixed contact number for consultation
const CONSULTATION_NUMBER = "8010599511";

// Demo data for available doctors
const availableDoctors = [
  {
    id: 'doc1',
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=0A84FF&color=fff',
    available: true,
    appointmentTime: '10:30 AM - 11:30 AM',
    experience: '12 years',
    rating: 4.8,
    consultationFee: '₹800',
    nextAvailable: 'Today',
  },
  {
    id: 'doc2',
    name: 'Dr. Rajesh Patel',
    specialty: 'Neurologist',
    avatar: 'https://ui-avatars.com/api/?name=Rajesh+Patel&background=30D158&color=fff',
    available: false,
    appointmentTime: '2:00 PM - 3:00 PM',
    experience: '15 years',
    rating: 4.9,
    consultationFee: '₹1200',
    nextAvailable: 'Tomorrow',
  },
  {
    id: 'doc3',
    name: 'Dr. Ananya Singh',
    specialty: 'Pediatrician',
    avatar: 'https://ui-avatars.com/api/?name=Ananya+Singh&background=FF9F0A&color=fff',
    available: true,
    appointmentTime: '12:00 PM - 1:00 PM',
    experience: '8 years',
    rating: 4.7,
    consultationFee: '₹600',
    nextAvailable: 'Today',
  },
  {
    id: 'doc4',
    name: 'Dr. Arjun Mehta',
    specialty: 'Dermatologist',
    avatar: 'https://ui-avatars.com/api/?name=Arjun+Mehta&background=FF453A&color=fff',
    available: true,
    appointmentTime: '4:30 PM - 5:30 PM',
    experience: '10 years',
    rating: 4.6,
    consultationFee: '₹900',
    nextAvailable: 'Today',
  },
];

const VideoConsultation: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('upcoming');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showVideoCall, setShowVideoCall] = useState<boolean>(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState<boolean>(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState<string>('Hello doctor, I would like to schedule a consultation.');

  const handleStartVideoCall = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowVideoCall(true);
    // In a real app, this would initiate a video call
    setTimeout(() => {
      toast({
        title: "Video call initiated",
        description: `Connecting to ${doctor.name}...`,
      });
    }, 1000);
  };

  const handleEndVideoCall = () => {
    toast({
      title: "Call ended",
      description: "Your video consultation has ended.",
    });
    setShowVideoCall(false);
  };

  const handleOpenWhatsApp = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowWhatsAppModal(true);
  };

  const handleSendWhatsAppMessage = () => {
    // In a real app, this would open WhatsApp with the message
    const encodedMessage = encodeURIComponent(whatsAppMessage);
    window.open(`https://wa.me/${CONSULTATION_NUMBER}?text=${encodedMessage}`, '_blank');
    setShowWhatsAppModal(false);
    toast({
      title: "WhatsApp opening",
      description: "Opening WhatsApp with your message.",
    });
  };

  const handleBookAppointment = (doctor: any) => {
    toast({
      title: "Appointment booked",
      description: `Your appointment with ${doctor.name} has been scheduled.`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Video Consultation</h2>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          Find Specialists
        </Button>
      </div>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="available">Available Now</TabsTrigger>
          <TabsTrigger value="previous">Previous</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Consultations</CardTitle>
              <CardDescription>Your scheduled video consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableDoctors.slice(0, 2).map((doctor) => (
                  <div key={doctor.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/20 transition-all">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={doctor.avatar} alt={doctor.name} />
                        <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Today</span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span>{doctor.appointmentTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-primary border-primary/30"
                        onClick={() => handleOpenWhatsApp(doctor)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleStartVideoCall(doctor)}
                      >
                        <VideoIcon className="h-4 w-4 mr-1" />
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Available Doctors</CardTitle>
              <CardDescription>Doctors available for immediate consultation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableDoctors.filter(d => d.available).map((doctor) => (
                  <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={doctor.avatar} alt={doctor.name} />
                            <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{doctor.name}</CardTitle>
                            <CardDescription>{doctor.specialty}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          Available
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Experience</p>
                          <p className="font-medium">{doctor.experience}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Rating</p>
                          <p className="font-medium">⭐ {doctor.rating}/5</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Consultation Fee</p>
                          <p className="font-medium">{doctor.consultationFee}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Available</p>
                          <p className="font-medium">{doctor.nextAvailable}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-2">
                      <Button 
                        variant="outline" 
                        className="w-full text-primary border-primary/30"
                        onClick={() => handleOpenWhatsApp(doctor)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        WhatsApp
                      </Button>
                      <Button 
                        className="w-full"
                        onClick={() => handleStartVideoCall(doctor)}
                      >
                        <VideoIcon className="h-4 w-4 mr-1" />
                        Consult Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="previous" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Previous Consultations</CardTitle>
              <CardDescription>Your past video consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableDoctors.slice(1, 3).map((doctor) => (
                  <div key={doctor.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/20 transition-all">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={doctor.avatar} alt={doctor.name} />
                        <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>12 May, 2023</span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span>10:30 AM</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleBookAppointment(doctor)}
                      >
                        Book Again
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOpenWhatsApp(doctor)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Video Call Dialog */}
      <Dialog open={showVideoCall} onOpenChange={setShowVideoCall}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <VideoIcon className="h-5 w-5 text-primary" />
              Video Consultation
            </DialogTitle>
            <DialogDescription>
              {selectedDoctor && `Call with ${selectedDoctor.name} (${selectedDoctor.specialty})`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full h-64 bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-2 right-2 w-24 h-32 bg-gray-800 rounded z-10 overflow-hidden">
                <img 
                  src="https://ui-avatars.com/api/?name=User&background=4F46E5&color=fff" 
                  alt="You" 
                  className="w-full h-full object-cover"
                />
              </div>
              {selectedDoctor && (
                <img 
                  src={selectedDoctor.avatar} 
                  alt={selectedDoctor.name}
                  className="w-full h-full object-cover opacity-90"
                />
              )}
            </div>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-12 w-12"
              >
                <Video className="h-6 w-6" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-12 w-12"
              >
                <Phone className="h-6 w-6" />
              </Button>
              <Button 
                variant="destructive" 
                size="icon" 
                className="rounded-full h-12 w-12"
                onClick={handleEndVideoCall}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* WhatsApp Message Dialog */}
      <Dialog open={showWhatsAppModal} onOpenChange={setShowWhatsAppModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
              WhatsApp Chat
            </DialogTitle>
            <DialogDescription>
              {selectedDoctor && `Send message to ${selectedDoctor.name} at ${CONSULTATION_NUMBER}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Your message</Label>
              <Input
                id="whatsapp-number"
                value={CONSULTATION_NUMBER}
                readOnly
                className="bg-slate-50"
              />
              <textarea
                id="message"
                value={whatsAppMessage}
                onChange={(e) => setWhatsAppMessage(e.target.value)}
                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground"
                placeholder="Type your message here..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowWhatsAppModal(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700" 
              onClick={handleSendWhatsAppMessage}
            >
              Open WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoConsultation;
