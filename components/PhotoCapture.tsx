import React, { useRef, useState, useCallback, useEffect } from 'react';

interface PhotoCaptureProps {
    onPhotoTaken: (dataUrl: string) => void;
    onClose: () => void;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onPhotoTaken, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imageData, setImageData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const startCamera = useCallback(async () => {
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } else {
                setError("Tu navegador no soporta el acceso a la cámara.");
            }
        } catch (err) {
            console.error("Error al acceder a la cámara:", err);
            setError("No se pudo acceder a la cámara. Revisa los permisos.");
        }
    }, []);

    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    }, [stream]);

    useEffect(() => {
        startCamera();
        return () => stopCamera();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startCamera]);


    const takePicture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                // Flip the image horizontally for a mirror effect
                context.translate(canvas.width, 0);
                context.scale(-1, 1);
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg');
                setImageData(dataUrl);
                stopCamera();
            }
        }
    };

    const retakePicture = () => {
        setImageData(null);
        startCamera();
    };



    const confirmPicture = () => {
        if (imageData) {
            onPhotoTaken(imageData);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl p-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-slate-700 rounded-full p-1.5 hover:bg-slate-600 transition-colors z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="aspect-square w-full rounded-lg overflow-hidden bg-black flex items-center justify-center">
                    {error && <p className="text-red-400 text-center">{error}</p>}
                    {imageData ? (
                        <img src={imageData} alt="Captura" className="w-full h-full object-cover" />
                    ) : (
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100" />
                    )}
                    <canvas ref={canvasRef} className="hidden" />
                </div>

                <div className="mt-4">
                    {imageData ? (
                        <div className="flex justify-around">
                            <button onClick={retakePicture} className="px-6 py-3 bg-slate-600 text-white font-semibold rounded-full">
                                Repetir
                            </button>
                            <button onClick={confirmPicture} className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full">
                                Guardar
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <button onClick={takePicture} className="w-20 h-20 bg-white rounded-full border-4 border-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"></button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhotoCapture;