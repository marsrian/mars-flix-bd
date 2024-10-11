import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiTwotoneCalendar,
} from "react-icons/ai";

const CategoryByPost = ({ blog }, searchParams) => {
  const { title, image, excerpt, _id, category, likes, comments, createdAt } = blog;
  return (
    <Link
      href={`/blog/categories/${_id}?category=${category}`}
      className="border p-2 md:p-4 rounded-sm flex space-x-4"
    >
      <div className="w-28 h-20">
        <Image
          src={image?.url}
          width={200}
          height={100}
          alt={title}
          className="w-full h-full"
        />
      </div>
      <div className="h-20">
      <h3 className="font-semibold leading-6 mb-2">{title}</h3>
      <p className="text-sm hidden md:block">{excerpt.slice(0, 100)}...</p>
      <div className="flex justify-between mt-2">
          <p className="bg-blue-400 px-3 rounded-full text-white font-medium hidden md:block">
            {category}
          </p>
          <p className="flex items-center gap-1">
            <AiOutlineHeart size={20} />
            {likes.length}
          </p>
          <p className="flex items-center gap-1">
            <AiOutlineComment size={20} />
            {comments.length}
          </p>
          <p className="flex items-center text-gray-500 gap-1">
            <AiTwotoneCalendar />
            {moment(createdAt).format("D MMM YYYY")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryByPost;
