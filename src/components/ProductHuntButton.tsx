import React from 'react';

interface ProductHuntButtonProps {
  productUrl: string;
}

const ProductHuntButton: React.FC<ProductHuntButtonProps> = ({ productUrl }) => {
  const handleClick = () => {
    window.open(productUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button onClick={handleClick} className="producthunt-badge">
      <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ph-logo">
        <circle cx="20" cy="20" r="20" fill="#DA552F"/>
        <path d="M20 10C14.48 10 10 14.48 10 20C10 25.52 14.48 30 20 30C25.52 30 30 25.52 30 20C30 14.48 25.52 10 20 10ZM22.5 22.5H18.75V26.25H16.25V13.75H22.5C24.57 13.75 26.25 15.43 26.25 17.5V18.75C26.25 20.82 24.57 22.5 22.5 22.5ZM22.5 16.25H18.75V20H22.5V16.25Z" fill="white"/>
      </svg>
      <div className="ph-text-container">
        <span className="ph-featured">FEATURED ON</span>
        <span className="ph-title">Product Hunt</span>
      </div>
      <div className="ph-arrow">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </button>
  );
};

export default ProductHuntButton;