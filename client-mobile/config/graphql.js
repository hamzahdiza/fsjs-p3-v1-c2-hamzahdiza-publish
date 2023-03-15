import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://37d0-103-120-169-0.ap.ngrok.io/",
  cache: new InMemoryCache(),
});

export default client;

//uri: "https://diza.p3c2dzbrand.shop/",
