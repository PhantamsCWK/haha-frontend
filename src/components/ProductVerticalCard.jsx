import { useState } from 'react';
import { PiShoppingCartSimpleLight, PiShoppingCartSimpleFill } from "react-icons/pi";
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { EditProductModal } from '../features/product';
import { useCart } from '../hooks';

const ProductVerticalCard = ({ product, isAdmin, deleteProduct }) => {
  const [check, setCheck] = useState(false);
  const { cart, setCart } = useCart();

  const addToCart = (product) => {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    // If already in cart, update qty
    setCart(
      cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  } else {
    // Otherwise add new product with qty = 1
    setCart([...cart, { ...product, qty: 1 }]);
  }
  setCheck(!check);
};


  return (
    <article className="flex flex-row w-full">
      <div className="card bg-base-100 h-max-[500px] shadow-sm">
        <figure>
          <img src={product.photo} alt={product.name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-info">Rp.{product.price}</div>
            <div className="badge badge-dash">Stock: {product.stock}</div>
            {isAdmin ? (
              <>
                <div
                  className="badge badge-error"
                  onClick={() => deleteProduct.mutate(product.id)}
                >
                  <MdDeleteForever size={20} />
                </div>
                <div
                  className="badge badge-warning"
                  onClick={() =>
                    document
                      .getElementById(`edit_product_modal${product.id}`)
                      .showModal()
                  }
                >
                  <MdEdit size={20} />
                </div>
              </>
            ) : (
              <div
                className="badge badge-primary cursor-pointer"
                onClick={() => addToCart(product)}
              >
                {check ? (
                  <PiShoppingCartSimpleFill />
                ) : (
                  <PiShoppingCartSimpleLight />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <EditProductModal product={product} />
    </article>
  );
};

export default ProductVerticalCard;
