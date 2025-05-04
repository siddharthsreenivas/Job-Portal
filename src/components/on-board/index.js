"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CommonForm from "../common-form";
import {
	candidateOnBoardFormControls,
	initialCandidateFormData,
	initialRecruiterFormData,
	recruiterOnBoardFormControls,
} from "@/utils";
import { createProfile } from "@/actions";
import { useUser } from "@clerk/nextjs";

const OnBoard = () => {
	const [currentTab, setCurrentTab] = useState("candidate");
	const [recruiterFormData, setRecruiterFormData] = useState(
		initialRecruiterFormData
	);
	const [candidateFormData, setcandidateFormData] = useState(
		initialCandidateFormData
	);

	const currentAuthUser = useUser();
	const { user } = currentAuthUser;
	console.log(user);
	

	const handleTabChange = (value) => {
		setCurrentTab(value);
	};

	const handleRecruiterFormValid = () => {
		return Object.keys(recruiterFormData).every(
			(key) => recruiterFormData[key] !== ""
		);
	};
	// const handleCandidateFormValid = () => {
	// 		return Object.keys(candidateFormData).every(
	// 			(key) => candidateFormData[key] !== ""
	// 		);
	// 	};

	const createProfileAction = async () => {
		const data = {
			recruiterInfo: recruiterFormData,
			role: "recruiter",
			isPremiumUser: false,
			userId: user?.id,
			email: user?.primaryEmailAddress?.emailAddress,
		};
		await createProfile(data, "/onboard");
	};

	return (
		<div className="bg-white pb-10">
			<Tabs value={currentTab} onValueChange={handleTabChange}>
				<div className="w-full">
					<div className="flex items-baseline justify-between border-b pb-6 pt-24">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 ">
							Welcome to onboarding
						</h1>
						<TabsList>
							<TabsTrigger value="candidate">Candidate</TabsTrigger>
							<TabsTrigger value="recruiter">Recruiter</TabsTrigger>
						</TabsList>
					</div>
				</div>
				<TabsContent value="candidate">
					<CommonForm
						formControls={candidateOnBoardFormControls}
						buttonText={"Onboard as Candidate"}
						formData={candidateFormData}
						setFormData={setcandidateFormData}
						// isBtnDisabled={!handleCandidateFormValid()}
					/>
				</TabsContent>
				<TabsContent value="recruiter">
					<CommonForm
						formControls={recruiterOnBoardFormControls}
						buttonText={"Onboard as Recruiter"}
						formData={recruiterFormData}
						setFormData={setRecruiterFormData}
						isBtnDisabled={!handleRecruiterFormValid()}
						action={createProfileAction}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
};
export default OnBoard;
