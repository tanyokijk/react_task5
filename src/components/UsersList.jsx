import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";
import UserModal from "./UserModal";

const UserListWrapper = styled.section`
  color: ${(props) => props.theme.color};
`;

const ButtonDelete = styled.button`
  background: lightcoral;
  cursor: pointer;
`;
const ButtonUpdate = styled.button`
  background: lightblue;
  cursor: pointer;
  margin-right: 1rem;
`;
const ButtonAdd = styled.button`
  background: lightgreen;
  cursor: pointer;
`;
const ButtonAddWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
const ThStyle = styled.th`
  padding-right: 1rem;
`;
const TdStyle = styled.th`
  padding-right: 1rem;
  font-weight: normal;
`;
const InputStyle = styled.input`
  border-radius: 10px;
  border: 1px solid lightgray;
  padding: 5px;
`;
const InputAddWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUsers = useCallback(async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    setUsers(users);
    setDisplayedUsers(users);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = () => {
    if (newUser.id && newUser.name && newUser.username && newUser.email) {
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setDisplayedUsers((prevUsers) => [...prevUsers, newUser]);
      setNewUser({ id: "", name: "", username: "", email: "" });
    } else {
      alert("Будь ласка заповність всі поля");
    }
  };

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setDisplayedUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setDisplayedUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setDisplayedUsers(
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.username.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 500),
    [users]
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const openModal = (user) => {
    setCurrentUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentUser(null);
  };

  const handleSave = (updatedUser) => {
    updateUser(updatedUser);
  };

  return (
    <UserListWrapper>
      <h3>Наші користувачі</h3>
      <input type="text" placeholder="Search" onChange={handleSearchChange} />
      <table>
        <thead>
          <tr>
            <ThStyle>Id</ThStyle>
            <ThStyle>Name</ThStyle>
            <ThStyle>Username</ThStyle>
            <ThStyle>Email</ThStyle>
            <ThStyle>Actions</ThStyle>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr key={user.id}>
              <TdStyle>{user.id}</TdStyle>
              <TdStyle>{user.name}</TdStyle>
              <TdStyle>{user.username}</TdStyle>
              <TdStyle>{user.email}</TdStyle>
              <td>
                <ButtonUpdate onClick={() => openModal(user)}>
                  Update
                </ButtonUpdate>
                <ButtonDelete onClick={() => deleteUser(user.id)}>
                  Delete
                </ButtonDelete>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <InputAddWrapper>
        <InputStyle
          type="number"
          placeholder="Id"
          name="id"
          value={newUser.id}
          onChange={handleChange}
        />
        <InputStyle
          type="text"
          placeholder="Name"
          name="name"
          value={newUser.name}
          onChange={handleChange}
        />
        <InputStyle
          type="text"
          placeholder="Username"
          name="username"
          value={newUser.username}
          onChange={handleChange}
        />
        <InputStyle
          type="text"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
        />
      </InputAddWrapper>
      <ButtonAddWrapper>
        <ButtonAdd onClick={addUser}>Add User</ButtonAdd>
      </ButtonAddWrapper>

      <UserModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        user={currentUser}
        onSave={handleSave}
      />
    </UserListWrapper>
  );
};

export default UsersList;
