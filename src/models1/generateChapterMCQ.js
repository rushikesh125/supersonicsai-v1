import { GoogleGenerativeAI } from "@google/generative-ai";
import { mcqTestSchema } from "./modelSchemas"; // You'll need to create this schema

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const mcqGenerationModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: mcqTestSchema, // Define a schema for MCQ structure
  },
});

const generateChapterMCQ = async (
  courseData,
  currentChapter
) => {
  const augmentation = `Generate a comprehensive multiple-choice quiz for the following chapter:

Chapter Details:
- Chapter Title: ${currentChapter?.title}
- Chapter Content: ${currentChapter?.chapterContent}

Quiz Generation Guidelines:
1. Create 10 multiple-choice questions
2. Difficulty Level: Mix of easy, medium, and challenging questions
3. Each question should:
   - Test core understanding of the chapter's key concepts
   - Have 4 answer options
   - Include one correct answer
   - Provide a brief explanation for the correct answer

Question Format:
{
  "questions": [
    {
      "question": "Question text here",
      "options": [
        {"text": "Option A", "isCorrect": false},
        {"text": "Option B", "isCorrect": true},
        {"text": "Option C", "isCorrect": false},
        {"text": "Option D", "isCorrect": false}
      ],
      "explanation": "Detailed explanation of why the correct answer is correct"
    },
    // ... 9 more questions
  ]
}`;

  try {
    const result = await mcqGenerationModel.generateContent(augmentation);
    return result.response.text();
  } catch (error) {
    console.error("Error Generating MCQ Test:", error);
    throw error;
  }
};

export default generateChapterMCQ;