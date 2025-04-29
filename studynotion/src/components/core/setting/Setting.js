import React from 'react';
import ChangeProfilePicture from './ChangeProfilePicture';
import EditProfile from './EditProfile';
import DeleteAccount from './DeleteAccount';
import UpdatePassword from './UpdatePassword';

export default function Setting() {
  return (
    <div>

<div className='bg-richblack-900 text-white mx-0 md:mx-5 flex flex-col gap-y-5 md:gap-y-7'>
      <h1 className='font-medium text-richblack-5 text-3xl mb-5 uppercase tracking-wider lg:text-left text-center' >Edit Profile</h1>

      <ChangeProfilePicture />

    
      <EditProfile />


      <UpdatePassword />

   
      <DeleteAccount />


    </div>




















    </div>
  )
}
