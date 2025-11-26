import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Helper to format checkbox selections - returns only selected items as text
function formatCheckboxList(selected, options, otherValue = '') {
  const selectedLabels = options
    .filter(opt => selected.includes(opt.value))
    .map(opt => {
      if (opt.value === 'other' && otherValue) {
        return otherValue;
      }
      return opt.label;
    });
  return selectedLabels.join(', ') || '';
}

// Helper to format radio selection - returns only the selected item as text
function formatRadioSelection(selected, options, otherValue = '') {
  const selectedOpt = options.find(opt => opt.value === selected);
  if (!selectedOpt) return '';
  if (selectedOpt.value === 'other' && otherValue) {
    return otherValue;
  }
  return selectedOpt.label;
}

export function generatePreregistrationPDF(formData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;

  // Title
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Preregistration for Validating Synthetic Content Coder', margin, 20);

  let yPosition = 30;

  // === Section 1: Context of SCC ===
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Context of SCC', margin, yPosition);
  yPosition += 2;

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: [
      ['Construct to be coded', formData.context.construct || ''],
      ['Data modality (e.g., text, image)', formData.context.dataModality || '']
    ],
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: 'top'
    },
    columnStyles: {
      0: { cellWidth: 65, fontStyle: 'normal' },
      1: { cellWidth: pageWidth - margin * 2 - 65 }
    },
    margin: { left: margin, right: margin }
  });

  yPosition = doc.lastAutoTable.finalY + 8;

  // === Section 2: Model Specification and Prompts ===
  doc.setFont('helvetica', 'bold');
  doc.text('Model Specification and Prompts', margin, yPosition);
  yPosition += 2;

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: [
      ['Model provider (e.g., Anthropic, Meta, OpenAI)', formData.modelSpec.provider || ''],
      ['LLM name and version', formData.modelSpec.llmVersion || ''],
      ['Temperature', formData.modelSpec.temperature || ''],
      ['Repetitions per Item', formData.modelSpec.repetitions || ''],
      ['Max Tokens', formData.modelSpec.maxTokens || ''],
      ['Other', formData.modelSpec.other || 'N/A']
    ],
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: 'top'
    },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: pageWidth - margin * 2 - 65 }
    },
    margin: { left: margin, right: margin }
  });

  yPosition = doc.lastAutoTable.finalY + 2;

  // Code Generator note
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text(
    '(Instruction on model configuration available at "Code Generator" page of https://synthetic-content-coder-website.vercel.app/)',
    margin, yPosition
  );
  yPosition += 5;

  // Prompts table
  const promptRows = [
    ['Primary prompt\n(in exact wording)', formData.modelSpec.primaryPrompt || '']
  ];

  formData.modelSpec.promptVariants.forEach((variant, i) => {
    if (variant && variant.trim()) {
      promptRows.push([`Prompt variant ${i + 1} (optional)`, variant]);
    }
  });

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: promptRows,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: 'top',
      minCellHeight: 20
    },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: pageWidth - margin * 2 - 50 }
    },
    margin: { left: margin, right: margin }
  });

  yPosition = doc.lastAutoTable.finalY + 8;

  // === Section 3: Validation Set Stimuli ===
  // Check if we need a new page
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Validation Set Stimuli', margin, yPosition);
  yPosition += 2;

  const validationObtainedBy = formatRadioSelection(
    formData.validationSet.obtainedBy,
    [
      { value: 'random', label: 'Random partition' },
      { value: 'other', label: 'Other' }
    ],
    formData.validationSet.obtainedByOther
  );

  const validationExcluded = formatRadioSelection(
    formData.validationSet.dataExcluded,
    [
      { value: 'no', label: 'No' },
      { value: 'yes', label: 'Yes' }
    ]
  );

  // For uploaded dataset, show "Yes" with the link, or just "No"
  let uploadedDatasetText = formData.validationSet.uploadedDataset === 'yes'
    ? (formData.validationSet.repositoryLink ? `Yes: ${formData.validationSet.repositoryLink}` : 'Yes')
    : 'No';

  const validationBody = [
    ['Number of stimuli', formData.validationSet.numStimuli || ''],
    ['Validation set obtained by', validationObtainedBy],
    ['Any data excluded', validationExcluded]
  ];

  // Add specification row if needed
  if (formData.validationSet.obtainedBy === 'other' || formData.validationSet.dataExcluded === 'yes') {
    let specText = '';
    if (formData.validationSet.obtainedBy === 'other' && formData.validationSet.obtainedByOther) {
      specText += formData.validationSet.obtainedByOther;
    }
    if (formData.validationSet.dataExcluded === 'yes' && formData.validationSet.dataExcludedReason) {
      if (specText) specText += '\n\n';
      specText += formData.validationSet.dataExcludedReason;
    }
    validationBody.push(['Please specify reasons for non-random sampling or data exclusion:', specText || '']);
  }

  validationBody.push(['Uploaded validation dataset coded by SCC', uploadedDatasetText]);

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: validationBody,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: 'top'
    },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: pageWidth - margin * 2 - 65 }
    },
    margin: { left: margin, right: margin }
  });

  yPosition = doc.lastAutoTable.finalY + 8;

  // === Section 4: Human Rating Collection Procedures ===
  if (yPosition > 200) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.text('Human Rating Collection Procedures', margin, yPosition);
  yPosition += 2;

  const ratedByOptions = [
    { value: 'trained', label: 'Trained researcher' },
    { value: 'crowdsourced', label: 'Crowd-sourced workers (e.g., MTurk, Prolific)' },
    { value: 'other', label: 'Other' }
  ];
  const ratedByText = formatCheckboxList(formData.humanRating.ratedBy, ratedByOptions, formData.humanRating.ratedByOther);

  const humanAggregation = formatRadioSelection(
    formData.humanRating.aggregation,
    [
      { value: 'mean', label: 'Mean' },
      { value: 'median', label: 'Median' },
      { value: 'na', label: 'N/A' },
      { value: 'other', label: 'Other' }
    ],
    formData.humanRating.aggregationOther
  );

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: [
      ['Rated by', ratedByText],
      ['Number of human coders', formData.humanRating.numCoders || ''],
      ['Number of stimuli per coder', formData.humanRating.stimuliPerCoder || ''],
      ['Instruction given to raters\n(in exact wording)', formData.humanRating.instructions || ''],
      ['Preprocessing', formData.humanRating.preprocessing || 'N/A'],
      ['Exclusion criteria', formData.humanRating.exclusionCriteria || 'N/A'],
      ['Aggregation (handling intercoder disagreement)', humanAggregation]
    ],
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: 'top'
    },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: pageWidth - margin * 2 - 65 }
    },
    margin: { left: margin, right: margin }
  });

  yPosition = doc.lastAutoTable.finalY + 8;

  // === Section 5: SCC Rating Procedures ===
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.text('SCC Rating Procedures', margin, yPosition);
  yPosition += 2;

  const sccAggregation = formatRadioSelection(
    formData.sccRating.aggregation,
    [
      { value: 'mean', label: 'Mean' },
      { value: 'median', label: 'Median' },
      { value: 'majority', label: 'Majority vote' },
      { value: 'other', label: 'Other' }
    ],
    formData.sccRating.aggregationOther
  );

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: [
      ['Aggregation of multiple responses', sccAggregation],
      ['Error handling', formData.sccRating.errorHandling || ''],
      ['Batching strategy', formData.sccRating.batchingStrategy || 'N/A']
    ],
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: 'top'
    },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: pageWidth - margin * 2 - 65 }
    },
    margin: { left: margin, right: margin }
  });

  yPosition = doc.lastAutoTable.finalY + 8;

  // === Section 6: Compare SCC and Human Rating ===
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.text('Compare SCC and Human Rating, and Sufficient Criterion', margin, yPosition);
  yPosition += 2;

  const comparisonMethods = formatCheckboxList(
    formData.comparison.methods,
    [
      { value: 'correlation', label: 'Correlation coefficients' },
      { value: 'rmse', label: 'Root Mean Square Error (RMSE)' },
      { value: 'accuracy', label: 'Accuracy/F1' },
      { value: 'other', label: 'Other' }
    ],
    formData.comparison.methodOther
  );

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: [
      ['Comparison method', comparisonMethods],
      ['Minimum sufficient criterion for validity\n(e.g., r > 0.65)', formData.comparison.criterion || '']
    ],
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: 'top'
    },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: pageWidth - margin * 2 - 65 }
    },
    margin: { left: margin, right: margin }
  });

  yPosition = doc.lastAutoTable.finalY + 8;

  // === Section 7: Finetuning (Optional) ===
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.text('Finetuning (Optional)', margin, yPosition);
  yPosition += 2;

  // For finetuning uploaded dataset, show "Yes" with the link, or just "No"
  let finetuneUploadedText = formData.finetuning.uploadedDataset === 'yes'
    ? (formData.finetuning.repositoryLink ? `Yes: ${formData.finetuning.repositoryLink}` : 'Yes')
    : 'No';

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: [
      ['Training hyperparameters', formData.finetuning.hyperparameters || ''],
      ['Uploaded training dataset', finetuneUploadedText],
      ['OR', ''],
      ['Link to the finetuned model', formData.finetuning.finetunedModelLink || '']
    ],
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: 'top'
    },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: pageWidth - margin * 2 - 65 }
    },
    margin: { left: margin, right: margin }
  });

  return doc;
}

export async function downloadPDF(formData) {
  const doc = generatePreregistrationPDF(formData);
  doc.save('SCC_Preregistration.pdf');
}

// Generate and download a blank PDF template
export function downloadBlankPDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;

  // Helper for blank checkbox/radio lists
  const blankRadio = (options) => options.map(opt => `[ ] ${opt}`).join('\n');
  const blankCheckbox = (options) => options.map(opt => `[ ] ${opt}`).join('\n');

  // Title
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Preregistration for Validating Synthetic Content Coder', margin, 20);

  let yPosition = 30;

  // === Section 1: Context of SCC ===
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Context of SCC', margin, yPosition);
  yPosition += 2;

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: [
      ['Construct to be coded', ''],
      ['Data modality (e.g., text, image)', '']
    ],
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 3, valign: 'top' },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: pageWidth - margin * 2 - 65 }
    },
    margin: { left: margin, right: margin }
  });

  yPosition = doc.lastAutoTable.finalY + 8;

  // === Section 2: Model Specification and Prompts ===
  doc.setFont('helvetica', 'bold');
  doc.text('Model Specification and Prompts', margin, yPosition);
  yPosition += 2;

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: [
      ['Model provider (e.g., Anthropic, Meta, OpenAI)', ''],
      ['LLM name and version', ''],
      ['Temperature', ''],
      ['Repetitions per Item', ''],
      ['Max Tokens', ''],
      ['Other', '']
    ],
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 3, valign: 'top' },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: pageWidth - margin * 2 - 65 }
    },
    margin: { left: margin, right: margin }
  });

  yPosition = doc.lastAutoTable.finalY + 2;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text(
    '(Instruction on model configuration available at "Code Generator" page of https://synthetic-content-coder-website.vercel.app/)',
    margin, yPosition
  );
  yPosition += 5;

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: [
      ['Primary prompt\n(in exact wording)', ''],
      ['Prompt variant 1 (optional)', ''],
      ['Prompt variant 2 (optional)', ''],
      ['Prompt variant 3 (optional)', ''],
      ['...', '']
    ],
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 3, valign: 'top', minCellHeight: 15 },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: pageWidth - margin * 2 - 50 }
    },
    margin: { left: margin, right: margin }
  });

  yPosition = doc.lastAutoTable.finalY + 8;

  // === Section 3: Validation Set Stimuli ===
  if (yPosition > 200) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Validation Set Stimuli', margin, yPosition);
  yPosition += 2;

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: [
      ['Number of stimuli', ''],
      ['Validation set obtained by', blankRadio(['Random partition', 'Other, please specify below'])],
      ['Any data excluded', blankRadio(['No', 'Yes, please specify below'])],
      ['Please specify reasons for non-random sampling or data exclusion:', ''],
      ['Uploaded validation dataset coded by SCC', blankRadio(['Yes, repository link _____', 'No'])]
    ],
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 3, valign: 'top' },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: pageWidth - margin * 2 - 65 }
    },
    margin: { left: margin, right: margin }
  });

  yPosition = doc.lastAutoTable.finalY + 8;

  // === Section 4: Human Rating Collection Procedures ===
  if (yPosition > 180) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.text('Human Rating Collection Procedures', margin, yPosition);
  yPosition += 2;

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: [
      ['Rated by', blankCheckbox(['Trained researcher', 'Crowd-sourced workers (e.g., MTurk, Prolific)', 'Other, please specify _____'])],
      ['Number of human coders', ''],
      ['Number of stimuli per coder', ''],
      ['Instruction given to raters\n(in exact wording)', ''],
      ['Preprocessing', ''],
      ['Exclusion criteria', ''],
      ['Aggregation (handling intercoder disagreement)', blankRadio(['Mean', 'Median', 'N/A', 'Other, please specify _____'])]
    ],
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 3, valign: 'top' },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: pageWidth - margin * 2 - 65 }
    },
    margin: { left: margin, right: margin }
  });

  yPosition = doc.lastAutoTable.finalY + 8;

  // === Section 5: SCC Rating Procedures ===
  if (yPosition > 200) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.text('SCC Rating Procedures', margin, yPosition);
  yPosition += 2;

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: [
      ['Aggregation of multiple responses', blankRadio(['Mean', 'Median', 'Majority vote', 'Other, please specify _____'])],
      ['Error handling', ''],
      ['Batching strategy', '']
    ],
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 3, valign: 'top' },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: pageWidth - margin * 2 - 65 }
    },
    margin: { left: margin, right: margin }
  });

  yPosition = doc.lastAutoTable.finalY + 8;

  // === Section 6: Compare SCC and Human Rating ===
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.text('Compare SCC and Human Rating, and Sufficient Criterion', margin, yPosition);
  yPosition += 2;

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: [
      ['Comparison method', blankCheckbox(['Correlation coefficients', 'Root Mean Square Error (RMSE)', 'Accuracy/F1', 'Other, please specify _____'])],
      ['Minimum sufficient criterion for validity\n(e.g., r > 0.65)', '']
    ],
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 3, valign: 'top' },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: pageWidth - margin * 2 - 65 }
    },
    margin: { left: margin, right: margin }
  });

  yPosition = doc.lastAutoTable.finalY + 8;

  // === Section 7: Finetuning (Optional) ===
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.text('Finetuning (Optional)', margin, yPosition);
  yPosition += 2;

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: [
      ['Training hyperparameters', ''],
      ['Uploaded training dataset', blankRadio(['Yes, repository link _____', 'No'])],
      ['OR', ''],
      ['Link to the finetuned model', '']
    ],
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 3, valign: 'top' },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: pageWidth - margin * 2 - 65 }
    },
    margin: { left: margin, right: margin }
  });

  doc.save('SCC_Preregistration_Template.pdf');
}
