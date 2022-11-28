import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import "./ArchiveList.scss";

export interface BlobFile {
  name: string;
  url: string;
  DateCreated: Date;
}

const ArchiveList = () => {
  const API_URL =
    process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === "true"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;
  const [betFilesList, setBetFilesList] = useState<BlobFile[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const fetchData = async () => {
    const betExcelFileList: BlobFile[] = await (
      await fetch(API_URL + `api/File/BetsExcel`)
    ).json();
    if (betExcelFileList.length > 0) {
      setBetFilesList(betExcelFileList);
    } else {
      setErrorMsg("No files available at the moment");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>

      <h2 style={{ margin: "10px" }}>Bets archive list</h2>
      <ul>
        {betFilesList
          ? betFilesList?.map((file, idx) => {
              return (
                <li key={idx}>
                  {file.name}
                  <a
                    href={file.url}
                    download={file.name}
                    className="btn btn-primary"
                    style={{
                      display: "inline",
                      margin: "10px"
                    }}
                  >
                    Download
                  </a>
                </li>
              );
            })
          : errorMsg}
      </ul>
    </div>
  );
};

export default ArchiveList;
