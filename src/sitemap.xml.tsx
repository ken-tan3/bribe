// ref:[https://zenn.dev/catnose99/articles/c441954a987c24]

import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const xml = await generateSitemapXml();

  res.statusCode = 200;
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate"); // 24hours cache
  res.setHeader("Content-Type", "text/xml");
  res.end(xml);

  return {
    props: {},
  };
};

async function generateSitemapXml(): Promise<string> {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const bribesRes = await fetch(`${process.env.APP_DOMAIN}/api/bribes`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const bribes = await bribesRes.json();

  // add main url
  xml += `
      <url>
        <loc>${process.env.APP_DOMAIN}</loc>
        <lastmod>${new Date().toLocaleDateString()}</lastmod>
        <changefreq>daily</changefreq>
      </url>
  `;

  bribes.forEach((bribe) => {
    xml += `
      <url>
        <loc>${process.env.APP_DOMAIN}/bribes/${bribe.id}</loc>
        <lastmod>${new Date(bribe.updatedAt).toLocaleDateString()}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `;
  });

  xml += `</urlset>`;
  return xml;
}

const Page = () => null;
export default Page;
