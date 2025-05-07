"use client";

import CandidateList from "../candidate-list";
import {
	Drawer,
	DrawerContent,
} from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";

const JobApplicants = ({
	isDrawerOpen,
	setIsDrawerOpen,
	showCurrentCandidateDetailsModal,
	setShowCurrentCandidateDetailsModal,
	currentCandidateDetails,
	setCurrentCandidateDetails,
	jobItem,
	jobApplications,
}) => {
	return (
		<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
			<DrawerContent className="max-h-[50vh]">
				<ScrollArea className="h-auto overflow-y-auto">
					<CandidateList
						currentCandidateDetails={currentCandidateDetails}
						setCurrentCandidateDetails={setCurrentCandidateDetails}
						jobApplications={jobApplications}
						showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
						setShowCurrentCandidateDetailsModal={
							setShowCurrentCandidateDetailsModal
						}
					/>
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	);
};

// <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
// 	<DrawerContent className="p-6 sm:p-10">
// 		<DrawerHeader className="px-0">
// 			<div className="flex justify-between items-center">
// 				<DrawerTitle className="text-4xl font-bold text-gray-800">
// 					{jobItem?.title}
// 				</DrawerTitle>
// 			</div>
// 		</DrawerHeader>
// 		<DrawerDescription className="text-xl text-gray-600 flex flex-col font-semibold">
// 			{jobItem?.description}
// 			<span>{jobItem?.companyName}</span>
// 			<span className="flex items-center font-normal gap-2 text-lg text-gray-500">
// 				{jobItem?.location}
// 			</span>
// 		</DrawerDescription>

// 		<h3 className="text-2xl mt-4 font-bold text-gray-800">Applicants</h3>
// 		<div className="flex flex-col gap-3 mt-3">
// 			{jobApplications.filter((job) => job.jobID === jobItem?._id).length >
// 			0 ? (
// 				jobApplications
// 					.filter((job) => job.jobID === jobItem?._id)
// 					.map((item, i) => (
// 						<div key={i} className="bg-gray-300 px-4 py-2 rounded-md">
// 							<h5 className="text-lg -mb-1 text-gray-600 flex flex-col font-semibold">
// 								{item.name}
// 							</h5>
// 							<h3 className="font-normal gap-2 text-base text-gray-500">
// 								{item.email}
// 							</h3>
// 						</div>
// 					))
// 			) : (
// 				<p>No one has applied to this Job.</p>
// 			)}
// 		</div>
// 	</DrawerContent>
// </Drawer>

export default JobApplicants;
