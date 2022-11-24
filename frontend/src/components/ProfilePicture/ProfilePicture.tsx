
const ProfilePicture = (props: any) => {

  let profilePictureLink = "https://footballtypersa.blob.core.windows.net/imgs/defaultProfilePicture.jpg";
  return (
    <div style={{border: '1px solid #333', borderRadius: '90.5px', marginTop: '1vh',  boxShadow: '1px 1px 2px 2px lightblue'}}>
      <img
        style={{ width: "160px", height: "160px", margin: "10px", borderRadius: '80px'}}
        src={props.imgLink ? props.imgLink : profilePictureLink}
      />
    </div>
  );
};

export default ProfilePicture;
