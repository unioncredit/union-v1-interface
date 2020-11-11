import { gql } from "graphql-request";
import client from "lib/fauna/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email }: { email: string } = req.body;

    try {
      if (!email) throw new Error("'email' is Required");

      const mutation = gql`
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

      interface Data {
        createSignup: {
          id: string;
          timestamp: number;
        };
      }

      const { createSignup } = await client.request<Data>(mutation, variables);

      res.status(200).json({
        success: true,
        result: {
          timestamp: createSignup.timestamp,
        },
      });
    } catch (e) {
      if (e.message.includes("Instance is not unique")) {
        res.status(422).json({
          success: false,
          error: "You're already signed up",
        });
      } else {
        res.status(404).json({
          success: false,
          error: e.message,
        });
      }
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
