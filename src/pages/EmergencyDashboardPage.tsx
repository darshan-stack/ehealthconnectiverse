
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import EmergencyDashboard from "@/components/EmergencyDashboard";
import EmergencyAlert from "@/components/EmergencyAlert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeAlert, ChevronLeft } from 'lucide-react';

const EmergencyDashboardPage = () => {
  // Mock provider data
  const providerId = "provider_123";
  const providerName = "Dr. Ajay Sharma";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-4 py-3 flex items-center justify-between bg-background">
        <div className="flex items-center gap-2">
          <Link to="/">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              E
            </div>
          </Link>
          <h1 className="text-lg font-bold">eHealthWave</h1>
        </div>
        <Link to="/">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Button>
        </Link>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Emergency Services</h1>
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="emergency" className="flex items-center">
                <BadgeAlert className="h-4 w-4 mr-1 text-destructive" />
                Emergency Access
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="dashboard" className="mt-0">
            <EmergencyDashboard providerId={providerId} providerName={providerName} />
          </TabsContent>
          
          <TabsContent value="emergency" className="mt-0">
            <EmergencyAlert providerId={providerId} providerName={providerName} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmergencyDashboardPage;
