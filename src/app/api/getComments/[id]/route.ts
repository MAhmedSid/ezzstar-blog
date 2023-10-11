import { client } from "@/lib/sanityClient";
import { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

 
export async function GET(req: Request,{ params }: { params: { id: string } }) {
  try {
    if (req.method === "GET") {

      const blogId = params.id;
      
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
