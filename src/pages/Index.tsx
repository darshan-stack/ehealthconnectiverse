
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Shield, 
  Brain,
  Heart, 
  Activity, 
  FileText, 
  MessageSquare, 
  RefreshCw,
  Clock,
  Users,
  Building,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4 sm:text-4xl">
                Comprehensive Healthcare Platform
              </h2>
              <p className="text-muted-foreground">
                Our platform combines cutting-edge technology with healthcare expertise to provide 
                a seamless experience for patients and doctors alike.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <FeatureCard 
                icon={Smartphone}
                title="Telemedicine & Consultations"
                description="Connect with doctors through video, voice, or chat consultations from anywhere, anytime."
                delay={0.1}
              />
              
              <FeatureCard 
                icon={Shield}
                title="Blockchain-Secured Records"
                description="Your health records are secured with advanced blockchain technology ensuring privacy and data integrity."
                delay={0.2}
              />
              
              <FeatureCard 
                icon={Brain}
                title="AI-Powered Health Insights"
                description="Receive personalized health recommendations and early disease detection powered by advanced AI."
                delay={0.3}
              />
              
              <FeatureCard 
                icon={Heart}
                title="Chronic Disease Monitoring"
                description="Track and manage chronic conditions with real-time monitoring and personalized care plans."
                delay={0.4}
              />
              
              <FeatureCard 
                icon={FileText}
                title="Insurance & Scheme Integration"
                description="Seamlessly connect your health insurance and access government healthcare schemes."
                delay={0.5}
              />
              
              <FeatureCard 
                icon={Users}
                title="Community & Support"
                description="Join patient forums and support groups to share experiences and gain insights."
                delay={0.6}
              />
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-secondary/30">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4 sm:text-4xl">
                How It Works
              </h2>
              <p className="text-muted-foreground">
                eHealthWave simplifies healthcare management with a user-friendly approach
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-3">Create Your Account</h3>
                <p className="text-muted-foreground">
                  Register securely with your Aadhar number and create your health profile
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-3">Connect with Doctors</h3>
                <p className="text-muted-foreground">
                  Consult with healthcare professionals through secure video, voice, or chat
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-3">Manage Your Health</h3>
                <p className="text-muted-foreground">
                  Track your health records, medications, and receive personalized insights
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                onClick={() => navigate('/auth')} 
                className="bg-primary hover:bg-primary/90 text-white px-6 py-6 h-auto"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* For Patients and Doctors */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">For Patients</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Shield className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Secure Health Records</h3>
                      <p className="text-muted-foreground text-sm">
                        Access your medical history, prescriptions, and lab reports securely from anywhere
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">24/7 Doctor Access</h3>
                      <p className="text-muted-foreground text-sm">
                        Connect with healthcare professionals anytime through video, voice, or chat consultations
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Brain className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Personalized Health Insights</h3>
                      <p className="text-muted-foreground text-sm">
                        Receive AI-powered recommendations and early disease detection based on your health data
                      </p>
                    </div>
                  </li>
                </ul>
                
                <Button 
                  onClick={() => navigate('/auth')} 
                  className="mt-8 bg-primary hover:bg-primary/90 text-white"
                >
                  Join as Patient
                </Button>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">For Doctors</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Patient Management</h3>
                      <p className="text-muted-foreground text-sm">
                        Efficiently manage your patients with comprehensive health records and history
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MessageSquare className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Telemedicine Platform</h3>
                      <p className="text-muted-foreground text-sm">
                        Conduct remote consultations through a secure and feature-rich communication platform
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Building className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Professional Network</h3>
                      <p className="text-muted-foreground text-sm">
                        Connect with other healthcare professionals to share research, cases, and expertise
                      </p>
                    </div>
                  </li>
                </ul>
                
                <Button 
                  onClick={() => navigate('/auth')} 
                  variant="outline" 
                  className="mt-8 border-primary text-primary hover:bg-primary/5"
                >
                  Join as Doctor
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-primary/5 to-secondary/30">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 max-w-2xl mx-auto">
              Transform Your Healthcare Experience Today
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-10">
              Join thousands of users who have already revolutionized how they manage their health.
              Sign up now to experience healthcare reimagined.
            </p>
            <Button 
              onClick={() => navigate('/auth')} 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto text-lg"
            >
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
