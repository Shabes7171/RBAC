import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { fetchRoles, addRole, updateRole, deleteRole } from '../services/api';


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

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });

  useEffect(() => {
    fetchRoles().then((data) => setRoles(data));
  }, []);

 
  const handleAddRole = () => {
    const newRole = { id: Date.now(), name: 'New Role', permissions: { read: false, write: false, delete: false } };
    addRole(newRole).then((data) => setRoles(data));
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setPermissions(role.permissions);
    setOpenModal(true);
  };


  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };


  const handleSubmitEditRole = () => {
    const updatedRole = { ...selectedRole, permissions };
    updateRole(updatedRole.id, updatedRole).then((updatedRoles) => {
      setRoles(updatedRoles);
      setOpenModal(false);
      setSelectedRole(null);
    });
  };

  
  const handleDeleteRole = (id) => {
    deleteRole(id).then((data) => setRoles(data));
  };

  return (
    <div className="role-management-container">
      <Button variant="contained" color="primary" onClick={handleAddRole} style={buttonStyle}>Add Role</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  {role.permissions.read ? 'Read, ' : ''}
                  {role.permissions.write ? 'Write, ' : ''}
                  {role.permissions.delete ? 'Delete' : ''}
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleEditRole(role)}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteRole(role.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={modalStyle}>
          <h2>Edit Role</h2>
          <TextField
            label="Role Name"
            value={selectedRole?.name || ''}
            onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={<Checkbox checked={permissions.read} onChange={handlePermissionChange} name="read" />}
            label="Read"
          />
          <FormControlLabel
            control={<Checkbox checked={permissions.write} onChange={handlePermissionChange} name="write" />}
            label="Write"
          />
          <FormControlLabel
            control={<Checkbox checked={permissions.delete} onChange={handlePermissionChange} name="delete" />}
            label="Delete"
          />
          <Button variant="contained" color="primary" onClick={handleSubmitEditRole} style={buttonStyle}>Save Changes</Button>
        </div>
      </Modal>
    </div>
  );
};

const buttonStyle = {
  marginBottom: '20px',
};

export default RoleManagement;
