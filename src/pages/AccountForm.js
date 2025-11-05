import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';

const AccountForm = () => {
    const { id } = useParams();
    const { createAccount, updateAccount, getAccount, customers, loadData } = useAppContext();
    const [isEditMode, setIsEditMode] = useState(false);
    const [form, setForm] = useState({
        customerId: '',
        accountType: '',
        balance: null
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            getAccount(id)
                .then((res) => {
                    const account = res.data;
                    const type = account.interestRate ? 'savings' : 'checkings';
                    const customer = customers.find(c => c.accounts.find(a => a.accountId === account.accountId))?.customerId || '';
                    setForm({
                        customerId: customer || '',
                        accountType: type,
                        balance: account.balance || '0.00',
                        interestRate: account.interestRate || '0.00',
                        nextCheckNumber: account.nextCheckNumber || '0',
                    });
                })
                .catch((err) => {
                    setError(err.response?.data?.errors[0]?.defaultMessage || 'Error fetching account data. Please try again.');
                });
        }
    }, [id, getAccount, customers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage('');
        setError('');
        setLoading(true);

        if (!form.customerId || !form.accountType || form.balance === null) {
            setError('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        try {
            if (isEditMode) {
                const res = await updateAccount(id, form);
                setMessage(`Account updated successfully with ID: ${res.data.accountId}`);
            } else {
                const res = await createAccount(form);
                setMessage(`Account created successfully with ID: ${res.data.accountId}`);
            }

            setTimeout(() => {
                loadData();
                navigate('/accounts');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.errors[0]?.defaultMessage || 'Error creating account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h3 className="card-title mb-4 text-center">{isEditMode ? 'Edit Account' : 'Create New Account'}</h3>

                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}


                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">

                            <div className="col-md-6">
                                <label htmlFor="customerId" className="form-label">Customer</label>
                                <select
                                    id="customerId"
                                    name="customerId"
                                    value={form.customerId}
                                    onChange={handleChange}
                                    className="form-select"
                                    disabled={isEditMode}
                                >
                                    <option value="">Select a customer</option>
                                    {customers.map((customer) => (
                                        <option key={customer.customerId} value={customer.customerId}>
                                            {customer.name} (ID: {customer.customerId})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="accountType" className="form-label">Account Type</label>
                                <select
                                    id="accountType"
                                    name="accountType"
                                    value={form.accountType}
                                    onChange={handleChange}
                                    className="form-select"
                                    disabled={isEditMode}
                                >
                                    <option value="">Select account type</option>
                                    <option value="checkings">checkings</option>
                                    <option value="savings">Savings</option>
                                </select>
                            </div>

                            {form.accountType === 'savings' && (
                                <div className="col-md-6">
                                    <label htmlFor="interestRate" className="form-label">Interest Rate</label>
                                    <input
                                        type="number"
                                        id="interestRate"
                                        name="interestRate"
                                        value={form.interestRate}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter interest rate"
                                        step="0.01"
                                        min="0"
                                    />
                                </div>
                            )}

                            {form.accountType === 'checkings' && (
                                <div className="col-md-6">
                                    <label htmlFor="nextCheckNumber" className="form-label">Next Check Number</label>
                                    <input
                                        type="number"
                                        id="nextCheckNumber"
                                        name="nextCheckNumber"
                                        value={form.nextCheckNumber}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter next check number"
                                        min="0"
                                    />
                                </div>
                            )}

                            <div className="col-md-6">
                                <label htmlFor="balance" className="form-label">Balance</label>
                                <input
                                    type="number"
                                    id="balance"
                                    name="balance"
                                    value={form.balance}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter balance"
                                    step="0.01"
                                />
                            </div>

                            <div className="text-center mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    disabled={loading}
                                >
                                    {loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Account' : 'Create Account')}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AccountForm