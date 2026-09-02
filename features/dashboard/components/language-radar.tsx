type LanguageRadarProps = {
  listening: number;
  speaking: number;
  writing: number;
  vocabulary: number;
};


export function LanguageRadar({
  listening,
  speaking,
  writing,
  vocabulary,
}: LanguageRadarProps){

  const skills = [
    {
      title:"شنیداری",
      value:listening,
    },
    {
      title:"مکالمه",
      value:speaking,
    },
    {
      title:"نوشتاری",
      value:writing,
    },
    {
      title:"واژگان",
      value:vocabulary,
    },
  ];


  return (
    <section
      dir="rtl"
      className="
        rounded-3xl
        border
        border-[#BCC9C6]
        bg-white
        p-6
      "
    >

      <h2
        className="
          text-sm
          font-bold
          text-[#191C1E]
        "
      >
        پراکنش مهارت‌های زبانی
      </h2>



      <div
        className="
          mt-8
          flex
          flex-col
          items-center
        "
      >

        <div
          className="
            flex
            h-56
            w-56
            items-center
            justify-center
            rounded-full
            border-2
            border-[#00A896]
            bg-[#00A89622]
          "
        >

          <div
            className="
              flex
              h-32
              w-32
              items-center
              justify-center
              rounded-full
              bg-white
              text-center
            "
          >

            <span
              className="
                text-xs
                font-bold
                text-[#00A896]
              "
            >
              وضعیت
              <br/>
              کنونی شما
            </span>

          </div>


        </div>



        <div
          className="
            mt-6
            grid
            w-full
            grid-cols-2
            gap-3
          "
        >

          {skills.map(skill=>(
            <div
              key={skill.title}
              className="
                flex
                items-center
                justify-between
                text-xs
              "
            >

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#00A896]
                "
              />

              <span>
                {skill.title}
              </span>


              <strong>
                {skill.value}٪
              </strong>


            </div>
          ))}

        </div>


      </div>

    </section>
  );
}