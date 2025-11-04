import { Link, NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Navbar() {

    const { loadData } = useAppContext();

    const reloadData = () => {
        loadData();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link className="navbar-brand" to="/">Bank Portal</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto align-items-center">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/accounts">Accounts</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/users">Users</NavLink>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-sm btn-outline-success ms-2" onClick={reloadData}>Refresh</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;