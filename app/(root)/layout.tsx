import { redirect } from "next/navigation";
import React from "react";

import Header from "@/components/header";
import MobileNavigation from "@/components/mobile-navigation";
import SideBar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from "@/lib/actions/user.actions";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/sign-in");

  return (
    <main className="flex h-screen">
      <SideBar {...currentUser} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser} />
        <Header userId={currentUser.$id} accountId={currentUser.accountId}/>
        <div className="main-content">{children}</div>
      </section>
      <Toaster />
    </main>
  );
};

export default RootLayout;
