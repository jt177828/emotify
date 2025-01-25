import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Webcam = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
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

  const handleNavigate = () => {
    navigate("/playlist");
    captureImage;
  };

  const uploadImage = async () => {
    if (!capturedImage) return;

    try {
      const blob = await fetch(capturedImage).then((res) => res.blob());
      const formData = new FormData();
      formData.append("image", blob, "captured_image.png");

      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <video className="rounded-3xl"
        ref={videoRef}
        autoPlay
        muted
      ></video>

      <button className="px-3 py-3 border border-gray-200 text-white font-medium rounded-2xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition-all duration-200 ease-in-out align-center  "
        onClick={handleNavigate}>
        Go!
      </button>
    </div>
  );
};

export default Webcam;
