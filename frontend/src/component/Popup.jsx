import { Link } from "react-router-dom";

const Popup = () => {
  return <div className="fixed w-full h-full bg-transparent top-0 left-0 flex justify-center items-center">
    <div className="flex flex-col h-1/5 w-2/5 bg-white border border-black rounded-lg px-2 py-2">
      <div className="h-full w-full flex flex-col gap-2">
        <p className="text-3xl font-bold">
          Silahkan Login untuk mengakses fitur berikut
        </p>
      </div>
      <div className="flex w-full gap-3">
        <Link
          to={"/login"}
          className="flex justify-center items-center ml-auto w-40 h-14 bg-green-500 hover:bg-green-400 rounded-md font-bold text-white "
        >
          Buat
        </Link>
      <div className="flex justify-center items-center w-40 h-14 bg-red-500 hover:bg-red-400  rounded-md font-bold text-white">
          Cancel
        </div>
      </div>
    </div>
  </div>
};

export default Popup;
