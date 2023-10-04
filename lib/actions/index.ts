'use server'
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { scrapeAmazonProduct } from "../scraper"
import { connectToDB } from "../scraper/mongoose";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";


export async function scrapeAndStoreProduct(productUrl: string ) {
  if (!productUrl) {
    throw new Error('ProductUrl is required')
  }
  try{
    connectToDB();
    const scrapedProduct  = await scrapeAmazonProduct(productUrl)
    if (!scrapedProduct) return;
    let product = scrapedProduct

    const existingProduct = await Product.findOne({url: scrapedProduct.url})
    if (existingProduct){
      const updatedPrice : any = [
        ...existingProduct.priceHistory,
        {price : scrapedProduct.currentPrice,}
      ]
      product ={
        ...scrapedProduct,
        priceHistory : updatedPrice,
        lowestPrice : getLowestPrice(updatedPrice),
        highestPrice : getHighestPrice(updatedPrice),
        averagePrice : getAveragePrice(updatedPrice),

      }
    }
    const newProduct = await Product.findOneAndUpdate(
      {url : scrapedProduct.url},
      product,
      {upsert : true, new : true}
    )

    revalidatePath(`/products/${newProduct._id}`)
  } catch(error : any){
    throw new Error(`Failed to create/Update product: ${error.message}`)
  }
}

export async function getProductById(productId : string){
  try {
    const product = Product.findById({_id : productId})
    if (!product) return;
    return product

  } catch(error){
    console.log(error)
  }
}

export async function getAllProducts(){

    try{
      connectToDB()
      const products = await Product.find()
      return products

    } catch(error){
      console.log(error)
    }

}