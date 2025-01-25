import React, { useRef, useState, useEffect } from "react";

const Webcam = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    };

    getMedia();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth; // Match canvas size to video dimensions
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height); // Draw the current video frame to the canvas

      // Convert the canvas content to a data URL
      const imageDataUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageDataUrl); // Save the image in the state
    }
  };

  return (
    <div>
      {/* Webcam video */}
      <video
        ref={videoRef}
        autoPlay
        muted
      ></video>

      {/* Hidden canvas for capturing the image */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {/* Button to take a picture */}
      <button className='object-center'
        onClick={captureImage}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          cursor: "pointer",
        }}
      >
        Take Picture
      </button>

    </div>
  );
};

export default Webcam;
