import { defineField, defineType } from "sanity";



export const comments = defineType({
    name: "comments",
    type: "document",
    title: "Comments",
    fields:[
      defineField({
        name: "blogId",
        type: "string",
        title: "Blog Id",
      }),
      defineField({
        name: "userId",
        type: "string",
        title: "User ID",
      }),

      defineField({
        name: "commentText",
        type: "text",
        title: "Comment Text",
      }),
      defineField({
        name: "replies",
        type: "array",
        title: "Replies",
        of:[
          {
            name: "userId",
            type: "string",
            title: "Replies",
          },
          {
            name: "text",
            type: "text",
            title: "Reply Text",
          },
        ]
      }),
    ]
    });
