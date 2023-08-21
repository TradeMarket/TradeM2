import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../public/Styles.css';

export default function About() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Container className="mx-auto" style={{ maxWidth: '100%' }}>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="text-center">
              <h1
                className="display-2 mt-5 mb-4 text-dark"
                style={{ textDecoration: 'underline' }}>
                About Us
              </h1>

              <img
                src="Background1.jpg"
                alt="About Us"
                className="img-fluid mb-4"
                style={{ width: '80%', height: '600px' }}
              />

              <p
                className="lead mb-5 text-black"
                style={{
                  fontSize: '22px',
                }}>
                Welcome to our platform! We are dedicated to providing a
                seamless and secure experience for users to sell their unwanted
                goods locally. Our mission is to create a sustainable
                marketplace that fosters community engagement and promotes
                responsible consumption.
              </p>
              <div className="bg-light rounded p-4 mb-4">
                <h2
                  className="text-dark text-start display-4"
                  style={{ textDecoration: 'underline' }}>
                  Our Vision
                </h2>
                <p
                  className="text-black mb-0"
                  style={{
                    fontSize: '22px',
                  }}>
                  At our core, we envision a world where people can easily find
                  new homes for their pre-loved items, reducing waste and
                  minimizing the impact on the environment. We believe in the
                  power of local communities to support each other, and through
                  our platform, we aim to strengthen these bonds while promoting
                  sustainable living.
                </p>
              </div>

              <div className="bg-light rounded p-4 mb-4">
                <h2
                  className="text-dark text-end display-4"
                  style={{ textDecoration: 'underline' }}>
                  How It All Started
                </h2>
                <p
                  className="text-black mb-0"
                  style={{
                    fontSize: '22px',
                  }}>
                  Our journey began with a simple idea: to make selling and
                  buying local goods as effortless as possible. We noticed the
                  growing trend of people seeking alternatives to traditional
                  online marketplaces, and we saw an opportunity to create a
                  platform that caters specifically to the needs of local
                  communities.
                </p>
              </div>

              <div className="bg-light rounded p-4 mb-4">
                <h2
                  className="text-dark text-start display-4"
                  style={{ textDecoration: 'underline' }}>
                  Our Values
                </h2>

                <ul className="about-values-list">
                  <li className="about-values-item">
                    <span className="about-value-icon">Transparency:</span>
                    <span className="about-value-content">
                      We value openness and honesty. Our platform is built on a
                      foundation of trust, ensuring that every user has a safe
                      and transparent experience.
                    </span>
                  </li>

                  <li className="about-values-item">
                    <span className="about-value-icon">Community:</span>
                    <span className="about-value-content">
                      {' '}
                      We are committed to building strong, vibrant communities.
                      Through our platform, users can connect with their
                      neighbors, fostering a sense of camaraderie and support.
                    </span>
                  </li>
                  <li className="about-values-item">
                    <span className="about-value-icon">Sustainability:</span>
                    <span className="about-value-content">
                      {' '}
                      We care deeply about the environment and want to play our
                      part in reducing waste. By promoting the reuse of goods,
                      we strive to contribute to a greener future.
                    </span>
                  </li>
                  <li className="about-values-item">
                    <span className="about-value-icon">Convenience:</span>
                    <span className="about-value-content">
                      {' '}
                      Selling your unwanted items should be hassle-free. We've
                      designed our platform to be user-friendly, so you can list
                      your items quickly and easily.
                    </span>
                  </li>
                  {/* ... (other list items) ... */}
                </ul>
              </div>

              <div className="bg-light rounded p-4 mb-4">
                <h2
                  className="text-dark text-end display-4"
                  style={{ textDecoration: 'underline' }}>
                  Our Promise
                </h2>
                <p
                  className="text-dark  mb-0"
                  style={{
                    fontSize: '18px',
                  }}>
                  As we grow, our commitment to our users remains unwavering. We
                  promise to continuously improve and refine our platform,
                  taking into account your valuable feedback. We are here to
                  listen and to ensure that your experience on our platform is
                  nothing short of exceptional.
                </p>
                <p
                  className="text-dark mb-0"
                  style={{
                    fontSize: '18px',
                  }}>
                  Join us in our mission to create a thriving marketplace that
                  supports local communities and embraces sustainable practices.
                  Together, we can make a positive impact on the world, one item
                  at a time.
                </p>
              </div>

              <p
                className="text-black"
                style={{
                  fontSize: '18px',
                }}>
                Thank you for being a part of our journey.
              </p>
              <p
                className="text-black"
                style={{
                  fontSize: '24px',
                }}>
                Team TradeM
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
