import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { convertResponseToScores, Score } from "../../lib/mahjong";
import { handleError } from "../../lib/notion";

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Score[]>
) {
  try {
    const databaseId = process.env.NOTION_SCORE_DATABASE_ID ?? "";
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    res.status(200).json(convertResponseToScores(response));
  } catch (error: unknown) {
    handleError(error, res);
  }
}
