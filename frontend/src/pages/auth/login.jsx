import { Link, useNavigate } from "react-router-dom";
import configaxios from "../../function/configaxios";
import { useContext } from "react";
import DataContext from "../../function/Context";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, checkMsg } = useContext(DataContext);

  async function sendData(e) {
    e.preventDefault();
    const response = await configaxios.post(
      "/api/login",
      new FormData(e.target)
    );
    if (checkMsg(response)) {
      setUser(response.data.data);
      navigate("/home");
    }
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-green-300 via-blue-500 to-purple-600 h-screen w-screen fixed">
      <div className="flex justify-between items-center bg-white gap-5 w-3/4 h-2/4 md:h-2/3 shadow-lg shadow-black rounded-lg">
        <div className="hidden md:flex bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 w-full h-5/6 ml-12 rounded-lg">
          <div className="flex flex-col w-full h-full">
            <img
              src="logo.png"
              alt="logo"
              width="100"
              height="100"
              className="ml-5 mt-5"
            />
            <p className="flex justify-center items-center h-full text-5xl text-white font-mono font-bold">
              Selamat Datang di <br /> Your Lens
            </p>
            <footer className="ml-auto text-white mb-5 mr-5">
              Login untuk <br /> mendapatkan semua akses
            </footer>
          </div>
        </div>
        <div className="w-full h-5/6 flex flex-col items-center justify-center">
          <h4 className="font-bold font-mono text-3xl">Login</h4>
          <form
            onSubmit={sendData}
            className="flex flex-col items-center justify-center h-full w-2/3 gap-3"
          >
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              placeholder="Email"
              name="email"
            />
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              placeholder="Password"
              name="password"
            />
            <button className="text-white bg-blue-400 hover:bg-blue-300 rounded-full p-3 w-full mb-2 text-center">
              Log In
            </button>
            <p className="text-center">
              New Here?
              <Link to="/register" className="text-blue-400">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
