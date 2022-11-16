
const ProfilePicture = (props: any) => {

  let profilePictureLink = "https://footballtypersa.blob.core.windows.net/imgs/defaultProfilePicture.jpg";
  return (
    <div>
      <img
        style={{ width: "160px", height: "160px", margin: "10px", borderRadius: '80px', border: '2px solid black' }}
        src={props.imgLink ? props.imgLink : profilePictureLink}
      />
    </div>
  );
};

export default ProfilePicture;
