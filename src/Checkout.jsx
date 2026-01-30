import React, { useContext, useState } from "react";
import { StoreContext } from "./context/StoreContext";
import { useNavigate } from "react-router-dom";
import CODSuccessPopup from "./components/CODSuccessPopup";
import api from "./utils/api";
import "./Checkout.css";

const Checkout = () => {
  const { getCartAmount, cartItems, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_RvkRUEHFCxl4Rz";

  const subtotal = getCartAmount();
  const shippingFee = subtotal >= 199 ? 0 : 40; // Same as Cart
  const totalAmount = subtotal + shippingFee;

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [showCODSuccess, setShowCODSuccess] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  /* 🔥 BACKEND SAFE ITEMS */
  const backendItems = Object.entries(cartItems)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => ({
      productId: id,
      quantity: qty
    }));

  const billingAddress = {
    fullName: deliveryAddress.name,
    mobile: deliveryAddress.phone,
    street: deliveryAddress.address,
    city: deliveryAddress.city,
    state: "MH",
    pincode: deliveryAddress.pincode
  };

  /* ================= COD ORDER ================= */
  const placeCODOrder = async () => {
    try {
      if (!deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.address) {
        alert("Please fill proper delivery details");
        return;
      }

      if (backendItems.length === 0) {
        alert("Cart is empty");
        return;
      }

      const orderData = {
        userEmail: localStorage.getItem("email"),
        items: backendItems,
        totalAmount,
        paymentStatus: "COD",
        billingAddress
      };

      await api.post('/api/orders/place', orderData);

      clearCart();
      setShowCODSuccess(true);
    } catch (err) {
      alert("COD order failed");
    }
  };

  /* ================= RAZORPAY ORDER ================= */
  const placeRazorpayOrder = async () => {
    try {
      if (!deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.address) {
        alert("Please fill proper delivery details");
        return;
      }

      // 1️⃣ Crea te Razorpay order from backend
      const res = await api.post('/api/payment/create-order', { amount: totalAmount });

      const razorOrder = res.data;

      // 2️⃣ Razorpay options
      const options = {
        key: RAZORPAY_KEY, // Razorpay Key ID
        amount: razorOrder.amount,
        currency: "INR",
        name: "Sasta Bazaar",
        description: "Order Payment",
        order_id: razorOrder.id,

        handler: async function (response) {
          const orderData = {
            userEmail: localStorage.getItem("email"),
            items: backendItems,
            totalAmount,
            paymentStatus: "PAID",
            paymentId: response.razorpay_payment_id,
            billingAddress
          };

          await api.post('/api/orders/place', orderData);

          clearCart();
          navigate("/order-success");
        },

        prefill: {
          name: deliveryAddress.name,
          contact: deliveryAddress.phone,
          email: localStorage.getItem("email")
        },

        theme: { color: "#0f172a" }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      alert("Razorpay payment failed");
    }
  };

  /* ================= PLACE ORDER ================= */
  const handlePlaceOrder = () => {
    if (paymentMethod === "COD") placeCODOrder();
    else if (paymentMethod === "ONLINE") placeRazorpayOrder();
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {/* LEFT */}
        <div className="checkout-card">
          <h2 className="section-title">📍 Delivery Address</h2>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={deliveryAddress.name}
              onChange={(e) => setDeliveryAddress({ ...deliveryAddress, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={deliveryAddress.phone}
              onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              placeholder="Enter your street address"
              value={deliveryAddress.address}
              onChange={(e) => setDeliveryAddress({ ...deliveryAddress, address: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                placeholder="Enter your city"
                value={deliveryAddress.city}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                placeholder="Enter pincode"
                value={deliveryAddress.pincode}
                onChange={(e) =>
                  setDeliveryAddress({
                    ...deliveryAddress,
                    pincode: e.target.value
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="checkout-summary">
          <h2 className="section-title">🧾 Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>₹{shippingFee}</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <div className="payment-section">
            <h3 className="payment-title">💳 Payment Method</h3>

            <div className="payment-box">
              <label className={`payment-option ${paymentMethod === "COD" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <div className="payment-content">
                  <i className="bi bi-cash-coin"></i>
                  <div>
                    <div className="payment-name">Cash on Delivery</div>
                    <div className="payment-desc">Pay when you receive</div>
                  </div>
                </div>
              </label>

              <label className={`payment-option ${paymentMethod === "ONLINE" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "ONLINE"}
                  onChange={() => setPaymentMethod("ONLINE")}
                />
                <div className="payment-content">
                  <i className="bi bi-credit-card"></i>
                  <div>
                    <div className="payment-name">Razorpay</div>
                    <div className="payment-desc">Secure online payment</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={
              !deliveryAddress.name ||
              !deliveryAddress.phone ||
              !deliveryAddress.address ||
              !deliveryAddress.city ||
              !deliveryAddress.pincode
            }
          >
            {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
          </button>
        </div>
      </div>

      <CODSuccessPopup
        isVisible={showCODSuccess}
        onClose={() => navigate("/order-success")}
        orderData={{
          orderId: `ORD${Date.now()}`,
          subtotal,
          shippingFee,
          totalAmount,
          paymentMethod: "COD"
        }}
      />
    </div>
  );
};

export default Checkout;
