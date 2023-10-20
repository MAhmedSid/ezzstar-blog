import { client } from "@/lib/sanityClient";
import {  NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function DELETE(req: Request, res: NextApiResponse) {
    try {
      if (req.body) {
        const body = await req.json();
        const { commentID } = body;
  
        await client.delete(commentID);
  
        return NextResponse.json(
          { message: "Comment deleted successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
      }
    } catch (error) {
      console.error((error as { message: string }).message);
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  }