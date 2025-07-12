import { ReactNode } from "react";
import Navbar from "../component/Navbar";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
