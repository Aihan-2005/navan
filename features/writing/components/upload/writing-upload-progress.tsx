type Props = {
  progress:
    number;
};



export function WritingUploadProgress({
  progress,
}: Props) {


  return (

    <div
      dir="rtl"
      className="
        space-y-2
      "
    >

      <div
        className="
          flex
          justify-between
          text-sm
          text-slate-600
        "
      >

        <span>
          آپلود
        </span>


        <span>
          {progress}%
        </span>

      </div>


      <div
        className="
          h-2
          overflow-hidden
          rounded-full
          bg-slate-200
        "
      >

        <div
          className="
            h-full
            rounded-full
            bg-cyan-500
          "
          style={{
            width:
              `${progress}%`,
          }}
        />

      </div>


    </div>

  );

}