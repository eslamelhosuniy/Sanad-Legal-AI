import { X } from "lucide-react";

function PopUp({
  onClose,
  children,
}: {
  onClose: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white relative p-6 rounded-lg shadow-lg max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-0 right-1 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-7 h-7" />
        </button>
        <p className="text-gray-800 text-2xl text-center">{children}</p>
      </div>
    </div>
  );
}

export default PopUp;
