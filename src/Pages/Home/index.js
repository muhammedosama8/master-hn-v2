import BestSellingProducts from "./ BestSellingProducts"
import Banner from "./Banner"
import FeatureProducts from "./FeatureProducts"
import Pdf from "./Pdf"
import Quality from "./Quality"
import ShopByCategory from "./ShopByCategory"

const Home = () => {
    return <>
        <ShopByCategory />
        <FeatureProducts />
        <Quality />
        <BestSellingProducts />
        <Pdf />
        <Banner />
    </>
}
export default Home