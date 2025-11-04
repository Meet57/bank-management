import React, { useEffect, useMemo } from "react";
import { useAppContext } from "../context/AppContext";

const AccountsPage = () => {
    const { accounts, customers, loadData, loading } = useAppContext();

    useEffect(() => {
        loadData();
    }, []);

    const customerMap = useMemo(() => {
        const map = {};
        customers.forEach((c) => (map[c.customerId] = c.name));
        return map;
    }, [customers]);

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="mb-0">Bank Accounts</h2>
                <button className="btn btn-outline-primary">Create Account</button>
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