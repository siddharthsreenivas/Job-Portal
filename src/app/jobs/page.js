import { fetchJobsForRecruiterAction, fetchProfileAction } from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

const JobPage = async () => {
	const user = await currentUser();
	const profileInfo = await fetchProfileAction(user?.id);

	const jobList = await fetchJobsForRecruiterAction(user?.id)

	return (
		<JobListing
			profileInfo={profileInfo}
			user={JSON.parse(JSON.stringify(user))}
			jobList={jobList}
		/>
	);
};
export default JobPage;
