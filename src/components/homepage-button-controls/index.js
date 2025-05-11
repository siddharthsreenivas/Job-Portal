"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect } from "react";

const HomePageButtonControls = ({ user, profileInfo }) => {
	const router = useRouter();

    useEffect(() => {router.refresh()},[])

	return (
		<div className="flex space-x-4">
			<Button onClick={() => router.push("/jobs")} className="h-11 px-5">
				{user
					? profileInfo?.role === "candidate"
						? "Browse Jobs"
						: "Jobs Dashboard"
					: "Find Jobs"}
			</Button>
			<Button
				onClick={() =>
					router.push(
						user
							? profileInfo?.role === "candidate"
								? '/activity'
								: '/jobs'
							: '/jobs'
					)
				}
				className="h-11 px-5"
			>
				{user
					? profileInfo?.role === "candidate"
						? "Your Activity"
						: "Post New Job"
					: "Post New Job"}
			</Button>
		</div>
	);
};
export default HomePageButtonControls;
