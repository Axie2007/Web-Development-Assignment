import { useState } from "react";
import "./App.css";

const foods = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 299,
        emoji: "🍕",
        description: "Classic cheese pizza with fresh tomato and basil."
    },
    {
        id: 2,
        name: "Farmhouse Pizza",
        category: "Pizza",
        price: 349,
        emoji: "🍕",
        description: "Loaded with fresh vegetables and delicious cheese."
    },
    {
        id: 3,
        name: "Classic Burger",
        category: "Burgers",
        price: 199,
        emoji: "🍔",
        description: "Juicy burger with lettuce, tomato and special sauce."
    },
    {
        id: 4,
        name: "Cheese Burger",
        category: "Burgers",
        price: 249,
        emoji: "🍔",
        description: "Classic burger topped with melted cheese."
    },
    {
        id: 5,
        name: "Veg Noodles",
        category: "Indian",
        price: 179,
        emoji: "🍜",
        description: "Delicious noodles cooked with fresh vegetables."
    },
    {
        id: 6,
        name: "Paneer Biryani",
        category: "Indian",
        price: 249,
        emoji: "🍛",
        description: "Aromatic rice with paneer and Indian spices."
    },
    {
        id: 7,
        name: "French Fries",
        category: "Snacks",
        price: 149,
        emoji: "🍟",
        description: "Crispy golden fries served with tasty seasoning."
    },
    {
        id: 8,
        name: "Cold Coffee",
        category: "Drinks",
        price: 129,
        emoji: "🥤",
        description: "Refreshing chilled coffee with creamy foam."
    },
    {
        id: 9,
        name: "Fresh Lemonade",
        category: "Drinks",
        price: 99,
        emoji: "🍋",
        description: "Fresh and refreshing lemonade."
    }
];

function App() {

    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [showCart, setShowCart] = useState(false);

    const categories = [
        "All",
        "Pizza",
        "Burgers",
        "Indian",
        "Snacks",
        "Drinks"
    ];

    // Add food to cart
    const addToCart = (food) => {

        const existingItem = cart.find(
            item => item.id === food.id
        );

        if (existingItem) {

            setCart(
                cart.map(item =>
                    item.id === food.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );

        } else {

            setCart([
                ...cart,
                {
                    ...food,
                    quantity: 1
                }
            ]);

        }
    };


    // Increase quantity
    const increaseQuantity = (id) => {

        setCart(
            cart.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );

    };


    // Decrease quantity
    const decreaseQuantity = (id) => {

        setCart(
            cart
                .map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );

    };


    // Remove item
    const removeFromCart = (id) => {

        setCart(
            cart.filter(item => item.id !== id)
        );

    };
    // Calculate total items
    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
    // Calculate total price
    const totalPrice = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );
    // Filter food
    const filteredFoods = foods.filter(food => {

        const matchesSearch =
            food.name
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" ||
            food.category === category;

        return matchesSearch && matchesCategory;

    });


    // Place order
    const placeOrder = () => {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;

        }

        alert(
            `Order placed successfully!\nTotal Amount: ₹${totalPrice}`
        );

        setCart([]);

        setShowCart(false);

    };


    return (

        <div className="app">


            {/* ================= NAVBAR ================= */}

            <nav className="navbar">

                <div className="logo">
                    🍔 Foodie
                </div>


                <div className="nav-links">

                    <a href="#home">
                        Home
                    </a>

                    <a href="#menu">
                        Menu
                    </a>

                    <a href="#about">
                        About
                    </a>

                    <button
                        className="cart-button"
                        onClick={() => setShowCart(!showCart)}
                    >

                        🛒 Cart

                        <span className="cart-count">
                            {totalItems}
                        </span>

                    </button>

                </div>

            </nav>



            {/* ================= HERO ================= */}

            <section id="home" className="hero">

                <div className="hero-content">

                    <p className="small-title">
                        WELCOME TO FOODIE
                    </p>

                    <h1>
                        Delicious Food,
                        <br />
                        Delivered Fast! 🚀
                    </h1>

                    <p>
                        Order your favourite meals from
                        the comfort of your home.
                    </p>


                    <a
                        href="#menu"
                        className="hero-button"
                    >
                        Explore Menu
                    </a>

                </div>


                <div className="hero-food">
                    🍕
                </div>

            </section>



            {/* ================= MENU ================= */}

            <section id="menu" className="menu-section">

                <div className="section-heading">

                    <p className="small-title">
                        OUR MENU
                    </p>

                    <h2>
                        Choose Your Favourite Food
                    </h2>

                    <p>
                        Fresh, tasty and made with love.
                    </p>

                </div>



                {/* SEARCH */}

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="🔍 Search for food..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>



                {/* CATEGORIES */}

                <div className="categories">

                    {categories.map(cat => (

                        <button
                            key={cat}
                            className={
                                category === cat
                                    ? "category active"
                                    : "category"
                            }
                            onClick={() =>
                                setCategory(cat)
                            }
                        >

                            {cat}

                        </button>

                    ))}

                </div>



                {/* FOOD CARDS */}

                <div className="food-grid">

                    {filteredFoods.map(food => (

                        <div
                            className="food-card"
                            key={food.id}
                        >

                            <div className="food-image">

                                {food.emoji}

                            </div>


                            <div className="food-info">

                                <span className="food-category">
                                    {food.category}
                                </span>

                                <h3>
                                    {food.name}
                                </h3>

                                <p>
                                    {food.description}
                                </p>


                                <div className="food-bottom">

                                    <span className="price">
                                        ₹{food.price}
                                    </span>

                                    <button
                                        className="add-button"
                                        onClick={() =>
                                            addToCart(food)
                                        }
                                    >
                                        + Add
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>


                {filteredFoods.length === 0 && (

                    <div className="no-food">
                        😔 No food found.
                    </div>

                )}

            </section>



            {/* ================= CART ================= */}

            {showCart && (

                <div className="cart-overlay">

                    <div className="cart-panel">

                        <div className="cart-header">

                            <h2>
                                🛒 Your Cart
                            </h2>

                            <button
                                onClick={() =>
                                    setShowCart(false)
                                }
                                className="close-button"
                            >
                                ✕
                            </button>

                        </div>


                        {cart.length === 0 ? (

                            <div className="empty-cart">

                                <div className="empty-icon">
                                    🛒
                                </div>

                                <h3>
                                    Your cart is empty
                                </h3>

                                <p>
                                    Add some delicious food!
                                </p>

                            </div>

                        ) : (

                            <>

                                <div className="cart-items">

                                    {cart.map(item => (

                                        <div
                                            className="cart-item"
                                            key={item.id}
                                        >

                                            <div className="cart-item-emoji">
                                                {item.emoji}
                                            </div>


                                            <div className="cart-item-info">

                                                <h4>
                                                    {item.name}
                                                </h4>

                                                <p>
                                                    ₹{item.price}
                                                </p>

                                            </div>


                                            <div className="quantity">

                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(item.id)
                                                    }
                                                >
                                                    −
                                                </button>

                                                <span>
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(item.id)
                                                    }
                                                >
                                                    +
                                                </button>

                                            </div>


                                            <div className="item-total">

                                                ₹
                                                {item.price *
                                                    item.quantity}

                                            </div>


                                            <button
                                                className="remove-button"
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                            >
                                                ✕
                                            </button>

                                        </div>

                                    ))}

                                </div>


                                <div className="cart-summary">

                                    <div className="summary-row">

                                        <span>
                                            Items
                                        </span>

                                        <span>
                                            {totalItems}
                                        </span>

                                    </div>


                                    <div className="summary-row">

                                        <span>
                                            Delivery
                                        </span>

                                        <span>
                                            FREE
                                        </span>

                                    </div>


                                    <hr />


                                    <div className="total-row">

                                        <span>
                                            Total
                                        </span>

                                        <span>
                                            ₹{totalPrice}
                                        </span>

                                    </div>


                                    <button
                                        className="order-button"
                                        onClick={placeOrder}
                                    >
                                        Place Order
                                    </button>

                                </div>

                            </>

                        )}

                    </div>

                </div>

            )}



            {/* ================= ABOUT ================= */}

            <section
                id="about"
                className="about-section"
            >

                <div>

                    <p className="small-title">
                        ABOUT FOODIE
                    </p>

                    <h2>
                        Good Food.
                        <br />
                        Good Mood. ❤️
                    </h2>

                    <p>
                        Foodie is a simple online food ordering
                        application created using React.js.
                        Browse delicious food, search for items,
                        add them to your cart and place an order.
                    </p>

                </div>


                <div className="about-icons">

                    <div>
                        🚀
                        <span>
                            Fast Delivery
                        </span>
                    </div>

                    <div>
                        🍴
                        <span>
                            Fresh Food
                        </span>
                    </div>

                    <div>
                        ⭐
                        <span>
                            Best Quality
                        </span>
                    </div>

                </div>

            </section>



            {/* ================= FOOTER ================= */}

            <footer>

                <h3>
                    🍔 Foodie
                </h3>

                <p>
                    Delicious food delivered to your doorstep.
                </p>

                <p className="copyright">
                    © 2026 Foodie. Created for Web Development Assignment.
                </p>

            </footer>


        </div>

    );

}

export default App;