type NotionPage = {
  id: string;
};

export type Player = {
  page: NotionPage;
  canPlay: boolean;
  name: string;
  date: string;
};

export type User = {
  id: number;
  name: string;
  checked: boolean;
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
  canPlay: false,
  name: "noname",
  date: "2022-04-01",
};

export const convertResponseToPlayers = (response: any): Player[] => {
  return response.results.map((r: any) => {
    return {
      page: { id: r.id },
      canPlay: r.properties.CanPlay.checkbox,
      name: r.properties.UserName.title[0].plain_text,
      date: r.properties.PlayableDate.date?.start,
    };
  });
};

export const defaultUsers: User[] = [
  { id: 0, name: "橋本", checked: false, pageId: "", member:true },
  { id: 1, name: "藤田", checked: false, pageId: "", member:true },
  { id: 2, name: "渡辺", checked: false, pageId: "", member:true },
  { id: 3, name: "松尾", checked: false, pageId: "", member:true },
  { id: 4, name: "中川", checked: false, pageId: "", member:true },
  { id: 5, name: "小林", checked: false, pageId: "", member:true },
  { id: 6, name: "林", checked: false, pageId: "", member:true },
  { id: 7, name: "中山", checked: false, pageId: "", member:true },
  { id: 8, name: "高須賀", checked: false, pageId: "", member:true },
  { id: 9, name: "宮地", checked: false, pageId: "", member:true },
  { id: 10, name: "土屋", checked: false, pageId: "", member:false },
  { id: 11, name: "川本", checked: false, pageId: "", member:false },
  { id: 12, name: "山田", checked: false, pageId: "", member:false },
];

export const matches: Match[] = [
  {
    id: 0,
    name: "🀙",
    users: [
      { name: "渡辺", score: 4 },
      { name: "藤田", score: 52 },
      { name: "松尾", score: -23 },
      { name: "中川", score: -33 },
    ],
    done: true,
  },
  {
    id: 1,
    name: "🀚",
    users: [
      { name: "藤田", score: 0 },
      { name: "橋本", score: 0 },
      { name: "林", score: 0 },
      { name: "中山", score: 0 },
    ],
    done: false,
  },
  {
    id: 2,
    name: "🀛",
    users: [
      { name: "橋本", score: 0 },
      { name: "松尾", score: 0 },
      { name: "小林", score: 0 },
      { name: "高須賀", score: 0 },
    ],
    done: false,
  },
  {
    id: 3,
    name: "🀜",
    users: [
      { name: "松尾", score: 0 },
      { name: "林", score: 0 },
      { name: "中川", score: 0 },
      { name: "宮地", score: 0 },
    ],
    done: false,
  },
  {
    id: 4,
    name: "🀝",
    users: [
      { name: "林", score: 0 },
      { name: "小林", score: 0 },
      { name: "中山", score: 0 },
      { name: "渡辺", score: 0 },
    ],
    done: false,
  },
  {
    id: 5,
    name: "🀞",
    users: [
      { name: "小林", score: 0 },
      { name: "中川", score: 0 },
      { name: "高須賀", score: 0 },
      { name: "藤田", score: 0 },
    ],
    done: false,
  },
  {
    id: 6,
    name: "🀟",
    users: [
      { name: "中川", score: 0 },
      { name: "中山", score: 0 },
      { name: "宮地", score: 0 },
      { name: "橋本", score: 0 },
    ],
    done: false,
  },
  {
    id: 7,
    name: "🀠",
    users: [
      { name: "中山", score: 0 },
      { name: "高須賀", score: 0 },
      { name: "渡辺", score: 0 },
      { name: "松尾", score: 0 },
    ],
    done: false,
  },
  {
    id: 8,
    name: "🀡",
    users: [
      { name: "高須賀", score: 0 },
      { name: "宮地", score: 0 },
      { name: "藤田", score: 0 },
      { name: "林", score: 0 },
    ],
    done: false,
  },
  {
    id: 9,
    name: "🀃",
    users: [
      { name: "宮地", score: 0 },
      { name: "渡辺", score: 0 },
      { name: "橋本", score: 0 },
      { name: "小林", score: 0 },
    ],
    done: false,
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

export const countAvailableMemberCount = (
  users: User[],
  targetMembers: MatchUser[]
): number => {
  let n = 0;
  targetMembers.forEach((mem) => {
    const found = users.find((user) => user.name === mem.name);
    if (found && found.checked) {
      n++;
    }
  });
  return n;
};
