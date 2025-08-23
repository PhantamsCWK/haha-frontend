// import { ProductsSection } from "../features/product"
import HistorySection from "../features/product/components/HistorySection"
import { useAuth } from "../hooks"

const History = () => {
  const { token } = useAuth()

  return (
    <section className="pt-[4px] mx-1 lg:mx-[46px]">
      <div className="flex flex-col justify-center items-center col-span-5 w-full xl:col-span-3 xl:mr-[64px] xl:max-w-[5000rem]">
        {/* Header */}
        <div className="card h-20 w-full flex flex-row items-center shadow-2xl">
          <h1 className="text-3xl p-5">History</h1>
        </div>

        {/* Content */}
        {token ? (
          <HistorySection />
        ) : (
          <div className="text-red-500 text-lg mt-4">
            Need to login to see history
          </div>
        )}
      </div>
    </section>
  )
}

export default History
