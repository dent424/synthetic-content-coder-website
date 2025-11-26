import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Helper to format checkbox display
function formatCheckboxList(selected, options, otherValue = '') {
  return options.map(opt => {
    const isChecked = selected.includes(opt.value);
    const checkmark = isChecked ? '☑' : '☐';
    let label = opt.label;
    if (opt.value === 'other' && isChecked && otherValue) {
      label = `Other: ${otherValue}`;
    }
    return `${checkmark} ${label}`;
  }).join('\n');
}

// Helper to format radio display
function formatRadioList(selected, options, otherValue = '') {
  return options.map(opt => {
    const isChecked = selected === opt.value;
    const checkmark = isChecked ? '☑' : '☐';
    let label = opt.label;
    if (opt.value === 'other' && isChecked && otherValue) {
      label = `Other: ${otherValue}`;
    }
    return `${checkmark} ${label}`;
  }).join('\n');
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

  doc.autoTable({
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

  doc.autoTable({
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

  doc.autoTable({
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

  const validationObtainedBy = formatRadioList(
    formData.validationSet.obtainedBy,
    [
      { value: 'random', label: 'Random partition' },
      { value: 'other', label: 'Other, please specify below' }
    ]
  );

  const validationExcluded = formatRadioList(
    formData.validationSet.dataExcluded,
    [
      { value: 'no', label: 'No' },
      { value: 'yes', label: 'Yes, please specify below' }
    ]
  );

  const validationUploaded = formatRadioList(
    formData.validationSet.uploadedDataset,
    [
      { value: 'yes', label: 'Yes, repository link' },
      { value: 'no', label: 'No' }
    ]
  );

  let uploadedDatasetText = validationUploaded;
  if (formData.validationSet.uploadedDataset === 'yes' && formData.validationSet.repositoryLink) {
    uploadedDatasetText = `☑ Yes, repository link: ${formData.validationSet.repositoryLink}\n☐ No`;
  }

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

  doc.autoTable({
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
    { value: 'other', label: 'Other, please specify' }
  ];
  const ratedByText = formatCheckboxList(formData.humanRating.ratedBy, ratedByOptions, formData.humanRating.ratedByOther);

  const humanAggregation = formatRadioList(
    formData.humanRating.aggregation,
    [
      { value: 'mean', label: 'Mean' },
      { value: 'median', label: 'Median' },
      { value: 'na', label: 'N/A' },
      { value: 'other', label: 'Other, please specify' }
    ],
    formData.humanRating.aggregationOther
  );

  doc.autoTable({
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

  const sccAggregation = formatRadioList(
    formData.sccRating.aggregation,
    [
      { value: 'mean', label: 'Mean' },
      { value: 'median', label: 'Median' },
      { value: 'majority', label: 'Majority vote' },
      { value: 'other', label: 'Other, please specify' }
    ],
    formData.sccRating.aggregationOther
  );

  doc.autoTable({
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
      { value: 'other', label: 'Other, please specify' }
    ],
    formData.comparison.methodOther
  );

  doc.autoTable({
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

  const finetuneUploaded = formatRadioList(
    formData.finetuning.uploadedDataset,
    [
      { value: 'yes', label: 'Yes, repository link' },
      { value: 'no', label: 'No' }
    ]
  );

  let finetuneUploadedText = finetuneUploaded;
  if (formData.finetuning.uploadedDataset === 'yes' && formData.finetuning.repositoryLink) {
    finetuneUploadedText = `☑ Yes, repository link: ${formData.finetuning.repositoryLink}\n☐ No`;
  }

  doc.autoTable({
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
