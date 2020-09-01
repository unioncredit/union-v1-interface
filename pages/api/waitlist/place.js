import { gql } from "graphql-request";
import client from "lib/fauna/client";

export default async function place(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      if (!email) throw new Error("'email' is Required");

      const query = gql`
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

      const data = await client.request(query, variables);

      res.status(200).json({ success: true, result: data.findPlaceInLine });
    } catch (e) {
      res.status(400).json({ success: false, error: e.message });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
