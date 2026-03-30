import HeroSearch from "./HeroSearch";

const Hero = () => {
  return (
    <>
      <div className="HERO-SECTION py-16 px-4 hero-bg relative">
        <img
          src="/src/assets/bg-hero-left.png"
          alt=""
          className="absolute left-0 top-1/2 -translate-y-1/2 w-52 hidden md:block opacity-70"
        />

        <img
          src="/src/assets/bg-hero-right.png"
          alt=""
          className="absolute right-0 top-1/2 -translate-y-1/2 w-52 hidden md:block opacity-70"
        />

        <h1 className="hero-title 8/14 md:w-6/14 mx-auto text-3xl md:text-6xl font-bold text-center">
          Deal Your <span className="text-secondary">Products</span> In A{" "}
          <span className="text-secondary">Smart</span> Way !
        </h1>
        <p className="hero-subtitle mt-4 mb-6 text-[#627382] text-[16px] text-center">
          SmartDeals helps you sell, resell, and shop from trusted local sellers
          — all in one place!
        </p>
        <HeroSearch />
        <div className="flex md:flex-row flex-col gap-2 justify-center mt-6">
          <button className="btn bg-gradient">See All Products</button>
          <button className="btn bg-transparent border border-secondary text-gradient">
            Post a Product
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
