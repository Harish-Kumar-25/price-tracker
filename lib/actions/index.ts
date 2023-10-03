'use server'

import Product from "../models/product.model";
import { scrapeAmazonProduct } from "../scraper"
import { connectToDB } from "../scraper/mongoose";


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
      const updatedPrice = [
        ...existingProduct.priceHistory,
        {price : scrapedProduct.currentPrice,}
      ]
      product ={
        ...scrapedProduct,
      }
    }

  } catch(error : any){
    throw new Error(`Failed to create/Update product: ${error.message}`)
  }
}