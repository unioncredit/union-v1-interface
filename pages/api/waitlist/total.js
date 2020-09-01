import { gql } from "graphql-request";
import client from "lib/fauna/client";

export default async function place(req, res) {
  if (req.method === "GET") {
    try {
      const query = gql`
        query {
          getWaitlistTotal
        }
      `;

      const data = await client.request(query);

      res.status(200).json({
        success: true,
        result: {
          total: data.getWaitlistTotal,
        },
      });
    } catch (e) {
      res.status(400).json({ success: false, error: e.message });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
