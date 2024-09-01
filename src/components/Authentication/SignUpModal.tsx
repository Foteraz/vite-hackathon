import React from 'react';
import Modal from './Modal'; // Assuming you have a generic Modal component
import SignupForm from './SignupForm';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onLogin }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <SignupForm onClose={onClose} onLogin={onLogin} />
      <button 
        onClick={onClose}
        className="mt-4 text-blue-500 underline"
      >
        Already have an account? Login
      </button>
    </Modal>
  );
};

export default SignupModal;
