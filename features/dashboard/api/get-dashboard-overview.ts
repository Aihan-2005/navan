import type {
  DashboardOverview,
} from "../types/dashboard.types";


export async function getDashboardOverview():
Promise<DashboardOverview> {

  return {
    user: {
      name: "نازی",
      cefrLevel: "B1",
    },


    continueLearning: {
      title:
        "مکالمه در محیط کار - بخش ۳",

      subtitle:
        "گرامر: حال کامل استمراری",

      remainingMinutes: 12,
    },


    summary: {
      completedExercises: 3,
      totalExercises: 6,
      xp: 150,
    },


    skillProgress: [
      {
        id: "listening",
        title: "شنیداری (Listening)",
        score: 88,
        status:
          "عالی - در حد پیشرفته",
      },

      {
        id: "speaking",
        title: "گفتاری (Speaking)",
        score: 62,
        status:
          "نیاز به تمرین بیشتر",
      },

      {
        id: "writing",
        title: "نوشتاری (Writing)",
        score: 91,
        status:
          "خوب - در حال رشد",
      },

      {
        id: "vocabulary",
        title: "واژگان (Vocabulary)",
        score: 95,
        status:
          "ممتاز - فراتر از هدف",
      },
    ],


    dailyPlan: [
      {
        id: "vocabulary-review",
        title:
          "مرور واژگان سفر",

        duration:
          "۱۰ دقیقه",

        reward:
          "+۳۰ امتیاز",

        completed: true,
      },

      {
        id: "dialog",
        title:
          "دیالوگ‌های روزمره",

        duration:
          "۸ دقیقه",

        reward:
          "+۲۰ امتیاز",

        completed: false,
      },

      {
        id: "grammar",
        title:
          "زمان افعال: گذشته دور",

        duration:
          "۱۲ دقیقه",

        reward:
          "+۴۰ امتیاز",

        completed: false,
      },

      {
        id: "writing",
        title:
          "تمرین حروف اضافه",

        duration:
          "۵ دقیقه",

        reward:
          "+۱۵ امتیاز",

        completed: false,
      },
    ],


    recentActivities: [
      {
        id: "1",
        title:
          "آزمون جامع سطح B1",

        date:
          "دیروز - ۸۵/۱۰۰",

        score:
          "85",
      },

      {
        id: "2",
        title:
          "تمرین لغات رستوران",

        date:
          "۳ روز پیش - ۱۰۰٪ درست",
      },
    ],
  };
}