import CartSection from "../components/CartSection";

const Charts = () => {
  return (
    <section className="pt-[4px] mx-1 lg:mx-[46px]">
      <div className="flex flex-col justify-center items-center col-span-5 w-full xl:col-span-3 xl:mr-[64px] xl:max-w-[5000rem]">
        <div className="card h-20 w-full flex flex-row items-center shadow-2xl">
          <h1 className="text-3xl p-5">Cart</h1>
        </div>
        <CartSection />
      </div>
    </section>
  );
};

export default Charts;

