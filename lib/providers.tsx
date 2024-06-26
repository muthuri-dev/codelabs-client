"use client";
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export default function Provider({ children }: { children: React.ReactNode }) {
  const client = new ApolloClient({
    uri: "https://codelabs-api-gateway.up.railway.app/graphql", //"http://localhost:3002/graphql",
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
