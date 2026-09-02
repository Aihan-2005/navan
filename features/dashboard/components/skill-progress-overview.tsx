type SkillVariant =
  | "listening"
  | "speaking"
  | "writing"
  | "vocabulary";


type SkillItem = {

  title: string;

  score: number;

  status: string;

  variant: SkillVariant;

};



type SkillProgressOverviewProps = {

  skills?: readonly SkillItem[];

};



const defaultSkills: readonly SkillItem[] = [

  {
    title:"شنیداری (Listening)",
    score:88,
    status:"عالی - در حد پیشرفته",
    variant:"listening",
  },


  {
    title:"گفتاری (Speaking)",
    score:62,
    status:"نیاز به تمرین بیشتر",
    variant:"speaking",
  },


  {
    title:"نوشتاری (Writing)",
    score:91,
    status:"خوب - در حال رشد",
    variant:"writing",
  },


  {
    title:"واژگان (Vocabulary)",
    score:95,
    status:"ممتاز - فراتر از هدف",
    variant:"vocabulary",
  },

];



const styles: Record<
  SkillVariant,
  {
    box:string;
    score:string;
  }
> = {


  listening:{

    box:
      "bg-[#EAFFFD] border-[#DFF0EC]",

    score:
      "text-[#14B8A6]",

  },


  speaking:{

    box:
      "bg-[#E2EDFF] border-[#DFF0EC]",

    score:
      "text-[#4285F4]",

  },


  writing:{

    box:
      "bg-[#F8F3FF] border-[#E6D7FF]",

    score:
      "text-[#5A00C6]",

  },


  vocabulary:{

    box:
      "bg-[#FFEFE4] border-[#FFEFE4]",

    score:
      "text-[#F97316]",

  },

};





function SkillCard({

  item,

}:{

  item:SkillItem;

}){


  const style =
    styles[item.variant] ?? styles.listening;



  return (

    <div

      className={`
        rounded-2xl
        border
        p-4
        ${style.box}
      `}

    >


      <div

        className="
          flex
          items-center
          justify-between
        "

      >


        <span

          className="
            text-base
            font-bold
            text-[#191C1E]
          "

        >

          {item.score}٪

        </span>



        <span

          className={`
            text-base
            font-bold
            ${style.score}
          `}

        >

          ●

        </span>


      </div>




      <h3

        className="
          mt-2
          text-sm
          font-bold
          text-[#191C1E]
        "

      >

        {item.title}

      </h3>




      <p

        className="
          mt-2
          text-[10px]
          text-[#3D4947]
        "

      >

        {item.status}

      </p>


    </div>

  );

}





export function SkillProgressOverview({

  skills = defaultSkills,

}:SkillProgressOverviewProps){



  return (

    <section

      dir="rtl"

      className="
        rounded-2xl
        border
        border-[#BCC9C6]
        bg-[#FFFFFFCC]
        p-8
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
        backdrop-blur-xl
      "

    >



      <h2

        className="
          text-base
          font-bold
          text-[#191C1E]
        "

      >

        تحلیل مهارت‌ها

      </h2>





      <div

        className="
          mt-6
          grid
          grid-cols-2
          gap-4
        "

      >


        {
          skills.map((skill,index)=>(

            <SkillCard

              key={`${skill.title}-${index}`}

              item={skill}

            />

          ))
        }


      </div>



    </section>

  );

}