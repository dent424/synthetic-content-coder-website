/**
 * Glossary of Terms from Web Appendix A
 * "From Human to Synthetic Coders: LLM-Based Content Coding for Scalable Consumer Behavior Research"
 */

export const glossaryCategories = [
  {
    name: 'Foundational Concepts',
    terms: [
      {
        term: 'Algorithm',
        definition: 'A systematic, rule-based procedure that specifies steps to accomplish a task or analyze data.'
      },
      {
        term: 'Machine Learning (ML)',
        definition: 'A computational approach where algorithms learn from data to create models that can perform tasks like coding and classification without being explicitly programmed for each one. Supervised ML mimics labeled examples (e.g., sentiment coded consumer reviews using linear regression). Unsupervised ML discovers patterns without prior expectations (e.g., finding natural topics in customer feedback using Latent Dirichlet Allocation [LDA]).'
      },
      {
        term: 'Natural Language Processing (NLP)',
        definition: 'Technology that enables machines to process and analyze patterns in human language, allowing researchers to extract sentiment, topics, and patterns from consumer text that reveal underlying attitudes and preferences (e.g., topic modeling, sentiment analysis, keyword extraction).'
      },
      {
        term: 'Training',
        definition: 'The process of teaching a machine learning model to perform tasks by exposing it to examples, enabling the model to recognize patterns in consumer data and make accurate predictions.'
      },
      {
        term: 'Ground-truth',
        definition: 'The true values against which model outputs are compared for validation. Often these are responses from humans completing an equivalent task.'
      }
    ]
  },
  {
    name: 'Traditional Computational Approaches',
    terms: [
      {
        term: 'Text Analysis',
        definition: 'The process of analyzing text to detect patterns relevant to research questions; this can be performed manually, automatically, or through a combination of the two.'
      },
      {
        term: 'Algorithmic Coders',
        definition: 'Computational methods that automatically categorize or analyze consumer content according to predefined rules or patterns, enabling researchers to process large datasets efficiently.'
      },
      {
        term: 'Dictionary-based Coders',
        definition: 'Text analysis tools such as LIWC that measure psychological constructs by counting words and phrases belonging to predefined categories, allowing researchers to quantify consumer sentiments or cognitions in text.'
      }
    ]
  },
  {
    name: 'Advanced Computational Approaches',
    terms: [
      {
        term: 'Convolutional Neural Networks (CNNs)',
        definition: 'Specialized machine learning models that analyze images by systematically detecting patterns from simple features to complex objects, enabling automated coding of consumer-relevant visual content in marketing research.'
      },
      {
        term: 'Large Language Models (LLMs)',
        definition: 'AI systems trained on large text datasets that can generate human-like responses, understand context, and perform various language tasks, enabling researchers to analyze consumer-generated content and simulate human coding decisions (e.g., GPT, Gemini, Claude, Llama).'
      },
      {
        term: 'Multimodal Model',
        definition: 'An AI system that can process and integrate multiple types of data (e.g., text, images, audio) simultaneously.'
      }
    ]
  },
  {
    name: 'Practical Implementation of SCCs',
    terms: [
      {
        term: 'Application Programming Interface (API)',
        definition: 'A standardized communication method that allows researchers to interact with AI models through computer programs, enabling automated processing of large consumer datasets.'
      },
      {
        term: 'Prompt',
        definition: 'Instructions provided to an LLM that specify the task, context, and desired format of response, guiding how the AI should analyze or generate content.'
      },
      {
        term: 'Temperature',
        definition: 'A setting in LLMs that controls response randomness; lower values (near 0) produce more deterministic, consistent outputs while higher values introduce more variation.'
      },
      {
        term: 'Fine-Tuning',
        definition: 'The process of adapting an existing LLM to a specific task by training it on a smaller, domain-specific dataset, allowing researchers to customize LLMs for specialized consumer behavior applications.'
      },
      {
        term: 'Open-Source',
        definition: 'Models or tools whose code is publicly available, allowing researchers to download, inspect, and preserve versions for exact replication (e.g., Llama 4, Deepseek v3).'
      }
    ]
  }
];
