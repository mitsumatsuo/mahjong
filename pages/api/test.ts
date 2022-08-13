import type { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "../../lib/notion";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    res.status(200).json({
      object: 'page',
      id: '4631f880-c4c3-4686-9d2d-22420658c64a',
      created_time: '2022-08-10T00:45:00.000Z',
      last_edited_time: '2022-08-10T00:45:00.000Z',
      created_by: { object: 'user', id: '0545d1f0-cafd-4d37-9d40-75f5228fe00e' },
      last_edited_by: { object: 'user', id: '0545d1f0-cafd-4d37-9d40-75f5228fe00e' },
      cover: null,
      icon: null,
      parent: {
        type: 'database_id',
        database_id: '24b9f752-f8a4-4f02-a715-32e6926cd1fb'
      },
      archived: false,
      properties: {
        '対局者': { id: '%3B%7Ct%3A', type: 'multi_select', multi_select: "[Array]" },
        '川本': { id: '%3FM%3EH', type: 'number', number: null },
        '宮地': { id: 'Csne', type: 'number', number: null },
        '中川': { id: 'JzaP', type: 'number', number: null },
        '山田': { id: 'YF%3Dj', type: 'number', number: null },
        '松尾': { id: '%5D%7DoU', type: 'number', number: -22 },
        '高須賀': { id: '_CO%3A', type: 'number', number: null },
        '小林': { id: '%60JAt', type: 'number', number: -17 },
        '藤田': { id: '%60VfF', type: 'number', number: 2 },
        '橋本': { id: 'bxm%5D', type: 'number', number: 37 },
        '土屋': { id: 'f%3CXc', type: 'number', number: null },
        '渡辺': { id: 'kJmx', type: 'number', number: null },
        '対局日': { id: 't%3Cvv', type: 'date', date: "[Object]" },
        '林': { id: 'tOg%5B', type: 'number', number: null },
        '試合名': { id: 'title', type: 'title', title: "[Array]" }
      },
      url: 'https://www.notion.so/4631f880c4c346869d2d22420658c64a'
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
}
