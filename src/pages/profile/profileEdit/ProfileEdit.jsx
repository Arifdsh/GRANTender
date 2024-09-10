import React, { useState } from 'react'
import './profileEdit.scss'

const ProfileEdit = () => {
   const [name, setName] = useState('')
   const [picture, setPicture] = useState(null)

  return (
    <div className="edit-area">
      <h2>Edit Profile</h2>
      <form  className="profile-edit-form">
        <div className="edit-input-group">
          <label htmlFor="profile-picture">Change Picture:</label>
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
          />
        </div>

        <div className="edit-input-group">
          <label htmlFor="profile-name">Change Name:</label>
          <input
            type="text"
            id="profile-name"
            value={name}
            placeholder="Enter new name"
          />
        </div>

        <button type="submit" className="edit-submit-btn">Save Changes</button>
      </form>
    </div>
  )
}

export default ProfileEdit