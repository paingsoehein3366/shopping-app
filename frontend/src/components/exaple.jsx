import React, { useState } from "react";


export default function Exaple() {
  const [file, setFile] = useState(null);
    console.log("file: ",file);
  const handleChange = function loadFile(e) {
    if (e.target.files.length > 0) {
      const file = URL.createObjectURL(e.target.files[0]);
      setFile(file);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleChange} id="upload" accept="image/*" />
      <label htmlFor="upload">
        <div>
          <img alt="uploadImage" src={file} />
        </div>
      </label>
    </div>
  );
}