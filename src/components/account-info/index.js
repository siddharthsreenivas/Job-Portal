"use client";

import {
	candidateOnBoardFormControls,
	initialCandidateAccountFormData,
	initialRecruiterFormData,
	recruiterOnBoardFormControls,
} from "@/utils";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { updateProfileAction } from "@/actions";

const AccountInfo = ({ profileInfo }) => {
	const [recruiterFormData, setRecruiterFormData] = useState(
		initialRecruiterFormData
	);
	const [candidateFormData, setCandidateFormData] = useState(
		initialCandidateAccountFormData
	);

	useEffect(() => {
		if (profileInfo?.role === "recruiter")
			setRecruiterFormData(profileInfo?.recruiterInfo);
		if (profileInfo?.role === "candidate")
			setCandidateFormData(profileInfo?.candidateInfo);
	}, [profileInfo]);

	const handleUpdateAccount = async () => {
		await updateProfileAction(
			profileInfo?.role === "candidate"
				? {
						userId: profileInfo?.userId,
						role: profileInfo?.role,
						email: profileInfo?.email,
						isPremiumUser: profileInfo?.isPremiumUser,
						memberShipType: profileInfo?.memberShipType,
						memberShipStartDate: profileInfo?.memberShipStartDate,
						memberShipEndDate: profileInfo?.memberShipEndDate,
						candidateInfo: {
							...candidateFormData,
							resume: profileInfo?.candidateInfo?.resume,
						},
						_id: profileInfo?._id,
				  }
				: {
						userId: profileInfo?.userId,
						role: profileInfo?.role,
						email: profileInfo?.email,
						isPremiumUser: profileInfo?.isPremiumUser,
						memberShipType: profileInfo?.memberShipType,
						memberShipStartDate: profileInfo?.memberShipStartDate,
						memberShipEndDate: profileInfo?.memberShipEndDate,
						recruiterInfo: { ...recruiterFormData },
						_id: profileInfo?._id,
				  },
			"/account"
		);
	};

	return (
		<div className="mx-auto max-w-7xl">
			<div className="flex items-baseline justify-between pb-6 border-b pt-24">
				<h1 className="text-4xl font-bold tracking-tight text-gray-950">
					Account Details
				</h1>
			</div>
			<div className="py-20 pb-24 pt-6">
				<div className="container mx-auto p-0 space-y-8">
					<CommonForm
						action={handleUpdateAccount}
						formControls={
							profileInfo?.role === "candidate"
								? candidateOnBoardFormControls.filter(
										(item) => item.name !== "resume"
								  )
								: recruiterOnBoardFormControls
						}
						formData={
							profileInfo?.role === "candidate"
								? candidateFormData
								: recruiterFormData
						}
						setFormData={
							profileInfo?.role === "candidate"
								? setCandidateFormData
								: setRecruiterFormData
						}
						buttonText="Update Profile"
					/>
				</div>
			</div>
		</div>
	);
};
export default AccountInfo;
