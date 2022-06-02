import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { convertResponseToPlayers, defaultPlayer } from "../../../lib/mahjong";
import { handleError } from "../../../lib/notion";

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { page, canPlay, date } = req.query;
    const pageId = Array.isArray(page) ? "" : page;
    const start = Array.isArray(date) ? "" : date;
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
        PlayableDate: {
          date: {
            start: start,
          },
        },
      },
    });
    res.status(200).send(rr);
  } catch (error: unknown) {
    handleError(error, res);
  }
}
