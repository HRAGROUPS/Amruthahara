import { Link } from "react-router-dom";

function Categories() {
  return (
    <main>
      <h1>Categories</h1>
      <p>Explore our natural food collection.</p>
      <Link to="/products">Browse products</Link>
    </main>
  );
}

export default Categories;
