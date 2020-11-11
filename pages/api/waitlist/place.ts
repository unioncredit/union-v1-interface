import { gql } from "graphql-request";
import client from "lib/fauna/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function place(req: NextApiRequest, res: NextApiResponse) {
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

      interface Data {
        findPlaceInLine: {
          position: number;
          total: number;
          hasGoldenTicket: boolean;
        };
      }

      const { findPlaceInLine } = await client.request<Data>(query, variables);

      res.status(200).json({ success: true, result: findPlaceInLine });
    } catch (e) {
      res.status(400).json({ success: false, error: e.message });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
