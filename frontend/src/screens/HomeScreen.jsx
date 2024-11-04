import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom'
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Paginate from '../components/Paginate';
import Message from '../components/Message';
import Loader  from "../components/Loader";
import ProductCarousel from '../components/ProductCarousel';


const HomeScreen = () => {

  const { pageNumber, keyword } = useParams();


  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber});

  if (isLoading) {
    return <Loader/>
  }

  if (error) {
    return <Message variant="danger">Error: {error.message}</Message>;
  }

  // Ensure products is an array
  

  return (
    <>
    {!keyword ? <ProductCarousel/> : <Link to="/"  className='btn btn-light my-2'>Go Back</Link>}
     {isLoading? (<div>is Loading</div>): error? (<div>{error?.data.message || error.error}</div>) : (<>
      <h1>Latest Products</h1>
      <Row>
        {data.products?.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
        <Paginate 
         pages = {data.pages}
         page = {data.page}
         isAdmin = {false}
         keyword={keyword}
         />
     </>)}
    </>
  );
};

export default HomeScreen;