import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';
import Navbar from './Navbar';
import storage from '../services/storage';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const history = useHistory();

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      const response = await api.get(`https://fakestoreapi.com/products?page=${page}&limit=${limit}`);
      setProducts(response.data);
      console.log(response)
      console.log(response.data);
      setTotal(response.data.total);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        storage.removeToken();
        history.push('/login');
      }
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={page * limit >= total}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList; 