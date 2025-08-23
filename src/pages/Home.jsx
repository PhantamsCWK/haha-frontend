
import { Carousel } from '../components';
import { ProductsSection } from '../features/product';

const Home = () => {
  return (
    <section className='pt-[4px] mx-1 lg:mx-[46px]'>
      
        <div className='flex flex-col justify-center items-center col-span-5 w-full xl:col-span-3 xl:mr-[64px] xl:max-w-[5000rem]'>
          {/* Posts Section */}
          <Carousel/>
          <ProductsSection />
          {/* <h1>hello</h1> */}
        </div>
    </section>
  )
}

export default Home