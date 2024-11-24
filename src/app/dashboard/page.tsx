import DashboardPage from "@/components/DashboardPage"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardPageContent from "./DashboardPageContent"
import CreateEventCategoryModal from "@/components/CreateEventCategoryModal"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { createCheckoutSession } from "@/lib/stripe"
import PaymentSuccessModal from "@/components/PaymentSuccessModal"

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}
async function Page({ searchParams }: PageProps) {
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

  const intent = searchParams.intent
  if (intent === "upgrade") {
    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    })

    if (session.url) {
      redirect(session.url)
    }
  }

  const success = searchParams.success

  return (
    <>
      {success ? <PaymentSuccessModal /> : null}
      <DashboardPage
        cta={
          <CreateEventCategoryModal>
            <Button className="w-full">
              <PlusIcon className="size-4 mr-2" />
              Add Category
            </Button>
          </CreateEventCategoryModal>
        }
        title="Dashboard"
        hiddenButton
      >
        <DashboardPageContent />
      </DashboardPage>
    </>
  )
}

export default Page
