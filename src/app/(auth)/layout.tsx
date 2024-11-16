import NavBar from "@/components/NavBar"
import { ReactNode } from "react"

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default Layout
