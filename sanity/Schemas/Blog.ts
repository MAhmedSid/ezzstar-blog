import {
    defineField,
    defineType,
  } from "sanity";

export const blogs = defineType({
    name: "blogs",
    type: "document",
    title: "Blogs",
    fields:[
      defineField({
        name: "title",
        type: "string",
        title: "Title",
        validation: Rule => Rule.max(120).error('Max limit is 120 characters')
      }),
      defineField({
        name: "slug",
        type: "slug",
        title: "Slug",
        options: {
          source: "title",
          maxLength: 200,
          slugify: (input) =>
            input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
        },
      }),
      defineField({
        name:"meta_desc",
        type:"text",
        title:"Meta Description",
        validation: Rule => Rule.max(400).error('Max limit is 400 characters') 
      }),
      defineField({
        name:"displayImg",
        type:"image",
        title:"Display Image",
        fields:[
          {
            name: 'alt',
            type: 'string',
            title: 'Alternative text',
            validation: Rule => Rule.required().error('Alt text is required for accessibility')
          }
        ]
      }),
      defineField({
        name:"category",
        type:"string",
        title:"Category",
        options:{
            list:[
                "Games",
                "Anime",
                "Blog",
            ]
        }
      }),
      defineField({
        name:"published_at",
        type: 'datetime',
        title:"Published Time",
        options:{
             dateFormat: 'DD-MM-YYYY',
             timeFormat: 'HH:mm',
         }
      }),

      defineField({
        name: "pageContent",
        type: "array",
        title: "Detail Page Content",
        of: [
          {
            name: "section",
            type: "object",
            title: "Section",
            fields: [
              {
                name: "body",
                type: "array",
                title: "Body",
                of: [{ type: "block" }],
              },
              {
                name: "image",
                type: "image",
                title: "Image",
                fields:[
                  {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    validation: Rule => Rule.required().error('Alt text is required for accessibility')
                  }
                ]
              },
            ],
          },
        ],
      }),
      defineField({
        name:"likes",
        title:"Likes",
        type: 'array',
        of: [
          {
            name: 'like',
            title: 'Like',
            type: 'object',
            fields: [
              {
                name: 'userId',
                title: 'User ID',
                type: 'string'
              }
            ]
          }
        ]
      })
    ]
    });