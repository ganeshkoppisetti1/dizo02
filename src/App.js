import React, { useState, useEffect } from 'react'
import './App.css'


import logo from './assets/categories/shoppinglogo.jpg'


import Mobile from './components/Mobile'


import midRangeMobiles from './data/midRangeMobiles'


import furnitureDeals from './data/topfurnitures';

import topdealshome  from './data/topdealshome'


import b1 from './assets2/banners/banner1.jpg'
import b2 from './assets2/banners/banner2.jpg'
import b3 from './assets2/banners/banner3.jpg'
import b4 from './assets2/banners/banner4.jpg'
import b5 from './assets2/banners/banner5.jpg'





import top1 from './assets3/topitems/top1.jpg'
import top2 from './assets3/topitems/top9.jpg'
import top3 from './assets3/topitems/top3.jpg'
import top4 from './assets3/topitems/top4.jpg'
import top5 from './assets3/topitems/top5.jpg'
import top6 from './assets3/topitems/top6.jpg'
import top7 from './assets3/topitems/top7.jpg'
import top8 from './assets3/topitems/top10.jpg'



import mobilesCat from './assets/categories/mobile.jpg'
import grocery from './assets/categories/grocery.jpg'
import furniture from './assets/categories/furnitures2.logo.jpg'
import electronics from './assets/categories/electronic1.jpg'
import fashion from './assets/categories/fashion2.jpg'
import tv from './assets/categories/Tv.png'
import beauty from './assets/categories/teddy2.jpg'


import mobilesData from './data/mobiles'
import groceryData from './data/grocery'
import furnitureData from './data/furniture'
import electronicsData from './data/electronics'
import fashionData from './data/fashion'
import tvData from './data/tv'
import beautyData from './data/beauty'


const Login = ({ isLoggedIn, username, openLogin, logout }) => (
  <>
    {isLoggedIn ? (
      <button className="btn" onClick={logout}>
        👤 {username} (Logout)
      </button>
    ) : (
      <button className="btn" onClick={openLogin}>Login</button>
    )}
  </>
)

const CartIcon = ({ count, openCart }) => (
  <button className="btn" onClick={openCart}>
    🛒 Cart ({count})
  </button>
)


const Banner = () => {
  const banners = [b1, b2, b3, b4, b5]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="banner">
      <span className="arrow left" onClick={() => setIndex((index - 1 + banners.length) % banners.length)}>❮</span>
      <img src={banners[index]} alt="Banner" />
      <span className="arrow right" onClick={() => setIndex((index + 1) % banners.length)}>❯</span>
    </div>
  )
}


const topItems = [
  { img: top1, name: 'Projector', key: 'tv' },
  { img: top2, name: 'Phone', key: 'mobiles'},
  { img: top3, name: 'Speaker', key: 'electronics' },
  { img: top4, name: 'Watch', key: 'electronics' },
  { img: top5, name: 'ear phones', key: 'electronics' },
  { img: top6, name: 'Shoes', key: 'fashion' },
  { img: top7, name: 'Beauty face wash', key: 'beauty' },
  { img: top8, name: 'Study Table', key: 'furnitures' }
]

const App = () => {
  const [page, setPage] = useState('home')
  const [products, setProducts] = useState([])
  const [title, setTitle] = useState('')
  const [cart, setCart] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  const [startIndex, setStartIndex] = useState(0)
    const visibleCount = 5
  
    const nextItems = () => {
      if (startIndex + visibleCount < topItems.length) {
        setStartIndex(startIndex + 1)
      }
    }
  
    const prevItems = () => {
      if (startIndex > 0) {
        setStartIndex(startIndex - 1)
      }
    }

  
  const openCategory = (name, data) => {
    setTitle(name)
    setProducts(data)
    setPage('products')
  }

  
  const addToCart = (product) => {
    alert('Sucessfully Added')
    const exist = cart.find(item => item.id === product.id)
    if (exist) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  
  const increaseQty = (id) =>
    setCart(cart.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item))

  const decreaseQty = (id) =>
    setCart(cart.map(item =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    ))

  const removeFromCart = (id) =>
    setCart(cart.filter(item => item.id !== id))

  
  const buyNow = (product) => {
    alert(`Payment Successful!\n\n${product.name}\n₹${product.price}`)
  }

  
  const checkout = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    alert(`Payment Successful!\nTotal Amount: ₹${total}`)
    setCart([])
    setPage('home')
  }

  return (
    <div>

      
      <div className="header">
        <img src={logo} className="logo-img" />
        <h1 className="brand">Dizo</h1>
        <input className="search" placeholder="Search products..." />

        <div className="actions">
          <Login
            isLoggedIn={isLoggedIn}
            username={username}
            openLogin={() => setPage('login')}
            logout={() => { setIsLoggedIn(false); setUsername('') }}
          />
          <CartIcon count={cart.length} openCart={() => setPage('cart')} />
        </div>
      </div>

      
      {page === 'home' && (
        <>
          <div className="categories">
            <div className="category" onClick={() => openCategory('Mobiles', mobilesData)}>
              <img src={mobilesCat} /><p>Mobiles</p>
            </div>
            <div className="category" onClick={() => openCategory('Grocery', groceryData)}>
              <img src={grocery} /><p>Grocery</p>
            </div>
            <div className="category" onClick={() => openCategory('Furniture', furnitureData)}>
              <img src={furniture} /><p>Furniture</p>
            </div>
            <div className="category" onClick={() => openCategory('Electronics', electronicsData)}>
              <img src={electronics} /><p>Electronics</p>
            </div>
            <div className="category" onClick={() => openCategory('Fashion', fashionData)}>
              <img src={fashion} /><p>Fashion</p>
            </div>
            <div className="category" onClick={() => openCategory('TV & Appliances', tvData)}>
              <img src={tv} /><p>TV & Appliances</p>
            </div>
            <div className="category" onClick={() => openCategory('Beauty & Food', beautyData)}>
              <img src={beauty} /><p>Beauty & Food</p>
            </div>
          </div>
          <Banner />
           
          <h3>Top Deals</h3>
          <div className="top-items-wrapper">
            
            <span className="top-arrow" onClick={prevItems}>❮</span>

            <div className="top-items">
              {topItems.slice(startIndex, startIndex + visibleCount).map((item, i) => (
                <div
                  key={i}
                  className="top-item"
                  onClick={() => {
                    if (item.key === 'mobiles') openCategory('Mobiles', mobilesData)
                    if (item.key === 'grocery') openCategory('Grocery', groceryData)
                    if (item.key === 'fashion') openCategory('Fashion', fashionData)
                    if (item.key === 'electronics') openCategory('Electronics', electronicsData)
                    if (item.key === 'tv') openCategory('TV & Appliances', tvData)
                    if (item.key === 'beauty') openCategory('Beauty & Food', beautyData)
                    if (item.key === 'furnitures') openCategory('Furnitures', furnitureData)
                  }}
                >
                  <img src={item.img} />
                  <p>{item.name}</p>
                  
                </div>

              ))}
            </div>

            <span className="top-arrow" onClick={nextItems}>❯</span>
          </div>

          
          <h3 id='m'>Mobiles Deals</h3>

<div className="mid-mobiles">
  {midRangeMobiles.map(item => (
    <div
      key={item.id}
      className="mid-img-box"
      onClick={() => openCategory('Mobiles', mobilesData)}
    >

      <div className="deal-text">
        <h4>{item.name}</h4>
        <p>{item.price}</p>
      </div>

      <img src={item.img} alt={item.name} />
    </div>
  ))}
</div>


      
      <h3 id='v'>Furniture Deals</h3>
<div className="furniture-deals">
  {furnitureDeals.map(item => (
    <div
      key={item.id}
      className="furniture-card"
      onClick={() => openCategory('Furniture', furnitureData)}
    >
      <img src={item.img} alt={item.name} />
      <h4>{item.name}</h4>
      <p className="offer">Min.50% Off</p>
    </div>
  ))}
</div>


 <div className="top-deals">
  <h2>🔥 Top Deals</h2>
  {topdealshome.map(item => (
    <div
      className="deal-card"
      key={item.id}
      onClick={() => openCategory('TV & Appliances', tvData)}
      style={{ cursor: 'pointer' }}
    >
      <img src={item.img} alt={item.name} />
      <h4>{item.name}</h4>
      <p>{item.price}</p>
      <span className="offer">{item.offer}</span>
    </div>
  ))}
</div>



        </>
      )}
      

      
      {page === 'products' && (
        <div className="mobiles-section">
          <button className="back-btn" onClick={() => setPage('home')}>← Back</button>
          <h2>{title}</h2>

          <Mobile
            products={products}
            addToCart={addToCart}
            buyNow={buyNow}
          />
        </div>
      )}

      
      {page === 'cart' && (
        <div className="cart-page">
          <button className="back-btn" onClick={() => setPage('home')}>← Back</button>
          <h2>Your Cart</h2>

          {cart.length === 0 ? <p>Cart is empty</p> : (
            <>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.img} />
                  <div className="cart-details">
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>

                    <div className="qty-box">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>

                    <p>Subtotal: ₹{item.price * item.qty}</p>
                    <button id='remove' onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
              <h3>Total: ₹{cart.reduce((s, i) => s + i.price * i.qty, 0)}</h3>
              <button className="checkout" onClick={checkout}>Pay Now</button>
            </>
          )}
        </div>
      )}

      {page === 'login' && (
        <div className="login-page">
          
          <h2>Login</h2>

          <form className="login-form" onSubmit={(e) => {
            e.preventDefault()
            setUsername(e.target.username.value)
            setIsLoggedIn(true)
            setPage('home')
          }}>
            <input name="username" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
<footer className="fk-footer">

  <div className="fk-footer-top">

    <div className="fk-footer-col">
      <h4>ABOUT</h4>
      <p>Contact Us</p>
      <p>About Us</p>
      <p>Careers</p>
      <p>Dizo Stories</p>
      <p>Press</p>
    </div>

    <div className="fk-footer-col">
      <h4>HELP</h4>
      <p>Payments</p>
      <p>Shipping</p>
      <p>Cancellation & Returns</p>
      <p>FAQ</p>
    </div>

    <div className="fk-footer-col">
      <h4>POLICY</h4>
      <p>Return Policy</p>
      <p>Terms Of Use</p>
      <p>Security</p>
      <p>Privacy</p>
      <p>Sitemap</p>
    </div>

    <div className="fk-footer-col">
      <h4>SOCIAL</h4>
      <div className="fk-social-icons">
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-youtube"></i>
        <i className="fab fa-twitter"></i>
      </div>
    </div>

    <div className="fk-footer-divider"></div>

    <div className="fk-footer-address">
      <h4>Mail Us:</h4>
      <p>
        Dizo Internet Pvt Ltd,<br />
        Bengaluru, Karnataka,<br />
        India
      </p>
    </div>

    
    <div className="fk-footer-address">
      <h4>Contact</h4>
      <p><i className="fas fa-phone"></i> +91 98765 43210</p>
      <p><i className="fas fa-envelope"></i> support@dizo.com</p>
    </div>

  </div>

  
  <div className="fk-footer-bottom">
    <span><i className="fas fa-store"></i> Become a Seller</span>
    <span><i className="fas fa-bullhorn"></i> Advertise</span>
    <span><i className="fas fa-gift"></i> Gift Cards</span>
    <span><i className="fas fa-circle-question"></i> Help Center</span>
    <span>© 2025 Dizo</span>
  </div>

</footer>


    </div>
  )
}

export default App
