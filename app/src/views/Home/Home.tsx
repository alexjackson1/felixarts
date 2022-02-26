import HomePage from "./HomePage";
import { HeroContent, HeroLayout } from "../common";

function Home() {
  return (
    <HeroLayout>
      <HeroContent>
        <HomePage />
      </HeroContent>
    </HeroLayout>
  );
}

export default Home;
