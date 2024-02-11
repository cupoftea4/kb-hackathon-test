'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from './ui/form';
import { CURRENCIES } from '@/client-constants';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandGroup, CommandItem } from './ui/command';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { Checkbox } from './ui/checkbox';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';


async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        "Authorization": "Client-ID aca6d2502f5bfd8"
      },
      body: formData
    });
    const jsonResponse = await response.json();

    if (response.ok) {
      const photo = jsonResponse.data.link;
      return photo;
    } else {
      throw new Error(jsonResponse.data.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const createAuction = async (data: z.infer<typeof schema>, isEditing: boolean | undefined, id: string) => {
  let method = 'POST';
  let url = `${process.env.NEXT_PUBLIC_API_URL}/auction`;

  if(isEditing) {
    method = 'PUT';
    url += `/${id}`;
  }

  const requestBody = {
    product: {
      name: data.name,
      description: data.description,
      category: data.category,
    },
    minPrice: parseFloat(data.minPrice),
    minBidStep: parseFloat(data.minBidStep),
    currency: data.currency,
    closeDate: data.closeDate,
    charity: data.charity,
  };

  const response = await fetch(url, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  }).catch((error) => {
    console.error('Error:', error);
  });
  return response;
};


const schema = z.object({
  name: z.string().min(5, {
    message: 'Title must be at least 5 characters long',
  }).trim(),

  description: z.string().trim(),

  minPrice: z.string().min(1, {
    message: 'Minimal bid must be a positive number',
  }).trim(),

  minBidStep: z.string().min(1, {
    message: 'Minimal bid step must be a positive number',
  }).trim(),

  currency: z.string({
    required_error: 'Currency is required',
  }),

  closeDate: z.date({
    required_error: 'Close date by must be a valid date',
  }).refine((date) => date > new Date(), {
    message: 'Close date by must be in the future',
  }),

  image: z.any().optional(),

  category: z.string({
    required_error: 'Category is required',
  }),

  charity: z.boolean().optional(),
});

type OwnProps = {
  categories: AuctionCategory[];
  isEditing?: boolean;
  auctionData?: Auction;
};

const AuctionForm = ({ isEditing, auctionData, categories }: OwnProps) => {

  console.log(categories, auctionData, isEditing);

  const router = useRouter();

  const pathname = usePathname();
  const id = pathname!.split('/')[2];

  const [image, setImage] = useState<string | null>(null);

  if(isEditing && auctionData?.product.pictureUrl) {
    setImage(auctionData.product.pictureUrl);
  }

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setImage(await uploadImage(file));
    }
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: isEditing ? auctionData?.product.name : '',
      description: isEditing ? auctionData?.product.description : '',
      minPrice: isEditing ? auctionData?.minPrice?.toString() : '0',
      minBidStep: isEditing ? auctionData?.minBidStep?.toString() : '1',
      currency: isEditing ? auctionData?.currency : 'UAH',
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const response = await createAuction(data, isEditing, id);
    const jsonResponse = await response?.json(); 
    if (response?.ok) {
      isEditing ? toast.success('Auction updated') : toast.success('Auction created');
      router.push(`/auctions/${jsonResponse._id}`);
    } else {
      toast.error(isEditing ? 'Failed to update auction' : 'Failed to create auction');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex sm:flex-row flex-col px-5 gap-4'>
          <div className='sm:w-52 h-52 w-full rounded-lg bg-backgroundOverlay'>
            {isEditing && auctionData?.product.pictureUrl && (
              <Image
                src={image ? image : auctionData.product.pictureUrl}
                alt={auctionData.product.name}
                className='object-cover w-full h-full'
                width={208}
                height={208}
              />
            )}
            <FormField
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="file" {...field} className='bg-backgroundOverlay h-52 w-full' onChange={handleFileChange}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
          </div>
          <div className='flex flex-col gap-2'>
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auction title</FormLabel>
                  <FormControl>
                    <Input placeholder="Auction title" {...field} className='bg-backgroundOverlay' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Auction description"
                      className="resize-none bg-backgroundOverlay border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex sm:flex-row gap-4 flex-col'>
              <FormField
                name="minPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimal bid</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className='sm:w-20 bg-backgroundOverlay' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="minBidStep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimal bid step</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className='sm:w-20 bg-backgroundOverlay' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="currency"
                render={({ field }) => (
                  <FormItem className='flex flex-col py-2'>
                    <FormLabel>Currency</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[100px] justify-between bg-backgroundOverlay border-none",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? CURRENCIES.find(
                                (currency) => currency === field.value
                              )
                              : "Select currency"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[100px] p-0">
                        <Command>
                          <CommandGroup>
                            {CURRENCIES.map((currency) => (
                              <CommandItem
                                value={currency}
                                key={currency}
                                onSelect={() => {
                                  form.setValue("currency", currency)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    currency === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {currency}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='sm:pr-4'>Category</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between bg-backgroundOverlay border-none",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categories.find(
                              (category) => category._id === field.value
                            )?.name
                            : "Select category"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              value={category.name}
                              key={category._id}
                              onSelect={() => {
                                form.setValue("category", category._id)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  category._id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='py-4'>
              <FormField
                control={form.control}
                name="closeDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Auction close date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal bg-backgroundOverlay",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="charity"
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-backgroundOverlay'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>
                      This auction is charity
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <div className='pt-3 pb-5 flex justify-center items-center'>
              <Button type="submit" className='w-full' > {isEditing ? 'Update' : 'Create'} Auction </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default AuctionForm;
