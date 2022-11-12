import React, { useState } from "react";

const ProfilePicture = () => {
  const getProfilePictureLink = () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : "";
    console.log("User: ", user);

    let profilePictureLink = "defaultProfilePicture.jpg";
    if (user) {
      if (user.imgLink !== null) {
        profilePictureLink = user.imgLink;
      }
    }
    return `https://footballtypersa.blob.core.windows.net/imgs/${profilePictureLink}`;
  };

  return (
      <div>
        <img
          style={{ width: "160px", height: "160px", margin: "10px" }}
          src={getProfilePictureLink()}
        />
      </div>
  );
};

export default ProfilePicture;
