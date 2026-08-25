"use client";


import {
  UploadCloud,
} from "lucide-react";


type Props = {
  onUpload?: (
    file: File,
  ) => void;
};



export function WritingUploadBox({
  onUpload,
}: Props) {


  function handleChange(
    event:
      React.ChangeEvent<HTMLInputElement>,
  ) {


    const file =
      event.target.files?.[0];


    if (
      file &&
      onUpload
    ) {

      onUpload(file);

    }

  }



  return (

    <label
      dir="rtl"
      className="
        flex
        cursor-pointer
        flex-col
        items-center
        justify-center
        gap-4
        rounded-3xl
        border
        border-dashed
        border-slate-300
        bg-white
        p-10
        transition
        hover:border-cyan-400
      "
    >

      <UploadCloud
        className="
          h-10
          w-10
          text-cyan-500
        "
      />


      <div
        className="
          text-center
        "
      >

        <p
          className="
            font-bold
            text-slate-800
          "
        >
          فایل Writing را آپلود کنید
        </p>


        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          PDF یا DOCX
        </p>

      </div>


      <input
        hidden
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={
          handleChange
        }
      />


    </label>

  );

}