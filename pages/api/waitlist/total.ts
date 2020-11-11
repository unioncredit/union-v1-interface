import { gql } from "graphql-request";
import client from "lib/fauna/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function total(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const query = gql`
        query {
          getWaitlistTotal
        }
      `;

      interface Data {
        getWaitlistTotal: number;
      }

      const { getWaitlistTotal } = await client.request<Data>(query);

      res.status(200).json({
        success: true,
        result: {
          total: getWaitlistTotal,
        },
      });
    } catch (e) {
      res.status(400).json({ success: false, error: e.message });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
