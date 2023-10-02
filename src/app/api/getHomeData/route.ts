
import { client } from "@/lib/sanityClient";
import { NextApiResponse } from "next";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    if (req.method == "GET") {
      const res = await client.fetch(groq`{
        "latestBlogs": [
          *[_type == "blogs" && category == "Blog"] | order(published_at desc) [0] {
            title,
            slug,
            meta_desc,
            displayImg,
            published_at,
            category,
            "likesCount": length(likes)
          },
          *[_type == "blogs" && category == "Games"] | order(published_at desc) [0] {
            title,
            slug,
            meta_desc,
            displayImg,
            published_at,
            category,
            "likesCount": length(likes)
          },
          *[_type == "blogs" && category == "Anime"] | order(published_at desc) [0] {
            title,
            slug,
            meta_desc,
            displayImg,
            published_at,
            category,
            "likesCount": length(likes)
          }
        ],
        "gamingBlogs": *[_type == "blogs" && category == "Games"] | order(length(likes) desc) [0...6] {
          title,
          slug,
          meta_desc,
          displayImg,
          published_at,
          category,
          "likesCount": length(likes)
        },
        "blogs": *[_type == "blogs" && category == "Blog"] | order(length(likes) desc) [0...3] {
          title,
          slug,
          meta_desc,
          displayImg,
          published_at,
          category,
          "likesCount": length(likes)
        },
        "animeBlogs": *[_type == "blogs" && category == "Anime"] | order(length(likes) desc) [0...6] {
          title,
          slug,
          meta_desc,
          displayImg,
          published_at,
          category,
          "likesCount": length(likes)
        }
      }
      `);  
      return NextResponse.json(
        {
          message: "Sent Comments",
          data: res,
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



  