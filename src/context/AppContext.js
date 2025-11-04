import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [customers, setCustomers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            const [custRes, accRes] = await Promise.all([
                api.get("/customers"),
                api.get("/accounts")
            ]);
            setCustomers(custRes.data);
            setAccounts(accRes.data);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    };

    const createUser = (data) => {
        return api.post("/customers", data);
    };

    const removeUser = (id) => {
        return api.delete(`/customers/${id}`);
    };

    const getUser = (id) => {
        return api.get(`/customers/${id}`);
    }

    const updateUser = (id, data) => {
        return api.put(`/customers/${id}`, data);
    }

    return (
        <AppContext.Provider value={{ customers, accounts, loadData, createUser, removeUser, getUser, updateUser, loading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);