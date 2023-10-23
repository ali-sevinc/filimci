import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
}

function MainHeader({ children }: PropsType) {
  return (
    <header className=" fixed left-0 top-0 flex w-full flex-col items-center justify-center bg-slate-900 px-16 py-4 font-pacifico text-slate-100 opacity-95 md:justify-between  md:py-8  lg:flex-row ">
      <h1 className="hidden text-5xl lg:block ">Filimci</h1>

      {children}
    </header>
  );
}

export default MainHeader;
