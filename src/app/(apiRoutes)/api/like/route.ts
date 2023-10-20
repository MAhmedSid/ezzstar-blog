import { client } from "@/lib/sanityClient";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';


export async function PUT(req: Request, res: NextApiResponse) {
  try {
    if (req.body) {
      const body = await req.json();
      const { userId, like, blogId } = body;
      if (like === false || like === null) {
        await client
        .patch(blogId)
        .setIfMissing({likes: []})
        .insert('before', 'likes[0]', [{_type: 'like', userId,_key: uuidv4()}])
        .commit();
        return NextResponse.json(
          { message: "Liked successfully", likeStatus: true },
          { status: 200 },
          );
        } else {
        await client
          .patch(blogId)
          .unset([`likes[userId == "${userId}"]`])
          .commit();
          return NextResponse.json(
            { message: "Dislike successfully", likeStatus: false },
            { status: 200 },
          );
       
      }
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
