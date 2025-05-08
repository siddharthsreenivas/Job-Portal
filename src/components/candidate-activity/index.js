"use client";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const CandidateActivity = ({ jobApplicants, jobList }) => {
	console.log("jobApplicants: ", jobApplicants);
	console.log("jobList: ", jobList);

	const uniqueStatusArray = [
		...new Set(
			jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1)
		),
	];

	return (
		<div className="mx-auto max-w-7xl">
			<Tabs defaultValue="Applied" className="w-full">
				<div className="flex items-baseline justify-between border-b pb-6 pt-24">
					<h1 className="text-3xl font-bold tracking-tight text-gray-950">
						Your Activity
					</h1>
					<TabsList>
						{uniqueStatusArray.map((status, i) => (
							<TabsTrigger key={i} value={status} className="capitalize">
								{status}
							</TabsTrigger>
						))}
					</TabsList>
				</div>
				<div className="pb-24 pt-6">
					<div className="container mx-auto p-0 space-y-8">
						<div className="flex flex-col gap-4">
							{uniqueStatusArray.map((status, i) => (
								<TabsContent key={i} value={status} className="space-y-4">
									{jobList
										.filter((job) =>
											jobApplicants
												.filter((app) => app.status.includes(status))
												.some((app) => app.jobID === job._id)
										)
										.map((finalFilteredItem, i) => (
											<CommonCard
												key={i}
												icon={<JobIcon />}
												title={finalFilteredItem?.title}
												description={finalFilteredItem?.companyName}
											/>
										))}
									{/* {jobList
										.filter(
											(jobItem) =>
												jobApplicants
													.filter(
														(jobApplication) =>
															jobApplication.status.indexOf(status) > -1
													)
													.findIndex(
														(filteredItemsByStatus) =>
															jobItem._id === filteredItemsByStatus.jobID
													) > -1
										)
										.map((finalFilteredItem, i) => (
											<CommonCard key={i}
												icon={<JobIcon />}
												title={finalFilteredItem?.title}
												description={finalFilteredItem?.companyName}
											/>
										))} */}
								</TabsContent>
							))}
						</div>
					</div>
				</div>
			</Tabs>
		</div>
	);
};
export default CandidateActivity;
