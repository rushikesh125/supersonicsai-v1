import { SchemaType } from "@google/generative-ai";

const careerRecommendationsSchema = {
  description: "Career recommendations based on assessment data",
  type: SchemaType.OBJECT,
  properties: {
    career_recommendations: {
      type: SchemaType.OBJECT,
      properties: {
        primaryCareerPaths: {
          type: SchemaType.ARRAY,
          description: "List of primary recommended career paths",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              career: {
                type: SchemaType.STRING,
                description: "The name of the career path",
              },
              matchScore: {
                type: SchemaType.NUMBER,
                description: "Compatibility score for this career path",
              },
              reasonForMatch: {
                type: SchemaType.STRING,
                description:
                  "Explanation of why this career matches the assessment",
              },
              industryOutlook: {
                type: SchemaType.OBJECT,
                description: "Information about the industry outlook",
                properties: {
                  growthRate: {
                    type: SchemaType.STRING,
                    description: "Projected growth rate of the industry",
                  },
                  marketDemand: {
                    type: SchemaType.STRING,
                    description: "Current market demand for professionals",
                  },
                  futureProspects: {
                    type: SchemaType.STRING,
                    description: "Future prospects of the career path",
                  },
                  topRecruiters: {
                    type: SchemaType.ARRAY,
                    description:
                      "Information about top recruiters in this field",
                    items: {
                      type: SchemaType.OBJECT,
                      properties: {
                        type: {
                          type: SchemaType.STRING,
                          description: "Type of recruiter or industry segment",
                        },
                        companies: {
                          type: SchemaType.ARRAY,
                          description:
                            "List of major companies hiring in this field",
                          items: {
                            type: SchemaType.STRING,
                          },
                        },
                        averagePackage: {
                          type: SchemaType.STRING,
                          description: "Average compensation package offered",
                        },
                      },
                      required: ["type", "companies", "averagePackage"],
                    },
                  },
                },
                required: [
                  "growthRate",
                  "marketDemand",
                  "futureProspects",
                  "topRecruiters",
                ],
              },
              subFields: {
                type: SchemaType.ARRAY,
                description: "Specialized sub-fields within this career path",
                items: {
                  type: SchemaType.OBJECT,
                  properties: {
                    name: {
                      type: SchemaType.STRING,
                      description: "Name of the sub-field",
                    },
                    description: {
                      type: SchemaType.STRING,
                      description: "Description of the sub-field",
                    },
                    currentTrends: {
                      type: SchemaType.ARRAY,
                      description: "Current trends in this sub-field",
                      items: {
                        type: SchemaType.STRING,
                      },
                    },
                    requiredSkills: {
                      type: SchemaType.OBJECT,
                      description: "Skills required for this sub-field",
                      properties: {
                        technical: {
                          type: SchemaType.ARRAY,
                          description: "Technical skills required",
                          items: {
                            type: SchemaType.OBJECT,
                            properties: {
                              skill: {
                                type: SchemaType.STRING,
                                description: "Name of the technical skill",
                              },
                              technologies: {
                                type: SchemaType.ARRAY,
                                description: "Related technologies or tools",
                                items: {
                                  type: SchemaType.STRING,
                                },
                              },
                              proficiencyLevel: {
                                type: SchemaType.STRING,
                                description: "Required proficiency level",
                              },
                            },
                            required: [
                              "skill",
                              "technologies",
                              "proficiencyLevel",
                            ],
                          },
                        },
                        soft: {
                          type: SchemaType.ARRAY,
                          description: "Soft skills required",
                          items: {
                            type: SchemaType.STRING,
                          },
                        },
                      },
                      required: ["technical", "soft"],
                    },
                    preparationResources: {
                      type: SchemaType.OBJECT,
                      description: "Resources to prepare for this sub-field",
                      properties: {
                        courses: {
                          type: SchemaType.ARRAY,
                          description: "Recommended courses",
                          items: {
                            type: SchemaType.OBJECT,
                            properties: {
                              name: {
                                type: SchemaType.STRING,
                                description: "Name of the course",
                              },
                            },
                            required: ["name"],
                          },
                        },
                      },
                      required: ["courses"],
                    },
                  },
                  required: [
                    "name",
                    "description",
                    "currentTrends",
                    "requiredSkills",
                    "preparationResources",
                  ],
                },
              },
            },
            required: [
              "career",
              "matchScore",
              "reasonForMatch",
              "industryOutlook",
              "subFields",
            ],
          },
        },
        secondaryCareerPaths: {
          type: SchemaType.ARRAY,
          description: "List of secondary recommended career paths",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              career: {
                type: SchemaType.STRING,
                description: "The name of the career path",
              },
              matchScore: {
                type: SchemaType.NUMBER,
                description: "Compatibility score for this career path",
              },
              reasonForMatch: {
                type: SchemaType.STRING,
                description:
                  "Explanation of why this career matches the assessment",
              },
              industryOutlook: {
                type: SchemaType.OBJECT,
                description: "Information about the industry outlook",
                properties: {
                  growthRate: {
                    type: SchemaType.STRING,
                    description: "Projected growth rate of the industry",
                  },
                  marketDemand: {
                    type: SchemaType.STRING,
                    description: "Current market demand for professionals",
                  },
                  futureProspects: {
                    type: SchemaType.STRING,
                    description: "Future prospects of the career path",
                  },
                  topRecruiters: {
                    type: SchemaType.ARRAY,
                    description:
                      "Information about top recruiters in this field",
                    items: {
                      type: SchemaType.OBJECT,
                      properties: {
                        type: {
                          type: SchemaType.STRING,
                          description: "Type of recruiter or industry segment",
                        },
                        companies: {
                          type: SchemaType.ARRAY,
                          description:
                            "List of major companies hiring in this field",
                          items: {
                            type: SchemaType.STRING,
                          },
                        },
                        averagePackage: {
                          type: SchemaType.STRING,
                          description: "Average compensation package offered",
                        },
                      },
                      required: ["type", "companies", "averagePackage"],
                    },
                  },
                },
                required: [
                  "growthRate",
                  "marketDemand",
                  "futureProspects",
                  "topRecruiters",
                ],
              },
              subFields: {
                type: SchemaType.ARRAY,
                description: "Specialized sub-fields within this career path",
                items: {
                  type: SchemaType.OBJECT,
                  properties: {
                    name: {
                      type: SchemaType.STRING,
                      description: "Name of the sub-field",
                    },
                    description: {
                      type: SchemaType.STRING,
                      description: "Description of the sub-field",
                    },
                    currentTrends: {
                      type: SchemaType.ARRAY,
                      description: "Current trends in this sub-field",
                      items: {
                        type: SchemaType.STRING,
                      },
                    },
                    requiredSkills: {
                      type: SchemaType.OBJECT,
                      description: "Skills required for this sub-field",
                      properties: {
                        technical: {
                          type: SchemaType.ARRAY,
                          description: "Technical skills required",
                          items: {
                            type: SchemaType.OBJECT,
                            properties: {
                              skill: {
                                type: SchemaType.STRING,
                                description: "Name of the technical skill",
                              },
                              technologies: {
                                type: SchemaType.ARRAY,
                                description: "Related technologies or tools",
                                items: {
                                  type: SchemaType.STRING,
                                },
                              },
                              proficiencyLevel: {
                                type: SchemaType.STRING,
                                description: "Required proficiency level",
                              },
                            },
                            required: [
                              "skill",
                              "technologies",
                              "proficiencyLevel",
                            ],
                          },
                        },
                        soft: {
                          type: SchemaType.ARRAY,
                          description: "Soft skills required",
                          items: {
                            type: SchemaType.STRING,
                          },
                        },
                      },
                      required: ["technical", "soft"],
                    },
                    preparationResources: {
                      type: SchemaType.OBJECT,
                      description: "Resources to prepare for this sub-field",
                      properties: {
                        courses: {
                          type: SchemaType.ARRAY,
                          description: "Recommended courses",
                          items: {
                            type: SchemaType.OBJECT,
                            properties: {
                              name: {
                                type: SchemaType.STRING,
                                description: "Name of the course",
                              },
                            },
                            required: ["name"],
                          },
                        },
                      },
                      required: ["courses"],
                    },
                  },
                  required: [
                    "name",
                    "description",
                    "currentTrends",
                    "requiredSkills",
                    "preparationResources",
                  ],
                },
              },
            },
            required: [
              "career",
              "matchScore",
              "reasonForMatch",
              "industryOutlook",
              "subFields",
            ],
          },
        },
        additionalInsights: {
          type: SchemaType.OBJECT,
          description:
            "Additional insights about career progression and work-life balance",
          properties: {
            careerProgression: {
              type: SchemaType.OBJECT,
              description: "Expected career progression over time",
              properties: {
                year1: {
                  type: SchemaType.OBJECT,
                  description: "Expected position after 1 year",
                  properties: {
                    role: {
                      type: SchemaType.STRING,
                      description: "Expected role",
                    },
                    focus: {
                      type: SchemaType.STRING,
                      description: "Focus areas",
                    },
                    expectedPackage: {
                      type: SchemaType.STRING,
                      description: "Expected compensation package",
                    },
                  },
                  required: ["role", "focus", "expectedPackage"],
                },
                year3: {
                  type: SchemaType.OBJECT,
                  description: "Expected position after 3 years",
                  properties: {
                    role: {
                      type: SchemaType.STRING,
                      description: "Expected role",
                    },
                    focus: {
                      type: SchemaType.STRING,
                      description: "Focus areas",
                    },
                    expectedPackage: {
                      type: SchemaType.STRING,
                      description: "Expected compensation package",
                    },
                  },
                  required: ["role", "focus", "expectedPackage"],
                },
                year5: {
                  type: SchemaType.OBJECT,
                  description: "Expected position after 5 years",
                  properties: {
                    role: {
                      type: SchemaType.STRING,
                      description: "Expected role",
                    },
                    focus: {
                      type: SchemaType.STRING,
                      description: "Focus areas",
                    },
                    expectedPackage: {
                      type: SchemaType.STRING,
                      description: "Expected compensation package",
                    },
                  },
                  required: ["role", "focus", "expectedPackage"],
                },
              },
              required: ["year1", "year3", "year5"],
            },
            workLifeBalance: {
              type: SchemaType.OBJECT,
              description: "Work-life balance information",
              properties: {
                averageWorkHours: {
                  type: SchemaType.STRING,
                  description: "Average work hours per week",
                },
                remoteOpportunities: {
                  type: SchemaType.STRING,
                  description: "Availability of remote work opportunities",
                },
                stressLevel: {
                  type: SchemaType.STRING,
                  description: "Typical stress level of the career",
                },
                tips: {
                  type: SchemaType.ARRAY,
                  description: "Tips for maintaining work-life balance",
                  items: {
                    type: SchemaType.STRING,
                  },
                },
              },
              required: [
                "averageWorkHours",
                "remoteOpportunities",
                "stressLevel",
                "tips",
              ],
            },
          },
          required: ["careerProgression", "workLifeBalance"],
        },
      },
      required: [
        "primaryCareerPaths",
        "secondaryCareerPaths",
        "additionalInsights",
      ],
    },
  },
  required: ["career_recommendations"],
};

const courseContentSchema = {
  type: "object",
  properties: {
    chapterContent: {
      description:
        "Explained chapter completely and strongly, providing code in Markdown format.",
      type: SchemaType.STRING,
    },
  },
  required: ["chapterContent"],
};
const courseAnalysisSchema = {
  description: "Course analysis data structure",
  type: SchemaType.OBJECT,
  properties: {
    course_analysis: {
      type: SchemaType.OBJECT,
      properties: {
        courseTitle: {
          type: SchemaType.STRING,
          description: "The title of the course",
        },
        shortDescription: {
          type: SchemaType.STRING,
          description: "A brief summary of the course content",
        },
        category: {
          type: SchemaType.STRING,
          description: "The category or domain of the course",
          enum: [
            "Development",
            "Business",
            "IT & Software",
            "Design",
            "Marketing",
            "Personal Development",
            "Photography & Video",
            "Health & Fitness",
            "Music",
            "Teaching & Academics",
            "Lifestyle",
            "Finance & Accounting",
            "Office Productivity",
            "Language Learning",
            "Data Science",
            "Cloud Computing",
            "Cybersecurity",
            "Graphic Design",
            "Web Development",
            "Mobile Development",
            "Game Development",
            "Digital Marketing",
            "Entrepreneurship",
            "Leadership",
            "Project Management",
          ],
        },
        level: {
          type: SchemaType.STRING,
          description: "The difficulty level of the course",
          enum: ["Beginner", "Intermediate", "Advanced"],
        },
        language: {
          type: SchemaType.STRING,
          description: "The primary language of instruction for the course",
          enum: ["English", "Spanish", "French", "German", "Hindi", "Other"],
        },
        coursePrice: {
          type: SchemaType.NUMBER,
          description: "The price of the course",
        },
        description: {
          type: SchemaType.STRING,
          description:
            "A detailed description of the course content, objectives, and outcomes",
        },
        chapters: {
          type: SchemaType.ARRAY,
          description: "A list of necessary chapters based on the course level",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              title: {
                type: SchemaType.STRING,
                description: "The title of the chapter",
              },
              description: {
                type: SchemaType.STRING,
                description: "A brief summary of the chapter content",
              },
            },
            required: ["title", "description"],
          },
        },
      },
      required: [
        "courseTitle",
        "shortDescription",
        "category",
        "level",
        "language",
        "coursePrice",
        "description",
        "chapters",
      ],
    },
  },
  required: ["course_analysis"],
};

const reexplainCourseContentSchema = {
  type: "object",
  properties: {
    chapterContent: {
      description:
        "Reexplain chapter completely and strongly with simplified & properly detailed with context, providing code in Markdown format.",
      type: SchemaType.STRING,
    },
  },
  required: ["chapterContent"],
};

export {
  careerRecommendationsSchema,
  courseContentSchema,
  courseAnalysisSchema,
  reexplainCourseContentSchema,
};
