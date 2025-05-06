"use client";

import { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer";

const RecruiterJobCard = ({ jobItem, jobApplications }) => {

	console.log(jobApplications);
	

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<>
			<CommonCard
				icon={<JobIcon />}
				title={jobItem?.title}
				footerContent={
					<Button
						onClick={() => setIsDrawerOpen(true)}
						className="flex h-11 items-center justify-center px-5"
					>
						{jobApplications.filter((job) => job.jobID === jobItem?._id).length}{" "}
						Applicants
					</Button>
				}
			/>
			<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
				<DrawerContent className="p-6 sm:p-10">
					<DrawerHeader className="px-0">
						<div className="flex justify-between items-center">
							<DrawerTitle className="text-4xl font-bold text-gray-800">
								{jobItem?.title}
							</DrawerTitle>
							{/* <div className="flex gap-3">
								<Button
									className="flex h-11 items-center justify-center px-5"
									disabled={jobApplications.some(
										(item) => item.jobID === jobItem?._id
									)}
									// {jobApplications.findIndex(item => item.jobID === jobItem?._id) > -1 ? true: false}
								>
									{jobApplications.some((item) => item.jobID === jobItem?._id)
										? "Applied"
										: "Apply"} */}
							{/* Apply */}
							{/* </Button>
								<Button
									onClick={() => setIsDrawerOpen(false)}
									className="flex h-11 items-center justify-center px-5"
								>
									Cancel
								</Button>
							</div> */}
						</div>
					</DrawerHeader>
					<DrawerDescription className="text-xl text-gray-600 flex flex-col font-semibold">
						{jobItem?.description}
						<span>{jobItem?.companyName}</span>
						<span className="flex items-center font-normal gap-2 text-lg text-gray-500">
							{jobItem?.location}
						</span>
					</DrawerDescription>
					{/* <div className="w-fit px-6 bg-black flex mt-6 justify-center items-center h-[40px] rounded-sm">
						<h2 className="text-base font-semibold text-white">
							{jobItem?.type}
						</h2>
					</div> */}
					<h3 className="text-2xl mt-4 font-bold text-gray-800">Applicants</h3>
					<div className="flex flex-col gap-3 mt-3">
						{jobApplications.filter((job) => job.jobID === jobItem?._id).length > 0 ? 
						jobApplications
							.filter((job) => job.jobID === jobItem?._id)
							.map((item, i) => (
								<div key={i} className="bg-gray-300 px-4 py-2 rounded-md">
									<h5 className="text-lg -mb-1 text-gray-600 flex flex-col font-semibold">
										{item.name}
									</h5>
									<h3 className="font-normal gap-2 text-base text-gray-500">
										{item.email}
									</h3>
								</div>
							))
							: <p>No one has applied to this Job.</p>
						}
					</div>
				</DrawerContent>
			</Drawer>
		</>
	);
};
export default RecruiterJobCard;
