import { Link } from "react-router-dom";

function Admin() {
  return (
    <section className="py-24 px-6">
      <h1 className="text-3xl font-bold text-center text-gold-900">
        Welcome to Admin Dashboard
      </h1>
      <div className="mt-8 text-center">
        <Link to="/admin/login" className="btn">
          Đăng nhập
        </Link>
      </div>
    </section>
  );
}

export default Admin;
