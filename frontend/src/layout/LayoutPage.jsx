import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const LayoutPage = ({ children }) => {
  const [kondisi, setkondisi] = useState(true);

  const toggle = () => {
    setkondisi(!kondisi);
  };

  return (
    <div className="flex flex-col items-center">
      <Navbar setkondisi={setkondisi} />
      <div className="w-full h-screen p-5 ">
        {children}
      </div>
      {kondisi ? <Footer /> : ""}
    </div>
  );
};

export default LayoutPage;
