import React, { useEffect, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const AccountsPage = () => {
    const { accounts, customers, loading, removeAccount, openModal, loadData } = useAppContext();


    const customerMap = useMemo(() => {
        const map = {};
        customers.forEach((c) => (map[c.customerId] = c.name));
        return map;
    }, [customers]);

    const handleDelete = (accountId) => {
        openModal({
            title: "Confirm Deletion",
            body: <p>Are you sure you want to delete account ID {accountId}?</p>,
            primaryButtonText: "Delete",
            primaryButtonAction: () => {
                removeAccount(accountId)
                    .then(() => {
                        loadData();
                    }
                    )
                    .catch((error) => {
                        console.error("Error deleting account:", error);
                        alert("Failed to delete account.");
                    });
            },
        });
    }

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="mb-0">Bank Accounts</h2>
                <Link to="/create-account">
                    <button className="btn btn-outline-primary">Create Account</button>
                </Link>
            </div>

            {loading ? (
                <div className="my-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-2">Loading accounts...</p>
                </div>
            ) : accounts.length === 0 ? (
                <div className="alert alert-info">
                    No accounts found. Try adding some!
                </div>
            ) : (
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
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(acc.accountId)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AccountsPage;