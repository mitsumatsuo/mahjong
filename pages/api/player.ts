import type { NextApiRequest, NextApiResponse } from "next";
import { convertResponseToPlayers, Player } from "../../lib/mahjong";
import { handleError, notion } from "../../lib/notion";

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
