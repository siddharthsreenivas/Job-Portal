"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CommonForm from "../common-form";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { postNewJobAction } from "@/actions";

const PostNewJob = ({ profileInfo }) => {
	const [showJobDialog, setShowJobDialog] = useState(false);
	const [jobFormData, setJobFormData] = useState({
		...initialPostNewJobFormData,
		companyName: profileInfo?.recruiterInfo?.companyName,
	});

	const handlePostNewButtonValid = () => {
		return Object.keys(jobFormData).every(
			(key) =>
				typeof jobFormData[key] === "string" && jobFormData[key].trim() !== ""
		);
	};

	const createNewJob = async () => {
		await postNewJobAction(
			{
				...jobFormData,
				recruiterId: profileInfo?.userId,
				applicants: [],
			},
			"/jobs"
		);
		setShowJobDialog(false);
		setJobFormData({
			...initialPostNewJobFormData,
			companyName: profileInfo?.recruiterInfo?.companyName,
		});
	};

	return (
		<div>
			<Button
				onClick={() => setShowJobDialog(true)}
				className="flex h-11 items-center justify-center px-5"
			>
				Post A Job
			</Button>
			<Dialog
				open={showJobDialog}
				onOpenChange={() => {
					setShowJobDialog(false);
					setJobFormData({
						...initialPostNewJobFormData,
						companyName: profileInfo?.recruiterInfo?.companyName,
					});
				}}
			>
				<DialogContent className="sm:max-w-xl h-[600px] overflow-auto">
					<DialogHeader>
						<DialogTitle>Post New Job</DialogTitle>
						<div className="grid gap-4 py-4">
							<CommonForm
								formControls={postNewJobFormControls}
								buttonText={"Add Job"}
								formData={jobFormData}
								setFormData={setJobFormData}
								isBtnDisabled={!handlePostNewButtonValid()}
								action={createNewJob}
							/>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};
export default PostNewJob;
