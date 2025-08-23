import { useState } from 'react';
import { PiShoppingCartSimpleLight, PiShoppingCartSimpleFill } from "react-icons/pi";

import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { EditProductModal } from '../features/product';

const ProductVerticalCard = ({product, isAdmin, deleteProduct}) => {
    const [check, setCheck] = useState(Boolean);

  return (
    <article className=' flex flex-ro w-full'>
        <div className="card bg-base-100 h-max-[500px] shadow-sm">
        <figure>
            <img
            src={ product.photo}
            alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">
            {product.name}
            {/* <div className="badge badge-secondary">NEW</div> */}
            </h2>
            <p>{ product.description}</p>
            <div className="card-actions justify-end">
            <div className="badge badge-info">Rp.{ product.price}</div>
            <div className="badge badge-dash">Stock: { product.stock}</div>
            {
                isAdmin 
                ?       <><div className="badge badge-error" onClick={() => deleteProduct.mutate(product.id)}><MdDeleteForever size={20}/></div>
                         <div className="badge badge-warning" onClick={() => document.getElementById(`edit_product_modal${product.id}`).showModal()}><MdEdit size={20}/></div></>
                : <div className="badge badge-primary" onClick={()=> setCheck(!check)}>{ check ?<PiShoppingCartSimpleFill/> : <PiShoppingCartSimpleLight/> }</div>
            }
            </div>
        </div>
        </div>
        <EditProductModal product={product} />
    </article>
  )
}

export default ProductVerticalCard