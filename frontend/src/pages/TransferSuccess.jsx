import { useNavigate } from "react-router-dom";

const TransferSuccess = ({ onGoHome }) => {
  const naviget = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Sent</h2>
        <p className="text-gray-600 mb-4 text-lg">Your transaction has been completed.</p>
        <button
          onClick={() => {
            naviget('/');
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default TransferSuccess;
