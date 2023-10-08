import { cdnClient, client } from "@/lib/sanityClient";
import { NextApiResponse } from "next";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET(req: Request,{ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  try {
      const res = await client.fetch(groq`*[_type == "blogs" && slug.current == '${slug}'  && !(_id in path("drafts.**"))] [0]  {
      title,
      meta_desc
        }`);
      return NextResponse.json(
        {
          message: "Sent Comments",
          data: {
            title: res?.title ? res.title : "Post - EZZSTAR",
            meta_desc: res?.meta_desc ? res.meta_desc : "trending updates of Metaverse, Gaming , Web3.0 from future by EZZSTAR",
            },
            
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
