import BannerSlider from "./components/(home)/BannerSlider";
import Feature from "./components/(home)/Feature";
import JobPosts from "./components/(home)/jobPosts";
import Review from "./components/(home)/Review";
import TopCategories from "./components/(home)/TopCategories";
import WorkflowSteps from "./components/(home)/WorkflowSteps";

export default function Home() {
  return (
    <div>
      <BannerSlider />
      
      <Feature />
      <JobPosts/>
      <WorkflowSteps />
      
      <Review />
      <TopCategories />
    </div>
  );
}
