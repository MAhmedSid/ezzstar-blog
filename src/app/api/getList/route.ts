import { cdnClient, client } from "@/lib/sanityClient";
import { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";


export async function PUT(req: Request, res: NextApiResponse) {
  try {
    if (req.body) {
      const body = await req.json();
      const { cat, lastLength } = body;
      let length;
      if(lastLength === 0) length = 0;
      if(lastLength > 0) length = lastLength * 10;
     const res =  await cdnClient.fetch(groq`*[_type == "blogs" && category == '${cat}'] | order(published_at desc) [${length}...${
        length! + 10
      }] {
      title,
          slug,
          _id,
          meta_desc,
          displayImg,
          published_at,
          category,
          "likesCount": length(likes)
        }`);
          return NextResponse.json(
            { message: "Sent Comments", data: res},
            { status: 200 },
          );
    } else {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: (error as { message: string }).message },
      { status: 500 },
    );
  }
}