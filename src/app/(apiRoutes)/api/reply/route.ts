import { client } from "@/lib/sanityClient";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PUT(req: Request, res: NextApiResponse) {
  try {
    if (req.body) {
      const body = await req.json();
      const { userId, text, commentId, isDelete, reply_key } = body;

      if (isDelete === false || isDelete === null) {
        await client
          .patch(commentId)
          .setIfMissing({ replies: [] })
          .insert("before", "replies[0]", [
            {
              _type: "reply",
              userId,
              _key: uuidv4(),
              text,
              createdAt: new Date().toISOString(),
            },
          ])
          .commit();
        return NextResponse.json(
          { message: "Reply added successfully" },
          { status: 200 },
        );
      } else {
        const replyKey = reply_key;
        
        const res = await client
          .patch(commentId)
          .unset([`replies[_key == "${replyKey}"]`])
          .commit();

        return NextResponse.json(
          { message: "Reply Deleted successfully" },
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
