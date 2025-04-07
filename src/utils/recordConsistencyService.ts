
import { toast } from '@/hooks/use-toast';
import { addMedicalRecord } from '@/utils/blockchain';

// Define types for medical records
export interface MedicalRecord {
  id: string;
  patientId: string;
  recordType: string;
  title: string;
  timestamp: number;
  data: any;
}

export interface PrescriptionRecord extends MedicalRecord {
  recordType: 'Prescription';
  data: {
    medication: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate: string;
    prescribedBy: string;
  };
}

// AI consistency check service
export const RecordConsistencyService = {
  // Check for duplicate prescriptions
  checkDuplicatePrescriptions: (
    prescriptions: PrescriptionRecord[]
  ): { hasDuplicates: boolean; duplicates: PrescriptionRecord[][] } => {
    const duplicates: PrescriptionRecord[][] = [];
    const medicationMap = new Map<string, PrescriptionRecord[]>();

    // Group prescriptions by medication
    prescriptions.forEach(prescription => {
      const medication = prescription.data.medication.toLowerCase();
      if (!medicationMap.has(medication)) {
        medicationMap.set(medication, []);
      }
      medicationMap.get(medication)?.push(prescription);
    });

    // Check for duplicates (medications with overlapping periods)
    for (const [_, meds] of medicationMap.entries()) {
      if (meds.length > 1) {
        // Check for date overlaps
        for (let i = 0; i < meds.length; i++) {
          for (let j = i + 1; j < meds.length; j++) {
            const med1 = meds[i];
            const med2 = meds[j];
            
            const start1 = new Date(med1.data.startDate);
            const end1 = new Date(med1.data.endDate);
            const start2 = new Date(med2.data.startDate);
            const end2 = new Date(med2.data.endDate);
            
            // Check if date ranges overlap
            if ((start1 <= end2 && start2 <= end1) || 
                (start2 <= end1 && start1 <= end2)) {
              // If dosage and frequency are the same, it's likely a duplicate
              if (med1.data.dosage === med2.data.dosage && 
                  med1.data.frequency === med2.data.frequency) {
                duplicates.push([med1, med2]);
              }
            }
          }
        }
      }
    }

    return {
      hasDuplicates: duplicates.length > 0,
      duplicates
    };
  },

  // Add a new prescription with consistency check
  addPrescription: async (
    patientId: string, 
    prescriptionData: PrescriptionRecord['data'],
    existingPrescriptions: PrescriptionRecord[]
  ): Promise<{ success: boolean; record?: PrescriptionRecord; message?: string }> => {
    try {
      // Create new prescription record
      const newPrescription: PrescriptionRecord = {
        id: `prescription_${Date.now()}`,
        patientId,
        recordType: 'Prescription',
        title: `Prescription for ${prescriptionData.medication}`,
        timestamp: Date.now(),
        data: prescriptionData
      };
      
      // Check for duplicates against existing prescriptions
      const check = RecordConsistencyService.checkDuplicatePrescriptions([
        ...existingPrescriptions,
        newPrescription
      ]);
      
      if (check.hasDuplicates) {
        // Alert about duplicate, but still allow adding with confirmation
        const duplicate = check.duplicates[check.duplicates.length - 1][0];
        toast({
          title: "Duplicate Prescription Detected",
          description: `This appears to be a duplicate of a prescription from ${new Date(duplicate.timestamp).toLocaleDateString()}`,
          variant: "destructive"
        });
        
        return {
          success: false,
          message: "Duplicate prescription detected. Please review before adding."
        };
      }
      
      // Add to blockchain
      const blockchainRecord = await addMedicalRecord(patientId, {
        type: 'PRESCRIPTION',
        data: prescriptionData
      });
      
      toast({
        title: "Prescription Added",
        description: "The prescription has been added to your medical records."
      });
      
      return {
        success: true,
        record: {
          ...newPrescription,
          id: blockchainRecord.id
        }
      };
      
    } catch (error) {
      console.error("Error adding prescription:", error);
      return {
        success: false,
        message: "Failed to add prescription"
      };
    }
  },
  
  // Check for medication interactions (simplified mock implementation)
  checkMedicationInteractions: (medications: string[]): string[] => {
    // Mock database of medication interactions
    const knownInteractions: Record<string, string[]> = {
      'warfarin': ['aspirin', 'ibuprofen', 'naproxen'],
      'lisinopril': ['potassium supplements', 'spironolactone'],
      'simvastatin': ['clarithromycin', 'erythromycin', 'itraconazole'],
      'metformin': ['contrast dyes'],
      'levothyroxine': ['calcium supplements', 'iron supplements']
    };
    
    const interactions: string[] = [];
    
    // Check each medication against every other for interactions
    for (let i = 0; i < medications.length; i++) {
      const med1 = medications[i].toLowerCase();
      
      // Check if this medication has known interactions
      if (knownInteractions[med1]) {
        for (let j = 0; j < medications.length; j++) {
          if (i !== j) {
            const med2 = medications[j].toLowerCase();
            if (knownInteractions[med1].includes(med2)) {
              interactions.push(`${medications[i]} may interact with ${medications[j]}`);
            }
          }
        }
      }
    }
    
    return interactions;
  }
};
