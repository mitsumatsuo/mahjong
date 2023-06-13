type NotionPage = {
  id: string;
};

export type Player = {
  page: NotionPage;
  league: boolean;
  practice: boolean;
  name: string;
  date: string;
  achievement: string | undefined;
  record: string | undefined;
  penalty: Penalty;
};

export type ObjectKey = "practice" | "league";

export type User = {
  id: number;
  name: string;
  league: boolean;
  practice: boolean;
  pageId: string;
  member: boolean;
  achievement: string | undefined;
  record: string | undefined;
  score: {
    open: ScoreDetail;
    league: ScoreDetail;
  };
  rank: UserRank;
  penalty: Penalty;
};

export type Penalty = {
  count: number;
};

export type UserRank = {
  first: number;
  second: number;
  third: number;
  fourth: number;
};

export type ScoreDetail = {
  total: number;
  match: number;
};

export type MatchScore = {
  name: string;
  number: number;
};

export type Score = {
  page: { id: string };
  name: string;
  date: string;
  members: MatchScore[];
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
  achievement: "",
  record: "",
  penalty: {
    count: 0,
  },
};

export const convertResponseToPlayers = (response: any): Player[] => {
  return response.results.map((r: any) => {
    return {
      page: { id: r.id },
      league: r.properties.League.checkbox,
      practice: r.properties.Practice.checkbox,
      name: r.properties.UserName.title[0].plain_text,
      date: r.properties.PlayableDate.date?.start,
      achievement: r.properties.Achievement.multi_select
        ?.map((i: any) => i.name)
        .join(","),
      record: r.properties.Record.multi_select
        ?.map((i: any) => i.name)
        .join(","),
      penalty: {
        count: r.properties.Penalty.number ?? 0,
      },
    };
  });
};
export const convertResponseToScores = (response: any): Score[] => {
  return (
    response.results
      // .filter(
      //   (r: any) => r.properties["試合名"].title[0].plain_text === "リーグ戦"
      // )
      .map((r: any) => {
        return {
          page: { id: r.id },
          name: r.properties["試合名"].title[0].plain_text,
          date: r.properties["対局日"].date.start,
          members: r.properties["対局者"].multi_select?.map((i: any) => {
            return { name: i.name, number: r.properties[i.name].number };
          }),
          // league: r.properties.League.checkbox,
          // practice: r.properties.Practice.checkbox,
          // name: r.properties.UserName.title[0].plain_text,
          // date: r.properties.PlayableDate.date?.start,
          // achievement: r.properties.Achievement.multi_select
          //   ?.map((i: any) => i.name)
          //   .join(","),
          // record: r.properties.Record.multi_select
          //   ?.map((i: any) => i.name)
          //   .join(","),
        };
      })
  );
};

export const defaultUsers: User[] = [
  {
    id: 1,
    name: "土屋",
    league: false,
    practice: false,
    pageId: "",
    member: false,
    achievement: "",
    record: "",
    score: { open: { total: 0, match: 0 }, league: { total: 0, match: 0 } },
    rank: { first: 0, second: 0, third: 0, fourth: 0 },
    penalty: { count: 0 },
  },
  {
    id: 2,
    name: "川本",
    league: false,
    practice: false,
    pageId: "",
    member: false,
    achievement: "",
    record: "",
    score: { open: { total: 0, match: 0 }, league: { total: 0, match: 0 } },
    rank: { first: 0, second: 0, third: 0, fourth: 0 },
    penalty: { count: 0 },
  },
  {
    id: 3,
    name: "藤田",
    league: false,
    practice: false,
    pageId: "",
    member: true,
    achievement: "",
    record: "",
    score: { open: { total: 0, match: 0 }, league: { total: 0, match: 0 } },
    rank: { first: 0, second: 0, third: 0, fourth: 0 },
    penalty: { count: 0 },
  },
  {
    id: 4,
    name: "中川",
    league: false,
    practice: false,
    pageId: "",
    member: true,
    achievement: "",
    record: "",
    score: { open: { total: 0, match: 0 }, league: { total: 0, match: 0 } },
    rank: { first: 0, second: 0, third: 0, fourth: 0 },
    penalty: { count: 0 },
  },
  {
    id: 5,
    name: "松尾",
    league: false,
    practice: false,
    pageId: "",
    member: true,
    achievement: "",
    record: "",
    score: { open: { total: 0, match: 0 }, league: { total: 0, match: 0 } },
    rank: { first: 0, second: 0, third: 0, fourth: 0 },
    penalty: { count: 0 },
  },
  {
    id: 6,
    name: "宮地",
    league: false,
    practice: false,
    pageId: "",
    member: true,
    achievement: "",
    record: "",
    score: { open: { total: 0, match: 0 }, league: { total: 0, match: 0 } },
    rank: { first: 0, second: 0, third: 0, fourth: 0 },
    penalty: { count: 0 },
  },
  {
    id: 7,
    name: "渡辺",
    league: false,
    practice: false,
    pageId: "",
    member: true,
    achievement: "",
    record: "",
    score: { open: { total: 0, match: 0 }, league: { total: 0, match: 0 } },
    rank: { first: 0, second: 0, third: 0, fourth: 0 },
    penalty: { count: 0 },
  },
  // {
  //   id: 12,
  //   name: "大野",
  //   league: false,
  //   practice: false,
  //   pageId: "",
  //   member: false,
  //   achievement: "",
  //   record: "",
  //   score: { open: { total: 0, match: 0 }, league: { total: 0, match: 0 } },
  //   rank: { first: 0, second: 0, third: 0, fourth: 0 },
  //   penalty: { count: 0 },
  // },
  // {
  //   id: 0,
  //   name: "橋本",
  //   league: false,
  //   practice: false,
  //   pageId: "",
  //   member: true,
  //   achievement: "",
  //   record: "",
  //   score: { open: { total: 0, match: 0 }, league: { total: 0, match: 0 } },
  //   rank: { first: 0, second: 0, third: 0, fourth: 0 },
  //   penalty: { count: 0 },
  // },
  // {
  //   id: 5,
  //   name: "小林",
  //   league: false,
  //   practice: false,
  //   pageId: "",
  //   member: true,
  //   achievement: "",
  //   record: "",
  //   score: { open: { total: 0, match: 0 }, league: { total: 0, match: 0 } },
  //   rank: { first: 0, second: 0, third: 0, fourth: 0 },
  //   penalty: { count: 0 },
  // },
  // {
  //   id: 6,
  //   name: "林",
  //   league: false,
  //   practice: false,
  //   pageId: "",
  //   member: true,
  //   achievement: "",
  //   record: "",
  //   score: { open: { total: 0, match: 0 }, league: { total: 0, match: 0 } },
  //   rank: { first: 0, second: 0, third: 0, fourth: 0 },
  //   penalty: { count: 0 },
  // },
  // {
  //   id: 7,
  //   name: "中山",
  //   league: false,
  //   practice: false,
  //   pageId: "",
  //   member: true,
  //   achievement: "",
  //   record: "",
  //   score: { open: { total: 0, match: 0 }, league: { total: 0, match: 0 } },
  //   rank: { first: 0, second: 0, third: 0, fourth: 0 },
  //   penalty: { count: 0 },
  // },
  // {
  //   id: 8,
  //   name: "高須賀",
  //   league: false,
  //   practice: false,
  //   pageId: "",
  //   member: true,
  //   achievement: "",
  //   record: "",
  //   score: { open: { total: 0, match: 0 }, league: { total: 0, match: 0 } },
  //   rank: { first: 0, second: 0, third: 0, fourth: 0 },
  //   penalty: { count: 0 },
  // },
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
