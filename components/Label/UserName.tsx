import { User } from "../../lib/mahjong";
import Record from "../Badges/Record";
import Achievement from "../Badges/Achievement";
import Penalty from "../Badges/Penalty";

const UserName = ({ user }: { user: User }) => {
  return (
    <>
      {user.name}
      <Achievement user={user} />
      <Record user={user} />
      <Penalty penalty={user.penalty} />
    </>
  );
};
export default UserName;
