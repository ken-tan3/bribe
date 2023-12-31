import { PrismaClient } from "@prisma/client";

/* 

## error handling
- MySQL, PlanetScale error: PrismaClientKnownRequestError: ... column (not available) ... #11160
  - https://github.com/prisma/prisma/issues/11160
- Configuring logging
  - https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/logging

## prisma client up to date

- How to keep the Prisma client up to date when deploying Next.js to Vercel
  - https://blog.charlesloubao.com/how-to-keep-the-prisma-client-up-to-date-when-deploying-next-js-to-vercel/
  
*/

const prisma =
  global.prisma ||
  new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "stdout",
        level: "error",
      },
      {
        emit: "stdout",
        level: "info",
      },
      {
        emit: "stdout",
        level: "warn",
      },
    ],
  });

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
