import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen fixed">
      <div className="flex shadow-md gap-5 p-3">
        <h4 className="text-4xl mb-1 mt-1 ml-1">Ini Logo</h4>
        <div className="ml-auto flex gap-3">
          <Link
            className={`flex items-center w-full relative text-black font-bold font-mono py-2 px-4 rounded hover:bg-cyan-200 hover:text-cyan-600 transition duration-300 ease-in-out`}
          to={"/register"}
          >
            <span>Signup</span>
          </Link>
          <Link
            className={`flex items-center w-full relative text-black font-bold font-mono py-2 px-4 rounded bg-cyan-300 hover:bg-cyan-400 hover:text-cyan-700 transition duration-300 ease-in-out`}
            to={"/login"}
          >
            <span>Login</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-3/4 gap-3">
        <h1 className="text-6xl font-mono font-bold text-center md:w-3/4 lg:w-1/3">
          Stories Behind Every Lens
        </h1>
        <Link
          className={`flex justify-center w-1/6 relative text-black font-bold font-mono py-2 px-4 rounded-lg bg-cyan-300 hover:bg-cyan-400 hover:text-cyan-700 transition duration-300 ease-in-out`}
          to={"/home"}
        >
          <span className="text-center">Mulai</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
