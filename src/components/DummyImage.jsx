import React from 'react';

const ImageWithErrorHandling = () => {
  const handleImageError = (event) => {
    // Handle the image loading error here
    // You can set a fallback image or display an error message
    event.target.src = 'assets/linkedin.png'; // Set a fallback image
    // Alternatively, you can show an error message:
    // event.target.style.display = 'none'; // Hide the broken image
    // alert('Image failed to load'); // Display an error message
  };

  return (
    <div>
      <h2>Image with Error Handling</h2>
      <img
        src="/path/to/your-image.png"
        alt="Your Image"
        onError={handleImageError}
      />
    </div>
  );
};

export default ImageWithErrorHandling;
