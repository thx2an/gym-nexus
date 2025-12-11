"use client";

/**
 * Request webcam access
 * @param {HTMLVideoElement} videoElement
 * @param {Object} options
 */
export async function startCamera(videoElement, options = {}) {
  const constraints = {
    audio: false,
    video: {
      facingMode: options.facingMode || "user",
      width: options.width || 640,
      height: options.height || 480,
    },
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;
    await videoElement.play();
    return stream;
  } catch (err) {
    console.error("Camera error:", err);
    throw new Error("Could not access camera");
  }
}

/**
 * Stop all video tracks
 */
export function stopCamera(videoElement) {
  const stream = videoElement?.srcObject;
  if (!stream) return;

  const tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());

  videoElement.srcObject = null;
}

/**
 * Switch between front & back cameras
 */
export async function switchCamera(videoElement, currentMode = "user") {
  stopCamera(videoElement);
  return startCamera(videoElement, {
    facingMode: currentMode === "user" ? "environment" : "user",
  });
}
