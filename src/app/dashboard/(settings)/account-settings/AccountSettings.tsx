"use client"
import { Button } from "@/components/ui/button"
import Card from "@/components/ui/Card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { client } from "@/lib/client"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"

function AccountSettings({
  discordId: initialDiscordId,
}: {
  discordId: string
}) {
  const [discordId, setDiscordId] = useState(initialDiscordId)

  const { mutate, isPending } = useMutation({
    mutationFn: async (discordId: string) => {
      const res = await client.project.setDiscordId.$post({ discordId })

      return await res.json()
    },
  })
  return (
    <Card className="max-w-xl w-full space-y-4">
      <div>
        <Label>Discord ID</Label>
        <Input
          className="mt-1"
          value={discordId}
          onChange={(e) => setDiscordId(e.target.value)}
          placeholder="Enter your Discord ID"
        />
      </div>
      <p className="mt-2 text-sm/6 text-gray-600">
        Don't know how to find your Discord ID?{" "}
        <Link href="#" className="text-brand-600 hover:text-brand-500">
          Learn how to get your discord ID here{" "}
        </Link>
      </p>

      <div className="p-4">
        <Button onClick={() => mutate(discordId)} disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  )
}

export default AccountSettings
