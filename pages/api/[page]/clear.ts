import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "../../../lib/notion";

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { page } = req.query;
    const pageId = Array.isArray(page) ? "" : page;

    const rr = await notion.pages.update({
      page_id: pageId,
      properties: {
        League: {
          checkbox: false,
        },
        Practice: {
          checkbox: false,
        },
      },
    });
    res.status(200).send(rr);
  } catch (error: unknown) {
    handleError(error, res);
  }
}
