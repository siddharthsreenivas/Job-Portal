"use client";

import { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";

import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { MapPin } from "lucide-react";
import { createJobApplicationAction } from "@/actions";

const CandidateJobCard = ({ jobItem, profileInfo, jobApplications }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handJobApply = async () => {
		await createJobApplicationAction(
			{
				recruiterUserID: jobItem?.recruiterId,
				name: profileInfo?.candidateInfo?.name,
				email: profileInfo?.email,
				candidateUserID: profileInfo?.userId,
				status: ["Applied"],
				jobID: jobItem?._id,
				jobAppliedDate: new Date().toLocaleDateString(),
			},
			"/jobs"
		);
		setIsDrawerOpen(false);
	};

	return (
		<>
			<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
				<CommonCard
					icon={<JobIcon />}
					title={jobItem?.title}
					description={jobItem?.companyName}
					footerContent={
						<Button
							onClick={() => setIsDrawerOpen(true)}
							className="flex h-11 items-center justify-center px-5"
						>
							View Details
						</Button>
					}
				/>

				<DrawerContent className="p-6 sm:p-10">
					<DrawerHeader className="px-0">
						<div className="flex justify-between items-center">
							<DrawerTitle className="text-4xl font-bold text-gray-800">
								{jobItem?.title}
							</DrawerTitle>
							<div className="flex gap-3">
								<Button
									onClick={handJobApply}
									className="flex h-11 items-center justify-center px-5"
									disabled={jobApplications.some(
										(item) => item.jobID === jobItem?._id
									)}
									// {jobApplications.findIndex(item => item.jobID === jobItem?._id) > -1 ? true: false}
								>
									{jobApplications.some((item) => item.jobID === jobItem?._id)
										? "Applied"
										: "Apply"}
									{/* Apply */}
								</Button>
								<Button
									onClick={() => setIsDrawerOpen(false)}
									className="flex h-11 items-center justify-center px-5"
								>
									Cancel
								</Button>
							</div>
						</div>
					</DrawerHeader>
					<DrawerDescription className="text-xl text-gray-600 flex flex-col font-semibold">
						{jobItem?.description}
						<span>{jobItem?.companyName}</span>
						<span className="flex items-center font-normal gap-2 text-lg text-gray-500">
							<MapPin size={18} />
							{jobItem?.location}
						</span>
					</DrawerDescription>
					<div className="w-fit px-6 bg-black flex mt-6 justify-center items-center h-[40px] rounded-sm">
						<h2 className="text-base font-semibold text-white">
							{jobItem?.type}
						</h2>
					</div>
					<h3 className="text-xl font-medium text-black mt-3">
						Experience: {jobItem?.experience}
					</h3>
					<div className="flex gap-4">
						{jobItem?.skills.split(",").map((item, i) => (
							<div
								key={i}
								className="w-fit px-6 bg-black flex mt-6 justify-center items-center h-[35px] rounded-sm"
							>
								<h2 className="text-sm font-medium text-white">{item}</h2>
							</div>
						))}
					</div>
				</DrawerContent>
			</Drawer>
		</>
	);
};
export default CandidateJobCard;
