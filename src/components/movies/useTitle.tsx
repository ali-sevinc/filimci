import { useEffect } from "react";

function useTitle({ title }: { title: string | undefined }) {
  useEffect(
    function () {
      if (!title) return;
      document.title = "Filimci | " + title;
      //   console.log("Title Changed.");
      return () => {
        document.title = "Filimci | React + TS";
        // console.log("Title Cleaned.");
      };
    },
    [title],
  );
  return;
}

export default useTitle;
