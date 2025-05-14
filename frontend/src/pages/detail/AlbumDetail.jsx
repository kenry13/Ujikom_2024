import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import configaxios from "../../function/ConfigAxios.js";
import Footer from "../../layout/Footer";

const AlbumDetail = () => {
  const nav = useNavigate();
  const [fotos, setFotos] = useState([]);
  const [album, setAlbum] = useState([]);
  const [namaAlbum, setNamaAlbum] = useState("");
  const [deskripsiAlbum, setDeskripsiAlbum] = useState("");
  const [newAlbum, setNewAlbum] = useState(false);
  const slug = useParams().slug;

  const createdAtDate = new Date(album.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  useEffect(() => {
    const fetchData = async () => {
      const response = await configaxios.get(`/album/${slug}`);
      setFotos(response.data.data.fotos);
      setAlbum(response.data.data);
      setNamaAlbum(response.data.data.nama_album);
      setDeskripsiAlbum(response.data.data.deskripsi);
    };

    fetchData();
  }, []);

  const createAlbum = () => {
    setNewAlbum(!newAlbum);
  };

  const UpdateAlbum = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("nama", namaAlbum); // Update 'nama' field with the new title

    const response = await configaxios.put(`/album/${slug}`, formData);
    response.data.msg === "success" ? createAlbum() : "";

    const fetchData = async () => {
      const response = await configaxios.get(`/album/${slug}`);
      setFotos(response.data.data.fotos);
      setAlbum(response.data.data);
      setNamaAlbum(response.data.data.nama);
      setDeskripsiAlbum(response.data.data.deskripsi);
    };

    fetchData();
  };

  async function deleteAlbum() {
    const confirmation = window.confirm("Yakin ingin menghapus?");
    if (!confirmation) {
      return;
    }
    const res = await configaxios.delete(`/album/${album.id_album}`);
    nav("/profile");
    console.log(res.data.msg);
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
    <div className="h-screen w-screen px-2 py-2">
      <div className="flex items-center justify-between gap-3 w-full shadow-md ">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">{album.nama_album}</h1>
          <p className="text-sm font-semibold text-slate-600/60">
            {album.deskripsi}
          </p>
          <p className="text-sm font-semibold text-slate-600/60">
            {formattedDate}
          </p>
        </div>
        <div className="flex gap-5 ml-auto">
          <button className="text-blue-500 text-right" onClick={createAlbum}>
            Edit
          </button>
          <button className="text-red-500 text-right" onClick={deleteAlbum}>
            Hapus
          </button>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 py-5">
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
      {newAlbum && (
        <div className="bg-slate-600/60 fixed px-5 inset-0 z-20 w-full h-screen flex items-center justify-center">
          <form
            onSubmit={UpdateAlbum}
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
                onClick={createAlbum}
              >
                Batal
              </div>
            </div>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AlbumDetail;
