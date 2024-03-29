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
        validation: Rule => [
          Rule.required().error('Title is required'),
          Rule.max(70).error('Title should not exceed more than 70 characters. Shorter titles are usually better')
        ], 
      }),
      defineField({
        name: "slug",
        type: "slug",
        title: "Slug",
        options: {
          source: "title",
          maxLength: 200,
          slugify: (input) =>
            input.toLowerCase().replace(/[\s"'?!@#$%^&*()_+=;,.:/`|]/g, "-").slice(0, 200),
        },
        validation: Rule => Rule.required().error('Slug is required')
      }),
      defineField({
        name:"meta_desc",
        type:"text",
        title:"Meta Description",
        validation: Rule => [
          Rule.min(60).warning('Longer Meta Description are usually better'),
          Rule.required().error('Meta Description is required'),
          Rule.max(200).error('Meta description should not exceed more than 200 characters') 
        ],
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
        },
        validation: Rule => Rule.required().error('Category is required')
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
                    validation: Rule => Rule.required().error('Alt text is required for ranking and accessibility')
                  }
                ]
              },
              {
                name:"tweetUrls",
                title:"Twitter Tweets URLs",
                type: 'array',
                description:"Copy the Tweet Link and paste in the URL box.",
                of: [
                  {
                    name: "twitterPostUrl",
                    type: "url",
                    title: "Twitter Post URL",
                  }
                ]
              }
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