import { cdnClient, client } from "@/lib/sanityClient";
import { NextApiResponse } from "next";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export async function POST(req: Request,{ params }: { params: { slug: string } }){
  try {
    
      const slug = decodeURIComponent(params.slug)
      const body = await req.json();
      const {cat} = body;

      const res = await client.fetch(groq`{
        "blogData": *[_type == "blogs" && slug.current == '${slug}'][0]{
      title,
      category,
      published_at,
      "slug": slug.current,
      _id,
      pageContent[]{
        ...,
        image {
          alt,
          "url": asset->url
        }
      },
      "likesCount": length(likes),
    },
        "commentNumber": count(*[_type == "comments" && blogSlug == '${slug}'])
        ,
        "morePost": *[_type == "blogs" ${
          cat !== "" && cat !== "undefined" ? `&& category == '${cat}'` : ""
        }  && !(_id in path("drafts.**"))]  | order(published_at desc)  [0...3]{
          title,
          category,
          published_at,
                "slug": slug.current,
          displayImg,
          "likesCount": length(likes),
        }
      }`);
      return NextResponse.json(
        {
          message: "Sent Comments",
          data: res,
        },
        { status: 200 },
      );
  } catch (error) {
    return NextResponse.json(
      { message: (error as { message: string }).message },
      { status: 500 },
    );
  }
}
