"use client";

import { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import JobApplicants from "../job-applicants";

const RecruiterJobCard = ({ jobItem, jobApplications }) => {
	console.log(jobApplications);

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
	const [
		showCurrentCandidateDetailsModal,
		setShowCurrentCandidateDetailsModal,
	] = useState(null);

	return (
		<>
			<CommonCard
				icon={<JobIcon />}
				title={jobItem?.title}
				footerContent={
					<Button
						onClick={() => setIsDrawerOpen(true)}
						className="flex h-11 items-center justify-center px-5"
						disabled={
							jobApplications.filter((job) => job.jobID === jobItem?._id).length === 0
						}
					>
						{jobApplications.filter((job) => job.jobID === jobItem?._id).length}{" "}
						Applicants
					</Button>
				}
			/>
			<JobApplicants
				isDrawerOpen={isDrawerOpen}
				setIsDrawerOpen={setIsDrawerOpen}
				showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
				setShowCurrentCandidateDetailsModal={
					setShowCurrentCandidateDetailsModal
				}
				currentCandidateDetails={currentCandidateDetails}
				setCurrentCandidateDetails={setCurrentCandidateDetails}
				jobItem={jobItem}
				jobApplications={jobApplications.filter(
					(job) => job.jobID === jobItem?._id
				)}
			/>
		</>
	);
};
export default RecruiterJobCard;
