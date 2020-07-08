import { graphql } from "lib/fauna/client";

export default async (req, res) => {
  const { email } = JSON.parse(req.body);

  try {
    if (!email) throw new Error("'email' is Required");

    const query = /* GraphQL */ `
      mutation signup($email: String!) {
        createSignup(data: { email: $email, sentGoldenTicket: false }) {
          id: _id
          timestamp: _ts
        }
      }
    `;

    const variables = {
      email,
    };

    const data = await graphql.request(query, variables);

    /**
     * @todo Handle already signed up error state gracefully
     */

    res.status(200).json(data);
  } catch (e) {
    console.error(e);

    res.status(404).send(e.message);
  }
};
