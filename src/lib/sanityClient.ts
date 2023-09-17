import {createClient} from 'next-sanity'


const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID 
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET 

export const client = createClient({
    projectId,
    dataset,
    apiVersion: "2023-07-17",
    useCdn: false, 
    token:"skQITWOn6sqSwFcm2jR4yX1KJOrhebRDBwxp1m5P2DEboxn1gcfeAZnfFv0NMhaHaqupUF1axnlbEaCkEJSISMH8TDXvzI3bX8VETgtc2xfXeQP61gITA4u2BFjzTAGezklPdU201tQmpIxzrhYxBKAreYRzXTOEkH6n3uquZrM8LHmTJkDt"
  })


export const cdnClient = createClient({
    projectId,
    dataset,
    apiVersion: "2023-07-17",
    useCdn: true, 
  })

