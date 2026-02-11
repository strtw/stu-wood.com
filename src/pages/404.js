import React from "react"
import { Link } from "gatsby"
import SEO from "../components/SEO"
import "../styles/global.css"

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found" />
      <main style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <h1>Page not found</h1>
        <p>
          <Link to="/">Go home</Link>
        </p>
      </main>
    </>
  )
}
