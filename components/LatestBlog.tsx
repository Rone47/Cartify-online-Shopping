import React from "react";
import Title from "./Title";
import { getLatestBlogs } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();
  return (
    <div className="mb-10 lg:mb-20">
  <Title>Latest Blog</Title>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
    {blogs?.map((blog) => (
      <div key={blog?._id} className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
        {blog?.mainImage && (
          <Link href={`/blog/${blog?.slug?.current}`}>
            <Image
              src={urlFor(blog?.mainImage).url()}
              alt="blogImage"
              width={500}
              height={500}
              className="w-full h-60 object-cover"
            />
          </Link>
        )}
        <div className="p-5">
          <div className="text-xs flex items-center justify-between text-gray-500 mb-2">
            <div className="flex items-center gap-2">
              {blog?.blogcategories?.map((item, index) => (
                <p
                  key={index}
                  className="font-medium text-sm text-green-700 hover:text-green-900 transition-colors duration-200"
                >
                  {item?.title}
                </p>
              ))}
            </div>
            <p className="flex items-center gap-1 text-gray-400 text-sm">
              <Calendar size={15} />
              {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
            </p>
          </div>
          <Link
            href={`/blog/${blog?.slug?.current}`}
            className="block text-base font-semibold tracking-wide text-gray-800 mt-2 hover:text-green-800 transition-colors duration-200 line-clamp-2"
          >
            {blog?.title}
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default LatestBlog;