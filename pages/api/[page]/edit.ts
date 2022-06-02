import type { NextApiRequest, NextApiResponse } from "next";
import {
  convertResponseToPlayers,
  defaultPlayer,
  Player,
} from "../../../lib/mahjong";
import { handleError, notion } from "../../../lib/notion";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { page, canPlay } = req.query;
    const pageId = Array.isArray(page) ? "" : page;
    const databaseId = process.env.NOTION_DATABASE_ID ?? "";
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    const players = convertResponseToPlayers(response);
    const target =
      players.find((player) => player.page.id === pageId) ?? defaultPlayer;

    const rr = await notion.pages.update({
      page_id: pageId,
      properties: {
        CanPlay: {
          checkbox: canPlay
            ? canPlay === "1"
              ? true
              : false
            : !target.canPlay,
        },
      },
    });
    res.status(200).send(rr);
  } catch (error: unknown) {
    handleError(error, res);
  }
}
