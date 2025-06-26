import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      description: "Specify the currency (e.g. USD, KES, EUR, etc.)",
      validation: (Rule) => Rule.required().min(2).max(5),
    }),
    defineField({
      name: "discount",
      title: "Discount",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: { type: "brand" },
    }),
    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Hot", value: "hot" },
          { title: "Sale", value: "sale" },
        ],
      },
    }),
    defineField({
      name: "variant",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "Smartphones & Tablets", value: "smartphones-tablets" },
          { title: "Laptops & Accessories", value: "laptops-accessories" },
          { title: "TV, Audio & Video", value: "tv-audio-video" },
          { title: "Wearable Tech", value: "wearable-tech" },
          { title: "Gaming & Consoles", value: "gaming-consoles" },

          { title: "Refrigerators & Freezers", value: "refrigerators-freezers" },
          { title: "Washing Machines & Dryers", value: "washing-dryers" },
          { title: "Cookers & Ovens", value: "cookers-ovens" },
          { title: "Small Kitchen Appliances", value: "small-kitchen-appliances" },
          { title: "Air Conditioners & Fans", value: "air-conditioners-fans" },

          { title: "Men's Fashion", value: "mens-fashion" },
          { title: "Women's Fashion", value: "womens-fashion" },
          { title: "Shoes & Footwear", value: "shoes-footwear" },
          { title: "Watches & Accessories", value: "watches-accessories" },
          { title: "Bags & Luggage", value: "bags-luggage" },

          { title: "Skincare & Makeup", value: "skincare-makeup" },
          { title: "Fragrances", value: "fragrances" },
          { title: "Hair Care", value: "hair-care" },
          { title: "Health & Wellness", value: "health-wellness" },

          { title: "Diapers & Baby Essentials", value: "baby-essentials" },
          { title: "Kids Fashion", value: "kids-fashion" },
          { title: "Toys & Games", value: "toys-games" },

          { title: "Furniture", value: "furniture" },
          { title: "Home Decor", value: "home-decor" },
          { title: "Lighting", value: "lighting" },
          { title: "Bedding & Bath", value: "bedding-bath" },

          { title: "Food Cupboard", value: "food-cupboard" },
          { title: "Beverages", value: "beverages" },
          { title: "Cleaning Supplies", value: "cleaning-supplies" },
          { title: "Personal Care", value: "personal-care" },

          { title: "Car Accessories", value: "car-accessories" },
          { title: "Motorcycle Parts & Gear", value: "motorcycle-parts" },
          { title: "Lubricants & Oils", value: "lubricants-oils" },

          { title: "Books & Stationery", value: "books-stationery" },
          { title: "Sporting Goods", value: "sporting-goods" },
          { title: "Garden & Outdoors", value: "garden-outdoors" },

          { title: "Other Products", value: "others" }
        ],
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Product",
      type: "boolean",
      description: "Toggle to Featured on or off",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images",
      price: "price",
      currency: "currency",
    },
    prepare(selection) {
      const { title, price, currency, media } = selection;
      const image = media && media[0];
      return {
        title,
        subtitle: `${currency} ${price}`,
        media: image,
      };
    },
  },
});
