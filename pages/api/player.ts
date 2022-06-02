import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { convertResponseToPlayers, Player } from "../../lib/mahjong";
import { handleError } from "../../lib/notion";

export const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Player[]>
) {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID ?? "";
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    res.status(200).json(convertResponseToPlayers(response));
  } catch (error: unknown) {
    handleError(error, res);
  }
}
