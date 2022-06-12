import { NextApiRequest, NextApiResponse } from "next";
import goals from "../../goal.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(goals);
}
