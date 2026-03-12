export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "4",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "5",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "6",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];

export const AIResponseFormat = `
{
  "overallScore": number,
  "ATS": {
    "score": number,
    "tips": [{ "type": "good" | "improve", "tip": "string" }]
  },
  "toneAndStyle": {
    "score": number,
    "tips": [{ "type": "good" | "improve", "tip": "string", "explanation": "string" }]
  },
  "content": {
    "score": number,
    "tips": [{ "type": "good" | "improve", "tip": "string", "explanation": "string" }]
  },
  "structure": {
    "score": number,
    "tips": [{ "type": "good" | "improve", "tip": "string", "explanation": "string" }]
  },
  "skills": {
    "score": number,
    "tips": [{ "type": "good" | "improve", "tip": "string", "explanation": "string" }]
  }
}`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
}: {
  jobTitle: string;
  jobDescription: string;
}) =>
  `Act as a cynical, high-level technical recruiter and ATS specialist. 
  
  TASK:
  Analyze the provided resume against the following job:
  - Job Title: ${jobTitle}
  - Job Description: ${jobDescription}

  CRITICAL RULES:
  1. DO NOT be nice. If the resume is missing keywords or has poor formatting, give it a failing score (below 50).
  2. The output MUST be a single, valid JSON object. 
  3. DO NOT include introductory text like "Sure, here is the analysis."
  4. DO NOT use markdown code blocks (no \`\`\`json).
  5. Respond ONLY with the raw JSON string starting with { and ending with }.

  JSON SCHEMA TO FOLLOW:
  ${AIResponseFormat}

  DIVERSITY IN FEEDBACK:
  - Provide 3-4 distinct tips per category.
  - Category scores must reflect the actual quality relative to the specific Job Description provided.
  - If the resume is completely irrelevant to the job, the overallScore should be extremely low.`;
