import { currentUser } from "@clerk/nextjs/server"
import Header from "../header"
import { fetchProfileAction } from "@/actions"

const CommonLayout = async ({children}) => {

  const user = await currentUser()
  const profileInfo = await fetchProfileAction(user?.id)

  return (
		<div className="mx-auto max-w-7xl p-6 lg:px-8">
			{/* Header */}
			<Header
				user={JSON.parse(JSON.stringify(user))}
				profileInfo={profileInfo}
			/>
			{/* Main */}
			<main>{children}</main>
		</div>
	);
}
export default CommonLayout