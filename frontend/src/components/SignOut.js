import React from 'react';

//TODO: ENSURE ALL SIGNOUTS CAN change the navigation rendering
function logout() {
    fetch('http://localhost:8000/api/auth/logout/', {
        method: 'POST'
    })
    .catch(error => {});
    localStorage.removeItem('token');
}
const SignOutButton = ({history}) =>
  <button
    type="button"
    onClick={logout}
  >
    Sign Out
  </button>

export  {SignOutButton};
