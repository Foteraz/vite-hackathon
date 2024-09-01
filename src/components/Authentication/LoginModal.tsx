import React from 'react';
import Modal from './Modal'; // Assuming you have a generic Modal component
import LoginForm from './LoginForm';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <LoginForm onClose={onClose} onLogin={onLogin} />
      <button 
        onClick={onClose}
        className="mt-4 text-blue-500 underline"
      >
        Need an account? Sign Up
      </button>
    </Modal>
  );
};

export default LoginModal;
