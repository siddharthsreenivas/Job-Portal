"use client";

import { membershipPlans } from "@/utils";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import {
	createPriceIdAction,
	createStripePaymentAction,
	updateProfileAction,
} from "@/actions";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const stripePromise = loadStripe(
	"pk_test_51RNYsMPauiss00TRAkik08yRfdVxxEZIne9Llb25K7MFO8ppdPZgKuEIqHqsNKeOILl0HEsBPjl96iYk9qo1dX4x00EXyJiZDq"
);

const Membership = ({ profileInfo }) => {
	const pathName = useSearchParams();

	const handlePayment = async (getCurrentPlan) => {
		const stripe = await stripePromise;
		const extractPriceId = await createPriceIdAction({
			amount: Number(getCurrentPlan?.price),
		});
		if (extractPriceId) {
			sessionStorage.setItem("currentPlan", JSON.stringify(getCurrentPlan));
			const result = await createStripePaymentAction({
				lineItems: [
					{
						price: extractPriceId?.id,
						quantity: 1,
					},
				],
			});

			await stripe.redirectToCheckout({
				sessionId: result?.id,
			});
		}
	};

	const updateProfile = async () => {
		const fetchCurrentPlanFromSessionStorage = JSON.parse(
			sessionStorage.getItem("currentPlan")
		);

		const yearsToAdd =
			fetchCurrentPlanFromSessionStorage?.type === "basic"
				? 1
				: fetchCurrentPlanFromSessionStorage?.type === "teams"
				? 2
				: 5;

		await updateProfileAction(
			{
				...profileInfo,
				isPremiumUser: true,
				memberShipType: fetchCurrentPlanFromSessionStorage?.type,
				memberShipStartDate: new Date().toString(),
				memberShipEndDate: new Date(
					new Date().getFullYear() + yearsToAdd,
					new Date().getMonth(),
					new Date().getDate()
				),
			},
			"/membership"
		);
	};

	useEffect(() => {
		if (pathName.get("status") === "success") updateProfile();
	}, [pathName]);

	return (
		<div className="mx-auto max-w-7xl">
			<div className="flex items-baseline justify-between border-b pb-6 pt-24">
				<h1 className="text-4xl font-bold tracking-tight text-gray-950">
					{profileInfo?.isPremiumUser
						? "You are a Premium User"
						: "Choose Your Best Plan"}
				</h1>
				<div>
					{profileInfo?.isPremiumUser && (
						<Button className="h-11 px-5">
							{
								membershipPlans.find(
									(item) => item.type === profileInfo?.memberShipType
								).heading
							}
						</Button>
					)}
				</div>
			</div>
			<div className="py-20 pb-24 pt-6">
				<div className="container mx-auto p-0 space-y-8">
					<div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
						{membershipPlans.map((plan, idx) => (
							<CommonCard
								key={idx}
								icon={
									<div className="flex justify-between">
										<div>
											<JobIcon />
										</div>
										<h1 className="font-bold text-2xl">{plan.heading}</h1>
									</div>
								}
								title={`$ ${plan.price} /yr`}
								description={
									plan.type.charAt(0).toUpperCase() + plan.type.slice(1)
								}
								footerContent={
									profileInfo?.memberShipType === "enterprise" ||
									(profileInfo?.memberShipType === "basic" && idx === 0) ||
									(profileInfo?.memberShipType === "teams" &&
										idx >= 0 &&
										idx < 2) ? null : (
										<Button
											onClick={() => handlePayment(plan)}
											className="h-11 px-5"
										>
											{profileInfo?.memberShipType === "basic" ||
											profileInfo?.memberShipType === "teams"
												? "Update Plan"
												: "Get Premium"}
										</Button>
									)
								}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Membership;
