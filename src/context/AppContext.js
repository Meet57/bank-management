import { createContext, useContext, useState } from "react";
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

    const [pagedAccounts, setPagedAccounts] = useState({
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0,
        size: 10,
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

    const loadAccountsPagination = async (page = 0, size = 5) => {
        try {
            setLoading(true);
            const response = await api.get(`/accounts/pagination?page=${page}&size=${size}`);
            setPagedAccounts(response.data);
        } catch (error) {
            console.error("Error fetching paginated accounts:", error);
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
            pagedAccounts,
            loadAccountsPagination,
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