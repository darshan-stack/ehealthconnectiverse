import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/ChatInterface';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  FileText,
  Activity,
  User,
  Users,
  MessageSquare,
  Bell,
  Settings,
  BarChart3,
  Clock,
  ChevronRight,
  Search,
  Plus,
  Stethoscope,
  Clipboard,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

// Demo patients for the doctor dashboard
const patients = [
  {
    id: 'patient_1',
    name: 'Rahul Mehta',
    age: 45,
    gender: 'Male',
    condition: 'Hypertension',
    lastVisit: '2 weeks ago',
    nextAppointment: 'May 15, 2023',
    status: 'Stable',
    avatar: 'https://ui-avatars.com/api/?name=Rahul+Mehta&background=FF453A&color=fff',
  },
  {
    id: 'patient_2',
    name: 'Sunita Gupta',
    age: 38,
    gender: 'Female',
    condition: 'Diabetes Type 2',
    lastVisit: '1 month ago',
    nextAppointment: 'May 22, 2023',
    status: 'Review',
    avatar: 'https://ui-avatars.com/api/?name=Sunita+Gupta&background=FFD60A&color=fff',
  },
  {
    id: 'patient_3',
    name: 'Vikram Singh',
    age: 62,
    gender: 'Male',
    condition: 'Coronary Artery Disease',
    lastVisit: '3 days ago',
    nextAppointment: 'June 5, 2023',
    status: 'Critical',
    avatar: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=30D158&color=fff',
  },
  {
    id: 'patient_4',
    name: 'Preeti Sharma',
    age: 29,
    gender: 'Female',
    condition: 'Asthma',
    lastVisit: '2 months ago',
    nextAppointment: 'June 15, 2023',
    status: 'Stable',
    avatar: 'https://ui-avatars.com/api/?name=Preeti+Sharma&background=64D2FF&color=fff',
  },
];

// Demo appointments for today
const todayAppointments = [
  {
    id: 'app_1',
    patientName: 'Vikram Singh',
    patientId: 'patient_3',
    time: '10:30 AM',
    purpose: 'Follow-up',
    status: 'Completed',
  },
  {
    id: 'app_2',
    patientName: 'Meera Patel',
    patientId: 'patient_5',
    time: '11:45 AM',
    purpose: 'New Patient',
    status: 'In Progress',
  },
  {
    id: 'app_3',
    patientName: 'Arjun Malhotra',
    patientId: 'patient_6',
    time: '2:15 PM',
    purpose: 'Lab Results',
    status: 'Scheduled',
  },
  {
    id: 'app_4',
    patientName: 'Kavita Reddy',
    patientId: 'patient_7',
    time: '3:30 PM',
    purpose: 'Consultation',
    status: 'Scheduled',
  },
];

// Demo stats for dashboard
const doctorStats = {
  patientsToday: 8,
  totalPatients: 125,
  pendingReports: 3,
  avgConsultationTime: 22, // in minutes
  patientDemographics: {
    male: 58,
    female: 42,
  },
  patientsByAge: {
    under18: 15,
    age18to30: 22,
    age31to50: 38,
    age51to70: 20,
    over70: 5,
  },
  consultationsTrend: [
    { month: 'Jan', count: 42 },
    { month: 'Feb', count: 38 },
    { month: 'Mar', count: 45 },
    { month: 'Apr', count: 50 },
    { month: 'May', count: 48 },
  ],
};

// Main component
const DoctorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null);
  
  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'stable':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'review':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'critical':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'new':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };
  
  // Function to get appointment status color
  const getAppointmentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'in progress':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'scheduled':
        return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'cancelled':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };
  
  // Dashboard home component
  const DashboardHome = () => (
    <div className="space-y-8">
      {/* Welcome Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                Welcome, Dr. {user?.name?.split(' ')[0] || 'User'}
              </h2>
              <p className="text-muted-foreground">
                You have {todayAppointments.filter(a => a.status === 'Scheduled').length} upcoming appointments today
              </p>
            </div>
            <Button 
              className="mt-4 sm:mt-0 bg-primary hover:bg-primary/90 text-white" 
              onClick={() => setActiveTab('appointments')}
            >
              View Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Users className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">Patients Today</h3>
            <p className="text-2xl font-bold">{doctorStats.patientsToday}</p>
            <p className="text-xs text-muted-foreground">
              {todayAppointments.filter(a => a.status === 'Completed').length} Completed
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Clock className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">Next Appointment</h3>
            <p className="text-lg font-bold">
              {todayAppointments.find(a => a.status === 'Scheduled')?.time || 'No appointments'}
            </p>
            <p className="text-xs text-muted-foreground">
              {todayAppointments.find(a => a.status === 'Scheduled')?.patientName || ''}
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Clipboard className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">Pending Reports</h3>
            <p className="text-2xl font-bold">{doctorStats.pendingReports}</p>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <BarChart3 className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">Total Patients</h3>
            <p className="text-2xl font-bold">{doctorStats.totalPatients}</p>
            <p className="text-xs text-muted-foreground">Active patients</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Today's Schedule */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Today's Schedule</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              Full Calendar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {todayAppointments.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No appointments scheduled for today
            </p>
          ) : (
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{appointment.patientName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {appointment.time} • {appointment.purpose}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded text-xs ${getAppointmentStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => navigate(`/chat/${appointment.patientId}`)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Patient Overview */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Recent Patients</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-sm">
                <Search className="h-4 w-4 mr-1" />
                Find Patient
              </Button>
              <Button variant="default" size="sm" className="text-sm bg-primary text-white">
                <Plus className="h-4 w-4 mr-1" />
                Add Patient
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 py-3 text-left font-medium">Patient</th>
                  <th className="px-4 py-3 text-left font-medium">Age/Gender</th>
                  <th className="px-4 py-3 text-left font-medium">Condition</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Last Visit</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {patients.map((patient) => (
                  <tr 
                    key={patient.id} 
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img 
                            src={patient.avatar} 
                            alt={patient.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{patient.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {patient.age}, {patient.gender}
                    </td>
                    <td className="px-4 py-3">
                      {patient.condition}
                    </td>
                    <td className="px-4 py-3">
                      <div className={`px-2 py-1 rounded text-xs inline-block ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {patient.lastVisit}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => navigate(`/chat/${patient.id}`)}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Your clinical activity and patient satisfaction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Patient Demographics</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Male</span>
                  <span>{doctorStats.patientDemographics.male}%</span>
                </div>
                <Progress value={doctorStats.patientDemographics.male} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Female</span>
                  <span>{doctorStats.patientDemographics.female}%</span>
                </div>
                <Progress value={doctorStats.patientDemographics.female} className="h-2" />
              </div>
              
              <h3 className="text-sm font-medium mt-6">Age Distribution</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Under 18</span>
                  <span>{doctorStats.patientsByAge.under18}%</span>
                </div>
                <Progress value={doctorStats.patientsByAge.under18} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>18-30</span>
                  <span>{doctorStats.patientsByAge.age18to30}%</span>
                </div>
                <Progress value={doctorStats.patientsByAge.age18to30} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>31-50</span>
                  <span>{doctorStats.patientsByAge.age31to50}%</span>
                </div>
                <Progress value={doctorStats.patientsByAge.age31to50} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>51-70</span>
                  <span>{doctorStats.patientsByAge.age51to70}%</span>
                </div>
                <Progress value={doctorStats.patientsByAge.age51to70} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Over 70</span>
                  <span>{doctorStats.patientsByAge.over70}%</span>
                </div>
                <Progress value={doctorStats.patientsByAge.over70} className="h-2" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Consultation Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="text-xs text-muted-foreground">Avg. Consultation Time</h4>
                  <p className="text-2xl font-bold">{doctorStats.avgConsultationTime} min</p>
                </Card>
                <Card className="p-4">
                  <h4 className="text-xs text-muted-foreground">Patient Satisfaction</h4>
                  <p className="text-2xl font-bold">4.8/5</p>
                </Card>
                <Card className="p-4">
                  <h4 className="text-xs text-muted-foreground">Follow-up Rate</h4>
                  <p className="text-2xl font-bold">92%</p>
                </Card>
                <Card className="p-4">
                  <h4 className="text-xs text-muted-foreground">Treatment Success</h4>
                  <p className="text-2xl font-bold">88%</p>
                </Card>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Monthly Consultations</h3>
                <div className="flex items-end h-32 gap-1">
                  {doctorStats.consultationsTrend.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-primary/20 rounded-t-sm" 
                        style={{ 
                          height: `${(item.count / 50) * 100}%`,
                          maxHeight: '100%'
                        }}
                      ></div>
                      <span className="text-xs text-muted-foreground mt-1">{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  // Patients component
  const DashboardPatients = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Patient Management</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="text-primary border-primary/20"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          {selectedPatient ? (
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img 
                      src={selectedPatient.avatar} 
                      alt={selectedPatient.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedPatient.name}</h3>
                    <p className="text-muted-foreground">{selectedPatient.age}, {selectedPatient.gender}</p>
                    <div className={`mt-2 px-2 py-1 rounded text-xs inline-block ${getStatusColor(selectedPatient.status)}`}>
                      {selectedPatient.status}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedPatient(null)}
                >
                  Back to List
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="p-4">
                  <h4 className="text-sm font-medium mb-2">Medical Condition</h4>
                  <p>{selectedPatient.condition}</p>
                </Card>
                <Card className="p-4">
                  <h4 className="text-sm font-medium mb-2">Last Visit</h4>
                  <p>{selectedPatient.lastVisit}</p>
                </Card>
                <Card className="p-4">
                  <h4 className="text-sm font-medium mb-2">Next Appointment</h4>
                  <p>{selectedPatient.nextAppointment}</p>
                </Card>
              </div>
              
              <Tabs defaultValue="medical-history">
                <TabsList className="mb-6">
                  <TabsTrigger value="medical-history">Medical History</TabsTrigger>
                  <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                  <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
                  <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="medical-history" className="space-y-4">
                  <h3 className="font-medium">Medical History</h3>
                  <p className="text-muted-foreground">Patient's detailed medical history would be displayed here.</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between p-3 bg-secondary/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Hypertension</h4>
                        <p className="text-sm text-muted-foreground">Diagnosed 5 years ago</p>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                    <div className="flex justify-between p-3 bg-secondary/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Appendectomy</h4>
                        <p className="text-sm text-muted-foreground">Surgery performed in 2018</p>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="prescriptions">
                  <h3 className="font-medium mb-4">Current Prescriptions</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-secondary/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Amlodipine 5mg</h4>
                        <p className="text-sm text-muted-foreground">Once daily, Morning</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Renew</Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="flex justify-between p-3 bg-secondary/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Atorvastatin 10mg</h4>
                        <p className="text-sm text-muted-foreground">Once daily, Night</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Renew</Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="lab-results">
                  <h3 className="font-medium mb-4">Recent Lab Results</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-secondary/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Complete Blood Count</h4>
                        <p className="text-sm text-muted-foreground">Performed on May 2, 2023</p>
                      </div>
                      <Button variant="outline" size="sm">View Report</Button>
                    </div>
                    <div className="flex justify-between p-3 bg-secondary/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Lipid Profile</h4>
                        <p className="text-sm text-muted-foreground">Performed on April 15, 2023</p>
                      </div>
                      <Button variant="outline" size="sm">View Report</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="vitals">
                  <h3 className="font-medium mb-4">Vital Signs History</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="p-4 text-center">
                        <h4 className="text-xs text-muted-foreground mb-1">Blood Pressure</h4>
                        <p className="text-lg font-bold">120/80</p>
                        <p className="text-xs text-muted-foreground">Last recorded May 2, 2023</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <h4 className="text-xs text-muted-foreground mb-1">Heart Rate</h4>
                        <p className="text-lg font-bold">78 BPM</p>
                        <p className="text-xs text-muted-foreground">Last recorded May 2, 2023</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <h4 className="text-xs text-muted-foreground mb-1">Temperature</h4>
                        <p className="text-lg font-bold">98.6°F</p>
                        <p className="text-xs text-muted-foreground">Last recorded May 2, 2023</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <h4 className="text-xs text-muted-foreground mb-1">Oxygen Saturation</h4>
                        <p className="text-lg font-bold">98%</p>
                        <p className="text-xs text-muted-foreground">Last recorded May 2, 2023</p>
                      </Card>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Blood Pressure Trend</h4>
                      <div className="h-32 bg-secondary/50 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Blood pressure graph would display here</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 flex gap-2">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={() => navigate(`/chat/${selectedPatient.id}`)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Patient
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Update Records
                </Button>
              </div>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 py-3 text-left font-medium">Patient</th>
                  <th className="px-4 py-3 text-left font-medium">Age/Gender</th>
                  <th className="px-4 py-3 text-left font-medium">Condition</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Last Visit</th>
                  <th className="px-4 py-3 text-left font-medium">Next Appointment</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {patients.map((patient) => (
                  <tr 
                    key={patient.id} 
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img 
                            src={patient.avatar} 
                            alt={patient.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{patient.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {patient.age}, {patient.gender}
                    </td>
                    <td className="px-4 py-3">
                      {patient.condition}
                    </td>
                    <td className="px-4 py-3">
                      <div className={`px-2 py-1 rounded text-xs inline-block ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {patient.lastVisit}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {patient.nextAppointment}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/chat/${patient.id}`);
                          }}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Additional action if needed
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
  
  // Messages component
  const DashboardMessages = () => (
    <div className="space-y-6 h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Patient Messages</h2>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-16rem)]">
        <Card className="lg:col-span-1 overflow-hidden border-border/50">
          <CardContent className="p-0">
            <div className="p-3 bg-muted/30 border-b border-border/50">
              <h3 className="font-medium">Recent Conversations</h3>
            </div>
