import React, { useState } from 'react';

const PhotoUpload = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentPhoto(reader.result);
        setPhotos((prevPhotos) => [...prevPhotos, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    setCurrentPhoto(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">🍽️ "Not Just Tasty, But Insta-Worthy Too!"</h1>
      <h4 className="text-3xl  text-center mb-6">Upload Your Photos & Show Your Taste........</h4>
      <div className="flex flex-col items-center">
        {!currentPhoto ? (
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="mb-4"
          />
        ) : (
          <div className="flex flex-col items-center">
            <img src={currentPhoto} alt="Uploaded" className="w-64 h-64 object-cover rounded-lg mb-4" />
            <button
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        <h2 className="text-2xl font-semibold mt-8">Uploaded Photos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Uploaded ${index + 1}`}
              className="w-32 h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
