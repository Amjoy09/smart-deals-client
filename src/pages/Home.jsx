import Hero from "../components/Hero";
import RecentProducts from "../components/RecentProducts";

const recentProductsPromise = fetch(
  "http://localhost:3000/recent-products",
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <section>
        <Hero />
      </section>
      <section>
        {" "}
        <RecentProducts recentProductsPromise={recentProductsPromise} />
      </section>
    </div>
  );
};

export default Home;
