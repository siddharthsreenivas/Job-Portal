"use client";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

const CandidateList = ({
	jobApplications,
	currentCandidateDetails,
	setCurrentCandidateDetails,
	showCurrentCandidateDetailsModal,
	setShowCurrentCandidateDetailsModal,
}) => {
	const handleFetchCandidateDetails = () => {};

	return (
		<>
			<div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
				{jobApplications && jobApplications.length > 0 ? (
					jobApplications.map((jobApplicantItem, i) => (
						<div key={i} className="bg-white border  shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
							<div className="px-4 my-6 flex justify-between items-center">
								<h3 className="text-lg font-bold dark:text-black">
									{jobApplicantItem?.name}
								</h3>
								<Button
									onClick={() => {
										handleFetchCandidateDetails(
											jobApplicantItem?.candidateUserID
										);
										setShowCurrentCandidateDetailsModal(true);
									}}
									className="dark:bg-[#fffa27]  flex h-11 items-center justify-center px-5"
								>
									View Profile
								</Button>
							</div>
						</div>
					))
				) : (
					<p className="text-xl font-bold text-center">No applicants found!!</p>
				)}
			</div>
			<Dialog
				open={showCurrentCandidateDetailsModal}
				onOpenChange={setShowCurrentCandidateDetailsModal}
			>
                <div className="sr-only">
                    <DialogTitle>Candidate Info Modal</DialogTitle>
                </div>
                <DialogContent>hi</DialogContent>
            </Dialog>
		</>
	);
};
export default CandidateList;
