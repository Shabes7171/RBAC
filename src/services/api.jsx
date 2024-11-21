
  
export const fetchUsers = () => Promise.resolve(users);
export const fetchRoles = () => Promise.resolve(roles);
export const addUser = (user) => Promise.resolve([...users, user]);
export const updateUser = (id, user) => Promise.resolve(users.map(u => u.id === id ? user : u));
export const deleteUser = (id) => Promise.resolve(users.filter(u => u.id !== id));

export const addRole = (role) => Promise.resolve([...roles, role]);
export const updateRole = (id, role) => Promise.resolve(roles.map(r => r.id === id ? role : r));
export const deleteRole = (id) => Promise.resolve(roles.filter(r => r.id !== id));

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
];

const roles = [
  { id: 1, name: 'Admin', permissions: { read: true, write: true, delete: true } },
  { id: 2, name: 'User', permissions: { read: true, write: false, delete: false } },
];
