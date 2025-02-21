import { Request, Response } from 'express';
import axios from 'axios';
import { Product, PaginatedResponse } from '../types/product.js';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const response = await axios.get('https://fakestoreapi.com/products');
    const allProducts: Product[] = response.data;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedProducts: PaginatedResponse<Product> = {
      data: allProducts.slice(startIndex, endIndex),
      total: allProducts.length,
      page,
      limit
    };

    res.json(paginatedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
}; 