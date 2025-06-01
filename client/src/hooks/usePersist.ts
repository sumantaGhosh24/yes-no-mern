import {useState, useEffect, Dispatch, SetStateAction} from "react";

const usePersist = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [persist, setPersist] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("persist") || (false as any))
  );

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};

export default usePersist;
