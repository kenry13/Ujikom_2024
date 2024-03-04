import { Link } from "react-router-dom";

const NavDetail = () => {
  return (
    <div className="flex relative shadow-md gap-5 w-screen p-5 overflow-y-hidden overflow-x-hidden">
      <h4 className="flex font-inter font-extrabold justify-center items-center sm:text-4xl text-2xl">
        Your Lens
      </h4>
      <div className="flex justify-center items-end ml-auto">
      <Link
          to={"/home"}
          className={
            "flex items-center w-full text-black font-bold py-2 px-4 rounded-lg hover:bg-cyan-100 hover:text-cyan-600 transition duration-300 ease-in-out"
          }
        >
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/material-outlined/24/home--v2.png"
            alt="beranda"
          />
          <span className="ml-2 text-lg">Beranda</span>
        </Link>

        {/* Link "Jelajahi" */}
        <Link
          to={"/explore"}
          className={
            "flex items-center w-full text-black font-bold py-2 px-4 rounded-lg hover:bg-cyan-100 hover:text-cyan-600 transition duration-300 ease-in-out"
          }
        >
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios/50/search.png"
            alt="jelajahi"
          />
          <span className="ml-2 text-lg">Jelajahi</span>
        </Link>

        {/* Link "Profil" */}
        <Link
          to={"/profile"}
          className={
            "flex items-center w-full text-black font-bold py-2 px-4 rounded-lg hover:bg-cyan-100 hover:text-cyan-600 transition duration-300 ease-in-out"
          }
        >
          <img
            width="30"
            height="30"
            src="/user.png"
            className="rounded-full w-7 h-7 object-cover ring-1 ring-black"
            alt="profil"
          />
          <span className="ml-2 text-lg">Profil</span>
        </Link>
      </div>
    </div>
  );
};

export default NavDetail;
