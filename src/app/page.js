import BannerSlider from "./components/(home)/BannerSlider";
import Feature from "./components/(home)/Feature";
import Review from "./components/(home)/Review";
import TopCategories from "./components/(home)/TopCategories";
import WorkflowSteps from "./components/(home)/WorkflowSteps";


export default function Home() {
  return (
    <div>
      <BannerSlider />
          <Feature/>
          <WorkflowSteps/>
          <Review/>
          <TopCategories/>
      
    </div>
  );
}
