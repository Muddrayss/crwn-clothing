import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../product-card/product-card.component';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div className='category-container'>
      <h2 className='category-title'>{category}</h2>
      <div className='products'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Category;
