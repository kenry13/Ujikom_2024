import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import configaxios from "../../function/configaxios";

const FotoEdit = () => {
  const nav = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [albums, setAlbums] = useState([]);
  const [judul, setJudul] = useState("");
  const slug = useParams().slug;

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

  useEffect(() => {
    const getFoto = async () => {
      const response = await configaxios.get(`/foto/${slug}`);
      const { foto } = response.data.data;
      setJudul(foto.judul);
      setDeskripsi(foto.deskripsi);
      setSelectedImage(foto.url);
      setSelectedAlbum(foto.album_id);
    };

    const getAlbums = async () => {
      const response = await configaxios.get("/album");
      setAlbums(response.data.data);
    };

    getFoto();
    getAlbums();
  }, [slug]);

  const UpdateFoto = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set("nama", judul); // Update 'nama' field with the new title

    const response = await configaxios.put(`/foto/${slug}`, formData);
    response.data.msg === "success"
      ? nav(`/foto/${slug}`)
      : nav(`/edit/${slug}`);
  };

  const handleJudulChange = (event) => {
    setJudul(event.target.value);
  };

  const handleDeskripsiChange = (event) => {
    setDeskripsi(event.target.value);
  };

  return (
    <div className=" h-screen w-screen flex flex-col items-center px-5 py-5">
      <h1 className="font-koulen text-xl mb-5">Perbaharui postingan</h1>
      <form
        onSubmit={UpdateFoto}
        className="flex w-full justify-between gap-5"
      >
        <label
          htmlFor="foto"
          onChange={handleImageChange}
          className="w-1/2 relative overflow-hidden max-h-[680px] bg-white rounded-xl flex flex-col items-center justify-center"
        >
          <img src="/kamera.svg" alt="" />
          <img
            src={selectedImage}
            alt=""
            className="absolute inset-0 object-cover h-full w-full"
          />
          <input type="file" name="foto" id="foto" className="sr-only" />
        </label>
        <div className="form w-1/2 flex flex-col gap-5">
          <div className="w-full flex flex-col gap-3">
            <label htmlFor="nama" className="label">
              Judul foto
            </label>
            <input
              name="judul"
              id="nama"
              type="text"
              value={judul}
              onChange={handleJudulChange}
              className="py-2 input bg-transparent border-2 border-slate-600/60 w-3/4"
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
              value={deskripsi}
              onChange={handleDeskripsiChange}
              className="py-2 input bg-transparent border-2 border-slate-600/60 w-3/4"
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
          <button
            type="submit"
            className=" bg-green-400 hover:bg-green-300 transition-all duration-300 p-3 w-1/4 rounded-xl text-black font-bold text-lg"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default FotoEdit;
