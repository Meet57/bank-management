import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const UsersPage = () => {
    const { customers, loading, removeUser, openModal, loadData } = useAppContext();

    const handleRemoveUser = (id) => {
        openModal({
            title: "Confirm Deletion",
            body: <p>Are you sure you want to delete this user with Customer ID {id}?</p>,
            primaryButtonText: "Delete",
            primaryButtonAction: () => {
                removeUser(id)
                    .then(() => {
                        loadData();
                    })
                    .catch((error) => {
                        console.error("Error deleting user:", error);
                        alert("Failed to delete user.");
                    });
            },
        });

        // if (window.confirm("Are you sure you want to delete this user?")) {
        //     removeUser(id)
        //         .then(() => {
        //             alert("User deleted successfully.");
        //             loadData();
        //         })
        //         .catch((error) => {
        //             console.error("Error deleting user:", error);
        //             alert("Failed to delete user.");
        //         });
        // }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="mb-0">Customers / Users</h2>
                <Link to="/create-user" className="btn btn-outline-primary">Create User</Link>
            </div>

            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-2">Loading users...</p>
                </div>
            ) : customers.length === 0 ? (
                <div className="alert alert-info">
                    No customers found. Try adding some!
                </div>
            ) : (
                <table className="table table-striped table-hover shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>Customer ID</th>
                            <th>Name</th>
                            <th>City</th>
                            <th>Province</th>
                            <th>Postal Code</th>
                            <th>Accounts</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((cust) => (
                            <tr key={cust.customerId}>
                                <td>{cust.customerId}</td>
                                <td>{cust.name}</td>
                                <td>{cust.address?.city ?? "-"}</td>
                                <td>{cust.address?.province ?? "-"}</td>
                                <td>{cust.address?.postalCode ?? "-"}</td>
                                <td>
                                    {cust.accounts?.map((acc) => (
                                        <span key={acc.accountId} className="badge bg-secondary me-1">
                                            {acc.interestRate != null
                                                ? `Savings $${acc.balance}`
                                                : acc.nextCheckNumber != null
                                                    ? `Checking $${acc.balance}`
                                                    : `$${acc.balance}`}
                                        </span>
                                    ))}
                                </td>
                                <td>
                                    <Link to={`/edit-user/${cust.customerId}`}>
                                        <button className="btn btn-sm btn-outline-success me-2">
                                            Edit
                                        </button>
                                    </Link>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveUser(cust.customerId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UsersPage;