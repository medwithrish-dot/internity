export type DegreeType =
  | "Finance"
  | "Economics"
  | "Maths"
  | "Engineering"
  | "Computer Science"
  | "Law"
  | "General"

export type Question = {
  id: string
  prompt?: string
  imageUrl?: string
  options: string[]
  correctAnswerIndex: number
  explanation: string
  difficulty?: "Easy" | "Medium" | "Hard"
  premium?: boolean
  tags?: string[]
}

export type Subsection = {
  slug: string
  title: string
  description: string
  analyticsKey: string
  recommendedFor?: DegreeType[]
  premium?: boolean
  questions: Question[]
}

export type PracticeSection = {
  slug: string
  title: string
  description: string
  analyticsKey: string
  recommendedFor?: DegreeType[]
  premium?: boolean
  subsections: Subsection[]
}

export const practiceSections: PracticeSection[] = [
  {
    slug: "numerical-reasoning",
    title: "Numerical Reasoning",
    description:
      "SHL / AON-style numerical reasoning covering tables, graphs, percentages, ratios, FX, growth, and multi-step calculations.",
    analyticsKey: "numerical_reasoning",
    recommendedFor: ["Finance", "Economics", "Maths", "Engineering"],
    subsections: [
      {
        slug: "tables",
        title: "Tables",
        description: "Single table analysis and multi-table comparison.",
        analyticsKey: "numerical_tables",
        recommendedFor: ["Finance", "Economics", "Maths"],
        questions: [
          {
            id: "num-tables-001",
            prompt:
              "A company’s revenue increased from £120,000 to £150,000. What is the percentage increase?",
            options: ["20%", "25%", "30%", "35%"],
            correctAnswerIndex: 1,
            explanation:
              "The increase is £30,000. Divide by the original £120,000: 30,000 / 120,000 = 0.25 = 25%.",
            difficulty: "Easy",
            tags: ["percentage change", "single table"],
          },
          {
  id: "num-tables-002",
  prompt:
    "A firm’s costs rose from £80,000 to £92,000. What is the percentage increase?",
  options: ["10%", "12%", "15%", "20%"],
  correctAnswerIndex: 2,
  explanation:
    "The increase is £12,000. 12,000 / 80,000 = 0.15 = 15%.",
  difficulty: "Easy",
  tags: ["percentage change", "single table"],
},
{
  id: "num-tables-003",
  prompt:
    "A product sold 240 units in January and 300 in February. By what percentage did sales increase?",
  options: ["20%", "25%", "30%", "35%"],
  correctAnswerIndex: 1,
  explanation:
    "The increase is 60 units. 60 / 240 = 0.25 = 25%.",
    premium: false,
  difficulty: "Easy",
  tags: ["sales growth", "single table"],
},
{
  id: "num-tables-004",
  prompt:
    "A company’s profit fell from £500,000 to £425,000. What is the percentage decrease?",
  options: ["10%", "12%", "15%", "18%"],
  correctAnswerIndex: 2,
  explanation:
    "The decrease is £75,000. 75,000 / 500,000 = 0.15 = 15%.",
  difficulty: "Easy",
  tags: ["percentage decrease", "profit"],
},
{
  id: "num-tables-005",
  prompt:
    "An analyst recorded revenue of £250,000 in Q1 and £325,000 in Q2. What was the percentage increase?",
  options: ["25%", "30%", "35%", "40%"],
  correctAnswerIndex: 1,
  explanation:
    "The increase is £75,000. 75,000 / 250,000 = 0.30 = 30%.",
  difficulty: "Easy",
  tags: ["revenue", "percentage change"],
},
 {
  id: "num-tables-006",
  prompt:
    "A firm’s costs rose from £90,000 to £102,000. What is the percentage increase?",
  options: ["10%", "12%", "15%", "20%"],
  correctAnswerIndex: 2,
  explanation:
    "The increase is £12,000. 12,000 / 80,000 = 0.15 = 15%.",
  difficulty: "Easy",
  tags: ["percentage change", "single table"],
},
        ],
      },
      
      {
        slug: "graphs",
        title: "Graphs",
        description: "Line graphs, bar charts, and mixed chart interpretation.",
        analyticsKey: "numerical_graphs",
        premium: false,
        questions: [],
      },
      {
        slug: "percentages",
        title: "Percentages",
        description: "Percentage change and percentage difference questions.",
        analyticsKey: "numerical_percentages",
        questions: [],
      },
      {
        slug: "ratios",
        title: "Ratios",
        description: "Profit margins, cost ratios, and ratio-based reasoning.",
        analyticsKey: "numerical_ratios",
        questions: [],
      },
      {
        slug: "currency-exchange",
        title: "Currency / Exchange",
        description: "FX conversion and exchange-rate calculations.",
        analyticsKey: "numerical_currency_exchange",
        questions: [],
      },
      {
        slug: "growth-decline",
        title: "Growth / Decline",
        description: "Compound growth and CAGR-style questions.",
        analyticsKey: "numerical_growth_decline",
        questions: [],
      },
      {
        slug: "estimation",
        title: "Estimation",
        description: "Quick approximations and exam-style estimation.",
        analyticsKey: "numerical_estimation",
        questions: [],
      },
      {
        slug: "data-sufficiency",
        title: "Data Sufficiency",
        description: "Determine whether enough information exists.",
        analyticsKey: "numerical_data_sufficiency",
        questions: [],
      },
      {
        slug: "multi-step-calculations",
        title: "Multi-step Calculations",
        description: "Multiple-operation calculation questions.",
        analyticsKey: "numerical_multi_step",
        questions: [],
      },
    ],
  },
  {
    slug: "logical-abstract-reasoning",
    title: "Logical / Abstract Reasoning",
    description:
      "Patterns, shape logic, transformations, and abstract sequence problems.",
    analyticsKey: "logical_abstract_reasoning",
    recommendedFor: ["Maths", "Engineering", "Computer Science"],
    subsections: [
      {
  slug: "shape-sequences",
  title: "Shape Sequences",
  description: "Find the next shape in a sequence.",
  analyticsKey: "logical_shape_sequences",
  questions: [
    {
      id: "test",
      imageUrl: "/question-images/logical/q1.png",
      options: ["A", "B", "C", "D"],
      correctAnswerIndex: 0,
      explanation: "Test",
    },
  ],
},
      
      {
        slug: "matrix-puzzles",
        title: "Matrix Puzzles",
        description: "Missing tile and matrix-based reasoning.",
        analyticsKey: "logical_matrix_puzzles",
        questions: [],
      },
      {
        slug: "odd-one-out",
        title: "Odd One Out",
        description: "Identify the shape that breaks the pattern.",
        analyticsKey: "logical_odd_one_out",
        questions: [],
      },
      {
        slug: "rotation",
        title: "Rotation",
        description: "Clockwise and anticlockwise transformation questions.",
        analyticsKey: "logical_rotation",
        questions: [],
      },
      {
        slug: "reflection",
        title: "Reflection",
        description: "Mirror patterns and reflective transformations.",
        analyticsKey: "logical_reflection",
        questions: [],
      },
      {
        slug: "rule-deduction",
        title: "Rule Deduction",
        description: "Identify the underlying transformation rule.",
        analyticsKey: "logical_rule_deduction",
        questions: [],
      },
      {
        slug: "pattern-completion",
        title: "Pattern Completion",
        description: "Complete incomplete visual patterns.",
        analyticsKey: "logical_pattern_completion",
        questions: [],
      },
    ],
  },
  {
    slug: "verbal-reasoning",
    title: "Verbal Reasoning",
    description:
      "Watson-Glaser style verbal reasoning, inference, and argument evaluation.",
    analyticsKey: "verbal_reasoning",
    recommendedFor: ["Law", "Economics", "Finance", "General"],
    subsections: [
      {
        slug: "true-false-cannot-say",
        title: "True / False / Cannot Say",
        description: "Inference-based statement judgement.",
        analyticsKey: "verbal_true_false_cannot_say",
        questions: [],
      },
      {
        slug: "statement-assumptions",
        title: "Statement Assumptions",
        description: "Identify underlying assumptions in statements.",
        analyticsKey: "verbal_statement_assumptions",
        questions: [],
      },
      {
        slug: "argument-evaluation",
        title: "Argument Evaluation",
        description: "Assess the strength and logic of arguments.",
        analyticsKey: "verbal_argument_evaluation",
        questions: [],
      },
      {
        slug: "reading-comprehension",
        title: "Reading Comprehension",
        description: "Passage-based comprehension questions.",
        analyticsKey: "verbal_reading_comprehension",
        questions: [],
      },
      {
        slug: "conclusion-questions",
        title: "Conclusion Questions",
        description: "Identify what conclusion follows from the passage.",
        analyticsKey: "verbal_conclusion_questions",
        questions: [],
      },
    ],
  },
  {
    slug: "situational-judgement",
    title: "Situational Judgement",
    description:
      "Big4 and consulting-style workplace judgement and response ranking.",
    analyticsKey: "situational_judgement",
    recommendedFor: ["General", "Finance", "Economics", "Law"],
    subsections: [
      {
        slug: "best-response",
        title: "Best Response",
        description: "Choose the best response to a scenario.",
        analyticsKey: "sjt_best_response",
        questions: [],
      },
      {
        slug: "worst-response",
        title: "Worst Response",
        description: "Identify the least appropriate response.",
        analyticsKey: "sjt_worst_response",
        questions: [],
      },
      {
        slug: "ranking-responses",
        title: "Ranking Responses",
        description: "Rank actions from strongest to weakest.",
        analyticsKey: "sjt_ranking_responses",
        questions: [],
      },
      {
        slug: "most-least-effective",
        title: "Most / Least Effective",
        description: "Compare the effectiveness of responses.",
        analyticsKey: "sjt_most_least_effective",
        questions: [],
      },
      {
        slug: "team-conflict",
        title: "Team Conflict",
        description: "Scenarios involving tension within teams.",
        analyticsKey: "sjt_team_conflict",
        questions: [],
      },
      {
        slug: "deadline-pressure",
        title: "Deadline Pressure",
        description: "Workload and deadline management scenarios.",
        analyticsKey: "sjt_deadline_pressure",
        questions: [],
      },
      {
        slug: "ethical-dilemmas",
        title: "Ethical Dilemmas",
        description: "Integrity and judgement scenarios.",
        analyticsKey: "sjt_ethical_dilemmas",
        questions: [],
      },
      {
        slug: "client-communication",
        title: "Client Communication",
        description: "Professional communication scenarios.",
        analyticsKey: "sjt_client_communication",
        questions: [],
      },
    ],
  },
  {
    slug: "financial-commercial-knowledge",
    title: "Financial / Commercial Knowledge",
    description:
      "Finance internship prep covering markets, accounting, valuation, and business strategy.",
    analyticsKey: "financial_commercial_knowledge",
    recommendedFor: ["Finance", "Economics"],
    subsections: [
      {
        slug: "market-awareness",
        title: "Market Awareness",
        description: "Commercial awareness, markets, and macro topics.",
        analyticsKey: "fin_market_awareness",
        questions: [],
      },
      {
        slug: "interest-rates",
        title: "Interest Rates",
        description: "Rate movements and implications.",
        analyticsKey: "fin_interest_rates",
        questions: [],
      },
      {
        slug: "inflation",
        title: "Inflation",
        description: "Inflation concepts and market impact.",
        analyticsKey: "fin_inflation",
        questions: [],
      },
      {
        slug: "accounting-basics",
        title: "Accounting Basics",
        description: "Core accounting knowledge for finance roles.",
        analyticsKey: "fin_accounting_basics",
        questions: [],
      },
      {
        slug: "income-statement",
        title: "Income Statement",
        description: "Revenue, costs, and profitability questions.",
        analyticsKey: "fin_income_statement",
        questions: [],
      },
      {
        slug: "balance-sheet",
        title: "Balance Sheet",
        description: "Assets, liabilities, and equity.",
        analyticsKey: "fin_balance_sheet",
        questions: [],
      },
      {
        slug: "valuation-concepts",
        title: "Valuation Concepts",
        description: "DCF basics and valuation thinking.",
        analyticsKey: "fin_valuation_concepts",
        questions: [],
      },
      {
        slug: "dcf-basics",
        title: "DCF Basics",
        description: "Discounted cash flow foundations.",
        analyticsKey: "fin_dcf_basics",
        questions: [],
      },
      {
        slug: "comparable-companies",
        title: "Comparable Companies",
        description: "Comps and relative valuation ideas.",
        analyticsKey: "fin_comparable_companies",
        questions: [],
      },
      {
        slug: "corporate-finance",
        title: "Corporate Finance",
        description: "Funding, capital structure, and finance basics.",
        analyticsKey: "fin_corporate_finance",
        questions: [],
      },
      {
        slug: "ma-basics",
        title: "M&A Basics",
        description: "Core mergers and acquisitions knowledge.",
        analyticsKey: "fin_ma_basics",
        questions: [],
      },
      {
        slug: "debt-vs-equity",
        title: "Debt vs Equity",
        description: "Compare debt and equity financing.",
        analyticsKey: "fin_debt_vs_equity",
        questions: [],
      },
      {
        slug: "business-strategy",
        title: "Business Strategy",
        description: "Strategy, positioning, and growth thinking.",
        analyticsKey: "fin_business_strategy",
        questions: [],
      },
      {
        slug: "profitability",
        title: "Profitability",
        description: "Margins, drivers, and commercial performance.",
        analyticsKey: "fin_profitability",
        questions: [],
      },
      {
        slug: "market-entry",
        title: "Market Entry",
        description: "Expansion and market-entry style questions.",
        analyticsKey: "fin_market_entry",
        questions: [],
      },
    ],
  },
]

export const degreeOptions: DegreeType[] = [
  "Finance",
  "Economics",
  "Maths",
  "Engineering",
  "Computer Science",
  "Law",
  "General",
]

export function getSectionBySlug(sectionSlug: string) {
  return practiceSections.find((section) => section.slug === sectionSlug)
}

export function getSubsectionBySlug(sectionSlug: string, subsectionSlug: string) {
  const section = getSectionBySlug(sectionSlug)
  if (!section) return null
  return section.subsections.find((subsection) => subsection.slug === subsectionSlug)
}

export type FlattenedQuestion = Question & {
  sectionSlug: string
  sectionTitle: string
  subsectionSlug: string
  subsectionTitle: string
  analyticsKey: string
}

export function getAllFlattenedQuestions(): FlattenedQuestion[] {
  return practiceSections.flatMap((section) =>
    section.subsections.flatMap((subsection) =>
      subsection.questions.map((question) => ({
        ...question,
        sectionSlug: section.slug,
        sectionTitle: section.title,
        subsectionSlug: subsection.slug,
        subsectionTitle: subsection.title,
        analyticsKey: subsection.analyticsKey,
      }))
    )
  )
}

export function getFlattenedQuestionsBySection(sectionSlug: string): FlattenedQuestion[] {
  const section = practiceSections.find((s) => s.slug === sectionSlug)
  if (!section) return []

  return section.subsections.flatMap((subsection) =>
    subsection.questions.map((question) => ({
      ...question,
      sectionSlug: section.slug,
      sectionTitle: section.title,
      subsectionSlug: subsection.slug,
      subsectionTitle: subsection.title,
      analyticsKey: subsection.analyticsKey,
    }))
  )
}

export function getFlattenedQuestionsBySubsection(
  sectionSlug: string,
  subsectionSlug: string
): FlattenedQuestion[] {
  const section = practiceSections.find((s) => s.slug === sectionSlug)
  if (!section) return []

  const subsection = section.subsections.find((s) => s.slug === subsectionSlug)
  if (!subsection) return []

  return subsection.questions.map((question) => ({
    ...question,
    sectionSlug: section.slug,
    sectionTitle: section.title,
    subsectionSlug: subsection.slug,
    subsectionTitle: subsection.title,
    analyticsKey: subsection.analyticsKey,
  }))
}

export function shuffleQuestions<T>(questions: T[]): T[] {
  const copy = [...questions]

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}

export function getRandomQuestions(
  questions: FlattenedQuestion[],
  count?: number
): FlattenedQuestion[] {
  const shuffled = shuffleQuestions(questions)
  return typeof count === "number" ? shuffled.slice(0, count) : shuffled
}