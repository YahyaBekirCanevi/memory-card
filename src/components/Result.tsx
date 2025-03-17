import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdRefresh, IoMdHome } from "react-icons/io";
import Confetti from "react-confetti";

type ResultPageProps = {
  fails: number;
  skips: number;
  successes: number;
};

export default function ResultModal({
  fails,
  skips,
  successes,
}: ResultPageProps) {
  const [successRate, setSuccessRate] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    const total = fails + skips + successes;
    if (total > 0) {
      const rate = (successes / total) * 100;
      setSuccessRate(rate);
    }

    setIsVisible(true);
  }, [fails, skips, successes]);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      {/* Confetti Animation */}
      {successRate > 50 && (
        <Confetti
          width={windowWidth}
          height={windowHeight}
          numberOfPieces={400}
          recycle={false}
          gravity={0.6}
          initialVelocityY={10}
          tweenDuration={800}
        />
      )}
      {/* Modal Content */}
      <div
        className={`bg-gradient-to-b from-indigo-500 to-purple-500 text-center p-6 rounded-xl shadow-xl w-80 md:w-96 transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <h1 className="text-4xl font-semibold mb-6">Your Result</h1>
        <div className="text-6xl font-bold text-primary">
          {successRate.toFixed(2)}%
        </div>
        <div className="text-2xl text-secondary my-4 font-semibold">
          {successRate > 50 ? "Great job!" : "Try Again!"}
        </div>
        <div className="text-xl">
          <p>Successes: {successes}</p>
          <p>Fails: {fails}</p>
          <p>Skips: {skips}</p>
        </div>
        <div className="mt-6">
          <p className="text-lg">Keep practicing to improve yourself.</p>
        </div>

        <div className="mt-6 flex justify-center space-x-4 text-background">
          <button
            onClick={handleHome}
            className="px-6 py-3 bg-secondary rounded-full transition"
          >
            <IoMdHome size={32} />
          </button>
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-primary rounded-full transition"
          >
            <IoMdRefresh size={32} />
          </button>
        </div>
      </div>
    </div>
  );
}
