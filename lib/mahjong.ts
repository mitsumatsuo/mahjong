type NotionPage = {
  id: string;
};

export type Player = {
  page: NotionPage;
  league: boolean;
  practice: boolean;
  name: string;
  date: string;
};

export type User = {
  id: number;
  name: string;
  league: boolean;
  practice: boolean;
  pageId: string;
  member: boolean;
};

export type MatchUser = {
  name: string;
  score: number;
};

export type Match = {
  id: number;
  name: string;
  users: MatchUser[];
  done: boolean | undefined;
};

export type Goal = {
  kanji: string | undefined;
  kana: string | undefined;
  han: number | string | undefined;
  condition: string | undefined;
  image: string | undefined;
  description: string | undefined;
  descriptionUrl: string | undefined;
  probability: number | undefined;
  width: number | undefined;
  height: number | undefined;
};

export const defaultPlayer: Player = {
  page: { id: "" },
  league: false,
  practice: false,
  name: "noname",
  date: "2022-04-01",
};

export const convertResponseToPlayers = (response: any): Player[] => {
  return response.results.map((r: any) => {
    return {
      page: { id: r.id },
      league: r.properties.League.checkbox,
      practice: r.properties.Practice.checkbox,
      name: r.properties.UserName.title[0].plain_text,
      date: r.properties.PlayableDate.date?.start,
    };
  });
};

export const defaultUsers: User[] = [
  {
    id: 0,
    name: "橋本",
    league: false,
    practice: false,
    pageId: "",
    member: true,
  },
  {
    id: 1,
    name: "藤田",
    league: false,
    practice: false,
    pageId: "",
    member: true,
  },
  {
    id: 2,
    name: "渡辺",
    league: false,
    practice: false,
    pageId: "",
    member: true,
  },
  {
    id: 3,
    name: "松尾",
    league: false,
    practice: false,
    pageId: "",
    member: true,
  },
  {
    id: 4,
    name: "中川",
    league: false,
    practice: false,
    pageId: "",
    member: true,
  },
  {
    id: 5,
    name: "小林",
    league: false,
    practice: false,
    pageId: "",
    member: true,
  },
  {
    id: 6,
    name: "林",
    league: false,
    practice: false,
    pageId: "",
    member: true,
  },
  {
    id: 7,
    name: "中山",
    league: false,
    practice: false,
    pageId: "",
    member: true,
  },
  {
    id: 8,
    name: "高須賀",
    league: false,
    practice: false,
    pageId: "",
    member: true,
  },
  {
    id: 9,
    name: "宮地",
    league: false,
    practice: false,
    pageId: "",
    member: true,
  },
  {
    id: 10,
    name: "土屋",
    league: false,
    practice: false,
    pageId: "",
    member: false,
  },
  {
    id: 11,
    name: "川本",
    league: false,
    practice: false,
    pageId: "",
    member: false,
  },
];

export const title: string = "競技まぁじゃん部";

export const removeDup = (value: Match[]): Match[] => {
  let ret: Match[] = [];

  value.forEach((i) => {
    let f = ret.find((r) => r.id === i.id);
    if (!f) {
      ret.push(i);
    }
  });

  ret.sort((a, b) => (a.id < b.id ? -1 : 1));

  return ret;
};
