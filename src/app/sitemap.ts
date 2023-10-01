import { client } from '@/lib/sanityClient';
import { groq } from 'next-sanity';

export default async function sitemap() {
  const URL = 'https://ezzstar.com';

  const blogsArr = await client.fetch(
    groq` *[_type == "blogs"]{"slug":slug.current,_updatedAt}`
  );

  const posts = blogsArr.map((blog:any) => ({
    url: `${URL}/post/${blog.slug}`,
    lastModified: blog._updatedAt,
    changeFrequency: 'weekly',
    priority: 1,
  }));

  return [
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${URL}/gaming`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${URL}/anime`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url:`${URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...posts,
  ];
}