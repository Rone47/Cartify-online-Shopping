import React from 'react';
import { getProductBySlug } from '@/sanity/queries';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import ImageView from '@/components/ImageView';


const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return notFound();
  } 
  
  return (
    <Container className="flex flex-col md:flex-row gap-10 py-10">
     {product?.images && (
        <ImageView images={product?.images} isStock={product?.stock} />
      )}

     <div className="w-full md:w-1/2 flex flex-col gap-5">Details</div>
    </Container>
  )
}

export default SingleProductPage
