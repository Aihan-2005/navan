// import Link from "next/link";

// import {
//   ArrowRight,
//   FileText,
// } from "lucide-react";

// import type {
//   RecentWriting,
// } from "../../types/writing.types";

// import {
//   AnalysisScoreOverview,
// } from "./analysis-score-overview";

// import {
//   ImprovedVersionPanel,
// } from "./improved-version-panel";

// import {
//   RepetitionAnalysis,
// } from "./repetition-analysis";

// import {
//   VocabularyUpgrades,
// } from "./vocabulary-upgrades";

// import {
//   WritingActionPlan,
// } from "./writing-action-plan";

// import {
//   WritingAiDiagnosisPanel,
// } from "./writing-ai-diagnosis-panel";

// import {
//   WritingIssueList,
// } from "./writing-issue-list";

// type WritingAnalysisViewProps =
//   Readonly<{
//     submission:
//       RecentWriting;
//   }>;

// export function WritingAnalysisView({
//   submission,
// }: WritingAnalysisViewProps) {
//   const analysis =
//     submission.analysis;

//   return (
//     <main
//       className="
//         mx-auto
//         w-full
//         max-w-7xl
//         space-y-6
//       "
//       dir="rtl"
//     >
//       <Link
//         href="/writing"
//         className="
//           inline-flex
//           items-center
//           gap-2
//           text-sm
//           text-slate-400
//           transition
//           hover:text-white
//         "
//       >
//         <ArrowRight
//           aria-hidden="true"
//           className="h-4 w-4"
//         />

//         بازگشت به Writing
//       </Link>

//       <section
//         className="
//           relative
//           overflow-hidden
//           rounded-3xl
//           border
//           border-cyan-400/15
//           bg-slate-950/60
//           p-6
//           sm:p-8
//         "
//       >
//         <div
//           aria-hidden="true"
//           className="
//             pointer-events-none
//             absolute
//             -left-20
//             -top-20
//             h-60
//             w-60
//             rounded-full
//             bg-cyan-500/10
//             blur-3xl
//           "
//         />

//         <div className="relative">
//           <div
//             className="
//               flex
//               flex-wrap
//               items-center
//               gap-2
//             "
//           >
//             <span
//               className="
//                 inline-flex
//                 items-center
//                 gap-1.5
//                 rounded-full
//                 bg-cyan-400/10
//                 px-3
//                 py-1
//                 text-xs
//                 text-cyan-300
//               "
//             >
//               <FileText
//                 aria-hidden="true"
//                 className="h-3.5 w-3.5"
//               />

//               تحلیل نوشته
//             </span>

//             {analysis.engine ? (
//               <span
//                 className="
//                   rounded-full
//                   bg-violet-400/[0.07]
//                   px-3
//                   py-1
//                   text-xs
//                   text-violet-300
//                 "
//               >
//                 {analysis.engine ===
//                 "ai"
//                   ? "AI Analysis"
//                   : "Mock Analysis"}
//               </span>
//             ) : null}
//           </div>

//           <h1
//             className="
//               mt-5
//               text-2xl
//               font-bold
//               text-white
//               sm:text-3xl
//             "
//           >
//             {submission.title}
//           </h1>

//           <p
//             className="
//               mt-4
//               max-w-4xl
//               text-sm
//               leading-8
//               text-slate-400
//             "
//           >
//             {submission.excerpt}
//           </p>
//         </div>
//       </section>

//       <AnalysisScoreOverview
//         analysis={
//           analysis
//         }
//         date={
//           submission.date
//         }
//       />

//       <WritingAiDiagnosisPanel
//         analysis={
//           analysis
//         }
//       />

//       <section
//         className="
//           grid
//           gap-6
//           xl:grid-cols-[1.1fr_0.9fr]
//         "
//       >
//         <WritingIssueList
//           analysis={
//             analysis
//           }
//         />

//         <div className="space-y-6">
//           <RepetitionAnalysis
//             analysis={
//               analysis
//             }
//           />

//           <VocabularyUpgrades
//             analysis={
//               analysis
//             }

//           />

//           <ImprovedVersionPanel
//             analysis={
//               analysis
//             }
//           />

//           <WritingActionPlan
//             analysis={
//               analysis
//             }
//           />
//         </div>
//       </section>

//       <div
//         className="
//           flex
//           flex-wrap
//           gap-3
//         "
//       >
//         <Link
//           href="/writing/history"
//           className="
//             inline-flex
//             items-center
//             justify-center
//             rounded-2xl
//             border
//             border-cyan-300/20
//             bg-cyan-400/10
//             px-4
//             py-3
//             text-sm
//             font-semibold
//             text-cyan-200
//             transition
//             hover:bg-cyan-400/15
//           "
//         >
//           بازگشت به تاریخچه
//         </Link>

//         <Link
//           href="/writing"
//           className="
//             inline-flex
//             items-center
//             justify-center
//             rounded-2xl
//             border
//             border-white/10
//             bg-white/5
//             px-4
//             py-3
//             text-sm
//             font-semibold
//             text-slate-100
//             transition
//             hover:bg-white/10
//           "
//         >
//           نوشته جدید
//         </Link>
//       </div>
//     </main>
//   );
// }


import {
  WritingAiDiagnosisPanel,
} from "./writing-ai-diagnosis-panel";


export function WritingAnalysisView() {


  return (

    <section
      dir="rtl"
      className="
        min-h-screen
        bg-[#F7F9FB]
        px-6
        py-8
        font-vazir
      "
    >

      <div
        className="
          mx-auto
          max-w-[936px]
          space-y-6
        "
      >


        <div
          className="
            rounded-[24px]
            border
            border-[#EBEFF3]
            bg-white
            p-6
          "
        >

          <h1
            className="
              text-[30px]
              font-bold
              text-[#111827]
            "
          >
            تحلیل نوشته
          </h1>


          <p
            className="
              mt-2
              text-[16px]
              text-[#64748B]
            "
          >
            بازخورد هوش مصنوعی برای بهبود کیفیت متن شما
          </p>


        </div>



        <WritingAiDiagnosisPanel />


      </div>


    </section>

  );
}