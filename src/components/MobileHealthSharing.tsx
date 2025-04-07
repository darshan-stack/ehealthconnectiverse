
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useDeviceSharing } from "@/hooks/use-device-sharing";
import { EmergencyAccessService } from "@/utils/emergencyAccessService";
import { Bluetooth, Nfc, Shield, Clock, AlertTriangle, Copy, CheckCircle, X } from 'lucide-react';

interface MobileHealthSharingProps {
  patientId: string;
  patientName: string;
}

const MobileHealthSharing: React.FC<MobileHealthSharingProps> = ({ patientId, patientName }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("nfc");
  const [accessDuration, setAccessDuration] = useState(4); // hours
  const [isTemporaryAccess, setIsTemporaryAccess] = useState(true);
  const [pinDisplay, setPinDisplay] = useState<string | null>(null);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activePins, setActivePins] = useState<any[]>([]);
  
  const { 
    isNfcAvailable, 
    isBluetoothAvailable, 
    isSharing,
    shareViaNfc,
    shareViaBluetooth,
    generateEmergencyPin
  } = useDeviceSharing({
    onShareSuccess: (method) => {
      console.log(`Successfully shared via ${method}`);
    },
    onShareError: (error, method) => {
      console.error(`Error sharing via ${method}:`, error);
    }
  });
  
  const handleShareViaNfc = async () => {
    await shareViaNfc(patientId, isTemporaryAccess, accessDuration);
  };
  
  const handleShareViaBluetooth = async () => {
    await shareViaBluetooth(patientId, isTemporaryAccess, accessDuration);
  };
  
  const handleGeneratePin = async () => {
    setIsLoading(true);
    try {
      const pin = await EmergencyAccessService.generateEmergencyPin(
        patientId, 
        accessDuration * 60
      );
      setPinDisplay(pin);
      setShowPinDialog(true);
      
      // Refresh active PINs
      loadActivePins();
    } catch (error) {
      toast({
        title: "PIN Generation Failed",
        description: "Failed to generate emergency PIN",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadActivePins = async () => {
    const pins = EmergencyAccessService.getActiveEmergencyAccess(patientId);
    setActivePins(pins);
  };
  
  const handleRevokeAllPins = async () => {
    setIsLoading(true);
    try {
      const revoked = await EmergencyAccessService.revokeEmergencyPin(patientId);
      if (revoked) {
        toast({
          title: "PINs Revoked",
          description: "All emergency access PINs have been revoked",
        });
        setActivePins([]);
      } else {
        toast({
          title: "No Active PINs",
          description: "There are no active emergency PINs to revoke",
        });
      }
    } catch (error) {
      toast({
        title: "Revocation Failed",
        description: "Failed to revoke emergency PINs",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyPinToClipboard = () => {
    if (pinDisplay) {
      navigator.clipboard.writeText(pinDisplay);
      toast({
        title: "Copied to Clipboard",
        description: "Emergency PIN copied to clipboard",
      });
    }
  };
  
  // Load active PINs when component mounts
  React.useEffect(() => {
    loadActivePins();
  }, [patientId]);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          Health Record Sharing
        </CardTitle>
        <CardDescription>
          Share your health records securely with healthcare providers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="nfc" disabled={!isNfcAvailable}>
              <Nfc className="mr-2 h-4 w-4" />
              NFC
            </TabsTrigger>
            <TabsTrigger value="bluetooth" disabled={!isBluetoothAvailable}>
              <Bluetooth className="mr-2 h-4 w-4" />
              Bluetooth
            </TabsTrigger>
            <TabsTrigger value="emergency">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Emergency
            </TabsTrigger>
          </TabsList>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="temporary-access">Temporary Access</Label>
              <Switch 
                id="temporary-access" 
                checked={isTemporaryAccess}
                onCheckedChange={setIsTemporaryAccess}
              />
            </div>
            
            {isTemporaryAccess && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="access-duration">Access Duration</Label>
                  <span className="text-sm text-muted-foreground">{accessDuration} hours</span>
                </div>
                <Slider
                  id="access-duration"
                  min={1}
                  max={24}
                  step={1}
                  value={[accessDuration]}
                  onValueChange={(values) => setAccessDuration(values[0])}
                />
              </div>
            )}
          </div>
          
          <TabsContent value="nfc" className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Nfc className="h-16 w-16 mx-auto mb-2 text-primary" />
              <h3 className="font-medium">NFC Sharing</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Hold your device near the healthcare provider's NFC reader to share your health records.
              </p>
              <Button 
                onClick={handleShareViaNfc} 
                disabled={isSharing}
                className="w-full"
              >
                {isSharing ? "Sharing..." : "Share via NFC"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="bluetooth" className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Bluetooth className="h-16 w-16 mx-auto mb-2 text-primary" />
              <h3 className="font-medium">Bluetooth Sharing</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect to the healthcare provider's device via Bluetooth to share your health records.
              </p>
              <Button 
                onClick={handleShareViaBluetooth} 
                disabled={isSharing}
                className="w-full"
              >
                {isSharing ? "Sharing..." : "Share via Bluetooth"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="emergency" className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <AlertTriangle className="h-16 w-16 mx-auto mb-2 text-destructive" />
              <h3 className="font-medium">Emergency Access</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Generate a one-time PIN for emergency access to your health records.
              </p>
              <Button 
                onClick={handleGeneratePin} 
                disabled={isLoading}
                variant="destructive"
                className="w-full"
              >
                {isLoading ? "Generating..." : "Generate Emergency PIN"}
              </Button>
            </div>
            
            {activePins.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Active Emergency PINs</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleRevokeAllPins}
                    disabled={isLoading}
                  >
                    Revoke All
                  </Button>
                </div>
                <div className="space-y-2">
                  {activePins.map((pin, index) => (
                    <div key={index} className="flex items-center justify-between bg-background rounded-md p-2 border">
                      <div>
                        <p className="text-sm font-medium">Emergency Access</p>
                        <p className="text-xs text-muted-foreground">
                          Expires in {Math.ceil((pin.expiryTime - Date.now()) / (1000 * 60))} minutes
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-destructive/10">Active</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* PIN Display Dialog */}
      <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Emergency Access PIN</DialogTitle>
            <DialogDescription>
              Share this PIN with emergency healthcare providers to grant one-time access to your health records.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="bg-accent p-4 rounded-lg text-center w-full mb-4">
              <p className="text-2xl font-bold tracking-wider">{pinDisplay}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Valid for {accessDuration} hours
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={copyPinToClipboard}
              >
                <Copy className="h-4 w-4" />
                Copy PIN
              </Button>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="secondary" onClick={() => setShowPinDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default MobileHealthSharing;
