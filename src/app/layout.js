import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import CommonLayout from "@/components/common-layout";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Job Portal",
	description: "Job Portal created using NextJs.",
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider afterSignOutUrl="/">
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<Suspense fallback={<Loading />}>
						<CommonLayout>{children}</CommonLayout>
					</Suspense>
						<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
