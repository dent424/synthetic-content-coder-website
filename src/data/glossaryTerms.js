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
    name: 'Synthetic Content Coders',
    terms: [
      {
        term: 'Synthetic Content Coder (SCC)',
        definition: 'An LLM configured to rate or categorize content (text, images, video) based on how human observers would perceive it. SCCs combine the flexibility of human coders with computational scalability, enabling researchers to code large datasets without manual annotation.'
      },
      {
        term: 'Training Set',
        definition: 'In machine learning, the portion of labeled data used to teach a model to recognize patterns. For fine-tuned SCCs, this is the set of human-coded examples the model learns from.'
      },
      {
        term: 'Testing Set',
        definition: 'A portion of data used to evaluate model performance during development. Unlike the validation set, the testing set may be used repeatedly to guide adjustments. This iterative use means testing set performance can be optimistically biased.'
      },
      {
        term: 'Development Set',
        definition: 'A portion of research data used to refine prompts and model settings during SCC creation. Researchers iterate on this data to improve performance before final testing.'
      },
      {
        term: 'Validation Set',
        definition: 'A portion of research data held back during development and used only for final testing. Because this data was not used to refine the SCC, performance on it provides an unbiased estimate of how well the SCC will perform on new content.'
      },
      {
        term: 'Coding Set',
        definition: 'The full dataset of content to be coded after the SCC has been validated. This is the data the researcher ultimately wants to analyze.'
      },
      {
        term: 'Model Drift',
        definition: 'Changes in how an LLM behaves over time, even when using the same model name. Providers may update models without notification, potentially altering coding results and threatening reproducibility.'
      }
    ]
  },
  {
    name: 'LLM Architecture & Processing',
    terms: [
      {
        term: 'Transformer',
        definition: 'The neural network architecture underlying modern LLMs. Transformers process text by attending to relationships between all words simultaneously, enabling them to capture context and meaning across long passages.'
      },
      {
        term: 'Tokens',
        definition: 'The units LLMs use to process text—roughly corresponding to word fragments (e.g., "understanding" might be split into "under" + "stand" + "ing"). Token counts determine processing costs and context limits.'
      },
      {
        term: 'Context Window',
        definition: 'The maximum amount of content an LLM can process in a single request, measured in tokens. Larger context windows (e.g., 128,000 tokens) allow processing longer documents or more examples.'
      },
      {
        term: 'Embeddings',
        definition: 'Numerical representations that capture the meaning of text or images as coordinates in a high-dimensional space. Similar content produces similar embeddings, enabling models to recognize semantic relationships.'
      },
      {
        term: 'Pre-training',
        definition: 'The initial large-scale training phase where an LLM learns language patterns from massive text datasets. This general knowledge is later adapted through post-training, fine-tuning, or prompting for specific tasks.'
      },
      {
        term: 'Post-Training',
        definition: 'Additional training applied after pre-training to make LLMs more useful and aligned with human expectations. This typically includes instruction-following training and safety tuning, transforming base models into conversational assistants like ChatGPT or Claude.'
      },
      {
        term: 'Inference',
        definition: 'Running a trained model to generate outputs, as opposed to training it. When researchers use an SCC to code content, they are performing inference.'
      }
    ]
  },
  {
    name: 'Prompting & Output Control',
    terms: [
      {
        term: 'Zero-shot Learning',
        definition: 'Using an LLM to perform a task without providing examples in the prompt. The model relies on detailed instructions and its pre-trained knowledge to complete the task. Contrast with few-shot learning, which includes examples.'
      },
      {
        term: 'Few-shot Learning',
        definition: 'Providing an LLM with a small number of examples in the prompt to demonstrate the desired task. This often improves performance without requiring fine-tuning.'
      },
      {
        term: 'Sampling',
        definition: 'The process by which LLMs select each word from a probability distribution of possible next words. Temperature settings control how this selection occurs.'
      },
      {
        term: 'Deterministic Output',
        definition: 'When an LLM produces identical responses to identical prompts, achieved by setting temperature to zero. This ensures reproducibility but may miss nuance captured by probabilistic sampling.'
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
        term: 'Model Version',
        definition: 'The specific release identifier for an LLM (e.g., "gpt-4o-2024-08-06" rather than just "GPT-4o"). Specifying exact versions is critical for reproducibility, as models with the same general name may behave differently across releases.'
      },
      {
        term: 'Batch Processing',
        definition: 'Sending many content items to an LLM programmatically through an API rather than manually one at a time. This enables efficient coding of large datasets.'
      },
      {
        term: 'Open-Source Models',
        definition: 'LLMs whose code is publicly available, allowing researchers to download, inspect, and preserve versions for exact replication (e.g., Llama 4, Deepseek v3). Contrast with closed-source models.'
      },
      {
        term: 'Closed-Source Models',
        definition: 'LLMs (e.g., GPT, Claude, Gemini) accessed only through provider APIs. Researchers cannot download or preserve these models, making exact replication dependent on continued provider support.'
      }
    ]
  }
];
