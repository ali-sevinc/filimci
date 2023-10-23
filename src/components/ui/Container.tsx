import { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full min-w-[22rem] rounded-md bg-slate-900 pb-2 text-white">
      {children}
    </div>
  );
}

export default Container;
