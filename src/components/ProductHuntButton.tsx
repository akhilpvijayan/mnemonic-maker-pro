import React from 'react';
import { Rocket, ArrowUpRight } from 'lucide-react';

interface ProductHuntButtonProps {
  productUrl: string;
}

const ProductHuntButton: React.FC<ProductHuntButtonProps> = ({ productUrl }) => {
  const handleClick = () => {
    window.open(productUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button onClick={handleClick} className="producthunt-btn-elegant">
      <Rocket size={16} />
      <span className="producthunt-text">Featured on Product Hunt</span>
      <ArrowUpRight size={14} className="producthunt-arrow" />
    </button>
  );
};

export default ProductHuntButton;