"use client"

import { EventCategory } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import EmptyCategoryState from "./EmptyCategoryState"

interface CategoryPageProps {
  hasEvents: boolean
  category: EventCategory
}
function CategoryPageContent({
  hasEvents: initialHasEvents,
  category,
}: CategoryPageProps) {
  const { data: PoolingData } = useQuery({
    queryKey: ["category", category.name, "hasEvents"],
    initialData: { hasEvents: initialHasEvents },
  })

  if (!PoolingData.hasEvents) {
    return <EmptyCategoryState categoryName={category.name} />
  }
  return <div>CategoryPageContent</div>
}

export default CategoryPageContent
