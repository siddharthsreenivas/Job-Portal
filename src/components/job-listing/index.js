"use client";

import PostNewJob from "../post-new-job";

const JobListing = ({ user, profileInfo, jobList }) => {
	return (
		<div>
			<div className="mx-auto max-w-7xl">
				<div className="flex items-baseline justify-between border-b pt-24 border-gray-200 pb-6">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900">
						{profileInfo?.role === "candidate"
							? "Explore All Jobs"
							: "Jobs Dashboard"}
					</h1>
					<div className="flex items-center">
						{profileInfo?.role === "candidate" ? (
							<p>Filter</p>
						) : (
							<PostNewJob profileInfo={profileInfo} />
						)}
					</div>
				</div>
				<div>Job Listing</div>
			</div>
		</div>
	);
};
export default JobListing;
