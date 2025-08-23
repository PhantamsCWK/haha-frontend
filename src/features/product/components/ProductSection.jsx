import { PropagateLoader } from 'react-spinners';

// import { useGetAllPostQuery, useLikeAndDislikeMutation } from '../postsApiSlice';
import { ProductVerticalCard } from '../../../components';
// import { useAuth } from '../../../hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { privateApi, publicApi } from '../../../app/api';
// import PostSettingModal from './PostSettingModal';

const ProductsSection = ({isAdmin = false}) => {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await publicApi.get("/products")
  })

  const deleteProduct = useMutation({
    mutationFn: async (id) => await privateApi.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  if (isError) {
    return (
      <div className='flex flex-col justify-center items-center gap-5 py-3 h-[75vh]'>
        <h1 className='text-3xl text-[#570DF8] capitalize'>{error.data.message}</h1>
      </div>
    )
  }

  if (isPending) {
    return (
      <div className='flex flex-col justify-start items-center gap-5 py-3 h-96'>
        <PropagateLoader className='mt-36' size={30} color='#570DF8' />
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2 min-h-full min-w-full">
        {data.data.data.map((product, i) => (
          <div key={i} className="aspect-square">
            <ProductVerticalCard product={product} isAdmin = {isAdmin} deleteProduct={deleteProduct} />
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductsSection