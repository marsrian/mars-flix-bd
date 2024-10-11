"use client"
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FaSquareXTwitter, FaXTwitter } from "react-icons/fa6";

const ShareMovieSocial = ({ _id, movieCategory }) => {
  // Twitter Share:
  const handleTWitterShare = () => {
    const twitterShareURL = `https://x.com/share?url=https://marsflixbd.vercel.app/${movieCategory}/${_id}`;

    window.open(
      twitterShareURL,
      "popup",
      "width=500, height=500, left=500, top=100"
    );
  };

  // Facebook share:
  const handleFacebookShare = () => {
    const fbShareURL = `https://www.facebook.com/sharer.php?u=marsflixbd.vercel.app/${movieCategory}/${_id}`;

    window.open(
      fbShareURL,
      "popup",
      "width=500, height=500, left=500, top=100"
    );
  };

  // Whatsapp share:
  const handleWhatsappShare = () => {
    const whatsappShareURL = `https://web.whatsapp.com/send?text=https://marsflixbd.vercel.app/${movieCategory}/${_id}`;

    window.open(
      whatsappShareURL,
      "popup",
      "width=500, height=500, left=300, top=100"
    );
  };
  
  return (
    <div className="flex items-center gap-4 mt-10">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Share With:</h2>
      <div className="flex gap-3">
        <button
          className="text-blue-600 text-2xl hover:text-blue-700"
          onClick={() => handleFacebookShare()}
        >
          <FaFacebook />
        </button>
        <button
          className="text-green-500 text-2xl hover:text-green-300"
          onClick={() => handleWhatsappShare()}
        >
          <FaWhatsapp />
        </button>
        <button
          className="text-2xl hover:text-gray-500"
          onClick={() => handleTWitterShare()}
        >
          <FaXTwitter />
        </button>
      </div>
    </div>
  );
};

export default ShareMovieSocial;