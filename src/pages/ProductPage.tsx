import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductDetail from '../components/ProductDetails'; 
import Banner from '../components/Banner';

const ProductPage = () => {
  const { id = '' } = useParams<{ id: string }>();
  return (
    <div className="max-w-screen-xl mx-auto">
      <Banner />
      <Header />
      <ProductDetail productId={id} />
      <Footer />
    </div>
  );
}
export default ProductPage;