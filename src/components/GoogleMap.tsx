// src/components/GoogleMap.tsx

// Props interface for better type-safety
interface GoogleMapProps {
  embedUrl: string;
  className?: string;
}

const GoogleMap = ({ embedUrl, className = '' }: GoogleMapProps) => {
  return (
    // Main container with responsive width, rounded corners, and shadow
    <div className={`w-full overflow-hidden rounded-xl shadow-lg ${className}`}>
      <iframe
        src={embedUrl}
        className="w-full h-[450px]" // 100% width and fixed 450px height
        style={{ border: 0 }} // Removes the default iframe border
        allowFullScreen={true}
        loading="lazy" // Lazy loading for better performance
        referrerPolicy="no-referrer-when-downgrade"
        title="Responsive Google Map" // Title for accessibility
      ></iframe>
    </div>
  );
};

export default GoogleMap;
