import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

type User = {
  id: number;
  name: string;
  checked: boolean;
};

const defaultUsers: User[] = [
  { id: 0, name: "山田", checked: false },
  { id: 1, name: "前田", checked: false },
  { id: 2, name: "吉田", checked: false },
  { id: 3, name: "高田", checked: false },
  { id: 4, name: "藤田", checked: false },
  { id: 5, name: "中田", checked: false },
];

const title = "競技まぁじゃん部";

const Home: NextPage = () => {
  const [users, setUsers] = useState(defaultUsers);
  const clickEventHandler = (e: User) => {
    e.checked = !e.checked;
    setUsers((old) => [
      ...old.filter((user) => user.id < e.id),
      e,
      ...old.filter((user) => user.id > e.id),
    ]);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl bg-red-500 text-white">{title}</h1>
        <div className="font-bold text-orange-500 text-xl">メンバー一覧</div>
        <div className="flex space-x-4">
          {users.map((user) => {
            return user.checked ? (
              <div
                key={user.id}
                className="bg-green-500 text-center whitespace-nowrap px-4 my-2 rounded-full border border-green-500 select-none cursor-pointer shadow shadow-green-500 "
                onClick={() => clickEventHandler(user)}
              >
                {user.name}
              </div>
            ) : (
              <div
                key={user.id}
                className="text-center whitespace-nowrap px-4 my-2 rounded-full border border-slate-500 select-none cursor-pointer"
                onClick={() => clickEventHandler(user)}
              >
                {user.name}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
