/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl:  'https://www.ezzstar.com',
    changefreq:"weekly",
    generateRobotsTxt: true, 
    exclude: ['/account/*','/api/*','/server-sitemap.xml','/post/*','/studio'],
   robotsTxtOptions:{
    additionalSitemaps:[
      'https://www.ezzstar.com/server-sitemap.xml'
    ]
   }
  }
  