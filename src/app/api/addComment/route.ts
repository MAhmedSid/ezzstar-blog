import { client } from "@/lib/sanityClient";
import {  NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: NextApiResponse) {

try {

    if (req.body) {
        const body = await req.json();
        const { blogId, userId, commentText } = body;


    
        const comment = await client.create({
            _type: "comments",
            blogId,
            userId,
            commentText,
            replies: [],
        });

         return NextResponse.json({ message: "Comment added successfully", comment }, {status: 200});
    }else{
        return NextResponse.json({ message: "Bad request" }, { status: 400 });

    }

} catch (error) {
    console.error((error as {message:string}).message);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
}

}