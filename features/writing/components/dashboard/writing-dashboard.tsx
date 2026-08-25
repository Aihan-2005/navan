import {
  WritingExercisesGrid,
} from "../overview";

import {
  RecentWritingList,
} from "../overview";


export default function WritingDashboard() {

  return (

    <main
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
          max-w-[928px]
        "
      >


        <header
          className="
            mb-8
          "
        >

          <h1
            className="
              text-[30px]
              font-bold
              leading-9
              text-[#111827]
            "
          >
            داشبورد نوشتن
          </h1>


          <p
            className="
              mt-2
              text-[16px]
              leading-6
              text-[#6B7280]
            "
          >
            خلاصه وضعیت و تمرین‌های اخیر شما
          </p>


        </header>



        <section
          className="
            grid
            grid-cols-12
            gap-6
          "
        >


          <div
            className="
              col-span-12
              lg:col-span-5
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

              <h2
                className="
                  text-[18px]
                  font-bold
                  text-[#111827]
                "
              >
                نقاط ضعف نوشتاری
              </h2>


              <p
                className="
                  mt-2
                  text-[14px]
                  text-[#6B7280]
                "
              >
                حوزه‌هایی که برای رشد بیشتر ارزش دارند.
              </p>


              <div
                className="
                  mt-6
                  space-y-4
                "
              >

                <div
                  className="
                    rounded-[16px]
                    border
                    border-[#EBEFF3]
                    bg-[#F7F9FB]
                    p-4
                  "
                >

                  <h3
                    className="
                      text-[16px]
                      font-bold
                    "
                  >
                    استفاده از زمان‌های ساده
                  </h3>


                  <span
                    className="
                      mt-3
                      inline-flex
                      rounded-full
                      bg-[#DBEAFE]
                      px-3
                      py-1
                      text-[12px]
                      text-[#1D4ED8]
                    "
                  >
                    متوسط
                  </span>


                  <p
                    className="
                      mt-3
                      text-[14px]
                      leading-[22px]
                      text-[#4B5563]
                    "
                  >
                    در چند نوشته، زمان‌های پیچیده‌تر می‌توانستند واضح‌تر باشند.
                  </p>


                </div>


              </div>


            </div>


          </div>



          <div
            className="
              col-span-12
              lg:col-span-7
            "
          >

            <RecentWritingList />

          </div>



        </section>


        <div
          className="
            mt-8
          "
        >

          <WritingExercisesGrid />

        </div>


      </div>


    </main>

  );
}