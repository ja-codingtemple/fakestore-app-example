import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router";

{/*
    Here, we define our component with an arrow function rather than traditional function declaration syntax.
    Both approaches are valid and acceptable, although arrow functions are more common and favored in modern React development.
*/}
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    {/* 
        - On component render, request all products from the FakeStoreAPI, store them in 'products' and set 'loading' to false upon completion.
        - The reason we're making our HTTP request inside of useEffect() is because useEffect() runs after the initial component render.
        - We don't want our UI to have to wait on a response from the API before rendering.
        - The empty dependency array means the HTTP request to the API will only be made once, rather than the request occuring upon every re-render of the component.
        - The UI is automatically updatd upon any changes in state, meaning, when the products list is updated, the UI will update to reflect those changes.
    */ }
    useEffect(() => {
        axios
            .get("https://fakestoreapi.com/products")
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to fetch products");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <Row>
                {/* Loop through the products and for each product display individual product properties. */}
                {products.map((product) => (
                    <Col key={product.id} md={4} className="mb-3">
                        <Card>
                            <Card.Img variant="top" src={product.image} alt={product.title} />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>${product.price}</Card.Text>
                            </Card.Body>
                            <Link className="custom-button" to={`/products/${product.id}`}>View Details</Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container >
    );
};

export default ProductList;
