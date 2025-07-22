"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { emptyCart } from "@/images";
import Image from "next/image";

export default function EmptyCart() {
  return (
    <div className="py-10 md:py-20 bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-8"
      >
        {/* Animated Image Block */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
          className="relative w-48 h-48 mx-auto"
        >
          <Image
            src={emptyCart}
            alt="Your shopping cart is empty"
            layout="fill"
            objectFit="contain"
            className="drop-shadow-xl"
          />

          {/* Animated Shopping Cart Icon */}
          <motion.div
            animate={{
              x: [0, -8, 8, 0],
              y: [0, -4, 4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: "easeInOut",
            }}
            className="absolute -top-4 -right-4 bg-green-900 shadow-lg rounded-full p-2"
          >
            <ShoppingCart size={24} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Text Section */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Oops! Your cart is empty
          </h2>
          <p className="text-gray-600 text-sm">
            Looks like you haven’t picked anything yet. Let’s help you fill it with something great!
          </p>
        </div>

        {/* Call to Action */}
        <div>
          <Link
            href="/shop"
            className="block bg-green-100 border border-green-900 text-center py-2.5 rounded-full text-sm font-semibold tracking-wide text-green-800 hover:border-green-900 hover:bg-green-900 hover:text-white transition-all duration-300"
          >
            Browse Products
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
