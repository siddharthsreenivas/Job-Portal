"use client";

import { getCandidateDetailsByIdAction } from "@/actions";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { Building2, Check, FileUser, MapPin, X } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
	"https://texfejeahwavdftrceri.supabase.co",
	process.env.NEXT_PUBLIC_SUPABASE_KEY
);

const CandidateList = ({
	jobApplications,
	currentCandidateDetails,
	setCurrentCandidateDetails,
	showCurrentCandidateDetailsModal,
	setShowCurrentCandidateDetailsModal,
}) => {
	const handleFetchCandidateDetails = async (id) => {
		const data = await getCandidateDetailsByIdAction(id);
		if (data) {
			setCurrentCandidateDetails(data);
			setShowCurrentCandidateDetailsModal(true);
		}
	};

	const handlePreviewResume = () => {
		const {data} = supabaseClient.storage.from('job-board').getPublicUrl(currentCandidateDetails?.candidateInfo?.resume)

		const a = document.createElement('a')
		a.href = data?.publicUrl
		a.setAttribute('download', 'Resume.pdf')
		a.setAttribute('target', '_blank')
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	}

	return (
		<>
			<div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
				{jobApplications && jobApplications.length > 0 ? (
					jobApplications.map((jobApplicantItem, i) => (
						<div
							key={i}
							className="bg-white border  shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4"
						>
							<div className="px-4 my-6 flex justify-between items-center">
								<h3 className="text-lg font-bold dark:text-black">
									{jobApplicantItem?.name}
								</h3>
								<Button
									onClick={() => {
										handleFetchCandidateDetails(
											jobApplicantItem?.candidateUserID
										);
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
				onOpenChange={() => {
					setCurrentCandidateDetails(null);
					setShowCurrentCandidateDetailsModal(false);
				}}
			>
				<DialogContent className="max-full md:max-w-xl">
					<DialogTitle className="sr-only">Details :</DialogTitle>
					<div>
						<h1 className="text-xl font-bold ">
							{currentCandidateDetails?.candidateInfo?.name} ,{" "}
							{currentCandidateDetails?.email}
						</h1>
						<p className="text-lg font-medium flex items-center gap-2">
							<Building2 size={18} />
							{currentCandidateDetails?.candidateInfo?.currentCompany}
						</p>
						<p className="text-sm font-normal mb-3 flex items-center gap-2">
							<MapPin size={18} />
							{currentCandidateDetails?.candidateInfo?.currentJobLocation}
						</p>
						<p>
							Total experience :{" "}
							{currentCandidateDetails?.candidateInfo?.totalExperience} years
						</p>
						<p>
							Salary : {currentCandidateDetails?.candidateInfo?.currentSalary}{" "}
							LPA
						</p>
						<p>
							Notice period :{" "}
							{currentCandidateDetails?.candidateInfo?.noticePeriod} days
						</p>
						<div className="flex gap-1 items-center justify-start ">
							<h2>Previous Companies : </h2>
							{currentCandidateDetails?.candidateInfo?.previousCompanies
								.split(",")
								.map((item, i) => (
									<p key={i} className="text-base">
										{item}
									</p>
								))}
						</div>
						<div className="flex gap-1 justify-start items-center mb-3">
							<h2>Skills : </h2>
							<p>{currentCandidateDetails?.candidateInfo?.skills}</p>
							{/* {currentCandidateDetails?.candidateInfo?.skills
								.split(",")
								.map((item, i) => (
									<p key={i} className="text-base">
										{item},
									</p>
								))} */}
						</div>
					</div>
					<DialogFooter>
						<div className="flex gap-3">
							<Button onClick={handlePreviewResume} className="h-11 px-5">
								<FileUser />
								Resume
							</Button>
							<Button className="h-11 px-5">
								<Check />
								Select
							</Button>
							<Button className="h-11 px-5">
								<X />
								Reject
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
export default CandidateList;
