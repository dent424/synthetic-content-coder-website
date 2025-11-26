import { useState } from 'react';
import { X, Download, FileText } from 'lucide-react';
import FormSection from './FormSection';
import ContextSection from './sections/ContextSection';
import ModelSpecSection from './sections/ModelSpecSection';
import ValidationSetSection from './sections/ValidationSetSection';
import HumanRatingSection from './sections/HumanRatingSection';
import SCCRatingSection from './sections/SCCRatingSection';
import ComparisonSection from './sections/ComparisonSection';
import FinetuningSection from './sections/FinetuningSection';
import { downloadPDF } from './pdfGenerator';

const initialFormData = {
  context: {
    construct: '',
    dataModality: 'Image'
  },
  modelSpec: {
    provider: '',
    llmVersion: '',
    temperature: '1',
    repetitions: '25',
    maxTokens: '15',
    other: '',
    primaryPrompt: '',
    promptVariants: ['']
  },
  validationSet: {
    numStimuli: '',
    obtainedBy: 'random',
    obtainedByOther: '',
    dataExcluded: 'no',
    dataExcludedReason: '',
    uploadedDataset: 'yes',
    repositoryLink: ''
  },
  humanRating: {
    ratedBy: ['trained'],
    ratedByOther: '',
    numCoders: '',
    stimuliPerCoder: '',
    instructions: '',
    preprocessing: '',
    exclusionCriteria: '',
    aggregation: 'mean',
    aggregationOther: ''
  },
  sccRating: {
    aggregation: 'mean',
    aggregationOther: '',
    errorHandling: '',
    batchingStrategy: ''
  },
  comparison: {
    methods: ['correlation'],
    methodOther: '',
    criterion: ''
  },
  finetuning: {
    hyperparameters: '',
    uploadedDataset: 'no',
    repositoryLink: '',
    finetunedModelLink: ''
  }
};

export default function PreregistrationModal({ onClose }) {
  const [formData, setFormData] = useState(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);

  const updateField = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const toggleCheckbox = (section, field, value) => {
    setFormData(prev => {
      const currentArray = prev[section][field];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(v => v !== value)
        : [...currentArray, value];
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      };
    });
  };

  const addPromptVariant = () => {
    setFormData(prev => ({
      ...prev,
      modelSpec: {
        ...prev.modelSpec,
        promptVariants: [...prev.modelSpec.promptVariants, '']
      }
    }));
  };

  const updatePromptVariant = (index, value) => {
    setFormData(prev => {
      const newVariants = [...prev.modelSpec.promptVariants];
      newVariants[index] = value;
      return {
        ...prev,
        modelSpec: {
          ...prev.modelSpec,
          promptVariants: newVariants
        }
      };
    });
  };

  const removePromptVariant = (index) => {
    setFormData(prev => ({
      ...prev,
      modelSpec: {
        ...prev.modelSpec,
        promptVariants: prev.modelSpec.promptVariants.filter((_, i) => i !== index)
      }
    }));
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await downloadPDF(formData);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center rounded-t-lg z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">SCC Preregistration Form</h2>
              <p className="text-sm text-slate-500">Fill out all sections, then download as PDF</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          <FormSection title="Context of SCC" sectionNumber={1} defaultOpen={true}>
            <ContextSection
              data={formData.context}
              updateField={(field, value) => updateField('context', field, value)}
            />
          </FormSection>

          <FormSection title="Model Specification and Prompts" sectionNumber={2} defaultOpen={true}>
            <ModelSpecSection
              data={formData.modelSpec}
              updateField={(field, value) => updateField('modelSpec', field, value)}
              addPromptVariant={addPromptVariant}
              updatePromptVariant={updatePromptVariant}
              removePromptVariant={removePromptVariant}
            />
          </FormSection>

          <FormSection title="Validation Set Stimuli" sectionNumber={3}>
            <ValidationSetSection
              data={formData.validationSet}
              updateField={(field, value) => updateField('validationSet', field, value)}
            />
          </FormSection>

          <FormSection title="Human Rating Collection Procedures" sectionNumber={4}>
            <HumanRatingSection
              data={formData.humanRating}
              updateField={(field, value) => updateField('humanRating', field, value)}
              toggleCheckbox={(field, value) => toggleCheckbox('humanRating', field, value)}
            />
          </FormSection>

          <FormSection title="SCC Rating Procedures" sectionNumber={5}>
            <SCCRatingSection
              data={formData.sccRating}
              updateField={(field, value) => updateField('sccRating', field, value)}
            />
          </FormSection>

          <FormSection title="Compare SCC and Human Rating" sectionNumber={6}>
            <ComparisonSection
              data={formData.comparison}
              updateField={(field, value) => updateField('comparison', field, value)}
              toggleCheckbox={(field, value) => toggleCheckbox('comparison', field, value)}
            />
          </FormSection>

          <FormSection title="Finetuning (Optional)" sectionNumber={7}>
            <FinetuningSection
              data={formData.finetuning}
              updateField={(field, value) => updateField('finetuning', field, value)}
            />
          </FormSection>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 bg-white border-t border-slate-200 px-6 py-4 flex justify-between items-center rounded-b-lg">
          <p className="text-sm text-slate-500">
            All fields will be included in the downloaded PDF
          </p>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white rounded-lg font-medium transition-colors"
          >
            <Download size={18} />
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}
