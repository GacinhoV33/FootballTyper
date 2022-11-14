import React, { useState } from "react";
import { VscDebugConsole } from "react-icons/vsc";

const ProfilePicture = (props: any) => {

  let profilePictureLink = "defaultProfilePicture.jpg";
  return (
    <div>
      <img
        style={{ width: "160px", height: "160px", margin: "10px" }}
        src={`https://footballtypersa.blob.core.windows.net/imgs/${props.imgLink ? props.imgLink : profilePictureLink}`}
      />
    </div>
  );
};

export default ProfilePicture;
