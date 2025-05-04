import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Home() {
	const user = await currentUser();
	console.log(user);

  const profileInfo = null
  if(user && !profileInfo?._id) redirect('/onboard')

	return <div>Main Content</div>;
}

export default Home;
