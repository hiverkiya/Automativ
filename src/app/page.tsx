import prisma from "@/lib/db";

const Page=async()=>{
 const users= await prisma.user.findMany()
  return (
      <div>
        Hello world
          <div>{JSON.stringify(users)}</div>
      </div>
  )
}
export default Page