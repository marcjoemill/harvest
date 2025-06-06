export default function ProductCard({ product , handleAddToCart}) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.productImage} alt={product.productName} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.productName}</h3>
        <p className="product-price">{"₱"+ product.productPrice}</p>
        <p className="product-qty">{"Remaning: " + product.productQuantity}</p>
        <p className="product-description">{product.productDescription}</p>
        <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>ADD TO CART</button>
      </div>
    </div>
  );
}