import {PrismaClient} from "@/generated/prisma"
const globalForPrisma=global as unknown as {
    prisma:PrismaClient
}
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV!=="production") {
    globalForPrisma.prisma=prisma
}
export default prisma

// We're avoiding to create new connections every time it hot reloads,that's why we reuse the existing connection saved in the global state or create a new one
