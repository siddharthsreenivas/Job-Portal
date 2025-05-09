import {
	createFilterCategoryAction,
	fetchJobApplicationsForCandidate,
	fetchJobApplicationsForRecruiter,
	fetchJobsForCandidateAction,
	fetchJobsForRecruiterAction,
	fetchProfileAction,
} from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

const JobPage = async ({ searchParams }) => {
	const user = await currentUser();
	const profileInfo = await fetchProfileAction(user?.id);

	const jobList =
		profileInfo?.role === "candidate"
			? await fetchJobsForCandidateAction(searchParams)
			: await fetchJobsForRecruiterAction(user?.id);

	const getJobApplicationList =
		profileInfo?.role === "candidate"
			? await fetchJobApplicationsForCandidate(user?.id)
			: await fetchJobApplicationsForRecruiter(user?.id);

	const fetchFilterCategories = await createFilterCategoryAction();

	return (
		<JobListing
			profileInfo={profileInfo}
			user={JSON.parse(JSON.stringify(user))}
			jobList={jobList}
			jobApplications={getJobApplicationList}
			filterCategories={fetchFilterCategories}
		/>
	);
};
export default JobPage;
