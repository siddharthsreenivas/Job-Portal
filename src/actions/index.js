"use server";

import { connectToDatabase } from "@/database";
import Application from "@/models/application";
import { Job } from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createProfileAction = async (formData, pathToRevalidate) => {
	await connectToDatabase();
	await Profile.create(formData);
	revalidatePath(pathToRevalidate);
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
	let updatedParams = {};

	Object.keys(filterParams).forEach((filterKey) => {
		updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
	});

	const result = await Job.find(
		filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
	);

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
	const {
		recruiterUserID,
		name,
		email,
		candidateUserID,
		status,
		jobID,
		_id,
		jobAppliedDate,
	} = data;
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
		{ new: true }
	);
	revalidatePath(pathToRevalidate);
};

export const getCandidateDetailsByIdAction = async (candidateId) => {
	await connectToDatabase();
	const result = await Profile.findOne({ userId: candidateId });
	return JSON.parse(JSON.stringify(result));
};

export const createFilterCategoryAction = async () => {
	await connectToDatabase();
	const result = await Job.find({});
	return JSON.parse(JSON.stringify(result));
};

export const updateProfileAction = async (data, pathToRevalidate) => {
	await connectToDatabase();
	const {
		userId,
		role,
		email,
		isPremiumUser,
		memberShipType,
		memberShipStartDate,
		memberShipEndDate,
		recruiterInfo,
		candidateInfo,
		_id,
	} = data;

	await Profile.findOneAndUpdate(
		{
			_id: _id,
		},
		{
			userId,
			role,
			email,
			isPremiumUser,
			memberShipType,
			memberShipStartDate,
			memberShipEndDate,
			recruiterInfo,
			candidateInfo,
		},
		{ new: true }
	);

	revalidatePath(pathToRevalidate);
};

export const createPriceIdAction = async (data) => {
	const session = await stripe.prices.create({
		currency: "usd",
		unit_amount: data?.amount * 100,
		recurring: {
			interval: "year",
		},
		product_data: {
			name: "Premium Plan",
		},
	});

	return {
		success: true,
		id: session?.id,
	};
};

export const createStripePaymentAction = async (data) => {
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: data?.lineItems,
		mode: "subscription",
		success_url: `http://localhost:3000/membership` + "?status=success",
		cancel_url: `http://localhost:3000/membership` + "?status=cancel",
	});

	return {
		success: true,
		id: session?.id,
	};
}