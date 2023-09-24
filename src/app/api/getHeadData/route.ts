import { cdnClient } from "@/lib/sanityClient";
import { NextApiResponse } from "next";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export async function PUT(req: Request, res: NextApiResponse) {
  try {
    if (req.body) {
      const body = await req.json();
      const { slug } = body;

      const res =
        await cdnClient.fetch(groq`*[_type == "blogs" && slug.current == '${slug}'] [0]  {
      title,
      meta_desc
        }`);
      return NextResponse.json(
        {
          message: "Sent Comments",
          data: {
            title: res.title ? res.title : "Post - EZZSTAR",
            meta_desc: res.meta_desc
              ? res.meta_desc
              : "trending updates of Metaverse, Gaming , Web3.0 from future by EZZSTAR",
          },
        },
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
