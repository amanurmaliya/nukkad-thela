import React from 'react'

const FileUpload = () => {
  return (
    <div><form action="http://localhost:4000/api/v1/vendor/photoupload" method="post" encType="multipart/form-data">
    <input type="file" name="shopphoto" />
    <button type="submit">Submit</button>
</form></div>
  )
}

export default FileUpload