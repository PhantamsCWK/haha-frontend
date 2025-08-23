import { ProductsSection } from "../features/product"

const Admin = () => {
    return (
    <section className='pt-[4px] mx-1 lg:mx-[46px]'>
      
        <div className='flex flex-col justify-center items-center col-span-5 w-full xl:col-span-3 xl:mr-[64px] xl:max-w-[5000rem]'>
          {/* Posts Section */}
          <div className="card h-20 w-full flex flex-row items-center shadow-2xl">
            <h1 className=" text-3xl  p-5">
              Dashboard Admin
            </h1>
          </div>
          <ProductsSection isAdmin />
          {/* <h1>hello</h1> */}
        </div>
    </section>
  )
}

export default Admin