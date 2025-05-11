import { fetchProfileAction } from "@/actions";
import HomePageButtonControls from "@/components/homepage-button-controls";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Home() {
	const user = await currentUser();
	console.log("userInfo : ", user);

	const profileInfo = await fetchProfileAction(user?.id);

	if (user && !profileInfo?._id) redirect("/onboard");

	return (
		<>
			<div className="bg-white mt-0 md:mt-16">
				<div className="w-full relative">
					<div className=" flex">
						<div className="container m-auto p-0">
							<div className="flex items-center flex-wrap gap-12 lg:gap-0">
								<div className="lg:w-5/12 space-y-8">
									<span className="flex space-x-2">
										<span className="block w-14 mb-2 border-b-2 border-gray-700" />
										<span className="font-medium text-gray-600">
											One Stop Solution to Find Jobs
										</span>
									</span>
									<h1 className="text-4xl font-bold md:text-6xl">
										The Best <br /> Job Portal App
									</h1>
									<p className="text-xl text-gray-700">
										Find Best Jobs From Top Product Based Companies and Build
										Your Career
									</p>
									<HomePageButtonControls
										user={JSON.parse(JSON.stringify(user))}
										profileInfo={profileInfo}
									/>
								</div>
								<div className="lg:w-7/12">
									<img
										src="https://utfs.io/f/4c9f7186-8ad0-4680-aece-a5abea608705-k6t10e.png"
										alt="Job Portal"
										className="relative ml-auto"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
