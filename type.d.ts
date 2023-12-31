// use this file to declare unknown types

/*
 > error
 Property 'prisma' does not exist on type 'Global & typeof globalThis'.
 > path
 utils/prisma.ts
 > ref
 https://github.com/nextauthjs/next-auth/issues/824#issuecomment-898711855
*/
declare global {
  var prisma: PrismaClient;
}

export {}