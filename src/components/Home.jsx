import { Link } from "react-router";

function Home() {
    return (
        <>
            <h1>Welcome!</h1>
            <Link to="/products">Products</Link>
        </>
    )
}

export default Home;