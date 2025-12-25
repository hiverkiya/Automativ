import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "@/app/logout";
const Page = async () => {
  await requireAuth();
  const data = await caller.getUsers();
  return (
    <div>
      Protected server component
      <h1>{JSON.stringify(data, null, 2)}</h1>
      <LogoutButton />
    </div>
  );
};
export default Page;
