import React, { useEffect, useRef, useState } from 'react';

const VideoCapture = () => {
    const videoRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        // Comprobar si ya se concedieron permisos anteriormente
        if (localStorage.getItem('cameraPermission') === 'granted') {
            setHasPermission(true);
            initCamera();
        } else {
            requestCameraPermission();
        }
    }, []);

    const initCamera = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                })
                .catch(error => {
                    console.log("Error accessing the camera:", error);
                });
        }
    };

    const requestCameraPermission = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(() => {
                    // Guardar permiso en localStorage
                    localStorage.setItem('cameraPermission', 'granted');
                    setHasPermission(true);
                    initCamera();
                })
                .catch(() => {
                    console.log("Permission denied or camera not available.");
                    localStorage.setItem('cameraPermission', 'denied');
                });
        }
    };

    return (
        <div>
            {hasPermission ? (
                <video ref={videoRef} width="640" height="480" />
            ) : (
                <button onClick={requestCameraPermission}>Enable Camera</button>
            )}
        </div>
    );
};

export default VideoCapture;

