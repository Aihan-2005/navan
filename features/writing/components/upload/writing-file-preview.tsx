import {
  FileText,
} from "lucide-react";



type Props = {
  file:
    File | null;
};



export function WritingFilePreview({
  file,
}: Props) {


  if (!file) {

    return null;

  }



  return (

    <div
      dir="rtl"
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
      "
    >

      <FileText
        className="
          h-6
          w-6
          text-cyan-500
        "
      />


      <div>

        <p
          className="
            font-semibold
            text-slate-800
          "
        >
          {file.name}
        </p>


        <p
          className="
            text-xs
            text-slate-500
          "
        >
          {
            Math.round(
              file.size / 1024
            )
          }
          KB
        </p>


      </div>


    </div>

  );

}