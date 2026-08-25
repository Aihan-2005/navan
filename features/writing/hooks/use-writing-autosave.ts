"use client";


import {
  useEffect,
  useRef,
} from "react";



type Props =
  Readonly<{
    value:
      string;


    onSave:
      (
        value: string,
      ) => void;


    delay?:
      number;
  }>;



export function useWritingAutosave({
  value,

  onSave,

  delay = 1000,

}: Props) {


  const firstRender =
    useRef(true);



  useEffect(
    () => {


      if (
        firstRender.current
      ) {

        firstRender.current =
          false;

        return;

      }



      const timer =
        window.setTimeout(
          () => {

            onSave(
              value,
            );

          },
          delay,
        );



      return () => {

        window.clearTimeout(
          timer,
        );

      };


    },
    [
      value,

      delay,

      onSave,
    ],
  );


}