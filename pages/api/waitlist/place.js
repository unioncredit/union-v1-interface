import { graphql } from "lib/fauna/client";

export default async function place(req, res) {
  const { email } = req.body;

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

    res.status(200).json({ success: true, result: data.findPlaceInLine });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
}
