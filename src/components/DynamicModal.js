// src/components/DynamicModal.js
import React from "react";
import { useAppContext } from "../context/AppContext";

const sizeClasses = {
    sm: "modal-sm",
    md: "",
    lg: "modal-lg",
    xl: "modal-xl",
};

const DynamicModal = () => {
    const { modal, closeModal } = useAppContext();
    const { isOpen, title, body, size, primaryButtonText, primaryButtonAction } = modal;

    if (!isOpen) return null;

    const handlePrimaryClick = () => {
        if (primaryButtonAction) primaryButtonAction();
        closeModal(); // optionally close modal after action
    };

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className={`modal-dialog ${sizeClasses[size]} modal-dialog-centered`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">{body}</div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={closeModal}>
                            Close
                        </button>
                        <button className="btn btn-primary" onClick={handlePrimaryClick}>
                            {primaryButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DynamicModal;