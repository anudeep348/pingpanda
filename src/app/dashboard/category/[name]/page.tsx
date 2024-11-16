import DashboardPage from "@/components/DashboardPage"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import CategoryPageContent from "./CategoryPageContent"

interface PageProps {
  params: {
    name: string | string[] | undefined
  }
}

async function Page({ params }: PageProps) {
  if (typeof params.name !== "string") notFound()

  const auth = await currentUser()
  if (!auth) {
    notFound()
  }

  const user = await db.user.findUnique({
    where: {
      externalId: auth.id,
    },
  })

  if (!user) {
    return notFound()
  }

  const category = await db.eventCategory.findUnique({
    where: {
      name_userId: {
        name: params.name,
        userId: user.id,
      },
    },
    include: {
      _count: {
        select: {
          events: true,
        },
      },
    },
  })

  if (!category) {
    return notFound()
  }

  const hasEvents = category._count.events > 0

  return (
    <DashboardPage title={`${category.emoji} ${category.name} events`}>
      <CategoryPageContent hasEvents={hasEvents} category={category} />
    </DashboardPage>
  )
}

export default Page
