import { useEffect, useState } from "react";
import LayoutPage from "../../layout/LayoutPage";
import configaxios from "../../function/ConfigAxios.js";
import { Link } from "react-router-dom";

const Jelejahi = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResultsUsers, setSearchResults] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [fotos, setFotos] = useState([]);

  const SearchUser = async () => {
    try {
      const response = await configaxios.get(
        `/users/search?keyword=${keyword}`
      );
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Failed to search users:", error.message);
    }
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await configaxios.get("/album");
        setAlbums(response.data.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    const fetchFotos = async () => {
      try {
        const response = await configaxios.get("/foto");
        setFotos(response.data.data);
      } catch (error) {
        console.log("Error fetching foto", error);
      }
    };

    fetchFotos();
    fetchAlbums();
  }, []);

  return (
    <LayoutPage>
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <div className="flex w-1/4  rounded-full border-2 p-3 border-slate-500">
          <input
            type="text"
            placeholder="Cari Pengguna"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pl-3 pr-3 w-full rounded-full"
          />
          <button
            onClick={SearchUser}
            className="flex max-w-max ml-auto cursor-pointer rounded-full"
          >
            <img src="search.png" alt="search" width="50" height="50" />
          </button>
        </div>

        {searchResultsUsers.map((user, i) => (
          <Link
            key={i}
            to={`/user/${user.id_user}`}
            className="flex border-2 rounded-lg w-1/3 p-3"
          >
            <div className="flex flex-col">
              <div className="font-bold text-2xl">{user.username}</div>
              <p className="text-sm font-semibold text-slate-600/60">
                {user.email}
              </p>
            </div>
            <div className="flex justify-end items-center w-full gap-3">
              <div className="flex flex-col">
                <div className="text-center text-xl">{user.fotos.length}</div>
                <div className="text-sm font-semibold text-slate-600/60">
                  Foto
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-center text-xl">{user.albums.length}</div>
                <div className="text-sm font-semibold text-slate-600/60">
                  Album
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </LayoutPage>
  );
};

export default Jelejahi;
