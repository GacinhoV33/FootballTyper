
const ProfilePicture = (props: any) => {

  let profilePictureLink = "https://footballtypersa.blob.core.windows.net/imgs/defaultProfilePicture.jpg";
  return (
    <div>
      <img
        style={{ width: "160px", height: "160px", margin: "10px" }}
        src={props.imgLink ? props.imgLink : profilePictureLink}
      />
    </div>
  );
};

export default ProfilePicture;
