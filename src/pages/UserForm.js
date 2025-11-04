import React, { useEffect, useState } from 'react';
import { useAppContext } from "../context/AppContext";
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
    const { id } = useParams();
    const { createUser, getUser, updateUser } = useAppContext();
    const [isEditMode, setIsEditMode] = useState(false);
    const [form, setForm] = useState({
        name: '',
        customerType: '',
        streetNumber: '',
        postalCode: '',
        city: '',
        province: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            getUser(id)
                .then((res) => {
                    const user = res.data;
                    setForm({
                        name: user.name || '',
                        customerType: user.customerType || '',
                        streetNumber: user.address?.streetNumber || '',
                        postalCode: user.address?.postalCode || '',
                        city: user.address?.city || '',
                        province: user.address?.province || '',
                    });
                })
                .catch((err) => {
                    setError('Error fetching user data. Please try again.');
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage('');
        setError('');
        setLoading(true);

        try {
            if (isEditMode) {
                const res = await updateUser(id, form);
                setMessage(`User updated successfully with ID: ${res.data.customerId}`);
            } else {
                const res = await createUser(form);
                setMessage(`User created successfully with ID: ${res.data.customerId}`);
            }

            // Navigate to users page after 2 seconds
            setTimeout(() => {
                navigate('/users');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.errors[0]?.defaultMessage || 'Error creating user. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h3 className="card-title mb-4 text-center">
                        {isEditMode ? 'Edit User' : 'Create New User'}
                    </h3>

                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Customer Type</label>
                                <select
                                    name="customerType"
                                    value={form.customerType}
                                    onChange={handleChange}
                                    className="form-select"
                                    disabled={isEditMode}
                                    required
                                >
                                    <option value="">Select type</option>
                                    <option value="person">Person</option>
                                    <option value="company">Company</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Street Number</label>
                                <input
                                    type="text"
                                    name="streetNumber"
                                    value={form.streetNumber}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="123 Main St"
                                    disabled={isEditMode}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={form.postalCode}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="A1B 2C3"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="City"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Province</label>
                                <input
                                    type="text"
                                    name="province"
                                    value={form.province}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Province"
                                    required
                                />
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : isEditMode ? 'Update User' : 'Create User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserForm;