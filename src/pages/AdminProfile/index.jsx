import React from 'react'
import axios from 'axios'

function UserProfile() {

  const token = localStorage.getItem("token")
  console.log(token)

  axios.get(import.meta.env.VITE_BACKEND_URL +"/api/users/profile", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(
    (response) => {
      console.log(response)
    }
  )
  return (
    <div>AdminProfile</div>
  )
}

export default UserProfile