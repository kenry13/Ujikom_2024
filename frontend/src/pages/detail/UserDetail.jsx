import { Link, useParams } from "react-router-dom";
import LayoutPage from "../../layout/LayoutPage";
import configaxios from "../../function/ConfigAxios.js";
import { useEffect, useState } from "react";

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const { id_user } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await configaxios.get(`/user/${id_user}`);
        setUser(response.data.data);
        setFotos(response.data.data.fotos);
      } catch (error) {
        console.error("Failed to fetch user details:", error.message);
      }
    };

    fetchData();
  }, [id_user]);

  if (!user) {
    return (
      <LayoutPage>
        <div>Loading...</div>
      </LayoutPage>
    );
  }

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
          {/* <img
              width="100"
              height="100"
              src="me.png"
              alt="user"
              className="rounded-full lg:w-52 lg:h-52 w-32 h-32 object-cover shadow-lg shadow-black ring-4 ring-white"
            /> */}
          <img
            width="80"
            height="80"
            src="https://img.icons8.com/ultraviolet/40/user.png"
            alt="user"
            className="rounded-full w-52 h-52 object-cover shadow-lg shadow-black ring-4 ring-white"
          />
          <div className="flex flex-col w-1/3 mt-auto">
            <h4 className="font-bold text-xl">{user.username}</h4>
            {/* <h4>Kaneka Raya</h4> */}
          </div>
          <div className="flex flex-col justify-center max-w-full lg:w-full gap-5">
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
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3">
          {bagi4(fotos).map((fotos, index) => (
            <div className="grid grid-flow-row auto-rows-max gap-2" key={index}>
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
      </div>
    </LayoutPage>
  );
};

export default UserDetail;
