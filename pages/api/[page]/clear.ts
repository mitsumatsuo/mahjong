import type { NextApiRequest, NextApiResponse } from "next";
import { handleError, notion } from "../../../lib/notion";

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
        CanPlay: {
          checkbox: false,
        },
      },
    });
    res.status(200).send(rr);
  } catch (error: unknown) {
    handleError(error, res);
  }
}
