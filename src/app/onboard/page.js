import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const OnBoard = () => {
  return (
		<div className="bg-white">
			<Tabs>
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
			</Tabs>
		</div>
	);
}
export default OnBoard