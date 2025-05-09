"use server";

import { connectToDatabase } from "@/database";
import Application from "@/models/application";
import { Job } from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

export const createProfileAction = async (formData, pathToRevalidate) => {
	await connectToDatabase();
	await Profile.create(formData);
	revalidatePath(pathToRevalidate);

	// try {

	// } catch (error) {
	//     console.log(error);
	//     return Response.json({
	//         success: false,
	//         message: 'Something went wrong! Please try again later.'
	//     })

	// }
};

export const fetchProfileAction = async (id) => {
	await connectToDatabase();
	const result = await Profile.findOne({ userId: id });
	return JSON.parse(JSON.stringify(result));
};

export const postNewJobAction = async (formData, pathToRevalidate) => {
	await connectToDatabase();
	await Job.create(formData);
	revalidatePath(pathToRevalidate);
};

export const fetchJobsForRecruiterAction = async (id) => {
	await connectToDatabase();
	const result = await Job.find({ recruiterId: id });
	return JSON.parse(JSON.stringify(result));
};

export const fetchJobsForCandidateAction = async (filterParams = {}) => {
	await connectToDatabase();
	let updatedParams = {}
	
	Object.keys(filterParams).forEach(filterKey => {
		updatedParams[filterKey] = { $in: filterParams[filterKey].split(',')}
	})
	
	const result = await Job.find(filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {});
	
	return JSON.parse(JSON.stringify(result));
};

export const createJobApplicationAction = async (data, pathToRevalidate) => {
	await connectToDatabase();
	await Application.create(data);
	revalidatePath(pathToRevalidate);
};

export const fetchJobApplicationsForCandidate = async (candidateID) => {
	await connectToDatabase();
	const result = await Application.find({ candidateUserID: candidateID });
	return JSON.parse(JSON.stringify(result));
};

export const fetchJobApplicationsForRecruiter = async (recruiterID) => {
	await connectToDatabase();
	const result = await Application.find({ recruiterUserID: recruiterID });
	return JSON.parse(JSON.stringify(result));
};

export const updateJobApplicationAction = async (data, pathToRevalidate) => {
	await connectToDatabase();
	const {recruiterUserID, name, email, candidateUserID, status, jobID, _id, jobAppliedDate} = data
	await Application.findOneAndUpdate(
		{
			_id,
		},
		{
			recruiterUserID,
			name,
			email,
			candidateUserID,
			status,
			jobID,
			_id,
			jobAppliedDate,
		},
		{new: true}
	);
	revalidatePath(pathToRevalidate);
};

export const getCandidateDetailsByIdAction = async (candidateId) => {
	await connectToDatabase();
	const result = await Profile.findOne({ userId: candidateId });
	return JSON.parse(JSON.stringify(result));
};

export const createFilterCategoryAction = async () => {
	await connectToDatabase()
	const result = await Job.find({})
	return JSON.parse(JSON.stringify(result));
}