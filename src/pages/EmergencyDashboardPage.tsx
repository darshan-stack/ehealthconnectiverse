
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import EmergencyDashboard from "@/components/EmergencyDashboard";

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
            Back to Home
          </Button>
        </Link>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        <EmergencyDashboard providerId={providerId} providerName={providerName} />
      </div>
    </div>
  );
};

export default EmergencyDashboardPage;
