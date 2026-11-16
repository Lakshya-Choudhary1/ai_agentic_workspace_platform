import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Show, SignInButton, UserButton, SignUpButton ,useUser, useAuth , OrganizationSwitcher} from "@clerk/nextjs";
import { MenuIcon, XIcon  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense, useState } from "react";
import Loading from "@/components/Loading";

const SiteHeader = () => {
  const pathname = usePathname();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn,isLoaded , userId } = useAuth()

  if (!isLoaded) {
    return <Loading />
  }

  if(userId) console.log(userId);

  const isLandingPage = pathname === "/";

  const navLinks = [
    { label: "Product", href: "#product" },
    { label: "How-it-works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed drop-shadow-md drop-shadow-foreground/2 inset-0 flex h-16 md:h-18 items-center justify-between border-b border-foreground/10 bg-background/80 backdrop-blur-xl">
      {/* Logo */}
      <Link
        href={isSignedIn && isLandingPage ? "/dashboard" : "/"}
        className="flex h-full shrink-0 items-center justify-center border-r border-foreground/10 px-4 md:px-6"
      >
        <Image
          src="/brand/logo-navbar-dark.png"
          alt="outpost"
          width={314}
          height={160}
          className="h-9 w-auto object-contain"
          priority
        />
      </Link>

      {/* Desktop Navbar */}
      {isLandingPage && (
        <nav className="hidden md:flex  items-center gap-16 drop-shadow-sm drop-shadow-foreground/30 bg-background border border-foreground/6 rounded-full py-2  px-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      {/* Authentication Buttons */}
      {isLandingPage && (<div className="flex h-full items-center gap-3 border-l   px-4 md:px-6">
        <Suspense>
          <Show when="signed-out">
            <div className="hidden items-center gap-2 md:flex">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button size="sm">Get Started</Button>
              </SignUpButton>
            </div>
          </Show>

          <Show when="signed-in">
            <Button  asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton />
          </Show>

          {/* Mobile Menu Toggle */}
          <Show when="signed-out">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <MenuIcon size={24} />
            </Button>

            {/* Mobile Menu Overlay */}
            
              <div
                className={`absolute inset-0 z-60 flex h-dvh flex-col bg-background md:hidden
    transition-all duration-500 ease-in-out opacity-0
    ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full pointer-events-none"}`}
              >
                {/* Menu Header */}
                <div className="flex h-16 shrink-0 items-center justify-end border-b border-foreground/10 pr-5">
                 

                  <Button variant="ghost" size="icon" onClick={closeMenu}>
                    <XIcon size={24} />
                  </Button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-1 flex-col items-center justify-center gap-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className="text-xl font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Authentication */}
                <div className="flex flex-col gap-3 border-t border-foreground/10 p-6">
                  <SignInButton mode="modal">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={closeMenu}
                    >
                      Sign in
                    </Button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <Button className="w-full" onClick={closeMenu}>
                      Get Started
                    </Button>
                  </SignUpButton>
                </div>
              </div>
           
          </Show>
        </Suspense>
      </div>
      )}

      {!isLandingPage && isSignedIn && (
        <div className="px-6 flex gap-4 justify-center item-center">
          <OrganizationSwitcher />
          <UserButton />
        </div>
      )}

    </header>
  );
};

export default SiteHeader;
