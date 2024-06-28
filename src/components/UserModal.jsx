import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

Modal.setAppElement("#root");

const ModalContent = styled.div`
  background-color: bisque;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  margin: auto;
  text-align: center;
`;

const ModalHeader = styled.h2`
  margin-bottom: 1rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const Button = styled.button`
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ButtonSave = styled(Button)`
  background: lightgreen;
`;

const ButtonCancel = styled(Button)`
  background: lightcoral;
`;

const InputStyle = styled.input`
  border-radius: 10px;
  border: 1px solid lightgray;
  padding: 5px;
  margin-bottom: 1rem;
`;

const UserModal = ({ isOpen, onRequestClose, user, onSave }) => {
  const [updatedUser, setUpdatedUser] = React.useState(user || {});

  React.useEffect(() => {
    if (user) {
      setUpdatedUser(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedUser);
    onRequestClose();
  };

  if (!user) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          padding: "0",
          border: "none",
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "auto",
          height: "318px",
          width: "300px",
        },
      }}
    >
      <ModalContent>
        <ModalHeader>Update User</ModalHeader>
        <div>
          <InputStyle
            type="text"
            placeholder="Name"
            name="name"
            value={updatedUser.name}
            onChange={handleChange}
          />
          <InputStyle
            type="text"
            placeholder="Username"
            name="username"
            value={updatedUser.username}
            onChange={handleChange}
          />
          <InputStyle
            type="text"
            placeholder="Email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
          />
        </div>
        <ModalFooter>
          <ButtonSave onClick={handleSave}>Save</ButtonSave>
          <ButtonCancel onClick={onRequestClose}>Cancel</ButtonCancel>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
