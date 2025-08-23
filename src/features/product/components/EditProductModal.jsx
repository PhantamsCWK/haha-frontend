import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "../../../app/api";


export default function EditProductModal({ product }) {
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: product?.name || "",
      price: product?.price || "",
      description: product?.description || "",
    },
  });

  const updateProduct = useMutation({
    mutationFn: async (updated) => 
      await privateApi.put(`/products/${product.id}`, updated),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      document.getElementById(`edit_product_modal${product.id}`).close();}
  });

  const onSubmit = (data) => {
    updateProduct.mutate(data);
  };

  return (
    <dialog id={`edit_product_modal${product.id}`}className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Product</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Product Name"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            {...register("price", { required: true })}
            placeholder="Price"
            className="input input-bordered w-full"
          />
          <input
            {...register("description")}
            placeholder="Description"
            defaultValue={product?.description}
            className="textarea textarea-bordered w-full"
          />

            <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn"
              onClick={() =>
                document
                  .getElementById(`edit_product_modal${product.id}`)
                  .close()
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
