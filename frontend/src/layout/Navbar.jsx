import React, { useEffect, useState } from "react";
import configaxios from "../function/configaxios";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setkondisi }) => {
  const [show, setShow] = useState(false);
  const [modalNavbar, setModalNavbar] = useState(false); // State untuk modal Navbar
  const [albums, setAlbums] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const nav = useNavigate();

  const openModalNavbar = () => {
    setModalNavbar(true);
    setkondisi(false);
  };

  const closeModalNavbar = () => {
    setModalNavbar(false); // Set state untuk menutup modal Navbar
    setkondisi(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitFoto = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set("album", selectedAlbum);

    try {
      const response = await configaxios.post("/foto", formData);
      if (response.data.msg) {
        // Jika respons dari server berhasil
        nav("/profile");
        setModalNavbar(false); // Menutup modal setelah pengguna berhasil mengupload
      } else {
        nav("/posting");
        setModalNavbar(false); // Menutup modal setelah pengguna berhasil mengupload
      }
      window.location.reload();
    } catch (error) {
      console.error("Error uploading photo:", error);
      // Handle error jika terjadi kesalahan pada saat upload
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await configaxios.get("/album");
      setAlbums(response.data.data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex shadow-md gap-5 w-screen lg:p-10 p-5  overflow-y-hidden overflow-x-hidden">
      <h4 className="flex font-inter font-extrabold justify-center items-center sm:text-4xl text-2xl">
        Your Lens
      </h4>
      <div
        className="flex md:hidden justify-center items-center ml-auto cursor-pointer"
        onClick={openModalNavbar}
      >
        <img width="40" height="40" src="/add_img.png" alt="add" />
      </div>
      <div
        className="hidden md:flex justify-center items-center ml-auto cursor-pointer"
        onClick={openModalNavbar}
      >
        <img width="50" height="50" src="/add_img.png" alt="add" />
      </div>
      {modalNavbar && (
        <div
          className="fixed z-20 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModalNavbar}
        >
          <form
            onSubmit={submitFoto}
            className="bg-white rounded-md w-3/4 h-3/4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center border-2 w-full p-4">
              <p className="text-left font-mono font-bold sm:text-lg">
                Tambah Postingan Baru
              </p>
              <button className="flex items-center justify-center h-10 w-32 ml-auto text-white text-center cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-md">
                Upload
              </button>
            </div>
            <div className="flex sm:flex-row flex-col w-full max-h-full sm:h-full overflow-auto sm:pb-20">
              <div className="flex px-5 flex-col gap-5 justify-center items-center w-full h-full border-r border-black">
                <label
                  htmlFor="foto"
                  onChange={handleImageChange}
                  className="w-full h-3/4 relative overflow-hidden max-h-[680px] bg-white rounded-xl flex flex-col items-center justify-center"
                >
                  <img src="/image.png" alt="" />
                  <img
                    src={selectedImage}
                    alt=""
                    className="absolute inset-0 object-cover h-full w-full"
                  />
                  <p className="font-inter font-bold w-1/4 text-center">
                    Tambah Foto di Sini
                  </p>
                  <input
                    type="file"
                    name="foto"
                    id="foto"
                    className="sr-only"
                  />
                </label>
              </div>
              <div className="flex flex-col px-5 gap-5 sm:justify-center justify-start items-center w-full h-full">
                <div className="w-full flex flex-col gap-3">
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="nama" className="label">
                      Judul foto
                    </label>
                    <input
                      name="judul"
                      id="nama"
                      type="text"
                      className="p-1 input bg-transparent border-2 border-slate-600/60 w-3/4"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="deskripsi" className="label">
                      Deskripsi
                    </label>
                    <textarea
                      name="deskripsi"
                      id="deskripsi"
                      cols="30"
                      rows="3"
                      className="no-resize p-1 input bg-transparent border-2 border-slate-600/60 w-3/4"
                    ></textarea>
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="album_id" className="label">
                        Album
                      </label>
                      <select
                        name="album_id"
                        id="album_id"
                        className="py-2 input bg-transparent border-2 border-slate-600/60border w-3/4"
                        value={selectedAlbum}
                        onChange={(e) => setSelectedAlbum(e.target.value)}
                      >
                        <option value="" disabled>
                          Pilih album
                        </option>
                        {albums.map((album, i) => (
                          <option value={album.id_album} key={i}>
                            {album.nama_album}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Navbar;
