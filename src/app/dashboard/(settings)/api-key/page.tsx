import DashboardPage from "@/components/DashboardPage"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import ApiKeySettings from "./ApiKeySettings"

async function Page() {
  const auth = await currentUser()

  if (!auth) {
    redirect("/login")
  }

  const user = await db.user.findUnique({
    where: {
      externalId: auth.id,
    },
  })

  if (!user) {
    redirect("/login")
  }
  return (
    <DashboardPage title="Api Key">
      <ApiKeySettings apiKey={user.apiKey ?? ""} />
    </DashboardPage>
  )
}

export default Page
