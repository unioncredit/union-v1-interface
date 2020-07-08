import { graphql } from "lib/fauna/client";

export default async (req, res) => {
  const { email } = JSON.parse(req.body);

  try {
    if (!email) throw new Error("'email' is Required");

    const query = /* GraphQL */ `
      query place($email: String!) {
        findPlaceInLine(email: $email) {
          position
          total
          hasGoldenTicket
        }
      }
    `;

    const variables = {
      email,
    };

    const data = await graphql.request(query, variables);

    res.status(200).json(data);
  } catch (e) {
    console.error(e);

    res.status(404).send(e.message);
  }
};
