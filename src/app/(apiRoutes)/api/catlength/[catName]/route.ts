import { client } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET(req: Request,{ params }: { params: { catName: string } }){

    try {
    const catName = decodeURIComponent(params.catName)
    

    const totalLength = await client.fetch(
        groq`count(*[_type == "blogs" && category == '${catName}'   && !(_id in path("drafts.**"))])`,
      );


    return NextResponse.json(
      {
        message: "Sent Comments",
        length: totalLength,
      },
      { status: 200 },
    );
} catch (error) {
  return NextResponse.json(
    { message: (error as { message: string })},
    { status: 500 },
  );
}

}