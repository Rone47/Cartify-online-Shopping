import Container from "@/components/Container";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import { getAllBlogs } from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPage = async () => {
  const blogs = await getAllBlogs(6);

  return (
    <div className="bg-white"> {/* Overall background kept clean */}
      <Container>
        <Title>Blog Page</Title>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 md:mt-10">
          {blogs?.map((blog) => (
            <div
              key={blog?._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group"
            >
              {blog?.mainImage && (
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt="blogImage"
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover"
                />
              )}

              <div className="p-5">
                <div className="text-xs flex items-center gap-5 mb-2 text-gray-600">
                  <div className="flex items-center relative group cursor-pointer">
                    {blog?.blogcategories?.map((item, index) => (
                      <p
                        key={index}
                        className="font-semibold text-shop_dark_green tracking-wider"
                      >
                        {item?.title}
                      </p>
                    ))}
                    <span className="absolute left-0 -bottom-1 bg-shop_dark_green/20 inline-block w-full h-[2px] group-hover:bg-shop_dark_green" />
                  </div>

                  <p className="flex items-center gap-1 relative group hover:cursor-pointer hover:text-shop_dark_green transition-colors">
                    <Calendar size={15} />
                    {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                    <span className="absolute left-0 -bottom-1 bg-shop_dark_green/20 inline-block w-full h-[2px] group-hover:bg-shop_dark_green" />
                  </p>
                </div>

                <Link
                  href={`/blog/${blog?.slug?.current}`}
                  className="text-base font-semibold tracking-wide mt-4 block line-clamp-2 text-gray-800 hover:text-shop_dark_green transition-colors duration-200"
                >
                  {blog?.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
