
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { FileText, Stethoscope, Pill, FlaskConical, Brain, Heart } from "lucide-react";

interface MedicalMessageTemplatesProps {
  onSelectTemplate: (template: string) => void;
}

const MedicalMessageTemplates: React.FC<MedicalMessageTemplatesProps> = ({ onSelectTemplate }) => {
  const [open, setOpen] = useState(false);
  
  const templates = [
    {
      category: "Diagnosis",
      icon: <Stethoscope className="h-4 w-4 mr-2" />,
      items: [
        {
          id: "diagnosis-1",
          name: "Examination Results",
          content: "Based on our examination, I've found the following: \n\n- Vital signs: \n- Physical examination: \n- Concerning symptoms: \n\nMy initial assessment is: "
        },
        {
          id: "diagnosis-2",
          name: "Differential Diagnosis",
          content: "I'm considering the following diagnoses based on your symptoms:\n\n1. \n2. \n3. \n\nTo rule out or confirm these possibilities, I recommend the following tests:"
        },
        {
          id: "diagnosis-3",
          name: "Diagnostic Plan",
          content: "To determine the cause of your symptoms, I recommend the following diagnostic plan:\n\n1. \n2. \n3. \n\nThese will help us identify the underlying condition and develop an appropriate treatment plan."
        }
      ]
    },
    {
      category: "Treatment",
      icon: <Pill className="h-4 w-4 mr-2" />,
      items: [
        {
          id: "treatment-1",
          name: "Medication Instructions",
          content: "I'm prescribing the following medication:\n\n- Medication: \n- Dosage: \n- Frequency: \n- Duration: \n- Take with/without food: \n\nPossible side effects include: \n\nPlease contact me if you experience severe side effects."
        },
        {
          id: "treatment-2",
          name: "Treatment Plan",
          content: "Here's your treatment plan:\n\n1. Medications: \n2. Lifestyle modifications: \n3. Follow-up appointments: \n\nOur goal is to: "
        },
        {
          id: "treatment-3",
          name: "Surgery Preparation",
          content: "To prepare for your upcoming surgery:\n\n1. Pre-surgery instructions: \n2. Fasting requirements: \n3. Medications to avoid: \n4. What to bring: \n\nThe surgery is scheduled for: "
        }
      ]
    },
    {
      category: "Lab Results",
      icon: <FlaskConical className="h-4 w-4 mr-2" />,
      items: [
        {
          id: "lab-1",
          name: "Normal Lab Results",
          content: "I've reviewed your lab results, and everything appears to be within normal range. Here's a summary:\n\n- Complete Blood Count: Normal\n- Metabolic Panel: Normal\n- Lipid Profile: Normal\n\nThis suggests: "
        },
        {
          id: "lab-2",
          name: "Abnormal Lab Results",
          content: "I've reviewed your lab results, and there are some values that require attention:\n\n- Abnormal findings: \n- Possible implications: \n- Recommended next steps: \n\nLet's schedule a follow-up to discuss these findings in detail."
        }
      ]
    },
    {
      category: "Cardiac",
      icon: <Heart className="h-4 w-4 mr-2" />,
      items: [
        {
          id: "cardiac-1",
          name: "ECG Interpretation",
          content: "ECG Interpretation:\n\n- Rate: \n- Rhythm: \n- Axis: \n- Intervals: \n- ST/T changes: \n\nImpression: "
        },
        {
          id: "cardiac-2",
          name: "Cardiac Symptoms Inquiry",
          content: "Regarding your cardiac symptoms:\n\n1. How would you describe the chest pain/discomfort? (sharp, dull, pressure, etc.)\n2. Does it radiate to other areas like your arm, jaw, or back?\n3. Is it associated with exertion?\n4. How long does it typically last?\n5. Do you experience shortness of breath, dizziness, or palpitations with it?"
        }
      ]
    },
    {
      category: "Neurology",
      icon: <Brain className="h-4 w-4 mr-2" />,
      items: [
        {
          id: "neuro-1",
          name: "Neurological Examination",
          content: "Neurological Examination Findings:\n\n- Mental Status: \n- Cranial Nerves: \n- Motor Function: \n- Sensory Function: \n- Reflexes: \n- Coordination: \n- Gait: \n\nImpression: "
        },
        {
          id: "neuro-2",
          name: "Headache Assessment",
          content: "Headache Assessment:\n\n1. Location: \n2. Quality: \n3. Intensity (1-10): \n4. Duration: \n5. Associated symptoms: \n6. Triggers: \n7. Relieving factors: \n\nImpression: "
        }
      ]
    }
  ];
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
        >
          <FileText className="h-4 w-4" />
          <span>Templates</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start" side="top" sideOffset={5} alignOffset={-5} width={400}>
        <Command>
          <CommandInput placeholder="Search medical templates..." />
          <CommandList className="max-h-[300px] overflow-auto">
            <CommandEmpty>No templates found.</CommandEmpty>
            {templates.map((category) => (
              <CommandGroup key={category.category} heading={category.category}>
                {category.items.map((template) => (
                  <CommandItem
                    key={template.id}
                    onSelect={() => {
                      onSelectTemplate(template.content);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    {category.icon}
                    <span>{template.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MedicalMessageTemplates;
