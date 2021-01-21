import React, { useEffect, useState } from "react"

import { ApolloProvider } from "@apollo/client"
import { createApolloClientWithTokenContext } from "./Apollo/client"

const Index = ({ children }) => {
  useEffect(() => {}, [])
  return (
    <>
      <ApolloProvider client={createApolloClientWithTokenContext()}>
        {children}
      </ApolloProvider>
    </>
  )
}

export default Index
