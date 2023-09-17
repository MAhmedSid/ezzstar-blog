import { cdnClient } from '@/lib/sanityClient';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import imageUrlBuilder from "@sanity/image-url";



const builder = imageUrlBuilder(cdnClient);

export const urlFor = (source: any) => builder.image(source);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
