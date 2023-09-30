import { cdnClient, client } from "@/lib/sanityClient";
import { NextApiResponse } from "next";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    if (req.method == "GET") {
    
        const blogsArr = await client.fetch(groq` *[_type == "blogs"]{"slug":slug.current,_updatedAt}`);

      return NextResponse.json(
        {
          message: "Get Posts Success",
          data: blogsArr,
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
