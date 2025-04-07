import React, { useState } from "react";

import { UserProfilePage } from "./UserProfilePage";
import { ProfileSetting } from "./ProfileSetting";

const UserProfile = () => {
 const [isEditing,setIsEditing]= useState(false);
 
  return (
    <>
    {isEditing?
     <ProfileSetting setIsEditing={setIsEditing} />
    :
    <UserProfilePage setIsEditing={setIsEditing}/>}
    </>
  );
};

export default UserProfile;
