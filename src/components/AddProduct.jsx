import axios from "axios";
import { useState } from "react"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


const AddProduct = () => {
    const [product, setProduct] = useState();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        image: '',
    });

    {/* Handle changes to the form inputs. */}
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    {/* Handle the form submission. */}
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://fakestoreapi.com/products', formData);
            console.log(response.data);
            setProduct(response.data);
            setSubmitted(true);
            setError(null);
        } catch (err) {
            setError(`Error submitting the form. Please try again: ${err.message}`);
            setSubmitted(false);
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <Container className="mt-5">
            <h2 className="mb-5">Add Product</h2>

            {submitted && <Alert variant="success" dismissible>{product.title} created successfully!</Alert>}
            {error && <Alert variant="danger" dismissible>{error}</Alert>}

            <Form onSubmit={handleSubmit}>

                {/* Title */}
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter a title" name="title" value={formData.title} onChange={handleChange} required />
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter a description" name="description" value={formData.description} onChange={handleChange} required />
                </Form.Group>

                {/* Category */}
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Enter a category" name="category" value={formData.category} onChange={handleChange} required />
                </Form.Group>

                {/* Price */}
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" placeholder="Enter a price" name="price" value={formData.price} onChange={handleChange} required />
                </Form.Group>

                {/* Image URL */}
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" placeholder="Enter a image url" name="image" value={formData.image} onChange={handleChange} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </Container>
    );
}

export default AddProduct;