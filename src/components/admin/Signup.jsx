import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { adminAtom, adminToken } from "../../store/atom";
import { ADMIN_SIGNUP_URL } from "../../utils/constant";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const setAdmin = useSetRecoilState(adminAtom);
  const setAdminToken = useSetRecoilState(adminToken);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      axios
        .post(ADMIN_SIGNUP_URL, {
          username: username,
          password: password,
        })
        .then((res) => {
          setMessage(res.data.message);
          setUsername("");
          setPassword("");
          localStorage.setItem("token", res.data.token);
          setAdmin(username);
          setAdminToken(res.data.token);
        })
        .catch((err) => setMessage("Admin already exists"));
    } else {
      setMessage("Please provide Valid input");
    }
  };

  return (
    <section className="py-32 bg-fade-pink h-screen px-6">
      <h1 className="text-center text-royal-green-900 font-bold text-xl">
        Admin/Register
      </h1>
      {message ? (
        <div className="text-center mt-4">
          <span className="text-lg text-gold-900">{message}</span>
          <br />
          <Link className="text-lg text-royal-green-900" to="/admin/dashboard">
            Đi tới trang chủ
          </Link>
        </div>
      ) : (
        ""
      )}

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-12 max-w-sm mx-auto w-full"
        action=""
      >
        <input
          autoFocus
          className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
          type="text"
          placeholder="Nhập Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
          type="password"
          placeholder="Nhập Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center mt-4">
          <button
            onClick={(e) => handleSubmit(e)}
            className="px-6 py-3 text-md bg-royal-green-900 text-white rounded w-full"
          >
            Đăng kí
          </button>
        </div>
      </form>
      <footer className="mt-8">
        <p className="text-sm text-center text-royal-green-600">
          Đã có tài khoản ?{" "}
          <Link className="text-gold-900" to="/admin/login/">
            Đăng nhập
          </Link>
        </p>
      </footer>
    </section>
  );
}

export default Signup;
