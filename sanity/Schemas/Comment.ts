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
        name: "blogSlug",
        type: "string",
        title: "Blog Slug",
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
            name: 'reply',
            title: 'Reply',
            type: 'object',
            fields: [
              {
                name: 'userId',
                title: 'User ID',
                type: 'string'
              },
              {
                name: 'text',
                title: 'Text',
                type: 'text'
              },
              {
                name: 'createdAt',
                title: 'Created At',
                type: 'datetime',
              }
            ]
          }
        ]
      }),
    ]
    });
