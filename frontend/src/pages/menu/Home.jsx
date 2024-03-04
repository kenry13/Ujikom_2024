import React, { useEffect, useState } from "react";
import LayoutPage from "../../layout/LayoutPage";
import { Link } from "react-router-dom";
import configaxios from "../../function/configaxios";

const Home = () => {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await configaxios.get("/fotos");
      setFotos(response.data.data);
    };

    fetchData();
  }, []);

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
                <p className="sm-semibold">{foto.user.username}</p>
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
    </LayoutPage>
  );
};

export default Home;
