import { cdnClient, client } from '@/lib/sanityClient';
import { groq } from 'next-sanity';
import { getServerSideSitemap , ISitemapField} from  'next-sitemap';

export async function GET(request: Request) {

    const URL = "https://ezzstar.com"
  
    const blogsArr = await cdnClient.fetch(groq` *[_type == "blogs"]{"slug":slug.current,_updatedAt}`);

    const posts: ISitemapField[] = blogsArr.map((blog:any,i:number) => ({
        loc: `${URL}/post/${blog.slug}`,
        lastmod: blog._updatedAt,
        changefreq: 'weekly',
        priority: 1,
      }))

  return getServerSideSitemap(posts)
}