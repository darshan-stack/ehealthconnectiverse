import React, { useState, useEffect } from 'react';
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useDeviceSharing } from "@/hooks/use-device-sharing";
import { EmergencyAccessService } from "@/utils/emergencyAccessService";
import BluetoothTokenSharing from "@/components/BluetoothTokenSharing";
import { Bluetooth, Nfc, Shield, Clock, AlertTriangle, Copy, CheckCircle, X, Smartphone, Search, MapPin, QrCode, PhoneCall, BadgeAlert } from 'lucide-react';

interface MobileHealthSharingProps {
  patientId: string;
  patientName: string;
}

const MobileHealthSharing: React.FC<MobileHealthSharingProps> = ({ patientId, patientName }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("bluetooth");
  const [accessDuration, setAccessDuration] = useState(4); // hours
  const [isTemporaryAccess, setIsTemporaryAccess] = useState(true);
  const [pinDisplay, setPinDisplay] = useState<string | null>(null);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activePins, setActivePins] = useState<any[]>([]);
  const [availableDevices, setAvailableDevices] = useState<{id: string, name: string}[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  
  const { 
    isNfcAvailable, 
    isBluetoothAvailable,
    isGeolocationAvailable,
    isSharing,
    qrCodeDataUrl,
    emergencyContacts,
    shareViaNfc,
    shareViaBluetooth,
    generateEmergencyPin,
    scanForBluetoothDevices,
    triggerEmergencyAlert,
    generateEmergencyQRCode
  } = useDeviceSharing({
    onShareSuccess: (method) => {
      console.log(`Successfully shared via ${method}`);
      toast({
        title: "Sharing Successful",
        description: `Health records shared via ${method} successfully`,
      });
    },
    onShareError: (error, method) => {
      console.error(`Error sharing via ${method}:`, error);
      toast({
        title: "Sharing Failed",
        description: `Failed to share health records via ${method}`,
        variant: "destructive"
      });
    }
  });
  
  // Scan for Bluetooth devices
  const handleScanForDevices = async () => {
    setIsScanning(true);
    try {
      const devices = await scanForBluetoothDevices();
      setAvailableDevices(devices);
      
      if (devices.length === 0) {
        toast({
          title: "No Devices Found",
          description: "No Bluetooth devices were found nearby",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Scanning Failed",
        description: "Failed to scan for Bluetooth devices",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
    }
  };
  
  // Share via NFC
  const handleShareViaNfc = async () => {
    await shareViaNfc(patientId, isTemporaryAccess, accessDuration);
  };
  
  // Share via Bluetooth
  const handleShareViaBluetooth = async () => {
    if (!selectedDevice) {
      toast({
        title: "No Device Selected",
        description: "Please select a device to share with",
        variant: "destructive"
      });
      return;
    }
    
    await shareViaBluetooth(patientId, patientName, isTemporaryAccess, accessDuration, selectedDevice);
  };
  
  // Generate emergency PIN and QR code
  const handleGeneratePin = async () => {
    setIsLoading(true);
    try {
      const pin = await generateEmergencyPin(patientId, patientName);
      setPinDisplay(pin);
      setShowPinDialog(true);
      
      // Generate QR code
      await generateEmergencyQRCode(patientId, patientName);
      
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
  
  // Trigger emergency alert with location sharing
  const handleEmergencyAlert = async () => {
    setIsLoading(true);
    try {
      await triggerEmergencyAlert(patientId, patientName);
      setShowEmergencyDialog(true);
    } catch (error) {
      toast({
        title: "Emergency Alert Failed",
        description: "Failed to share your emergency information",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load active PINs
  const loadActivePins = async () => {
    const pins = EmergencyAccessService.getActiveEmergencyAccess(patientId);
    setActivePins(pins);
  };
  
  // Revoke all PINs
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
  
  // Copy PIN to clipboard
  const copyPinToClipboard = () => {
    if (pinDisplay) {
      navigator.clipboard.writeText(pinDisplay);
      toast({
        title: "Copied to Clipboard",
        description: "Emergency PIN copied to clipboard",
      });
    }
  };
  
  // Show QR code
  const handleShowQrCode = async () => {
    if (!qrCodeDataUrl) {
      try {
        await generateEmergencyQRCode(patientId, patientName);
      } catch (error) {
        toast({
          title: "QR Code Generation Failed",
          description: "Failed to generate QR code",
          variant: "destructive"
        });
        return;
      }
    }
    
    setShowQrDialog(true);
  };
  
  // Load active PINs when component mounts
  React.useEffect(() => {
    loadActivePins();
    
    // If no Bluetooth support, switch to another tab
    if (!isBluetoothAvailable && activeTab === "bluetooth") {
      setActiveTab(isNfcAvailable ? "nfc" : "emergency");
    }
  }, [patientId, isBluetoothAvailable, isNfcAvailable, activeTab]);
  
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
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="token" disabled={!isBluetoothAvailable}>
              <Badge className="h-4 w-4 mr-2" />
              Token
            </TabsTrigger>
            <TabsTrigger value="nfc" disabled={!isNfcAvailable}>
              <Nfc className="h-4 w-4 mr-2" />
              NFC
            </TabsTrigger>
            <TabsTrigger value="bluetooth" disabled={!isBluetoothAvailable}>
              <Bluetooth className="h-4 w-4 mr-2" />
              Bluetooth
            </TabsTrigger>
            <TabsTrigger value="emergency">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="token" className="space-y-4">
            <BluetoothTokenSharing patientId={patientId} patientName={patientName} />
          </TabsContent>
          
          <TabsContent value="nfc" className="space-y-4">
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
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="temporary-access-bt">Temporary Access</Label>
                <Switch 
                  id="temporary-access-bt" 
                  checked={isTemporaryAccess}
                  onCheckedChange={setIsTemporaryAccess}
                />
              </div>
              
              {isTemporaryAccess && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="access-duration-bt">Access Duration</Label>
                    <span className="text-sm text-muted-foreground">{accessDuration} hours</span>
                  </div>
                  <Slider
                    id="access-duration-bt"
                    min={1}
                    max={24}
                    step={1}
                    value={[accessDuration]}
                    onValueChange={(values) => setAccessDuration(values[0])}
                  />
                </div>
              )}
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Bluetooth className="h-16 w-16 mx-auto mb-2 text-primary" />
              <h3 className="font-medium">Bluetooth Sharing</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect to a healthcare provider's device via Bluetooth to share your health records securely.
              </p>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleScanForDevices} 
                  disabled={isScanning}
                  variant="outline"
                  className="w-full"
                >
                  <Search className="mr-2 h-4 w-4" />
                  {isScanning ? "Scanning..." : "Scan for Bluetooth Devices"}
                </Button>
                
                {availableDevices.length > 0 && (
                  <div className="border rounded-md p-2 text-left">
                    <div className="text-sm font-medium mb-2">Available Devices</div>
                    <div className="space-y-2">
                      {availableDevices.map(device => (
                        <div 
                          key={device.id}
                          className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${selectedDevice === device.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-accent'}`}
                          onClick={() => setSelectedDevice(device.id)}
                        >
                          <div className="flex items-center">
                            <Smartphone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{device.name}</span>
                          </div>
                          {selectedDevice === device.id && (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={handleShareViaBluetooth} 
                  disabled={isSharing || !selectedDevice}
                  className="w-full"
                >
                  {isSharing ? "Sharing..." : "Share via Bluetooth"}
                </Button>
              </div>
            </div>
            
            {selectedDevice && (
              <Alert className="bg-blue-500/10 border-blue-500">
                <Bluetooth className="h-4 w-4 text-blue-500" />
                <AlertTitle>Device Selected</AlertTitle>
                <AlertDescription>
                  Ready to share with {availableDevices.find(d => d.id === selectedDevice)?.name}
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="emergency" className="space-y-4">
            <div className="bg-red-500/10 rounded-lg p-4 text-center border border-red-200">
              <BadgeAlert className="h-16 w-16 mx-auto mb-2 text-destructive" />
              <h3 className="font-medium">Emergency Access</h3>
              <p className="text-sm text-muted-foreground mb-4">
                In case of emergency, quickly share your health records and location with healthcare providers or emergency contacts.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Button 
                  onClick={handleGeneratePin} 
                  disabled={isLoading}
                  variant="outline"
                  className="flex items-center justify-center"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  {isLoading ? "Generating..." : "Generate Emergency PIN"}
                </Button>
                
                <Button 
                  onClick={handleShowQrCode} 
                  disabled={isLoading}
                  variant="outline"
                  className="flex items-center justify-center"
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  Show QR Code
                </Button>
              </div>
              
              <Button 
                onClick={handleEmergencyAlert} 
                disabled={isLoading || !isGeolocationAvailable}
                variant="destructive"
                className="w-full"
              >
                <BadgeAlert className="mr-2 h-4 w-4" />
                {isLoading ? "Sending Alert..." : "Emergency Alert"}
              </Button>
              
              {!isGeolocationAvailable && (
                <p className="text-xs text-destructive mt-2">
                  Location access is required for emergency alerts
                </p>
              )}
              
              <div className="mt-4 text-left">
                <h4 className="text-sm font-medium mb-2">Emergency Contact</h4>
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-md border mb-2">
                    <div className="flex items-center">
                      <PhoneCall className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{contact}</span>
                    </div>
                    <Badge variant="outline" className="bg-primary/10">Primary</Badge>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground">
                  Your location will be shared with this contact in case of emergency
                </p>
              </div>
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
      
      {/* QR Code Dialog */}
      <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Emergency QR Code</DialogTitle>
            <DialogDescription>
              Healthcare providers can scan this QR code to access your health records and current location.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            {qrCodeDataUrl ? (
              <div className="bg-white p-4 rounded-lg text-center w-full mb-4 flex justify-center">
                <img 
                  src={qrCodeDataUrl} 
                  alt="Emergency QR Code" 
                  className="w-48 h-48 mx-auto"
                />
              </div>
            ) : (
              <div className="bg-accent p-8 rounded-lg text-center w-full mb-4 flex justify-center items-center">
                <p>Generating QR code...</p>
              </div>
            )}
            <p className="text-sm text-muted-foreground text-center">
              This QR code contains your patient ID and emergency contact information.
              <br />
              When scanned, your current location will be shared.
            </p>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowQrDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Emergency Alert Dialog */}
      <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center">
              <BadgeAlert className="mr-2 h-5 w-5" />
              Emergency Alert Sent
            </DialogTitle>
            <DialogDescription>
              Your emergency alert has been sent to your emergency contacts.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Alert className="bg-red-500/10 border-red-200">
              <MapPin className="h-4 w-4 text-destructive" />
              <AlertTitle>Location Shared</AlertTitle>
              <AlertDescription>
                Your current location has been shared with your emergency contacts.
              </AlertDescription>
            </Alert>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Notifications sent to:</h4>
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center p-2 border rounded-md mb-2">
                  <PhoneCall className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{contact}</span>
                </div>
              ))}
            </div>
            
            {qrCodeDataUrl && (
              <div className="mt-4 text-center">
                <h4 className="text-sm font-medium mb-2">Emergency QR Code</h4>
                <img 
                  src={qrCodeDataUrl} 
                  alt="Emergency QR Code" 
                  className="w-32 h-32 mx-auto border p-2 bg-white"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Show this QR code to emergency responders
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="secondary" 
              onClick={() => setShowEmergencyDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default MobileHealthSharing;
