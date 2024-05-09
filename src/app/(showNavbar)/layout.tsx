import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NavBar from "@/components/Navbar";
import Container from "@/components/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Library",
  description: "Lets make education better.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " "}>
        <Container>
          <NavBar />
          <div className="w-full max-w-sm md:py-4 md:pt-20 md:max-w-7xl  ">
            {children}
          </div>
        </Container>
      </body>
    </html>
  );
}
