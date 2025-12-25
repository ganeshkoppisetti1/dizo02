import React, { useState } from 'react'
import './Mobile.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const Mobile = ({ products, addToCart, buyNow }) => {
  const [wishlist, setWishlist] = useState([])

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="mobiles-grid">
      {products.map(item => (
        <div className="mobile-card" key={item.id}>

          {/* ❤️ Wishlist */}
          <div
            className="wishlist-icon"
            onClick={() => toggleWishlist(item.id)}
          >
            {wishlist.includes(item.id)
              ? <FaHeart className="heart active" />
              : <FaRegHeart className="heart" />
            }
          </div>

          <img src={item.img} alt={item.name} className="mobile-img" />

          <h3 className="mobile-name">
            {item.name}
          </h3>

          {/* Rating */}
          <div className="rating-row">
            <span className="rating-badge">{item.rating} ★</span>
            <span className="count">({item.ratings})</span>
          </div>

          {/* Price */}
          <div className="price-row">
            ₹{item.price.toLocaleString()}
          </div>

          {/* Buttons */}
          <div className="btn-group">
            <button className="add-cart" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
            <button className="buy-now" onClick={() => buyNow(item)}>
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Mobile
