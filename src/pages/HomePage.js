import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

function Home() {
    const { customers, accounts, loadData, loading } = useAppContext();

    useEffect(() => {
        loadData();
    }, []);

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-4">
            <h2>🏦 Dashboard Overview</h2>
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card text-bg-primary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Customers</h5>
                            <h3>{customers.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-bg-success mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Accounts</h5>
                            <h3>{accounts.length}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;