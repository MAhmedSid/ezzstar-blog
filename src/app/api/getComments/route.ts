import { client } from "@/lib/sanityClient";
import { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";


export async function PUT(req: Request, res: NextApiResponse) {
  try {
    if (req.body) {
      const body = await req.json();
      const { blogId } = body;

      
      const res = await client.fetch(groq`*[_type == "comments" && blogId == '${blogId}']`)
      
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
