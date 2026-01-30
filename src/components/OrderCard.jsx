const OrderCard = ({ order }) => {
  return (
    <div className="border p-4 rounded mb-3 shadow">
      <p><b>Order ID:</b> {order.id}</p>
      <p><b>Amount:</b> ₹{order.amount}</p>
      <p><b>Status:</b> {order.paymentStatus}</p>
      <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>

      <ul className="mt-2">
        {order.items.map(item => (
          <li key={item.id}>
            {item.fruitName} × {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderCard;
