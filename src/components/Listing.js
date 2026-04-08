import React from 'react';

const truncateTitle = (title) => {
  if (!title) return '';
  return title.length > 50 ? title.slice(0, 50) + '…' : title;
};

const formatPrice = (price, currencyCode) => {
  switch (currencyCode) {
    case 'USD':
      return `$${price}`;
    case 'EUR':
      return `€${price}`;
    case 'GBP':
      return `£${price}`;
    default:
      return `${currencyCode} ${price}`;
  }
};

const getStockClass = (quantity) => {
  if (quantity <= 10) return 'stock-low';
  if (quantity <= 20) return 'stock-medium';
  return 'stock-high';
};

function Listing({ items = [] }) {
  return (
    <div className="product-grid">
      {items.map((item) => {
        if (!item || !item.listing_id || !item.MainImage) {
          return null;
        }

        const imageUrl = item.MainImage.url_570xN;
        const title = truncateTitle(item.title);
        const price = formatPrice(item.price, item.currency_code);
        const stockClass = getStockClass(item.quantity);
        
        const stockText = `${item.quantity} left`;

        return (
          <div key={item.listing_id} className="product-card">
            {item.is_digital && (
              <span className="digital-badge">Digital</span>
            )}
            <img src={imageUrl} alt={title} className="product-image" />
            <div className="product-info">
              <h3 className="product-title">{title}</h3>
              <div className="price-container">
                <div className="product-price">{price}</div>
                <span className={`stock-badge ${stockClass}`}>
                  {stockText}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Listing;