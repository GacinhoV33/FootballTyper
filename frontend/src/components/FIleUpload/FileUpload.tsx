import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState<any>();
  const [fileName, setFileName] = useState<any>();
  //   const apiUrl = "http://localhost:44302/";
  const apiUrl = "";

  const sendHttpRequest = (path: string, formData: any) => {
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch(apiUrl + path, requestOptions)
      .then((response) => {
        console.log("Response: ", response);
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

  const saveFile = (e: any) => {
    console.log("File: ", e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e: any) => {
    console.log(file);
    if (validateFileType()) {
      const formData = new FormData();
      formData.append("File", file);
      formData.append("FileName", fileName);
      sendHttpRequest("api/File", formData);
    }
  };

  const validateFileType = () => {
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
      //TO DO
      return true;
    } else {
      alert("Only jpg/jpeg and png files are allowed!");
      return false;
    }
  };

  return (
    <div>
      <input type="file" onChange={saveFile} accept="image/*" />
      <input type="button" value="upload" onClick={uploadFile} />
    </div>
  );
};

export default FileUpload;
