import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import configaxios from "../function/ConfigAxios.js";

const Footer = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLeftIcon, setShowLeftIcon] = useState(false);
  const [albums, setAlbums] = useState([]);
  const dropdownRef = useRef(null);
  const addButtonRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        addButtonRef.current &&
        !addButtonRef.current.contains(event.target)
      ) {
        setAddButton(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await configaxios.get("/album");
        setAlbums(response.data.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  const sortedAlbums = albums.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const limitedAlbums = sortedAlbums.slice(0, 3);

  return (
    <footer className="flex justify-center items-center w-full fixed bottom-4 gap-10">
      <div className="flex px-1 py-1 max-w-max relative rounded-full border border-black bg-white">
        {/* Link "Beranda" */}
        <Link
          to={"/home"}
          className={
            "flex items-center w-full text-black font-bold py-2 px-4 rounded-l-full hover:bg-cyan-100 hover:text-cyan-600 transition duration-300 ease-in-out"
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
            "flex items-center w-full text-black font-bold py-2 px-4 hover:bg-cyan-100 hover:text-cyan-600 transition duration-300 ease-in-out"
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
            "flex items-center w-full text-black font-bold py-2 px-4 hover:bg-cyan-100 hover:text-cyan-600 transition duration-300 ease-in-out"
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

        {/* Hide Menu */}
        {showLeftIcon && (
          <>
            <div className="py-2">
              <hr className="h-full border border-black" />
            </div>
            <Link
              to={"/like"}
              className={
                "flex items-center w-full text-black font-bold py-2 px-4 hover:bg-cyan-100 hover:text-cyan-600 transition duration-300 ease-in-out"
              }
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios/50/like--v1.png"
                alt="like"
              />
              <span className="ml-2 text-lg">Suka</span>
            </Link>

            <div
              className={`absolute z-10 bg-white rounded-lg mt-2 shadow-lg overflow-hidden transition-transform transform origin-top right-0 bottom-12 ${
                dropdownOpen ? "translate-y-0" : "translate-y-full"
              }`}
            >
              {dropdownOpen && (
                <>
                  <Link
                    to="/album"
                    className="block py-2 px-4 text-black hover:bg-gray-200 transition duration-300 ease-in-out"
                  >
                    Tampilkan Lebih Banyak
                  </Link>
                  {limitedAlbums.map((album, i) => (
                    <Link to={`/album/${album.id_album}`} key={i}>
                      <p className="block py-2 px-4 text-black hover:bg-gray-200 transition duration-300 ease-in-out">
                        {album.nama_album}
                      </p>
                    </Link>
                  ))}
                </>
              )}
            </div>
            <div
              className="flex items-center w-full rounded-r-full text-black font-bold py-2 px-4 hover:bg-cyan-100 hover:text-cyan-600 transition duration-300 ease-in-out cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/badges/48/photo-album.png"
                alt="album"
              />
              <span className="ml-2 text-lg">Album</span>
            </div>
          </>
        )}

        {/* Togle  menu */}
        {showLeftIcon ? (
          <img
            src="/left.png"
            alt="show less"
            width="40"
            className="cursor-pointer rounded-full"
            onClick={() => setShowLeftIcon(false)}
          />
        ) : (
          <img
            src="/right.png"
            alt="show more"
            width="40"
            className="cursor-pointer rounded-full"
            onClick={() => setShowLeftIcon(true)}
          />
        )}
      </div>
    </footer>
  );
};

export default Footer;
