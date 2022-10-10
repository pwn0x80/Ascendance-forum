import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getRelativeFilePath,
  getRootDirectory,
  getSkylinkUrlForPortal,
  SkynetClient,
} from "skynet-js";
import "./floatingUploadBar.css";
export default function FloatingUploadBar({ uploadBoxClose }) {
  const [fileDetail, setfileDetail] = useState();
  const [url, setUrl] = useState(false);
  const [next, setNext] = useState(true);
  const [inputs, setInputs] = useState({});

  const userState = useSelector(state => state.user);
  const onUploadProgress = (progress, { loaded, total }) => {
    console.info(`Progress ${Math.round(progress * 100)}%`);
  };

  const uploadFolderTrigger = async (e) => {
    const portal =
      window.location.hostname === "localhost"
        ? "https://siasky.net"
        : undefined;
    const client = new SkynetClient(portal, { onUploadProgress });

    console.log(e.target.files.length);
    console.log(e.target.files.length);
    let len = e.target.files.length;
    let files = [];
    for (let i = 0; i < len; i++) {
      console.log(e.target.files);

      let name = e.target.files[i].name;
      let size = e.target.files[i].size;
      let location = e.target.files[i].webkitRelativePath;
      files.push({ name, size, location });
    }
    setfileDetail(files);
    setInputs((values) => ({ ...values, fileDetail: files, uploaderId: userState.userInfo.gId }));

    console.log(files);
    try {
      const filename = getRootDirectory(e.target.files[0]);

      const directory = files.reduce((accumulator, file) => {
        const path = getRelativeFilePath(file);

        return { ...accumulator, [path]: file };
      }, {});
      console.log(directory);
      const { skylink } = await client.uploadDirectory(directory, filename);
      console.log(skylink);
      const url = await client.getSkylinkUrl(skylink);
      console.log(url);
      setUrl(url);
      setInputs((values) => ({ ...values, link: url }));
    } catch (error) {
      console.log(error);
    }
  };
  // when data change when data put in input 
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name);
    console.log(value);
    console.log(inputs);

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(inputs))
    fetch("http://localhost:4000/api/", {
      method: "POST",

      credentials: "include",
      body: JSON.stringify({ body: inputs }),

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

    })
    alert(inputs);
  };
  const course = [
    "Computer Science Engineering",
    "Aeronautical Engineering",
    "Electrical Engineering	",
    "Chemical Engineering	",
    "Electronics and Communication Engineering",
    "Automobile Engineering	",
    "Aerospace Engineering	",
    "Mechanical Engineering",
    "Chemical Engineering",
    "Industrial Engineering",
    "Petroleum Engineering",
    "Civil Engineering",
    "Electronics Engineering",
    "Marine Engineering",
  ];
  return (
    <div className="LightBackground">
      {next ? (
        <div className="uploadContainer">
          <div className="titleCloseBtn">
            <button onClick={() => uploadBoxClose(false)}>X</button>
          </div>
          <div className="title">
            <input
              type="file"
              directory=""
              webkitdirectory=""
              multiple
              onChange={uploadFolderTrigger}
            />
          </div>
          <div className="uploadList">
            <hr />
            <div>
              {fileDetail &&
                fileDetail.map((e) => (
                  <li key={e.name}>
                    Name:{"   "} {e.name}
                    <br /> Location:{e.location}
                    <br />
                    Size: {e.size}
                    <hr className="line" />
                  </li>
                ))}
            </div>
          </div>
          <div className="footer">
            {url ? <button onClick={() => setNext(false)} >next</button> : <button style={{ background: "grey", color: "white" }}>next</button>}

          </div>
        </div>
      ) : (
        <div className="uploadContainer">
          <div className="titleCloseBtn">
            <button onClick={() => uploadBoxClose(false)}>X</button>
          </div>
          <div className="title">
            <p>Add Detail</p>
          </div>
          <div className="uploadList">
            <p></p>
            <hr className="line" />
            Is going:
            <br />
            <form onSubmit={handleSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={inputs.title || ""}
                  onChange={handleChange}
                />
              </label>
              <label>
                Descriptions:
                <input
                  type="text"
                  name="desc"
                  value={inputs.desc || ""}
                  onChange={handleChange}
                />
              </label>
              <label>
                Subject:
                <input
                  type="text"
                  name="subject"
                  value={inputs.subject || ""}
                  onChange={handleChange}
                />
              </label>
              <label>
                College:
                <input
                  type="text"
                  name="college"
                  value={inputs.college || ""}
                  onChange={handleChange}
                />
              </label>
              Branch
              <select name="branch" onChange={handleChange}>
                {course.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
              <input type="submit" />
            </form>
          </div>
          <div className="footer">
            <button onClick={() => setNext(false)}>hhh</button>
          </div>
        </div>
      )}
    </div>
  );
}
