import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import configaxios from "../../function/ConfigAxios.js";
import LayoutPage from "../../layout/LayoutPage";

const Album = () => {
  const [modal, setModal] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [namaAlbum, setNamaAlbum] = useState("");
  const [deskripsiAlbum, setDeskripsiAlbum] = useState("");
  const [defaultPhotoUrl, setDefaultPhotoUrl] = useState("/albums.png");

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const createAlbum = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("nama", namaAlbum); // Update 'nama' field with the new title
    const fetchAlbums = async () => {
      try {
        const response = await configaxios.get("/album");
        setAlbums(response.data.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    try {
      const response = await configaxios.post(`/album`, formData);
      if (response.data.msg === "success") {
        // Tutup modal jika album berhasil dibuat
        closeModal();
        // Fetch ulang daftar album
        fetchAlbums();
      } else {
        // Tampilkan pesan kesalahan jika gagal
        console.error("Gagal membuat album");
      }
      window.location.reload();

    } catch (error) {
      console.error("Error:", error);
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

    fetchAlbums();
  }, []);

  return (
    <LayoutPage>
      <div className="flex flex-col h-screen w-screen px-2 py-2">
        <div
          className="flex max-w-full px-2 w-fit cursor-pointer"
          onClick={openModal}
        >
          <img src="add_albm.png" alt="add albm" />
          <span className="flex justify-center items-center text-xl font-inter font-extrabold">
            Tambah Album
          </span>
        </div>
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 py-2">
          {albums.map((album, i) => (
            <Link
              to={`/album/${album.id_album}`}
              key={i}
              className="flex flex-col gap-3 items-start max-w-max"
            >
              <img
                src={
                  album.fotos.length > 0 ? album.fotos[0].url : defaultPhotoUrl
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
        {modal && (
          <div className="bg-slate-600/60 fixed px-5 inset-0 z-20 w-full h-screen flex items-center justify-center">
          <form
            onSubmit={createAlbum}
            className="w-full md:w-1/3 rounded-lg p-4 bg-white flex flex-col gap-5"
          >
            <input
              type="text"
              className="outline-none rounded-lg p-4 w-full ring-1 valid:text-dark-green invalid:text-red-500 invalid:ring-2 invalid:ring-red-500 bg-primary"
              placeholder="nama album"
              name="nama_album"
              id="nama"
              value={namaAlbum}
              onChange={(e) => setNamaAlbum(e.target.value)}
            />
            <input
              type="text"
              className="outline-none rounded-lg p-4 w-full ring-1 valid:text-dark-green invalid:text-red-500 invalid:ring-2 invalid:ring-red-500 bg-primary"
              placeholder="deskripsi"
              name="deskripsi"
              id="deskripsi"
              value={deskripsiAlbum}
              onChange={(e) => setDeskripsiAlbum(e.target.value)}
            />
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-green border-2 border-green hover:bg-dark-green transition-all duration-300 px-8 rounded-xl  font-bold text-sm w-max text-blue-400 bg-dark-green border-dark-green py-3"
              >
                Simpan
              </button>
              <div
                className="bg-transparent hover:bg-primary/70 transition-all duration-300 px-8 w-max cursor-pointer rounded-xl font-bold text-sm py-3 text-dark-green"
                onClick={closeModal}
              >
                Batal
              </div>
            </div>
          </form>
        </div>
        )}
      </div>
    </LayoutPage>
  );
};

export default Album;
