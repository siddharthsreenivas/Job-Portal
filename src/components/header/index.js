"use client";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
// import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const Header = ({ user, profileInfo }) => {
	const menuItems = [
		{
			label: "Home",
			path: "/",
			show: true,
		},
		{
			label: "Login",
			path: "/sign-in",
			show: !user,
		},
		{
			label: "Register",
			path: "/sign-up",
			show: !user,
		},
		{
			label: "Activity",
			path: "/activity",
			show: profileInfo?.role === "candidate",
		},
		{
			label: "Jobs",
			path: "/jobs",
			show: user,
		},
		{
			label: "Membership",
			path: "/membership",
			show: user,
		},
		{
			label: "Account",
			path: "/account",
			show: user,
		},
	];

	return (
		<div>
			<header className="flex h-16 w-full shrink-0 items-center">
				<Sheet>
					<SheetTrigger asChild>
						<Button className="md:hidden">
							<AlignJustify className="h-6 w-6" />
							<span className="sr-only">Toggle Navigation Menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="pt-4">
						<SheetTitle className="px-6 mt-5 text-lg font-extrabold">
							JOBSCO.
						</SheetTitle>
						{/* <Link href={"#"} className="mr-6 hidden lg:flex">
							<h3>JOBSCO</h3>
						</Link> */}
						<div className="grid gap-2 mt-2 px-6">
							{menuItems.map((item, i) =>
								item.show ? (
									<Link
										key={i}
										href={`${item.path}`}
										className="flex w-full items-center py-2 text-lg font-semibold"
									>
										{item.label}
									</Link>
								) : null
							)}
							<UserButton />
						</div>
					</SheetContent>
				</Sheet>
				<Link href={"/"} className="hidden text-lg font-extrabold md:flex mr-6">
					JOBSCO.
				</Link>
				<nav className="ml-auto hidden md:flex gap-6">
					{menuItems.map((item, i) =>
						item.show ? (
							<Link
								key={i}
								href={`${item.path}`}
								className="inline-flex group h-9 w-max items-center rounded-md bg-white px-4 py-2 text-base font-medium"
							>
								{item.label}
							</Link>
						) : null
					)}
					<div className="flex itec">
						<UserButton />
					</div>
				</nav>
			</header>
		</div>
	);
};
export default Header;


// default clerk signin/signup buttons
{
	/* <SignedOut>
					<SignInButton />
					<SignUpButton />
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn> */
}
