// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   ChevronDown,
//   ChevronUp,
//   Book,
//   Briefcase,
//   TrendingUp,
//   Heart,
//   Clock,
//   Globe,
//   AlertTriangle,
//   Award,
// } from "lucide-react";
// import { getRoadmap } from "@/firebase/recommendations/read";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import Loading from "@/app/loading";
// import { Button } from "@heroui/react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";

// const CareerRecommendations = () => {
//   // Using the provided data
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const user = useSelector((state) => state?.user);

//   const recommendations = data;
//   const [expandedPrimary, setExpandedPrimary] = useState(0); // Default to expanded
//   const [expandedSecondary, setExpandedSecondary] = useState(null);
//   const [expandedSubfield, setExpandedSubfield] = useState(null);
 

//   useEffect(() => {
//     (async () => {
//       setIsLoading(true);
//       try {
//         const res = await getRoadmap({ uid: user?.uid });
//         setData(res);
//         console.log("res:::", res);
//       } catch (error) {
//         console.log("error", error);
//         toast.error(error);
//         setError(
//           "roadmap is not generated please generate roadmap form assessment"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     })();
//   }, [user]);

//   const getColorByScore = (score) => {
//     const percentage = score * 100;

//     if (percentage >= 80) return "bg-purple-500 text-white";
//     if (percentage >= 60) return "bg-purple-400 text-white";
//     if (percentage >= 40) return "bg-purple-300 text-purple-900";
//     return "bg-purple-200 text-purple-900";
//   };

//   const SkillBadge = ({ skill, technologies, proficiencyLevel }) => (
//     <div className="flex flex-col bg-purple-50 rounded-lg p-4 border border-purple-100 shadow-sm mb-3">
//       <div className="flex justify-between items-center mb-2">
//         <span className="font-semibold text-purple-800">{skill}</span>
//         <span
//           className={`text-xs px-2 py-1 rounded-full ${
//             proficiencyLevel === "Advanced"
//               ? "bg-purple-500 text-white"
//               : proficiencyLevel === "Intermediate"
//               ? "bg-purple-400 text-white"
//               : "bg-purple-200 text-purple-900"
//           }`}
//         >
//           {proficiencyLevel}
//         </span>
//       </div>
//       <div className="w-full md:flex flex-wrap mt-2">
//         {technologies.map((tech, index) => (
//           <div  key={index} className="w-full md:w-1/2  my-2">
//             <div
           
//             className="text-xs bg-white text-purple-600 border border-purple-200 rounded-full px-2 py-1 mr-2 mb-2"
//           >
//             {tech}
            
//           </div>
//           <Link
//           href={`/my-courses/create-course?c=${tech}`}
//           className="text-purple-600 underline text-xs"
//         >
//           create course for : {tech}
//         </Link>
//             </div>
//         ))}
//       </div>
//       {/* <div className="p-2 w-full md:flex justify-center items-center">
       
//       </div> */}
//     </div>
//   );

//   const CareerPathCard = ({
//     careerPath,
//     isExpanded,
//     toggleExpanded,
//     isPrimary,
//   }) => (
//     <div
//       className={`mb-6 rounded-2xl overflow-hidden shadow-lg border ${
//         isPrimary ? "border-purple-400" : "border-purple-300"
//       }`}
//     >
//       <div
//         className={`p-6 cursor-pointer ${
//           isPrimary
//             ? "bg-gradient-to-r from-purple-500 to-purple-400"
//             : "bg-gradient-to-r from-purple-400 to-purple-300"
//         } text-white`}
//         onClick={toggleExpanded}
//       >
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <Briefcase className="mr-3" />
//             <h2 className="text-2xl font-bold">{careerPath.career}</h2>
//           </div>
//           <div className="flex items-center">
//             <div
//               className={`px-3 py-1 rounded-full mr-4 ${getColorByScore(
//                 careerPath.matchScore
//               )}`}
//             >
//               <span className="font-bold">
//                 {Math.round(careerPath.matchScore * 100)}%
//               </span>{" "}
//               Match
//             </div>
//             {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
//           </div>
//         </div>
//       </div>

//       {isExpanded && (
//         <div className="bg-white p-6">
//           <div className="mb-6">
//             <h3 className="text-purple-800 font-semibold text-lg mb-2">
//               Why This Matches You
//             </h3>
//             <p className="text-gray-700">{careerPath.reasonForMatch}</p>
//           </div>

//           {/* Industry Outlook */}
//           <div className="mb-6 bg-purple-50 rounded-lg p-4">
//             <h3 className="text-purple-800 font-semibold text-lg mb-4 flex items-center">
//               <TrendingUp className="mr-2" /> Industry Outlook
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <div className="bg-white rounded p-3 border border-purple-100">
//                 <div className="text-purple-600 font-medium">Growth Rate</div>
//                 <div>{careerPath.industryOutlook.growthRate}</div>
//               </div>
//               <div className="bg-white rounded p-3 border border-purple-100">
//                 <div className="text-purple-600 font-medium">Market Demand</div>
//                 <div>{careerPath.industryOutlook.marketDemand}</div>
//               </div>
//             </div>
//             <div className="bg-white rounded p-3 border border-purple-100 mb-4">
//               <div className="text-purple-600 font-medium">
//                 Future Prospects
//               </div>
//               <div>{careerPath.industryOutlook.futureProspects}</div>
//             </div>

//             <h4 className="text-purple-700 font-medium mb-2">Top Recruiters</h4>
//             <div className="grid grid-cols-1 gap-3">
//               {careerPath.industryOutlook.topRecruiters.map(
//                 (recruiter, index) => (
//                   <div
//                     key={index}
//                     className="bg-white rounded p-3 border border-purple-100"
//                   >
//                     <div className="flex justify-between">
//                       <span className="text-purple-600 font-medium">
//                         {recruiter.type}
//                       </span>
//                       <span className="text-purple-800">
//                         {recruiter.averagePackage}
//                       </span>
//                     </div>
//                     <div className="flex flex-wrap mt-2">
//                       {recruiter.companies.map((company, idx) => (
//                         <span
//                           key={idx}
//                           className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mr-2 mb-1"
//                         >
//                           {company}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>

//           {/* Subfields */}
//           <div>
//             <h3 className="text-purple-800 font-semibold text-lg mb-4">
//               Specialized Sub-fields
//             </h3>
//             <div className="space-y-4">
//               {careerPath.subFields.map((subfield, index) => (
//                 <div
//                   key={index}
//                   className="border border-purple-200 rounded-lg overflow-hidden"
//                 >
//                   <div
//                     className="bg-purple-100 p-4 cursor-pointer flex justify-between items-center"
//                     onClick={() =>
//                       setExpandedSubfield(
//                         expandedSubfield === `${careerPath.career}-${index}`
//                           ? null
//                           : `${careerPath.career}-${index}`
//                       )
//                     }
//                   >
//                     <h4 className="font-medium text-purple-900">
//                       {subfield.name}
//                     </h4>
//                     {expandedSubfield === `${careerPath.career}-${index}` ? (
//                       <ChevronUp size={20} className="text-purple-700" />
//                     ) : (
//                       <ChevronDown size={20} className="text-purple-700" />
//                     )}
//                   </div>

//                   {expandedSubfield === `${careerPath.career}-${index}` && (
//                     <div className="p-4">
//                       <p className="text-gray-700 mb-4">
//                         {subfield.description}
//                       </p>

//                       {/* Current Trends */}
//                       <div className="mb-4">
//                         <h5 className="text-purple-700 font-medium mb-2 flex items-center">
//                           <TrendingUp size={16} className="mr-1" /> Current
//                           Trends
//                         </h5>
//                         <ul className="list-disc list-inside space-y-1 text-gray-700">
//                           {subfield.currentTrends.map((trend, idx) => (
//                             <li key={idx}>{trend}</li>
//                           ))}
//                         </ul>
//                       </div>

//                       {/* Required Skills */}
//                       <div className="mb-4">
//                         <h5 className="text-purple-700 font-medium mb-2">
//                           Required Skills
//                         </h5>

//                         <div className="mb-4">
//                           <h6 className="text-purple-600 text-sm font-medium mb-2">
//                             Technical Skills
//                           </h6>
//                           {subfield.requiredSkills.technical.map(
//                             (skill, idx) => (
//                               <SkillBadge key={idx} {...skill} />
//                             )
//                           )}
//                         </div>

//                         <div>
//                           <h6 className="text-purple-600 text-sm font-medium mb-2">
//                             Soft Skills
//                           </h6>
//                           <div className="flex flex-wrap">
//                             {subfield.requiredSkills.soft.map((skill, idx) => (
//                               <span
//                                 key={idx}
//                                 className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
//                               >
//                                 {skill}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Preparation Resources */}
//                       <div>
//                         <h5 className="text-purple-700 font-medium mb-2 flex items-center">
//                           <Book size={16} className="mr-1" /> Recommended
//                           Courses
//                         </h5>
//                         <ul className="list-disc list-inside space-y-1 text-gray-700">
//                           {subfield.preparationResources.courses.map(
//                             (course, idx) => (
//                               <li key={idx}>{course.name}</li>
//                             )
//                           )}
//                         </ul>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   // Additional Insights component
//   const AdditionalInsights = () => (
//     <div className="mt-8 bg-white rounded-2xl overflow-hidden shadow-lg border border-purple-200">
//       <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-400 text-white">
//         <h2 className="text-2xl font-bold flex items-center">
//           <Award className="mr-3" /> Additional Career Insights
//         </h2>
//       </div>

//       <div className="p-6">
//         {/* Career Progression */}
//         <div className="mb-8">
//           <h3 className="text-purple-800 font-semibold text-lg mb-4">
//             Career Progression
//           </h3>

//           <div className="relative">
//             {/* Timeline line */}
//             <div className="absolute left-0 w-1 bg-purple-200 h-full top-0 z-0"></div>

//             {/* Year 1 */}
//             <div className="relative z-10 mb-8 pl-8">
//               <div className="absolute left-0 bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center border-4 border-purple-100">
//                 <span className="text-white text-xs font-bold">1</span>
//               </div>
//               <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
//                 <h4 className="text-purple-700 font-medium">
//                   Year 1:{" "}
//                   {
//                     recommendations.additionalInsights.careerProgression.year1
//                       .role
//                   }
//                 </h4>
//                 <p className="text-gray-700 mb-2">
//                   <span className="font-medium">Focus:</span>{" "}
//                   {
//                     recommendations.additionalInsights.careerProgression.year1
//                       .focus
//                   }
//                 </p>
//                 <p className="text-purple-800 font-medium">
//                   {
//                     recommendations.additionalInsights.careerProgression.year1
//                       .expectedPackage
//                   }
//                 </p>
//               </div>
//             </div>

//             {/* Year 3 */}
//             <div className="relative z-10 mb-8 pl-8">
//               <div className="absolute left-0 bg-purple-700 rounded-full w-6 h-6 flex items-center justify-center border-4 border-purple-100">
//                 <span className="text-white text-xs font-bold">3</span>
//               </div>
//               <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
//                 <h4 className="text-purple-700 font-medium">
//                   Year 3:{" "}
//                   {
//                     recommendations.additionalInsights.careerProgression.year3
//                       .role
//                   }
//                 </h4>
//                 <p className="text-gray-700 mb-2">
//                   <span className="font-medium">Focus:</span>{" "}
//                   {
//                     recommendations.additionalInsights.careerProgression.year3
//                       .focus
//                   }
//                 </p>
//                 <p className="text-purple-800 font-medium">
//                   {
//                     recommendations.additionalInsights.careerProgression.year3
//                       .expectedPackage
//                   }
//                 </p>
//               </div>
//             </div>

//             {/* Year 5 */}
//             <div className="relative z-10 pl-8">
//               <div className="absolute left-0 bg-purple-800 rounded-full w-6 h-6 flex items-center justify-center border-4 border-purple-100">
//                 <span className="text-white text-xs font-bold">5</span>
//               </div>
//               <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
//                 <h4 className="text-purple-700 font-medium">
//                   Year 5:{" "}
//                   {
//                     recommendations.additionalInsights.careerProgression.year5
//                       .role
//                   }
//                 </h4>
//                 <p className="text-gray-700 mb-2">
//                   <span className="font-medium">Focus:</span>{" "}
//                   {
//                     recommendations.additionalInsights.careerProgression.year5
//                       .focus
//                   }
//                 </p>
//                 <p className="text-purple-800 font-medium">
//                   {
//                     recommendations.additionalInsights.careerProgression.year5
//                       .expectedPackage
//                   }
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Work-Life Balance */}
//         <div>
//           <h3 className="text-purple-800 font-semibold text-lg mb-4 flex items-center">
//             <Heart className="mr-2" /> Work-Life Balance
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 flex flex-col items-center">
//               <Clock className="text-purple-600 mb-2" size={24} />
//               <div className="text-center">
//                 <h4 className="text-purple-700 font-medium text-sm mb-1">
//                   Average Work Hours
//                 </h4>
//                 <p className="text-gray-700">
//                   {
//                     recommendations.additionalInsights.workLifeBalance
//                       .averageWorkHours
//                   }
//                 </p>
//               </div>
//             </div>

//             <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 flex flex-col items-center">
//               <Globe className="text-purple-600 mb-2" size={24} />
//               <div className="text-center">
//                 <h4 className="text-purple-700 font-medium text-sm mb-1">
//                   Remote Opportunities
//                 </h4>
//                 <p className="text-gray-700">
//                   {
//                     recommendations.additionalInsights.workLifeBalance
//                       .remoteOpportunities
//                   }
//                 </p>
//               </div>
//             </div>

//             <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 flex flex-col items-center">
//               <AlertTriangle className="text-purple-600 mb-2" size={24} />
//               <div className="text-center">
//                 <h4 className="text-purple-700 font-medium text-sm mb-1">
//                   Stress Level
//                 </h4>
//                 <p className="text-gray-700">
//                   {
//                     recommendations.additionalInsights.workLifeBalance
//                       .stressLevel
//                   }
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-purple-700 font-medium mb-2">
//               Tips for Balance
//             </h4>
//             <ul className="list-disc list-inside space-y-2 text-gray-700">
//               {recommendations.additionalInsights.workLifeBalance.tips.map(
//                 (tip, index) => (
//                   <li key={index}>{tip}</li>
//                 )
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (isLoading) {
//     return <Loading />;
//   }
//   if (error) {
//     return (
//       <div className="text-red-400 text-center text-3xl">
//         Error fetching Raodmap
//       </div>
//     );
//   }

//   return (
//     <>
//       {recommendations && (
//         <div className="max-w-5xl mx-auto py-8 px-4">
//           <div className="mb-8 text-center">
//             <h1 className="text-4xl font-bold text-purple-800 mb-2">
//               Your Career Recommendations
//             </h1>
//             <p className="text-purple-600 max-w-2xl mx-auto text-lg">
//               Based on your assessment, we've identified the following career
//               paths that align with your skills, interests, and goals.
//             </p>
//           </div>

//           <div>
//             {/* Primary Career Paths */}
//             <div className="mb-10">
//               <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
//                 <Award className="mr-2 text-purple-500" /> Primary Career
//                 Recommendations
//               </h2>

//               {recommendations.primaryCareerPaths.map((career, index) => (
//                 <CareerPathCard
//                   key={index}
//                   careerPath={career}
//                   isExpanded={expandedPrimary === index}
//                   toggleExpanded={() =>
//                     setExpandedPrimary(expandedPrimary === index ? null : index)
//                   }
//                   isPrimary={true}
//                 />
//               ))}
//             </div>

//             {/* Secondary Career Paths */}
//             <div className="mb-10">
//               <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
//                 <Briefcase className="mr-2 text-purple-500" /> Alternative
//                 Career Options
//               </h2>

//               {recommendations.secondaryCareerPaths.map((career, index) => (
//                 <CareerPathCard
//                   key={index}
//                   careerPath={career}
//                   isExpanded={expandedSecondary === index}
//                   toggleExpanded={() =>
//                     setExpandedSecondary(
//                       expandedSecondary === index ? null : index
//                     )
//                   }
//                   isPrimary={false}
//                 />
//               ))}
//             </div>

//             {/* Additional Insights */}
//             <AdditionalInsights />
//           </div>
//         </div>
//       )}
//       {!recommendations && (
//         <div className="text-red-400 text-center text-3xl">
//           No Learning Path Found
//         </div>
//       )}
//     </>
//   );
// };

// export default CareerRecommendations;

"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Book,
  Briefcase,
  TrendingUp,
  Heart,
  Clock,
  Globe,
  AlertTriangle,
  Award,
  Sparkles,
} from "lucide-react";
import { getRoadmap } from "@/firebase/recommendations/read";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import Link from "next/link";

const CareerRecommendations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const user = useSelector((state) => state?.user);

  const recommendations = data;
  const [expandedPrimary, setExpandedPrimary] = useState(0);
  const [expandedSecondary, setExpandedSecondary] = useState(null);
  const [expandedSubfield, setExpandedSubfield] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await getRoadmap({ uid: user?.uid });
        setData(res);
        console.log("res:::", res);
      } catch (error) {
        console.log("error", error);
        toast.error(error.message || "An error occurred");
        setError(
          "Roadmap is not generated. Please generate roadmap from assessment"
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user]);

  const getColorByScore = (score) => {
    const percentage = score * 100;
    if (percentage >= 80) return "bg-purple-500 text-white";
    if (percentage >= 60) return "bg-purple-400 text-white";
    if (percentage >= 40) return "bg-purple-300 text-purple-900";
    return "bg-purple-200 text-purple-900";
  };

  const SkillBadge = ({ skill, technologies, proficiencyLevel }) => (
    <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-sm mb-3">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-purple-800 text-lg">{skill}</span>
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium ${
            proficiencyLevel === "Advanced"
              ? "bg-purple-500 text-white"
              : proficiencyLevel === "Intermediate"
              ? "bg-purple-400 text-white"
              : "bg-purple-200 text-purple-900"
          }`}
        >
          {proficiencyLevel}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {technologies.map((tech, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-sm bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-3 py-1 text-center">
              {tech}
            </span>
            <Link
              href={`/my-courses/create-course?c=${tech}`}
              className="text-purple-600 text-xs mt-1 hover:text-purple-800 underline text-center"
            >
              Create course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  const CareerPathCard = ({
    careerPath,
    isExpanded,
    toggleExpanded,
    isPrimary,
  }) => (
    <div
      className={`mb-6 rounded-2xl shadow-lg border border-purple-200 overflow-hidden ${
        isPrimary ? "bg-purple-50" : "bg-white"
      }`}
    >
      <div
        className={`p-6 cursor-pointer flex justify-between items-center ${
          isPrimary
            ? "bg-purple-600 text-white"
            : "bg-purple-500 text-white"
        }`}
        onClick={toggleExpanded}
      >
        <div className="flex items-center">
          <Briefcase className="mr-3" size={24} />
          <h2 className="text-xl font-semibold">{careerPath.career}</h2>
        </div>
        <div className="flex items-center gap-4">
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${getColorByScore(
              careerPath.matchScore
            )}`}
          >
            {Math.round(careerPath.matchScore * 100)}% Match
          </span>
          {isExpanded ? (
            <ChevronUp size={24} />
          ) : (
            <ChevronDown size={24} />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 bg-white">
          <div className="mb-6">
            <h3 className="text-purple-800 font-semibold text-lg mb-2 flex items-center">
              <Sparkles className="mr-2" /> Why This Matches You
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {careerPath.reasonForMatch}
            </p>
          </div>

          <div className="mb-6 bg-purple-50 p-4 rounded-xl">
            <h3 className="text-purple-800 font-semibold text-lg mb-4 flex items-center">
              <TrendingUp className="mr-2" /> Industry Outlook
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg border border-purple-100">
                <span className="text-purple-600 font-medium block mb-1">
                  Growth Rate
                </span>
                <span className="text-gray-700">
                  {careerPath.industryOutlook.growthRate}
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-100">
                <span className="text-purple-600 font-medium block mb-1">
                  Market Demand
                </span>
                <span className="text-gray-700">
                  {careerPath.industryOutlook.marketDemand}
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-100">
                <span className="text-purple-600 font-medium block mb-1">
                  Future Prospects
                </span>
                <span className="text-gray-700">
                  {careerPath.industryOutlook.futureProspects}
                </span>
              </div>
            </div>
            <h4 className="text-purple-700 font-medium mb-3">Top Recruiters</h4>
            {careerPath.industryOutlook.topRecruiters.map((recruiter, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-lg border border-purple-100 mb-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-purple-600 font-medium">
                    {recruiter.type}
                  </span>
                  <span className="text-purple-800 font-medium">
                    {recruiter.averagePackage}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {recruiter.companies.map((company, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-purple-800 font-semibold text-lg mb-4">
              Specialized Sub-fields
            </h3>
            {careerPath.subFields.map((subfield, index) => (
              <div
                key={index}
                className="border border-purple-200 rounded-xl mb-3 overflow-hidden"
              >
                <div
                  className="bg-purple-100 p-4 flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setExpandedSubfield(
                      expandedSubfield === `${careerPath.career}-${index}`
                        ? null
                        : `${careerPath.career}-${index}`
                    )
                  }
                >
                  <h4 className="font-medium text-purple-900 text-lg">
                    {subfield.name}
                  </h4>
                  {expandedSubfield === `${careerPath.career}-${index}` ? (
                    <ChevronUp size={20} className="text-purple-700" />
                  ) : (
                    <ChevronDown size={20} className="text-purple-700" />
                  )}
                </div>

                {expandedSubfield === `${careerPath.career}-${index}` && (
                  <div className="p-4 bg-white">
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {subfield.description}
                    </p>

                    <div className="mb-4">
                      <h5 className="text-purple-700 font-medium mb-2 flex items-center">
                        <TrendingUp size={16} className="mr-1" /> Current Trends
                      </h5>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {subfield.currentTrends.map((trend, idx) => (
                          <li key={idx}>{trend}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h5 className="text-purple-700 font-medium mb-2">
                        Required Skills
                      </h5>
                      <div className="mb-4">
                        <h6 className="text-purple-600 font-medium mb-2">
                          Technical Skills
                        </h6>
                        {subfield.requiredSkills.technical.map((skill, idx) => (
                          <SkillBadge key={idx} {...skill} />
                        ))}
                      </div>
                      <div>
                        <h6 className="text-purple-600 font-medium mb-2">
                          Soft Skills
                        </h6>
                        <div className="flex flex-wrap gap-2">
                          {subfield.requiredSkills.soft.map((skill, idx) => (
                            <span
                              key={idx}
                              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-purple-700 font-medium mb-2 flex items-center">
                        <Book size={16} className="mr-1" /> Recommended Courses
                      </h5>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {subfield.preparationResources.courses.map(
                          (course, idx) => (
                            <li key={idx}>{course.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const AdditionalInsights = () => (
    <div className="mt-8 bg-white rounded-2xl shadow-lg border border-purple-200 overflow-hidden">
      <div className="p-6 bg-purple-600 text-white">
        <h2 className="text-xl font-semibold flex items-center">
          <Award className="mr-3" /> Additional Career Insights
        </h2>
      </div>
      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-purple-800 font-semibold text-lg mb-4">
            Career Progression
          </h3>
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex items-start gap-4">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-medium">
                1
              </span>
              <div>
                <h4 className="text-purple-700 font-medium text-lg">
                  Year 1: {recommendations.additionalInsights.careerProgression.year1.role}
                </h4>
                <p className="text-gray-600">
                  <span className="font-medium">Focus:</span> {recommendations.additionalInsights.careerProgression.year1.focus}
                </p>
                <p className="text-purple-800 font-medium mt-1">
                  {recommendations.additionalInsights.careerProgression.year1.expectedPackage}
                </p>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex items-start gap-4">
              <span className="bg-purple-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-medium">
                3
              </span>
              <div>
                <h4 className="text-purple-700 font-medium text-lg">
                  Year 3: {recommendations.additionalInsights.careerProgression.year3.role}
                </h4>
                <p className="text-gray-600">
                  <span className="font-medium">Focus:</span> {recommendations.additionalInsights.careerProgression.year3.focus}
                </p>
                <p className="text-purple-800 font-medium mt-1">
                  {recommendations.additionalInsights.careerProgression.year3.expectedPackage}
                </p>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex items-start gap-4">
              <span className="bg-purple-800 text-white rounded-full w-8 h-8 flex items-center justify-center font-medium">
                5
              </span>
              <div>
                <h4 className="text-purple-700 font-medium text-lg">
                  Year 5: {recommendations.additionalInsights.careerProgression.year5.role}
                </h4>
                <p className="text-gray-600">
                  <span className="font-medium">Focus:</span> {recommendations.additionalInsights.careerProgression.year5.focus}
                </p>
                <p className="text-purple-800 font-medium mt-1">
                  {recommendations.additionalInsights.careerProgression.year5.expectedPackage}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-purple-800 font-semibold text-lg mb-4 flex items-center">
            <Heart className="mr-2" /> Work-Life Balance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
              <Clock className="text-purple-600 mx-auto mb-2" size={28} />
              <h4 className="text-purple-700 font-medium text-sm mb-1">
                Average Work Hours
              </h4>
              <p className="text-gray-600">
                {recommendations.additionalInsights.workLifeBalance.averageWorkHours}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
              <Globe className="text-purple-600 mx-auto mb-2" size={28} />
              <h4 className="text-purple-700 font-medium text-sm mb-1">
                Remote Opportunities
              </h4>
              <p className="text-gray-600">
                {recommendations.additionalInsights.workLifeBalance.remoteOpportunities}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
              <AlertTriangle className="text-purple-600 mx-auto mb-2" size={28} />
              <h4 className="text-purple-700 font-medium text-sm mb-1">
                Stress Level
              </h4>
              <p className="text-gray-600">
                {recommendations.additionalInsights.workLifeBalance.stressLevel}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-purple-700 font-medium mb-2">Tips for Balance</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {recommendations.additionalInsights.workLifeBalance.tips.map(
                (tip, index) => (
                  <li key={index}>{tip}</li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return (
      <div className="text-center py-12">
        <AlertTriangle size={48} className="text-red-400 mx-auto mb-4" />
        <p className="text-red-400 text-2xl font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {recommendations ? (
        <>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-purple-800 mb-3">
              Your Career Recommendations
            </h1>
            <p className="text-purple-600 text-lg max-w-2xl mx-auto">
              Based on your assessment, here are career paths tailored to your skills, interests, and goals.
            </p>
          </div>

          <div>
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-purple-800 mb-6 flex items-center">
                <Award className="mr-2 text-purple-600" /> Primary Career Recommendations
              </h2>
              {recommendations.primaryCareerPaths.map((career, index) => (
                <CareerPathCard
                  key={index}
                  careerPath={career}
                  isExpanded={expandedPrimary === index}
                  toggleExpanded={() =>
                    setExpandedPrimary(expandedPrimary === index ? null : index)
                  }
                  isPrimary={true}
                />
              ))}
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-purple-800 mb-6 flex items-center">
                <Briefcase className="mr-2 text-purple-600" /> Alternative Career Options
              </h2>
              {recommendations.secondaryCareerPaths.map((career, index) => (
                <CareerPathCard
                  key={index}
                  careerPath={career}
                  isExpanded={expandedSecondary === index}
                  toggleExpanded={() =>
                    setExpandedSecondary(expandedSecondary === index ? null : index)
                  }
                  isPrimary={false}
                />
              ))}
            </div>

            <AdditionalInsights />
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <AlertTriangle size={48} className="text-red-400 mx-auto mb-4" />
          <p className="text-red-400 text-2xl font-medium">No Learning Path Found</p>
        </div>
      )}
    </div>
  );
};

export default CareerRecommendations;