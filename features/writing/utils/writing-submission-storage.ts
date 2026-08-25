import type {
  RecentWriting,
} from "../types/writing.types";



const STORAGE_KEY =
  "writing-submissions";



export function saveWritingSubmission(
  submission: RecentWriting,
): boolean {

  if (
    typeof window === "undefined"
  ) {
    return false;
  }


  try {

    const current =
      readAll();


    const updated =
      [
        submission,
        ...current.filter(
          item =>
            item.id !== submission.id,
        ),
      ];



    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated),
    );


    return true;


  } catch {

    return false;

  }

}



export function readWritingSubmission(
  id: string,
): RecentWriting | null {


  const submissions =
    readAll();



  return (
    submissions.find(
      item =>
        item.id === id,
    )
    ??
    null
  );

}



function readAll(): RecentWriting[] {

  if (
    typeof window === "undefined"
  ) {
    return [];
  }


  try {

    const value =
      localStorage.getItem(
        STORAGE_KEY,
      );


    if (!value) {
      return [];
    }


    const parsed =
      JSON.parse(value);



    if (
      !Array.isArray(parsed)
    ) {
      return [];
    }


    return parsed;


  } catch {

    return [];

  }

}