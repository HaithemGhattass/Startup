// import { Button } from "@/components/ui/button";

import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4">
    <div>
      This is a screen for user auth
      </div>
      <div>
        <UserButton />
        </div>
    </div>
    // <Button size={"sm"} variant={'destructive'}> CLick me</Button>
  );
}
