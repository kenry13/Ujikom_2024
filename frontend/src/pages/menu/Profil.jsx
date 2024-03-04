import { useEffect, useState } from "react";
import { useContext } from "react";
import DataContext from "../../function/Context";
import configaxios from "../../function/configaxios";
import { Link, useNavigate } from "react-router-dom";
import LayoutPage from "../../layout/LayoutPage";

const Profil = () => {
  const { user, setUser, userFunction } = useContext(DataContext);
  const [activeContent, setActiveContent] = useState("Foto");
  const [albums, setAlbums] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [defaultPhotoUrl, setDefaultPhotoUrl] = useState("/albums.png");
  const navigate = useNavigate();

  const handleClick = (content) => {
    setActiveContent(content);
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

  const logout = () => {
    const confirmation = window.confirm("Yakin ingin keluar?");
    if (!confirmation) {
      return;
    }
    userFunction.remove(setUser);

    try {
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  function bagi4(fotos) {
    const hasil = [[], [], [], []];
    let index = 0;
    let loop = 1;
    fotos.map((foto) => {
      hasil[index].push(foto);
      index = index == 3 ? 0 : index + 1;
      loop++;
    });
    return hasil;
  }

  return (
    <LayoutPage>
      <div className="flex flex-col w-full justify-start items-center py-5 px-10 gap-5">
        <div className="flex w-full gap-5">
          <img
            width="100"
            height="100"
            src="user.png"
            alt="user"
            className="rounded-full w-52 h-52 shadow-lg shadow-black ring-4 ring-black"
          />
          <div className="flex flex-col w-1/3 mt-auto">
            <h4 className="font-bold text-xl">{user.username}</h4>
          </div>
          <div className="flex flex-col max-w-full lg:w-full gap-5">
              <div
                onClick={logout}
                className="flex max-w-full cursor-pointer justify-start ml-auto"
              >
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios/50/exit.png"
                  alt="keluar"
                />
            </div>
            <div className="flex items-center justify-center gap-5">
              <div className="flex flex-col">
                <div className="text-center text-xl">{fotos.length}</div>
                <div className="font-inter font-extrabold text-xl">Foto</div>
              </div>
              <div className="flex flex-col">
                <div className="text-center text-xl">{albums.length}</div>
                <div className="font-inter font-extrabold text-xl">Album</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full">
        <div className="flex flex-col w-full h-full rounded-lg ring-2 ring-slate-100">
          <div className="flex justify-center h-14 rounded-t-lg ring-2 ring-slate-100">
            <div className="flex justify-center items-center w-full h-full text-center">
              <div
                className={`flex justify-center items-center w-20 h-full cursor-pointer font-bold hover:bg-slate-100 transition duration-300 ease-in-out ${
                  activeContent === "Foto" ? "border-b-2 border-black" : ""
                }`}
                onClick={() => handleClick("Foto")}
              >
                Foto
              </div>
            </div>
            <div className="flex justify-center items-center w-full h-full text-center">
              <div
                className={`flex justify-center items-center w-20 h-full cursor-pointer font-bold hover:bg-slate-100 transition duration-300 ease-in-out ${
                  activeContent === "Album" ? "border-b-2 border-black" : ""
                }`}
                onClick={() => handleClick("Album")}
              >
                Album
              </div>
            </div>
          </div>
          <div className="w-full h-full py-2 px-4">
            {activeContent === "Foto" ? (
              <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3">
                {bagi4(fotos).map((fotos, index) => (
                  <div
                    className="grid grid-flow-row auto-rows-max gap-2"
                    key={index}
                  >
                    {fotos.map((foto, i) => (
                      <Link
                        to={`/foto/${foto.id_foto}`}
                        key={i}
                        className="w-full h-max flex flex-col relative items-start justify-end transition-all duration-300 cursor-pointer border px-2 py-2"
                      >
                        <img
                          src={foto.url}
                          alt=""
                          className="rounded-xl h-max object-cover"
                        />
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 h-full py-5">
                {albums.map((album, i) => (
                  <Link
                    to={`/album/${album.id_album}`}
                    key={i}
                    className="flex flex-col gap-3 items-start h-max"
                  >
                    <img
                      src={
                        album.fotos.length > 0
                          ? album.fotos[0].url
                          : defaultPhotoUrl
                      }
                      alt=""
                      className="rounded-xl h-52 w-52 object-cover border-2"
                    />
                    <p className="font-inter font-extrabold text-sm mt-1">
                      {album.nama_album}
                    </p>
                    <p className="text-xs font-inter text-secondary/70">
                      {album.deskripsi}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default Profil;
