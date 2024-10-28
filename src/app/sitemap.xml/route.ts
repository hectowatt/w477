export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    const sitemap = [
      { url: `${baseUrl}`, lastModified: new Date().toISOString() }
    ];
  
    const xml = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemap
          .map(
            (entry) => `
          <url>
            <loc>${entry.url}</loc>
            <lastmod>${entry.lastModified}</lastmod>
          </url>`
          )
          .join('')}
      </urlset>
    `.trim();
  
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
  