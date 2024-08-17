
import React from "react";
import Modal from 'react-modal';

interface ModalProps {
    onOpenChange: () => void;
    open: boolean;
    children?: React.ReactNode;
}

export const ModalSection: React.FC<ModalProps> = ({ onOpenChange, open, children }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            textAlign: 'center'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 20
        }
    };

    return (
        <Modal
            isOpen={open}
            onRequestClose={onOpenChange}
            style={customStyles}
            contentLabel="Example Modal"
        >
            {children}
        </Modal>
    )
}