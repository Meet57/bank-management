import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const AccountsPagePagination = () => {
    const {
        customers,
        loading,
        removeAccount,
        openModal,
        loadAccountsPagination,
        pagedAccounts,
    } = useAppContext();

    const { content: accounts, number, totalPages, size } = pagedAccounts;
    const [sizeState, setSizeState] = useState(size);

    useEffect(() => {
        loadAccountsPagination(0, sizeState);
    }, [sizeState]);

    const handleDelete = (accountId) => {
        openModal({
            title: "Confirm Deletion",
            body: <p>Are you sure you want to delete account ID {accountId}?</p>,
            primaryButtonText: "Delete",
            primaryButtonAction: () => {
                removeAccount(accountId)
                    .then(() => {
                        loadAccountsPagination(number, size);
                    })
                    .catch((error) => {
                        console.error("Error deleting account:", error);
                        alert("Failed to delete account.");
                    });
            },
        });
    };

    const handleNext = () => {
        if (number + 1 < totalPages) {
            loadAccountsPagination(number + 1, size);
        }
    };

    const handlePrevious = () => {
        if (number > 0) {
            loadAccountsPagination(number - 1, size);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                    <h2 className="mb-0">Bank Accounts</h2>
                    <select className="form-select" onChange={e => setSizeState(parseInt(e.target.value))}>
                        <option value="5">5</option>
                        <option value="10" selected>10</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <Link to="/create-account">
                    <button className="btn btn-outline-primary">Create Account</button>
                </Link>
            </div>

            {loading ? (
                <div className="my-5 text-center">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-2">Loading accounts...</p>
                </div>
            ) : !accounts || accounts.length === 0 ? (
                <div className="alert alert-info">
                    No accounts found. Try adding some!
                </div>
            ) : (
                <>
                    <table className="table table-striped table-hover shadow-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>Account ID</th>
                                <th>Customer</th>
                                <th>Type</th>
                                <th>Balance</th>
                                <th>Interest Rate</th>
                                <th>Next Check #</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((acc) => {
                                const type =
                                    acc.interestRate != null
                                        ? "Savings"
                                        : acc.nextCheckNumber != null
                                            ? "Checking"
                                            : "Unknown";

                                const customer = customers.find((c) =>
                                    c.accounts?.some((a) => a.accountId === acc.accountId)
                                );

                                return (
                                    <tr key={acc.accountId}>
                                        <td>{acc.accountId}</td>
                                        <td>{customer ? customer.name : "Unknown"}</td>
                                        <td>{type}</td>
                                        <td>${acc.balance.toLocaleString()}</td>
                                        <td>{acc.interestRate ?? "-"}</td>
                                        <td>{acc.nextCheckNumber ?? "-"}</td>
                                        <td>
                                            <Link to={`/edit-account/${acc.accountId}`}>
                                                <button className="btn btn-sm btn-outline-success me-2">Edit</button>
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDelete(acc.accountId)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <nav aria-label="Page navigation" className="mt-3">
                        <ul className="pagination justify-content-end">
                            <li className={`page-item ${number === 0 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={handlePrevious} disabled={number === 0}>
                                    Previous
                                </button>
                            </li>

                            {[...Array(totalPages)].map((_, i) => (
                                <li
                                    key={i}
                                    className={`page-item ${i === number ? "active" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => loadAccountsPagination(i, size)}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item ${number + 1 >= totalPages ? "disabled" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={handleNext}
                                    disabled={number + 1 >= totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
};

export default AccountsPagePagination;