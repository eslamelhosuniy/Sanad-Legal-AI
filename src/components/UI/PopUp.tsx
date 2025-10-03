import { X } from "lucide-react";

function PopUp({
  onClose,
  children,
}: {
  onClose: () => void;
  children?: React.ReactNode;
}) {

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
  
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white relative p-6 rounded-lg shadow-lg max-w-xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-1 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-7 h-7" />
        </button>
        <div className="text-gray-800 text-md">{children}</div>
      </div>
    </div>
  );
}

export default PopUp;
