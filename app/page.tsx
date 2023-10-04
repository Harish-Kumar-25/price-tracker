import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import { Searchbar } from "@/components/Searchbar";
import Typewriter from "@/components/Typewriter";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/actions";
import { ArrowRight } from "lucide-react";
import Image from "next/image";


export default async function Home() {
  const allProducts = await getAllProducts();
  return (
    <>
      <section className="max-w-7xl mx-auto">
        <div className="flex max-xl:flex-col gap-16 ">
          <div className="flex flex-col justify-center ">
            <div className="py-16 sm:py-64 ">
              <h2 className=" font-bold text-3xl sm:text-4xl text-center ">
                Unleash the
                <span className=" text-transparent bg-clip-text bg-gradient-to-t from-[#fa6f6f]   to-[#e60707]">
                  {" "}
                  Power of Price{" "}
                </span>
                Tracking
              </h2>
              <div className="flex justify-center mt-4 font-semibold text-lg sm:text-xl">
                <Typewriter content="Smart Shopping Starts Here 😉" />
              </div>
              <p className=" font-medium text-lg mt-8 sm:mt-16 text-center p-3 sm:items-center">
                Powerful, self serve product and growth analytics to help you
                convert, engage and retain more users.
              </p>
              <div className="flex justify-center text-center">
                <Searchbar />
              </div>
            </div>
          </div>
          <HeroCarousel />
        </div>
        <hr className=" border-t-4 p-2 border-gray-300 hover:border-[#eb4444] rounded-md" />
      </section>
      <section className="max-w-7xl mx-auto">
        <h2 className="flex justify-center font-bold text-3xl "> 
            <Typewriter content = 'Trending 🔥' />
          </h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16 p-3">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
