import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import { Image, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './SingleProduct.css';
import { useParams } from 'react-router-dom';

export default function SingleProduct() {
  let {productId} = useParams();
  //get product images and info from firebase
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const dbRef = ref(getDatabase());

    //put Links in pages with product list so each of the products links to this page with the product id in the link to this page
    //make sure the route on the app.js is updated so it says /singleproduct:id
    //use the useparams method to get the productid and then use that in the below get method to get the specific product clicked
    //then use the product to get the userId associated with it and use it in the get method for the user

    get(child(dbRef, `Products/${productId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const productData = snapshot.val();
          setProduct(productData);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

      get(child(dbRef, `Users/${product.userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUser(userData);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);
  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!product || !user) {
    return (
      <div>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div>
      {loading === false ? (
        <div> 
        <div className="profilepic">
        <Image src={user['Profile Image']} roundedCircle />
        </div>
        <Carousel>
          <Carousel.Item>
            <img src={product['Image']} />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={product['Image']} />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={product['Image']} />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <p className="itemDesc">
          Name: {product['ProductName']}
        </p>
        <p className="itemDesc">
          {product['Description']}
        </p>
        <p className="itemDesc">
          ${product['Price']}
        </p>
        </div>
      ) : (
        <div> Loading </div>
      )}
      
    </div>
  );
}
