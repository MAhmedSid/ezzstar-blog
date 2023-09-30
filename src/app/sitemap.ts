 export default async function sitemap(){


    const URL = "https://ezzstar.com";

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getSitemapData`,{
        method:"GET",
        cache:"no-store"
    })
    const body = await res.json();

    if(!res.ok){
        console.log(body.message);
        return
    }
    
    const blogsArr = body.data;

    const posts = blogsArr.map((blog:any,i:number) => ({
        url: `${URL}/post/${blog.slug}`,
        lastModified: blog._updatedAt,
      }))
   

    const routes = ["", "/blogs", "/gaming","/anime"].map((route) => ({
        url: `${URL}${route}`,
        lastModified: new Date().toISOString(),
      }));


  return [...routes,...posts];
}