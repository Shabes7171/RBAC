import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import { fetchUsers, addUser, updateUser, deleteUser, fetchRoles } from '../services/api';


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  width: '400px',
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [openModal, setOpenModal] = useState(false); 

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
    fetchRoles().then((data) => setRoles(data));
  }, []);

  const handleAddUser = () => {
    const newUser = { id: Date.now(), name: 'New User', email: 'newuser@example.com', role: 'Viewer', status: 'Active' };
    addUser(newUser).then((data) => setUsers(data));
  };

 
  const handleDeleteUser = (id) => {
    deleteUser(id).then((data) => setUsers(data));
  };


  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };


  const handleSubmitEdit = () => {
    updateUser(selectedUser.id, selectedUser).then((updatedUsers) => {
      setUsers(updatedUsers);
      setOpenModal(false);
      setSelectedUser(null);
    });
  };

  return (
    <div className="user-management-container">
      <Button variant="contained" color="primary" onClick={handleAddUser} style={buttonStyle}>Add User</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleEditUser(user)}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={modalStyle}>
          <h2>Edit User</h2>
          <TextField
            label="Name"
            name="name"
            value={selectedUser?.name || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            style={inputStyle}
          />
          <TextField
            label="Email"
            name="email"
            value={selectedUser?.email || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            style={inputStyle}
          />
          <FormControl fullWidth margin="normal" style={inputStyle}>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              name="role"
              value={selectedUser?.role || ''}
              onChange={handleInputChange}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" style={inputStyle}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={selectedUser?.status || ''}
              onChange={handleInputChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSubmitEdit} style={buttonStyle}>Save Changes</Button>
        </div>
      </Modal>
    </div>
  );
};

const buttonStyle = {
  marginBottom: '20px',
};

const inputStyle = {
  marginBottom: '15px',
};

export default UserManagement;

