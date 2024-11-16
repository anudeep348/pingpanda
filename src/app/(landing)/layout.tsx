import { ReactNode } from "react"
import NavBar from "../../components/NavBar"

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default Layout
