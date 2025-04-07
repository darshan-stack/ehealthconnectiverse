
import { toast } from '@/hooks/use-toast';
import { addRecordToBlockchain, getUserMedicalRecords } from '@/utils/blockchain';
import { verifyBlockchain } from '@/utils/blockchain';

interface EmergencyAccess {
  patientId: string;
  pin: string;
  accessGrantedTo: string; // Provider or paramedic ID
  expiryTime: number; // Unix timestamp
  used: boolean;
}

// Mock in-memory storage for emergency PINs
const emergencyAccessStore: EmergencyAccess[] = [];

export const EmergencyAccessService = {
  // Generate a one-time PIN for emergency access
  generateEmergencyPin: async (patientId: string, validityMinutes: number = 60): Promise<string> => {
    try {
      // Generate a random 6-digit PIN
      const pin = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Set expiry time
      const expiryTime = Date.now() + (validityMinutes * 60 * 1000);
      
      // Store the emergency access
      const access: EmergencyAccess = {
        patientId,
        pin,
        accessGrantedTo: '', // Will be filled when used
        expiryTime,
        used: false
      };
      
      emergencyAccessStore.push(access);
      
      // Add to blockchain for auditing
      await addRecordToBlockchain({
        type: 'EMERGENCY_PIN_GENERATED',
        patientId,
        timestamp: Date.now(),
        expiryTime
      });
      
      return pin;
    } catch (error) {
      console.error('Error generating emergency PIN:', error);
      throw new Error('Failed to generate emergency PIN');
    }
  },
  
  // Validate emergency PIN and grant access
  validateEmergencyPin: async (
    pin: string, 
    patientId: string, 
    providerId: string
  ): Promise<{ valid: boolean; records?: any[] }> => {
    try {
      // Find the emergency access
      const accessIndex = emergencyAccessStore.findIndex(
        access => access.pin === pin && 
                 access.patientId === patientId && 
                 !access.used &&
                 access.expiryTime > Date.now()
      );
      
      if (accessIndex === -1) {
        throw new Error('Invalid or expired emergency PIN');
      }
      
      // Mark as used
      emergencyAccessStore[accessIndex].used = true;
      emergencyAccessStore[accessIndex].accessGrantedTo = providerId;
      
      // Add to blockchain for auditing
      await addRecordToBlockchain({
        type: 'EMERGENCY_ACCESS_GRANTED',
        patientId,
        providerId,
        timestamp: Date.now()
      });
      
      // Get patient records
      const records = await getUserMedicalRecords(patientId);
      
      return {
        valid: true,
        records
      };
    } catch (error) {
      console.error('Error validating emergency PIN:', error);
      return {
        valid: false
      };
    }
  },
  
  // Check if PIN is valid without using it
  checkPinValidity: (pin: string, patientId: string): boolean => {
    const access = emergencyAccessStore.find(
      access => access.pin === pin && 
               access.patientId === patientId && 
               !access.used &&
               access.expiryTime > Date.now()
    );
    
    return !!access;
  },
  
  // Get all active emergency access PINs for a patient
  getActiveEmergencyAccess: (patientId: string): Omit<EmergencyAccess, 'pin'>[] => {
    return emergencyAccessStore
      .filter(access => 
        access.patientId === patientId && 
        !access.used && 
        access.expiryTime > Date.now()
      )
      .map(({ pin, ...rest }) => rest); // Exclude the PIN for security
  },
  
  // Revoke an emergency PIN
  revokeEmergencyPin: async (patientId: string): Promise<boolean> => {
    try {
      const initialCount = emergencyAccessStore.length;
      
      // Filter out all active pins for this patient
      const newStore = emergencyAccessStore.filter(
        access => !(access.patientId === patientId && 
                   !access.used && 
                   access.expiryTime > Date.now())
      );
      
      // Update store
      emergencyAccessStore.length = 0;
      emergencyAccessStore.push(...newStore);
      
      const removedCount = initialCount - emergencyAccessStore.length;
      
      if (removedCount > 0) {
        // Add to blockchain for auditing
        await addRecordToBlockchain({
          type: 'EMERGENCY_PIN_REVOKED',
          patientId,
          timestamp: Date.now(),
          count: removedCount
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error revoking emergency PIN:', error);
      return false;
    }
  }
};
