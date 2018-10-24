import React from 'react';

function logout() {
    fetch('http://localhost:8000/api/auth/logout/', {
        method: 'POST'
    })
    .catch(error => {});
    localStorage.removeItem('token');
}
const SignOutButton = () =>
  <button
    type="button"
    onClick={logout}
  >
    Sign Out
  </button>

export  {SignOutButton};
