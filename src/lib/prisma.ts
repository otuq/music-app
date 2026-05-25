import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"

const connectionString = process.env.DATABASE_URL!

const adapter = new PrismaPg({
  connectionString,
})

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }

// const createPrismaClient = () => {
//   const dbPath = path.join(process.cwd(), "dev.db");
//   const adapter = new PrismaBetterSqlite3({
//     url: `file:${dbPath}`,
//   });

//   return new PrismaClient({ adapter });
// };

// // Next.jsのホットリロード対策（シングルトンパターン）
// const prisma = globalForPrisma.prisma ?? createPrismaClient()

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma
// }

// export default prisma;

// // Next.jsがファイルをいくらリロードしても、
// // Node.js自体が持っている global（アプリ全体で1つしかない共通の倉庫）
// // の中身だけはリセットされずに残り続けます。
// const prisma = globalForPrisma.prisma ?? createPrismaClient()
// //production（開発用）開発環境のときだけグローバル倉庫に保存するように制限。
// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma
// }

// export default prisma;