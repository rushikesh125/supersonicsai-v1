import { GoogleGenerativeAI } from "@google/generative-ai";
import { courseAnalysisSchema } from "./modelSchemas";
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: courseAnalysisSchema,
  },
});

const generateCourse = async (courseData, prompt) => {
  const cData = JSON.stringify(courseData);
  //   console.log(resData);

  try {
    const result = await model.generateContent(
      `${cData} understand given data , and Generate Course Details and generate all necessary chapters based on level , ${prompt}`
    );
    return result.response.text();
  } catch (error) {
    console.error("Error Generating resume review:", error);
    throw error;
  }
};

export default generateCourse;
