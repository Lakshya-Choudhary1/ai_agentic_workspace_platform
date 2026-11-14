"use client"

import { usePathname } from "next/navigation"
import SiteHeader from "@/components/SiteHeader"



type AppShellProps = {
     children : React.ReactNode
}

const AppShell = ({children} : AppShellProps) => {

     const pathname = usePathname();

     const isFullScreenRoute = pathname?.startsWith("/workspace/") || pathname?.startsWith("/shared/");

     if(isFullScreenRoute) return <>{children}</>;

  return (
    <div>
     <SiteHeader/>
     {children}
    </div>
  )
}

export default AppShell
