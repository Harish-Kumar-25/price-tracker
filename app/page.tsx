import HeroCarousel from '@/components/HeroCarousel';
import { Searchbar } from '@/components/Searchbar';
import Typewriter from '@/components/Typewriter';
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react';
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-r  min-h-screen from-black    to-[#3b1593] ">
        <div className=" max-w-7xl mx-auto ">
          <div className="flex max-xl:flex-col gap-16 ">
            <div className="flex flex-col justify-center ">
              <div className="py-10 sm:py-32 ">
                <h2 className=" font-bold text-3xl sm:text-4xl text-center ">
                  Unleash the
                  <span className="text-transparent bg-clip-text bg-gradient-to-t from-[#cb7aec]   to-[#9136b5]">
                    {" "}
                    Power of Price{" "}
                  </span>
                  Tracking
                </h2>
                <div className="flex justify-center mt-4 font-semibold text-lg sm:text-xl">
                  <Typewriter />
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
          <hr className="border-t-2 border-gray-300 my-6" />
        </div>
      </section>
    </>
  );
}
