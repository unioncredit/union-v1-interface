import { GraphQLClient } from "graphql-request";

/**
 * @note This is a production client, only use in API routes, `getServerSideProps`, and `getStaticProps`
 */
export const graphql = new GraphQLClient("https://graphql.fauna.com/graphql", {
  headers: {
    Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
    "X-Schema-Preview": "partial-update-mutation",
  },
});
