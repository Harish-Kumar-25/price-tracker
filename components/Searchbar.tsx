"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, FileWarning, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { scrapeAndStoreProduct } from "@/lib/actions";

const formSchema = z.object({
  search: z.string().min(2, {
    message: "Search must have least 2 characters.",
  }),
});


export function Searchbar() {

      function isValidUrl(url: string) {
        try{
          const parsedUrl = new URL(url);
          const hostname = parsedUrl.hostname;

          if (
            hostname.includes("amazon.com") ||
            hostname.includes("amazon.in")
          ) {
            return true;
          }
        } catch (error) {
          return false
        }
      }

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          search: "",
        },
      });

      const [isLoading, setIsLoading] = useState(false);
      const [showAlert,setShowAlert] = useState(false);

      async function  onSubmit(values: z.infer<typeof formSchema>) {
        const isValidLink = isValidUrl(values.search);
        if(!isValidLink){
            setShowAlert(true);
        }
        try{
            setIsLoading(true);
            const product = await scrapeAndStoreProduct(values.search);
        }  catch (error) {
            console.log(error);
        } finally {   
            setIsLoading(false);
        }
      }

  return (
    <div>
      {showAlert ? ( 
        <Alert variant="destructive" className="mt-5">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-bold">Error</AlertTitle>
          <AlertDescription>
            Invalid link. Please enter a valid Amazon URL.
            <div className=" mt-2">
              <Button variant='outline' onClick={() => setShowAlert(false)}>Try Again</Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mt-10 flex items-center space-x-4">
              <div className="w-3/4 sm:w-full">
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter a Product Link" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="font-bold" type="submit"
                >
                {isLoading ? 'Searching...' : 'Search'} 
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
