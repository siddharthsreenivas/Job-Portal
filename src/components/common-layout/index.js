import { currentUser } from "@clerk/nextjs/server"
import Header from "../header"

const CommonLayout = async ({children}) => {

  const user = await currentUser()

  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
        {/* Header */}
        <Header user={JSON.parse(JSON.stringify(user))} />
        {/* Main */}
        <main>
            {children}
        </main>
    </div>
  )
}
export default CommonLayout