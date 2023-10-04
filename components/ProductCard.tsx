import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from 'react'

interface Props{
    product : Product
}


function ProductCard( {product} : Props) {
  return (
    <Link href={`/products/${product._id}`} className="">
      <Card className="w-[300px] border-2 border-gray-300 hover:border-primary ">
        <CardHeader>
          <Image
            src={product.image}
            alt={product.title}
            width={350}
            height={200}
          />
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">
            {product.title}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p>{product.category}</p>
          <p>
            <span>{product?.currency}</span>
            <span>{product?.currentPrice}</span>
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ProductCard