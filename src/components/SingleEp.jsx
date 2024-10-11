import Link from "next/link";

const SingleEp = ({ episode, index }) => {
    return (
      <>
        {episode && (
          <li>
            <Link
              className="bg-gray-900 hover:bg-gray-700 text-white rounded-sm px-6 py-2"
              href={episode.episodeLink}
              target="blank"
            >
             Episode {episode && index + 1}
            </Link>
          </li>
        )}
      </>
    );
  };
  
  export default SingleEp;