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
};

export type Match = {
  id: number;
  name: string;
  users: string[];
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
  { id: 0, name: "橋本", checked: false, pageId: "" },
  { id: 1, name: "藤田", checked: false, pageId: "" },
  { id: 2, name: "渡辺", checked: false, pageId: "" },
  { id: 3, name: "松尾", checked: false, pageId: "" },
  { id: 4, name: "中川", checked: false, pageId: "" },
  { id: 5, name: "小林", checked: false, pageId: "" },
  { id: 6, name: "林", checked: false, pageId: "" },
  { id: 7, name: "中山", checked: false, pageId: "" },
  { id: 8, name: "高須賀", checked: false, pageId: "" },
  { id: 9, name: "宮地", checked: false, pageId: "" },
];

export const matches: Match[] = [
  { id: 0, name: "🀙", users: ["橋本", "藤田", "松尾", "林"] },
  { id: 1, name: "🀚", users: ["藤田", "渡辺", "中川", "中山"] },
  { id: 2, name: "🀛", users: ["渡辺", "松尾", "小林", "高須賀"] },
  { id: 3, name: "🀜", users: ["松尾", "中川", "林", "宮地"] },
  { id: 4, name: "🀝", users: ["中川", "小林", "中山", "橋本"] },
  { id: 5, name: "🀞", users: ["小林", "林", "高須賀", "藤田"] },
  { id: 6, name: "🀟", users: ["林", "中山", "宮地", "渡辺"] },
  { id: 7, name: "🀠", users: ["中山", "高須賀", "橋本", "松尾"] },
  { id: 8, name: "🀡", users: ["高須賀", "宮地", "藤田", "中川"] },
  { id: 9, name: "🀃", users: ["宮地", "橋本", "渡辺", "小林"] },
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
  targetMembers: string[]
): number => {
  let n = 0;
  targetMembers.forEach((mem) => {
    const found = users.find((user) => user.name === mem);
    if (found && found.checked) {
      n++;
    }
  });
  return n;
};
