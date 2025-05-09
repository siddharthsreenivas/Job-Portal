"use client";

import { filterMenuDataArray, formUrlQuery } from "@/utils";
import CandidateJobCard from "../candidate-job-card";
import PostNewJob from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "../ui/menubar";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const JobListing = ({
	user,
	profileInfo,
	jobList,
	jobApplications,
	filterCategories,
}) => {
	
	const [filterParams, setFilterParams] = useState({});
	const searchParams = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		const stored = sessionStorage.getItem("filterParams");
		if(stored){
			setFilterParams(JSON.parse(stored));
		} else {
			setFilterParams({})
		}
	},[])

	useEffect(() => {
		if(filterParams && Object.keys(filterParams).length > 0){
			let url = ''
			
			url = formUrlQuery({
				params: searchParams.toString(),
				dataToAdd: filterParams
			})
			
			router.push(url, {scroll: false})
		}
	}, [filterParams, searchParams]);
	

	const filterMenu = filterMenuDataArray.map((item) => ({
		id: item.id,
		name: item.label,
		options: [
			...new Set(filterCategories.map((listItem) => listItem[item.id])),
		],
	}));

	const handleFilter = (getSectionID, getCurrentOption) => {
		let cpyFilterParams = { ...filterParams };
		const indexOfCurrentSection =
			Object.keys(cpyFilterParams).indexOf(getSectionID);
		if (indexOfCurrentSection === -1) {
			cpyFilterParams = {
				...cpyFilterParams,
				[getSectionID]: [getCurrentOption],
			};
		} else {
			const indexOfCurrentOption =
				cpyFilterParams[getSectionID].indexOf(getCurrentOption);
			if (indexOfCurrentOption === -1) {
				cpyFilterParams[getSectionID].push(getCurrentOption);
			} else {
				cpyFilterParams[getSectionID].splice(indexOfCurrentOption, 1);
			}
		}
		setFilterParams(cpyFilterParams);
		sessionStorage.setItem("filterParams", JSON.stringify(cpyFilterParams));
		console.log(cpyFilterParams);
	};

	return (
		<div>
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col sm:flex-row gap-4 items-baseline justify-between border-b pt-24 border-gray-200 pb-6">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900">
						{profileInfo?.role === "candidate"
							? "Explore All Jobs"
							: "Jobs Dashboard"}
					</h1>
					<div className="flex items-center">
						{profileInfo?.role === "candidate" ? (
							<Menubar>
								{filterMenu.map((filterMenuItem, i) => (
									<MenubarMenu key={i}>
										<MenubarTrigger>{filterMenuItem.name}</MenubarTrigger>
										<MenubarContent>
											{filterMenuItem.options.map((item, i) => (
												<MenubarItem
													key={i}
													className="flex items-center"
													onClick={() => handleFilter(filterMenuItem.id, item)}
												>
													<div
														className={`h-4 w-4 p-0.5 border rounded-sm border-gray-800 ${
															filterParams?.[filterMenuItem.id]?.indexOf(item) > -1
																? "bg-gray-600/50"
																: "bg-transparent"
														} `}
													/>
													<Label className="ml-2 cursor-pointer text-sm text-gray-600">
														{item}
													</Label>
												</MenubarItem>
											))}
										</MenubarContent>
									</MenubarMenu>
								))}
							</Menubar>
						) : (
							<PostNewJob profileInfo={profileInfo} />
						)}
					</div>
				</div>
				<div className="pt-6 pb-24">
					<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
						<div className="lg:col-span-4">
							<div className="container mx-auto p-0 space-y-8">
								<div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
									{jobList && jobList.length > 0
										? jobList.map((jobItem) =>
												profileInfo?.role === "candidate" ? (
													<CandidateJobCard
														profileInfo={profileInfo}
														key={jobItem?._id}
														jobItem={jobItem}
														jobApplications={jobApplications}
													/>
												) : (
													<RecruiterJobCard
														profileInfo={profileInfo}
														key={jobItem?._id}
														jobItem={jobItem}
														jobApplications={jobApplications}
													/>
												)
										  )
										: null}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default JobListing;
