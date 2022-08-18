import { Link } from "react-router-dom";
function Navbar() {
  const user = false;

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div>Simple Events Feed</div>
        <div className="flex gap-2">
          {user ? (
            <>
              <div>
                <Link to="/dashboard">Dashboard</Link>
              </div>
              <div>Logout</div>
            </>
          ) : (
            <>
              <Link to="/signin">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;