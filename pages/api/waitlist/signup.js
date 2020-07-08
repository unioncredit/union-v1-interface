import { graphql } from "lib/fauna/client";

export default async (req, res) => {
  const { email } = req.body;

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

    res.status(200).json({
      success: true,
      result: {
        timestamp: data.createSignup.timestamp,
      },
    });
  } catch (e) {
    if (e.message.includes("Instance is not unique")) {
      res.status(422).json({
        success: false,
        error: "You're already signed up",
      });

      return;
    }

    res.status(404).json({
      success: false,
      error: e.message,
    });
  }
};
