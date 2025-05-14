import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataContext from "../../function/Context";
import configaxios from "../../function/ConfigAxios.js";
import Comment from "../../component/comment";
import NavDetail from "../../layout/NavDetail";

const FotoDetail = () => {
  const nav = useNavigate();
  const [img, setImg] = useState({});
  const [showComment, setShowComent] = useState(false);
  const [userNama, setUserNama] = useState("");
  const { user } = useContext(DataContext);
  const [like, setLiked] = useState(false);
  const slug = useParams().slug;

  const createdAtDate = new Date(img.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggle = () => {
    setShowComent(!showComment);
  };

  // Fungsi callback untuk memperbarui data pada komponen Detail
  const updateData = async () => {
    const response = await configaxios.get(`/foto/${slug}`);
    setImg(response.data.data.foto);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await configaxios.get(`/foto/${slug}`);
      const { foto } = response.data.data;
      setLiked(response.data.data.like);
      setImg(foto);
      setUserNama(foto.user.username);
    };

    fetchData();
  }, [slug]);

  async function likePhoto(fotoId) {
    const response = await configaxios.post("/like", { foto_id: fotoId });
    setLiked(response.data.data);
  }

  async function unlikePhoto(fotoId) {
    const response = await configaxios.delete(`/like/${fotoId}`);
    setLiked(false);
  }

  const liked = () => {
    like == false ? likePhoto(img.id_foto) : unlikePhoto(like.id_like);
    updateData();
  };

  async function deletePhoto(id_foto) {
    const confirmation = window.confirm("Yakin ingin menghapus?");
    if (!confirmation) {
      return;
    }
    const res = await configaxios.delete(`/foto/${id_foto}`);
    res.data.msg === "success" ? nav("/profile") : alert("hapus gagal");
  }

  return (
    <div className="px-2 py-2" showComment={showComment}>
      <NavDetail/>
      <div
        className={`flex flex-col w-full gap-6 justify-center pb-32 transition-all duration-300 ${
          showComment ? "items-start" : "items-center"
        }`}
      >
        <div className="flex pt-2 justify-between items-center w-full md:w-2/3">
          {/* <div className="flex items-center gap-3">
            <img src="/pp.png" alt="" />
        </div> */}
          <p className="font-bold text-sm">
            Made By {userNama?.length ? userNama : "memuat"}
          </p>
          <div className="flex items-center gap-2">
            {user.id_user === img.user_id && (
              <>
                <Link to={`/edit/${img.id_foto}`} className="flex justify-center items-center font-bold rounded-lg w-1/2 bg-yellow-300 hover:bg-yellow-200 p-1 cursor-pointer">
                  Edit
                </Link>
                <div
                  className="flex justify-center items-center font-bold rounded-lg w-1/2 bg-red-500 hover:bg-red-400 p-1 cursor-pointer"
                  onClick={() => deletePhoto(img.id_foto)}
                >
                  Hapus
                </div>
              </>
            )}
            <div
              className={`icon-btn w-max flex items-center gap-2 ${
                showComment ? "bg-slate-600/20" : ""
              }`}
              onClick={toggle}
            >
              <img src="/comment.png" alt="" className="w-5 h-5" />
              <p>{img.komentars ? img.komentars.length : ""}</p>
            </div>

            <div
              className="icon-btn w-max flex items-center pl-5 gap-2"
              onClick={liked}
            >
              <img
                src={like ? "/love.png" : "/heart.png"}
                alt=""
                className="w-5 h-5"
              />
              <p>{img.like ? img.like.length : ""}</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-6 items-start">
          <h1 className="text-xl md:text-3xl font-extrabold w-2/3 text-wrap font-inter">
            {img.judul}
          </h1>
          <p className="text-xs md:text-base font-semibold text-secondary/70 text-start w-full md:w-2/3 font-inter indent-2">
            {img.deskripsi}
          </p>
          <p className="text-sm font-semibold text-slate-600/60 indent-2">
            {formattedDate}
          </p>
        </div>
        {/* <div className="max-h-full max-w-full"> */}
        <img
          src={img.url}
          alt=""
          className="max-w-full md:w-2/3 rounded-xl max-h-fit object-cover"
        />
        {/* </div> */}
      </div>
      <Comment
        showComment={showComment}
        fotoId={img.id_foto}
        Comments={img.komentars}
        updateData={updateData}
        user={user.id_user}
      />
    </div>
  );
};

export default FotoDetail;
