
import React, { useEffect, useRef, useState } from 'react';

interface VirtualMirrorProps {
    onClose: () => void;
}

const VirtualMirror: React.FC<VirtualMirrorProps> = ({ onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let stream: MediaStream | null = null;
        
        const startCamera = async () => {
            try {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } else {
                    setError("Tu navegador no soporta el acceso a la cámara.");
                }
            } catch (err) {
                console.error("Error al acceder a la cámara:", err);
                setError("No se pudo acceder a la cámara. Revisa los permisos.");
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative p-4">
                <h3 className="text-lg font-bold text-center mb-2 text-slate-800">Espejo Virtual</h3>
                {error ? (
                    <div className="aspect-video bg-slate-200 flex items-center justify-center rounded-lg text-red-500 p-4">
                        {error}
                    </div>
                ) : (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg aspect-video object-cover transform -scale-x-100"
                    />
                )}
                 <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-slate-200 rounded-full p-1.5 hover:bg-slate-300 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default VirtualMirror;