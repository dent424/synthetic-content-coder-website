import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function OverviewSection() {
  const [expandedSteps, setExpandedSteps] = useState({});
  const [expandedSubsections, setExpandedSubsections] = useState({});

  const toggleStep = (stepId) => {
    setExpandedSteps(prev => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const toggleSubsection = (subsectionId) => {
    setExpandedSubsections(prev => ({ ...prev, [subsectionId]: !prev[subsectionId] }));
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-slate-900">
          Overview: Creating Validated Synthetic Content Coders
        </h2>
        <p className="leading-relaxed text-slate-700">
          This guide walks through the complete process of developing, validating, and deploying
          Synthetic Content Coders (SCCs). The workflow is organized into three main phases: Setup,
          Development, and Validation.
        </p>
      </div>

      {/* SETUP SECTION - BLUE */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          SETUP: Getting ready to create an SCC
        </h2>

        {/* Step 0 */}
        <div className="mb-6">
          <button
            onClick={() => toggleStep(0)}
            className="w-full text-left flex items-start gap-3 hover:bg-blue-100/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5 text-blue-700">
              {expandedSteps[0] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h3 className="text-xl font-bold text-blue-900 flex-1">0. System Setup</h3>
          </button>

          {expandedSteps[0] && (
            <div className="ml-9 mt-3 space-y-4">
              <p className="text-blue-900">
                If this is your first time creating an SCC you will need to set up python (or the programming
                language of your choice), a development environment, and generate an API key to access
                the LLM of your choice. We provide guidance on how to do this here:
              </p>
              <ul className="list-disc list-inside text-blue-900 space-y-2 ml-4">
                <li>[LINK] Setting Up Python and a Development Environment</li>
                <li>[LINK] Generating API Keys</li>
              </ul>
            </div>
          )}
        </div>

        {/* Step 1 */}
        <div className="mb-6">
          <button
            onClick={() => toggleStep(1)}
            className="w-full text-left flex items-start gap-3 hover:bg-blue-100/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5 text-blue-700">
              {expandedSteps[1] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h3 className="text-xl font-bold text-blue-900 flex-1">1. Define Construct and Collect Content</h3>
          </button>

          {expandedSteps[1] && (
            <div className="ml-9 mt-3 space-y-4">
              <p className="text-blue-900">
                Clearly define what needs to be measured and collect the data to be coded.
              </p>

              {/* Subsection: Making Sure that SCCs are the Right Tool */}
              <div className="border-l-2 border-blue-300 pl-4">
                <button
                  onClick={() => toggleSubsection('1-right-tool')}
                  className="w-full text-left flex items-start gap-2 hover:text-blue-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['1-right-tool'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-blue-900">Making Sure that SCCs are the Right Tool</h4>
                </button>
                {expandedSubsections['1-right-tool'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-blue-900">
                      Before implementing an SCC, a researcher must have clarity about whether an SCC is well
                      suited to their goal. SCCs can be excellent at coding constructs that can be readily coded
                      by humans. In fact, part of how a particular SCC is validated is by correlating it with human-coded judgements (also referred to below as 'human criterion judgements'). If human
                      coders are not or would not be adept at coding the construct of interest using the data at
                      hand, SCCs are not appropriate. For example, SCCs are poorly suited for measuring
                      internal states, behavioral outcomes, or any constructs that require context beyond the
                      content itself.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection: Collecting Content */}
              <div className="border-l-2 border-blue-300 pl-4">
                <button
                  onClick={() => toggleSubsection('1-collecting')}
                  className="w-full text-left flex items-start gap-2 hover:text-blue-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['1-collecting'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-blue-900">Collecting Content</h4>
                </button>
                {expandedSubsections['1-collecting'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-blue-900">
                      The content used for all phases of SCC development should be drawn from a single
                      dataset. Researchers should first assemble their full data (e.g. Yelp text, Instagram images)
                      from the exact context in which the SCC will be applied (e.g., the same platform,
                      population, and time period). The data used for coding and validation are created from this
                      full data. This process ensures that the SCC is developed and validated on the same type of
                      data it will ultimately be used to code.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Step 2 */}
        <div className="mb-6">
          <button
            onClick={() => toggleStep(2)}
            className="w-full text-left flex items-start gap-3 hover:bg-blue-100/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5 text-blue-700">
              {expandedSteps[2] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h3 className="text-xl font-bold text-blue-900 flex-1">2. Partition the Data</h3>
          </button>

          {expandedSteps[2] && (
            <div className="ml-9 mt-3 space-y-4">
              <p className="text-blue-900">
                The dataset should be split into three partitions: one to develop the SCC, one to test the
                performance of the SCC, and the remainder of the data to code. Partitioning the data in this
                way allows researchers to obtain an unbiased estimate of performance prior to coding the
                main data. The way that data is partitioned depends on whether the researcher intends to
                finetune the SCC or not.
              </p>

              <p className="text-blue-900">
                Finetuning refers to updating the parameters of a base LLM using labeled data from the
                target context so that its outputs more closely match the human criterion ratings. In
                contrast to unfinetuned SCCs, which rely solely on carefully designed prompts and
                settings, finetuned SCCs use supervised learning to adjust the underlying model weights.
                This additional flexibility can improve performance but also increases the risk of overfitting,
                which makes careful data partitioning especially important.
              </p>

              {/* Data Partitioning Image - Always visible when step is expanded */}
              <div className="my-6">
                <img
                  src="/data-partitioning.svg"
                  alt="Data Partitioning for Unfinetuned vs. Finetuned SCCs"
                  className="w-full max-w-4xl mx-auto"
                />
                <p className="text-center text-sm text-blue-800 mt-2 italic">
                  Data Partitioning for Unfinetuned vs. Finetuned SCCs
                </p>
              </div>

              {/* Subsection: Deciding Between Finetuned and Unfinetuned SCCs */}
              <div className="border-l-2 border-blue-300 pl-4">
                <button
                  onClick={() => toggleSubsection('2-deciding')}
                  className="w-full text-left flex items-start gap-2 hover:text-blue-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['2-deciding'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-blue-900">Deciding Between Finetuned and Unfinetuned SCCs</h4>
                </button>
                {expandedSubsections['2-deciding'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-blue-900">
                      Finetuning allows you to improve the performance of your SCC by adapting the LLM to your
                      specific task. Finetuning can improve performance with as few as 100 examples.
                    </p>
                    <p className="text-blue-900">
                      While finetuning often improves performance of SCCs, the additional cost, effort, and lack
                      of transparency in doing so often makes it impractical. This is because finetuning requires
                      more data labeled by human coders as well as additional expertise. In many cases
                      unfinetuned SCCs, which require just a prompt and model settings, provide sufficient
                      performance.
                    </p>
                    <p className="text-blue-900">Finetuned SCCs may be particularly useful if:</p>
                    <ul className="list-disc list-inside text-blue-900 space-y-2 ml-4">
                      <li>
                        <strong>a)</strong> the absolute level of responses is important. For example, you care not only about
                        correlations with human coders, but need the SCC to match the actual scale values
                        humans assign—distinguishing between a "3" and "4" on a 7-point scale, not just rank-ordering correctly.
                      </li>
                      <li>
                        <strong>b)</strong> unfinetuned models do not offer sufficient performance. For example, the correlation
                        between your SCCs ratings and human ratings for the same stimuli are too low to be useful.
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Subsection: Principles for Partitioning Data */}
              <div className="border-l-2 border-blue-300 pl-4">
                <button
                  onClick={() => toggleSubsection('2-principles')}
                  className="w-full text-left flex items-start gap-2 hover:text-blue-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['2-principles'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-blue-900">Principles for Partitioning Data</h4>
                </button>
                {expandedSubsections['2-principles'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-blue-900">
                      Data should be partitioned so each subset has similar characteristics (e.g. similar
                      distributions of content). In most cases, this can be achieved by sampling. In cases where
                      particular groups are both important for the research question and relatively rare in the
                      data, a researcher may choose to over-sample specific types of content. The approach
                      used for sampling should be reported.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection: Partitioning Data for Unfinetuned SCCs */}
              <div className="border-l-2 border-blue-300 pl-4">
                <button
                  onClick={() => toggleSubsection('2-unfinetuned')}
                  className="w-full text-left flex items-start gap-2 hover:text-blue-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['2-unfinetuned'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-blue-900">Partitioning Data for Unfinetuned SCCs</h4>
                </button>
                {expandedSubsections['2-unfinetuned'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-blue-900">
                      For unfinetuned SCCs, the original dataset is partitioned into three mutually-exclusive
                      subsets: a <em>development set</em>, a <em>validation set</em>, and a <em>coding set</em>. Human criterion ratings are
                      first collected on the development set and used to design and tune the SCC (for example,
                      by selecting prompts, temperatures, and robustness checks). The validation set is held
                      back and used only once, after the SCC has been fixed, to obtain an unbiased estimate of
                      performance. Last, the remaining data (coding set) has no human criterion ratings and is
                      analyzed by the validated SCC to assess the focal construct(s).
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection: Partitioning Data for Finetuned SCCs */}
              <div className="border-l-2 border-blue-300 pl-4">
                <button
                  onClick={() => toggleSubsection('2-finetuned')}
                  className="w-full text-left flex items-start gap-2 hover:text-blue-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['2-finetuned'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-blue-900">Partitioning Data for Finetuned SCCs</h4>
                </button>
                {expandedSubsections['2-finetuned'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-blue-900">
                      For finetuned SCCs, the portion of the data used for development is further subdivided.
                      Within the development portion, researchers create a <em>training set</em> (used to update model
                      parameters) and a <em>testing set</em> (used to find effective model settings). A separate <em>validation
                      set</em>, drawn from the same original corpus but never used during training or model selection
                      (i.e., not part of the training or testing set) is reserved for final performance assessment. As
                      with unfinetuned SCCs, the remaining data from the coding set is coded only after the SCC
                      has demonstrated adequate performance on the held-out validation set.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection: Why A Separate Validation Set Matters */}
              <div className="border-l-2 border-blue-300 pl-4">
                <button
                  onClick={() => toggleSubsection('2-why-separate')}
                  className="w-full text-left flex items-start gap-2 hover:text-blue-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['2-why-separate'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-blue-900">Why A Separate Validation Set Matters</h4>
                </button>
                {expandedSubsections['2-why-separate'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-blue-900">
                      Using the same data for both development and evaluation inflates performance because
                      models are tuned to idiosyncrasies of that specific sample. In traditional machine learning,
                      repeatedly testing variants on a test set creates upward selection bias. A sequestered
                      validation set that is untouched during development provides a more honest estimate of
                      how the SCC will perform when applied to the full coding set.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DEVELOPMENT SECTION - GREEN */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-emerald-900 mb-6">
          DEVELOPMENT: Making an SCC that works well
        </h2>

        {/* Step 3 */}
        <div className="mb-6">
          <button
            onClick={() => toggleStep(3)}
            className="w-full text-left flex items-start gap-3 hover:bg-emerald-100/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5 text-emerald-700">
              {expandedSteps[3] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h3 className="text-xl font-bold text-emerald-900 flex-1">
              3. Collect Human Criterion Data on Development or Test/Train Data
            </h3>
          </button>

          {expandedSteps[3] && (
            <div className="ml-9 mt-3 space-y-4">
              <p className="text-emerald-900">
                Gather human ratings on the development set (for unfinetuned) or test/train set (for
                finetuned) to create criterion ratings that capture how observers perceive the content in
                this coding context. These ratings serve as the benchmark pattern of observer judgments
                that the SCC is designed to approximate. Because SCCs are validated against these
                ratings, SCC quality is constrained by the quality of the criterion data.
              </p>

              {/* Subsection: Defining the Criterion */}
              <div className="border-l-2 border-emerald-300 pl-4">
                <button
                  onClick={() => toggleSubsection('3-defining')}
                  className="w-full text-left flex items-start gap-2 hover:text-emerald-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['3-defining'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">Defining the Criterion</h4>
                </button>
                {expandedSubsections['3-defining'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-emerald-900">
                      The criterion should reflect how human observers perceive the content, not hidden internal
                      states or downstream behavior. A variable qualifies as an observer judgment if a human
                      coder, given only the content and coding protocol, can produce reliable ratings. Human
                      ratings serve as the standard that SCC outputs are compared against.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection: Collecting and Checking Ratings */}
              <div className="border-l-2 border-emerald-300 pl-4">
                <button
                  onClick={() => toggleSubsection('3-collecting')}
                  className="w-full text-left flex items-start gap-2 hover:text-emerald-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['3-collecting'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">Collecting and Checking Ratings</h4>
                </button>
                {expandedSubsections['3-collecting'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-emerald-900">
                      Criterion data typically come from trained coders or aggregated responses from online
                      panels. Use clear coding protocols and the same response scales you plan to use for SCC
                      outputs. Standard interrater reliability measures can help diagnose noisy or biased
                      criterion data that could undermine SCC performance.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Step 4 */}
        <div className="mb-6">
          <button
            onClick={() => toggleStep(4)}
            className="w-full text-left flex items-start gap-3 hover:bg-emerald-100/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5 text-emerald-700">
              {expandedSteps[4] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h3 className="text-xl font-bold text-emerald-900 flex-1">4. Set up your SCC</h3>
          </button>

          {expandedSteps[4] && (
            <div className="ml-9 mt-3 space-y-4">
              <p className="text-emerald-900">
                While consumers typically interact with LLMs through chat interfaces, SCCs are
                implemented using an Application Programming Interface (API), which allows the coding
                process to be automated. Researchers should build a program that submits stimuli to the
                LLM via API using the specified prompts and settings and records the model's responses.
                This implementation turns the LLM into a scalable Synthetic Content Coder that can code
                large numbers of items consistently without manual intervention.
              </p>

              <p className="text-emerald-900">
                Practically, this means taking a folder of images or a spreadsheet with text or URLs for
                images, and having a computer program feed them to the LLM one at a time. You get back a
                spreadsheet with your coding for each item.
              </p>

              <p className="text-emerald-900">
                Annotated examples of code are provided here. A tool for generating coding templates is
                available here.
              </p>

              <p className="text-emerald-900">
                Instructions for setting up software tools and appropriate accounts with AI providers is
                provided here.
              </p>

              <p className="text-emerald-900 italic">
                Feeling stuck? A research assistant with basic knowledge of programming and access to an
                LLM should be able to get this done in a few hours. A research assistant well-versed in
                python programming can get this done in a couple of hours.
              </p>

              {/* Subsection: Why Use an API */}
              <div className="border-l-2 border-emerald-300 pl-4">
                <button
                  onClick={() => toggleSubsection('4-why-api')}
                  className="w-full text-left flex items-start gap-2 hover:text-emerald-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['4-why-api'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">Why Use an API</h4>
                </button>
                {expandedSubsections['4-why-api'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-emerald-900">
                      Consumers are accustomed to interacting with LLMs through chat interfaces like ChatGPT.
                      While chat interfaces are useful for exploration, systematic content coding requires
                      automation. With thousands of pieces of content, it is not practical for a human to paste
                      each one into an LLM. APIs automate this process by allowing researchers to submit
                      content programmatically. This also means that the same instructions are applied to each
                      piece of content.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection: Documenting Model and Settings */}
              <div className="border-l-2 border-emerald-300 pl-4">
                <button
                  onClick={() => toggleSubsection('4-documenting')}
                  className="w-full text-left flex items-start gap-2 hover:text-emerald-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['4-documenting'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">Documenting Model and Settings</h4>
                </button>
                {expandedSubsections['4-documenting'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-emerald-900">
                      When implementing the API program, record the exact model architecture and version (for
                      example, "GPT-4o-2024-08-06"), temperature, number of samples per stimulus, and any
                      other relevant settings in addition to the prompt. This information is essential for
                      reproducibility and later checks for model drift (i.e., changes in the model underlying the
                      SCC), especially when using closed-source models that providers may update without
                      notice. This information is typically stored within a publicly available program which can be
                      run by other researchers.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection: Generating Prompts */}
              <div className="border-l-2 border-emerald-300 pl-4">
                <button
                  onClick={() => toggleSubsection('4-prompts')}
                  className="w-full text-left flex items-start gap-2 hover:text-emerald-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['4-prompts'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">Generating Prompts</h4>
                </button>
                {expandedSubsections['4-prompts'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-emerald-900">
                      The prompt used for an SCC is part of the measurement protocol, analogous to the written
                      instructions provided to human coders. As a starting point, the prompt should mirror as
                      closely as possible the item wording and instructions that human coders see. In most
                      cases, researchers should begin from the exact question text and response scale used for
                      human coding and make only minimal additions.
                    </p>
                    <p className="text-emerald-900">
                      These additions can be used to clarify context that is implicit for human coders but not for
                      the model—for example, specifying the target population ("You are an average U.S.
                      consumer"), restating the response options and scale anchors in full, or reminding the
                      model to use the entire scale appropriately. Additional information (such as a persona or
                      brief study description) may be included when it is necessary for the model to adopt the
                      same perspective as human coders, but unnecessary embellishments should be avoided
                      to keep the SCC prompt as close as possible to the human coding protocol.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Step 5 */}
        <div className="mb-6">
          <button
            onClick={() => toggleStep(5)}
            className="w-full text-left flex items-start gap-3 hover:bg-emerald-100/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5 text-emerald-700">
              {expandedSteps[5] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h3 className="text-xl font-bold text-emerald-900 flex-1">5. Implement Response Handling</h3>
          </button>

          {expandedSteps[5] && (
            <div className="ml-9 mt-3 space-y-4">
              <p className="text-emerald-900">
                The API program (that repeatedly submits stimuli to the LLM) should also specify how the
                SCC will generate, clean, and aggregate responses, including temperature, number of
                samples per stimulus, and rules for handling malformed or missing outputs. These choices
                affect both validity and reproducibility.
              </p>

              {/* Subsection: Temperature and Sampling Strategy */}
              <div className="border-l-2 border-emerald-300 pl-4">
                <button
                  onClick={() => toggleSubsection('5-temperature')}
                  className="w-full text-left flex items-start gap-2 hover:text-emerald-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['5-temperature'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">Temperature and Sampling Strategy</h4>
                </button>
                {expandedSubsections['5-temperature'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-emerald-900">
                      The temperature parameter controls stochasticity, which effectively refers to how much
                      randomness to allow in the analysis. A temperature of 0 means that the LLM is always opting
                      for the most probable outcome. Higher temperature allows the model to pick outcomes
                      that it deems less probable. Researchers can either fix temperature at zero to get the same
                      response every time or allow modest randomness, sampling each stimulus multiple times
                      and averaging responses. Averaging many responses is often helpful because it allows you
                      to capture uncertainty between scale points.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection: Aggregation, Batching, and Error Handling */}
              <div className="border-l-2 border-emerald-300 pl-4">
                <button
                  onClick={() => toggleSubsection('5-aggregation')}
                  className="w-full text-left flex items-start gap-2 hover:text-emerald-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['5-aggregation'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">Aggregation, Batching, and Error Handling</h4>
                </button>
                {expandedSubsections['5-aggregation'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-emerald-900">
                      Decide in advance how you will aggregate multiple responses (for example, averaging
                      across samples), handle unexpected outputs (such as non-numeric responses or out-of-range values), and batch requests to respect API limits. These procedures should be
                      documented and preregistered alongside other SCC specifications so that downstream
                      analyses are transparent and reproducible.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection: Estimating Validation Performance */}
              <div className="border-l-2 border-emerald-300 pl-4">
                <button
                  onClick={() => toggleSubsection('5-estimating')}
                  className="w-full text-left flex items-start gap-2 hover:text-emerald-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['5-estimating'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">Estimating Validation Performance</h4>
                </button>
                {expandedSubsections['5-estimating'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-emerald-900">
                      Once an SCC procedure is in place, a researcher can get a better understanding of
                      expected performance on the validation step through bootstrapping. This procedure
                      randomly samples from the development/test set with replacement to create new
                      simulated datasets. Using the SCC on these datasets provides a distribution of possible
                      outcomes. Using this procedure, a researcher may choose an SCC with the highest median
                      performance or balance average performance levels with variations in performance.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VALIDATION SECTION - PURPLE */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-purple-900 mb-6">
          VALIDATION: Making sure your SCC works well on new data
        </h2>

        {/* Step 6 */}
        <div className="mb-6">
          <button
            onClick={() => toggleStep(6)}
            className="w-full text-left flex items-start gap-3 hover:bg-purple-100/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5 text-purple-700">
              {expandedSteps[6] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h3 className="text-xl font-bold text-purple-900 flex-1">6. Collect SCC Ratings & Preregister</h3>
          </button>

          {expandedSteps[6] && (
            <div className="ml-9 mt-3 space-y-4">
              <p className="text-purple-900">
                Once you have settled on a specific combination of prompt, model, and settings, freeze the
                SCC, code the validation set and preregister both the model specification and its
                predictions before collecting human ratings on that set.
              </p>

              {/* Subsection: Freezing the SCC Specification */}
              <div className="border-l-2 border-purple-300 pl-4">
                <button
                  onClick={() => toggleSubsection('6-freezing')}
                  className="w-full text-left flex items-start gap-2 hover:text-purple-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['6-freezing'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-purple-900">Freezing the SCC Specification</h4>
                </button>
                {expandedSubsections['6-freezing'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-purple-900">
                      Prior to collecting any human ratings, it is vital that SCC specifications be frozen and
                      preregistered. Specifications that ought to be frozen include the prompt, all model settings,
                      and all response handling procedures (e.g., averaging of responses). Freezing the SCC at
                      this time ensures that final estimates of SCC performance based on the validation set are
                      not biased due to selection bias.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection: What to Preregister */}
              <div className="border-l-2 border-purple-300 pl-4">
                <button
                  onClick={() => toggleSubsection('6-what-preregister')}
                  className="w-full text-left flex items-start gap-2 hover:text-purple-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['6-what-preregister'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-purple-900">What to Preregister</h4>
                </button>
                {expandedSubsections['6-what-preregister'] && (
                  <div className="ml-6 mt-2 space-y-3">
                    <p className="text-purple-900">Preregistration should include:</p>
                    <ul className="list-disc list-inside text-purple-900 space-y-2 ml-4">
                      <li>(1) the model and prompt specifications (including any pre-specified variants)</li>
                      <li>(2) a way to access validation stimuli with SCC predictions for all prompt variants</li>
                      <li>(3) procedures for collecting and processing human ratings</li>
                      <li>(4) SCC rating procedures such as aggregation and error handling</li>
                      <li>(5) the planned comparison metrics (for example, Spearman correlation between mean human and SCC ratings)</li>
                      <li>(6) a minimum acceptable validity threshold on the validation set.</li>
                    </ul>
                    <p className="text-purple-900">
                      If the SCC fails to meet this threshold, the validation is considered unsuccessful and the
                      process must be restarted.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Step 7 */}
        <div className="mb-6">
          <button
            onClick={() => toggleStep(7)}
            className="w-full text-left flex items-start gap-3 hover:bg-purple-100/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5 text-purple-700">
              {expandedSteps[7] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h3 className="text-xl font-bold text-purple-900 flex-1">7. Collect Human Criterion Data</h3>
          </button>

          {expandedSteps[7] && (
            <div className="ml-9 mt-3 space-y-4">
              <p className="text-purple-900">
                After preregistration, obtain human ratings for the validation set using the same coding
                protocol as before. These ratings provide an independent benchmark to evaluate the
                preregistered SCC predictions.
              </p>

              {/* Subsection: Matching the Development Protocol */}
              <div className="border-l-2 border-purple-300 pl-4">
                <button
                  onClick={() => toggleSubsection('7-matching')}
                  className="w-full text-left flex items-start gap-2 hover:text-purple-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['7-matching'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-purple-900">Matching the Development Protocol</h4>
                </button>
                {expandedSubsections['7-matching'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-purple-900">
                      Human judges for the validation set should follow the same instructions, response scales,
                      and processing rules as those used for the development data. Maintaining a consistent
                      protocol ensures that differences between SCC and human ratings reflect SCC
                      performance rather than changes in the criterion itself.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection: Variants When Data Are Limited */}
              <div className="border-l-2 border-purple-300 pl-4">
                <button
                  onClick={() => toggleSubsection('7-variants')}
                  className="w-full text-left flex items-start gap-2 hover:text-purple-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['7-variants'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-purple-900">Variants When Data Are Limited</h4>
                </button>
                {expandedSubsections['7-variants'] && (
                  <div className="ml-6 mt-2 space-y-4">
                    <p className="text-purple-900">
                      If resources do not allow separate development and validation human datasets, one option
                      for unfinetuned SCCs is to develop and freeze a prompt, code the validation set,
                      preregister predictions, and then collect human ratings solely for that set. This procedure is
                      risky because there is no way to get performance estimates for a set of prompts and
                      settings prior to validation.
                    </p>
                    <p className="text-purple-900">
                      Alternatively, when human ratings already exist, you can retroactively partition them into
                      development and validation sets, but this increases the risk of misusing validation data
                      during development and should be documented transparently.
                    </p>
                    <p className="text-purple-900">
                      Finetuned SCCs are inherently more data intensive because they must be trained on
                      labeled data.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Step 8 */}
        <div className="mb-6">
          <button
            onClick={() => toggleStep(8)}
            className="w-full text-left flex items-start gap-3 hover:bg-purple-100/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5 text-purple-700">
              {expandedSteps[8] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h3 className="text-xl font-bold text-purple-900 flex-1">8. Compare SCC & Human Ratings</h3>
          </button>

          {expandedSteps[8] && (
            <div className="ml-9 mt-3 space-y-4">
              <p className="text-purple-900">
                Compare SCC predictions to human ratings on the validation set to assess criterion validity
                and decide whether the SCC is good enough for deployment in the specified context based
                on the preregistered threshold.
              </p>

              {/* Subsection: Key Metrics */}
              <div className="border-l-2 border-purple-300 pl-4">
                <button
                  onClick={() => toggleSubsection('8-metrics')}
                  className="w-full text-left flex items-start gap-2 hover:text-purple-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['8-metrics'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-purple-900">Key Metrics</h4>
                </button>
                {expandedSubsections['8-metrics'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-purple-900">
                      Select metrics appropriate to your coding task. For continuous ratings, correlations
                      between SCC and mean human scores capture how well the SCC preserves the relative
                      ordering of stimuli, while RMSE or related error measures assess differences in absolute
                      levels, important when comparing to existing human-coded benchmarks. For categorical
                      labels, use measures such as accuracy, F1 scores, or Cohen's kappa.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection: Checking Bias and Within-Context Generalizability */}
              <div className="border-l-2 border-purple-300 pl-4">
                <button
                  onClick={() => toggleSubsection('8-bias')}
                  className="w-full text-left flex items-start gap-2 hover:text-purple-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['8-bias'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-purple-900">Checking Bias and Within-Context Generalizability</h4>
                </button>
                {expandedSubsections['8-bias'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-purple-900">
                      Where possible, examine SCC performance across meaningful subsets of data, such as
                      demographic groups or content categories, to detect systematic biases. Adequate
                      performance across these subsets supports claims that the SCC generalizes within its
                      defined context; any relevant performance gaps should be reported so that readers can
                      interpret findings appropriately.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Step 9 */}
        <div className="mb-6">
          <button
            onClick={() => toggleStep(9)}
            className="w-full text-left flex items-start gap-3 hover:bg-purple-100/50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5 text-purple-700">
              {expandedSteps[9] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h3 className="text-xl font-bold text-purple-900 flex-1">9. Deploy or Start Over</h3>
          </button>

          {expandedSteps[9] && (
            <div className="ml-9 mt-3 space-y-4">
              {/* Subsection: Overview */}
              <div className="border-l-2 border-purple-300 pl-4">
                <button
                  onClick={() => toggleSubsection('9-overview')}
                  className="w-full text-left flex items-start gap-2 hover:text-purple-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['9-overview'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-purple-900">Overview</h4>
                </button>
                {expandedSubsections['9-overview'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-purple-900">
                      Use the validation results to make a decision: if the SCC meets your preregistered criterion,
                      apply it to the full coding set; if not, revise the SCC and repeat the validation procedure
                      before using it in substantive analyses.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection: Deploying on the Coding Set */}
              <div className="border-l-2 border-purple-300 pl-4">
                <button
                  onClick={() => toggleSubsection('9-deploying')}
                  className="w-full text-left flex items-start gap-2 hover:text-purple-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['9-deploying'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-purple-900">Deploying on the Coding Set</h4>
                </button>
                {expandedSubsections['9-deploying'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-purple-900">
                      When validation performance is satisfactory, apply the SCC to the remaining unlabeled
                      content. Before large-scale deployment, especially if time has elapsed, recode the test and
                      validation sets to confirm that performance has not changed due to model updates. If
                      performance is stable, proceed to code the full dataset and move on to substantive
                      analyses. While coding may not be replicated exactly, it should be very close.
                    </p>
                  </div>
                )}
              </div>

              {/* Subsection: When to Restart */}
              <div className="border-l-2 border-purple-300 pl-4">
                <button
                  onClick={() => toggleSubsection('9-restart')}
                  className="w-full text-left flex items-start gap-2 hover:text-purple-700 transition-colors py-2"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedSubsections['9-restart'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <h4 className="text-lg font-bold text-purple-900">When to Restart</h4>
                </button>
                {expandedSubsections['9-restart'] && (
                  <div className="ml-6 mt-2">
                    <p className="text-purple-900">
                      If the SCC fails to achieve the preregistered validity threshold, or if later checks reveal non-trivial performance changes (for example, after an LLM provider updates a model), treat the
                      validation as unsuccessful. In these cases, refine the construct definition, criterion data,
                      prompts, or model choice, and then repeat the development and validation steps with
                      newly sequestered validation data. This process includes collecting new human data.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Important Warning Box - RED */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-900 font-bold">
          Important: SCCs must be validated before use in a specific context. This site teaches you
          how to develop a properly validated SCC to apply to a specific context.
        </p>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-slate-100 border border-slate-200 rounded-lg p-6">
        <h3 className="font-bold text-slate-900 mb-3 text-lg">Ready to Get Started?</h3>
        <div className="space-y-2 text-slate-700">
          <p>
            <strong>Tutorial:</strong> See step-by-step code examples for different content types
          </p>
          <p>
            <strong>Code Generator:</strong> Generate customized Python code for GPT-4 or Claude
          </p>
          <p>
            <strong>Resources:</strong> Access validation tools, templates, and best practices
          </p>
        </div>
      </div>
    </div>
  );
}
