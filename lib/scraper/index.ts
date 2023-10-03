'use server'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { extractCurrency, extractDescription, extractPrice } from '../utils'

export async function scrapeAmazonProduct(url:string) {
    if(!url) {return}

    // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_ad8b6eef-zone-unblocker:haklhaqqfy4s -k https://lumtest.com/myip.json
    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const port = 22225
    const session_id = (100000 * Math.random()) | 0
    const options = {
        auth :{
            username : `${username}-session-${session_id}`,
            password,
        },
        host : 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,

    }
    try{
        const response = await axios.get(url, options)
        const $ = cheerio.load(response.data)
        const title = $('#productTitle').text().trim()

        const currentPrice = extractPrice(
            $(".priceToPay span.a-price-whole"),
            $(".a-price.a-text-price.a-size-medium.apexPriceToPay"),
        );
            
        const originalPrice = extractPrice(
                $(".a-price.a-text-price"),
                $(".priceToPay span.a-price-whole"), 
        );
        const outOfStock = $("#availability span").text().trim().toLowerCase() === "currently unavailable."
        const images = $("#landingImage").attr("data-a-dynamic-image") ||
            $("#landingImage").attr("data-a-dynamic-image") || '{}'
        const imageUrl = Object.keys(JSON.parse(images))
        const currency = extractCurrency(
                $(".a-price-symbol") ||
              $(".a-price.a-text-price.a-size-medium.apexPriceToPay")
        );
        const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, '') 
        const description = extractDescription($)

        const data = {
          url,
          currency: currency || "$",
          image: imageUrl[0],
          title,
          currentPrice: Number(currentPrice) || Number(originalPrice),
          originalPrice: Number(originalPrice) || Number(currentPrice),
          priceHistory: [],
          discountRate: Number(discountRate),
          category: "category",
          description: description || "",
          reviewsCount: 10,
          stars: 4.5,
          isOutOfStock: outOfStock,

          lowestPrice: Number(currentPrice) || Number(originalPrice),
          highestPrice: Number(originalPrice) || Number(currentPrice),
          averagePrice: Number(currentPrice) || Number(originalPrice),
        };
        
        return data;

    } catch(error : any){
        throw new Error(`Failed to scrape product: ${error.message}`)
    }

}