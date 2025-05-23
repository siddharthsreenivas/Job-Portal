import { fetchProfileAction } from "@/actions";
import Membership from "@/components/membership";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const MembershipPage = async () => {

  const user = await currentUser();
	const profileInfo = await fetchProfileAction(user?.id);

  if (!profileInfo) redirect("/onboard");

	return <Membership profileInfo={profileInfo} />;
};
export default MembershipPage;
