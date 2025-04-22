import React, { useEffect, useState } from "react";
import "./ProductList.css"; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(6); 
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // URL dinamico per chiamata API
  const [urlProducts, setUrlProducts] = useState(
    `https://dummyjson.com/products?limit=${limit}&skip=${limit * (page - 1)}&select=title,category,price,thumbnail,brand`
  );

  // Aggiorna URL quando cambiano page o limit
  useEffect(() => {
    setUrlProducts(
      `https://dummyjson.com/products?limit=${limit}&skip=${limit * (page - 1)}&select=title,category,price,thumbnail,brand`
    );
  }, [page, limit]);

  // Chiamata API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(urlProducts);
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Errore nel fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [urlProducts]);

  return (
    <div className="container">
      <h1>Prodotti</h1>

      <div className="card-grid">
        {loading ? (
          <p>Caricamento...</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="card">
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p><strong>Marca:</strong> {product.brand}</p>
              <p><strong>Categoria:</strong> {product.category}</p>
              <p><strong>Prezzo:</strong> ${product.price}</p>
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Precedente
        </button>
        <span>Pagina {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>
          Successiva
        </button>
      </div>
    </div>
  );
};

export default ProductList;
