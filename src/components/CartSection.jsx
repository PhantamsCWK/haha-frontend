import { MdDeleteForever } from "react-icons/md";
import { useAuth, useCart } from "../hooks";
import { useMutation } from "@tanstack/react-query";
import { privateApi } from "../app/api";
import { useNavigate } from "react-router-dom";

const CartSection = () => {
  const { cart, setCart } = useCart();
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // ✅ mutation for checkout
  const checkoutMutation = useMutation({
    mutationFn: async (items) => {
      return await privateApi.post("/orders", { items });
    },
    onSuccess: () => {
      alert("Order placed successfully!");
      setCart([]); // clear cart after success
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        alert("Session expired, please login again.");
        logout(); // clear token
        navigate("/login"); // ✅ redirect to login
      } else {
        alert("Failed to place order: " + error.message);
      }
    },
  });

  const handleCheckout = () => {
    const items = cart.map((item) => ({
      product_id: item.id,
      quantity: item.qty,
    }));

    checkoutMutation.mutate(items);
  };

  return (
    <div className="w-full shadow-md rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Rp.{item.price.toLocaleString()} × {item.qty}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold">
                  Rp.{(item.price * item.qty).toLocaleString()}
                </span>
                <button
                  className="text-red-500"
                  onClick={() => removeItem(item.id)}
                >
                  <MdDeleteForever size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Total */}
      {cart.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <h3 className="text-lg font-bold">Total:</h3>
          <span className="text-xl font-bold text-primary">
            Rp.{total.toLocaleString()}
          </span>
        </div>
      )}

      {/* Checkout button */}
      {cart.length > 0 && (
        <button
          className="btn btn-primary w-full mt-4"
          onClick={handleCheckout}
          disabled={checkoutMutation.isLoading || !token}
        >
          {token
            ? checkoutMutation.isLoading
              ? "Processing..."
              : "Checkout"
            : "Need Login to Checkout"}
        </button>
      )}
    </div>
  );
};

export default CartSection;
