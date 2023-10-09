/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl:  'https://ezzstar.com',
    generateRobotsTxt: true, 
    exclude: ['/account/*','/api/*','/server-sitemap.xml','/post/*','/studio'],
   robotsTxtOptions:{
    additionalSitemaps:[
      'https://ezzstar.com/server-sitemap.xml'
    ]
   }
  }
  