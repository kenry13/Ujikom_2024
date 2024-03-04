import React, { useEffect, useState } from "react";
import LayoutPage from "../../layout/LayoutPage";
import configaxios from "../../function/configaxios";

const Suka = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await configaxios.get("/like");
        setLikes(response.data.data);
      } catch (error) {
        console.error("Failed to fetch likes:", error.message);
      }
    };

    fetchLikes();
  }, []);

  function bagi4(likes) {
    const hasil = [[], [], [], []];
    let index = 0;
    let loop = 1;
    likes.map((like) => {
      hasil[index].push(like);
      index = index === 3 ? 0 : index + 1;
      loop++;
    });
    return hasil;
  }

  const likePhoto = async (fotoId) => {
    try {
      await configaxios.post("/like", { foto_id: fotoId });
      setLikes((prevLikes) => [
        ...prevLikes,
        {
          id_like: Date.now(),
          foto: { id_foto: fotoId },
          user: { username: "You" },
        },
      ]);
    } catch (error) {
      console.error("Failed to like photo:", error.message);
    }
  };

  const unlikePhoto = async (likeId, fotoId) => {
    try {
      await configaxios.delete(`/like/${likeId}`);
      // Hapus like dari daftar likes lokal berdasarkan ID foto
      setLikes((prevLikes) =>
        prevLikes.filter((like) => like.foto.id_foto !== fotoId)
      );
    } catch (error) {
      console.error("Failed to unlike photo:", error.message);
    }
  };

  return (
    <LayoutPage>
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 px-5 py-5">
        {bagi4(likes).map((likes, index) => (
          <div className="grid grid-flow-row auto-rows-max gap-2" key={index}>
            {likes.map((like, i) => (
              <div
                key={i}
                className="w-full h-max flex flex-col relative items-end justify-end transition-all duration-300 group"
              >
                <img
                  src={like.foto?.url}
                  alt=""
                  className="rounded-xl object-cover"
                />
                <div
                  className="bg-white/50 rounded-xl absolute w-10 h-10 hover:bg-white transition-all duration-300 -bottom-10 group-hover:bottom-2 right-2 hidden group-hover:flex items-center justify-center p-2"
                  onClick={() =>
                    like
                      ? unlikePhoto(like.id_like)
                      : likePhoto(like.foto.id_foto)
                  }
                >
                  <img
                    src={like ? "/love.png" : "/heart.png"} // Ganti ikon tergantung status like
                    alt=""
                    className="w-5 h-5"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </LayoutPage>
  );
};

export default Suka;
