"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CommonForm from "../common-form";
import {
	candidateOnBoardFormControls,
	initialCandidateFormData,
	initialRecruiterFormData,
	recruiterOnBoardFormControls,
} from "@/utils";
import { createProfileAction } from "@/actions";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
	"https://texfejeahwavdftrceri.supabase.co",
	process.env.NEXT_PUBLIC_SUPABASE_KEY
);

const OnBoard = () => {
	const [currentTab, setCurrentTab] = useState("candidate");
	const [recruiterFormData, setRecruiterFormData] = useState(
		initialRecruiterFormData
	);
	const [candidateFormData, setCandidateFormData] = useState(
		initialCandidateFormData
	);
	const [file, setFile] = useState(null);

	const currentAuthUser = useUser();
	const { user } = currentAuthUser;

	const handleTabChange = (value) => {
		setCurrentTab(value);
	};

	const handleRecruiterFormValid = () => {
		return Object.keys(recruiterFormData).every(
			(key) => recruiterFormData[key] !== ""
		);
	};
	function handleCandidateFormValid() {
		return Object.keys(candidateFormData).every(
			(key) => candidateFormData[key].trim() !== ""
		);
	}

	const handleFileChange = (e) => {
		e.preventDefault();
		setFile(e.target.files[0]);
	};

	const handleUploadFileToSupabase = async () => {
		const { data, error } = await supabaseClient.storage
			.from("job-board")
			.upload(`/public/${file.name}`, file, {
				cacheControl: "3600",
				upsert: false,
			});
		if (data) {
			setCandidateFormData({
				...candidateFormData,
				resume: data.path,
			});
		}
		if (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (file) handleUploadFileToSupabase();
	}, [file]);

	const createProfile = async () => {
		const data =
			currentTab === "candidate"
				? {
						candidateInfo: candidateFormData,
						role: "candidate",
						isPremiumUser: false,
						userId: user?.id,
						email: user?.primaryEmailAddress?.emailAddress,
				  }
				: {
						recruiterInfo: recruiterFormData,
						role: "recruiter",
						isPremiumUser: false,
						userId: user?.id,
						email: user?.primaryEmailAddress?.emailAddress,
				  };
		await createProfileAction(data, "/onboard");
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
						setFormData={setCandidateFormData}
						handleFileChange={handleFileChange}
						isBtnDisabled={!handleCandidateFormValid()}
						action={createProfile}
					/>
				</TabsContent>
				<TabsContent value="recruiter">
					<CommonForm
						formControls={recruiterOnBoardFormControls}
						buttonText={"Onboard as Recruiter"}
						formData={recruiterFormData}
						setFormData={setRecruiterFormData}
						isBtnDisabled={!handleRecruiterFormValid()}
						action={createProfile}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
};
export default OnBoard;
