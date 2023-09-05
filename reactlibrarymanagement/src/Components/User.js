import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyOrder.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios.get('https://localhost:7247/api/user/getalluser')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  };

  const getUserType = (userType, blockedUntil) => {
    const now = new Date();
    if (blockedUntil && now < new Date(blockedUntil)) {
      return 'Blocked'; 
    }

    switch (userType) {
      case 0:
        return 'Student';
      case 1:
        return 'Admin';
      case 2:
        return 'Teacher';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRoleChange = async (userId, currentRole) => {
    if (currentRole === 1) {
      return;
    }

    const newRole = currentRole === 0 ? 2 : 0;

    const updatedUser = { ...users.find((user) => user.id === userId), userType: newRole };

    await axios
      .put(`https://localhost:7247/api/User/${userId}`, updatedUser)
      .then((response) => {
        if (response.status === 200) {
          const updatedUserData = response.data;
          setUsers((prevUsers) => {
            return prevUsers.map((user) =>
              user.id === userId ? { ...user, userType: updatedUserData.userType } : user
            );
          });
        }
      })
      .catch((error) => {
        console.error('Error updating user role in the database:', error);
      });
  };

  const handleBlockUser = async (userId, blockedStatus, blockDuration) => {
    const blockedUntil = blockedStatus ? new Date().getTime() + blockDuration : null;

    const updatedUser = { ...users.find((user) => user.id === userId), blocked: blockedStatus, blockedUntil };

    await axios
      .put(`https://localhost:7247/api/User/${userId}`, updatedUser)
      .then((response) => {
        if (response.status === 200) {
          const updatedUserData = response.data;
          setUsers((prevUsers) => {
            return prevUsers.map((user) =>
              user.id === userId ? { ...user, blocked: updatedUserData.blocked, blockedUntil: updatedUserData.blockedUntil } : user
            );
          });
        }
      })
      .catch((error) => {
        console.error('Error updating user blocked status in the database:', error);
      });
  };

  return (
    <div>
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>ID</th>
            <th>Created On</th>
            <th>User Type</th>
            <th>Change Role</th>
            <th>Block/Unblock</th> {/* New table header for blocking/unblocking */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.id}</td>
              <td>{formatDate(user.createdOn)}</td>
              <td>{getUserType(user.userType, user.blockedUntil)}</td>
              <td>
                {user.userType !== 1 && (
                  <button onClick={() => handleRoleChange(user.id, user.userType)}>
                    {user.userType === 0 ? 'Change to Teacher'  : 'Change to Student'}
                  </button>
                )}
              </td>
              <td>
  {user.userType !== 1 && (
    <button
      onClick={() => handleBlockUser(user.id, !user.blocked, 1 * 1000)}
      className={user.blocked ? 'blocked-button' : 'unblocked-button'}
    >
      {user.blocked ? 'Unblock' : 'Block'}
    </button>
  )}
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default UserList;
