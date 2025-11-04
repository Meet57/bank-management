import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [customers, setCustomers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [modal, setModal] = useState({
        isOpen: false,
        title: "",
        body: null,
        size: "md",
        primaryButtonText: "Save changes",
        primaryButtonAction: null,
    });

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

    const getAccount = (id) => {
        return api.get(`/accounts/${id}`);
    };

    const removeAccount = (id) => {
        return api.delete(`/accounts/${id}`);
    };

    const createAccount = (data) => {
        return api.post("/accounts", data);
    };

    const updateAccount = (id, data) => {
        return api.put(`/accounts/${id}`, data);
    }

    const openModal = ({
        title = "",
        body = null,
        size = "md",
        primaryButtonText = "Save changes",
        primaryButtonAction = null,
    }) => {
        setModal({
            isOpen: true,
            title,
            body,
            size,
            primaryButtonText,
            primaryButtonAction,
        });
    };

    const closeModal = () => {
        setModal({
            isOpen: false,
            title: "",
            body: null,
            size: "md",
            primaryButtonText: "Save changes",
            primaryButtonAction: null,
        });
    };


    return (
        <AppContext.Provider value={{
            loading,
            customers,
            accounts,
            modal,
            openModal,
            closeModal,
            loadData,
            createUser,
            removeUser,
            getUser,
            updateUser,
            removeAccount,
            getAccount,
            createAccount,
            updateAccount
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);