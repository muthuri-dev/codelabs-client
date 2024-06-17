"use client";
import {
  Table,
  TableBody,
  TableHeader,
  TableItem,
  TableRow,
} from "@/components/table";
import { ArrowSwapVertical, Messages3, TickCircle } from "iconsax-react";
import Image from "next/image";
import Avatar2 from "@/components/assets/avatars/avatar2.png";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/graphql/user.actions";

type TUser = {
  username: string;
  email: string;
  profile_image: string;
};
function Community() {
  //get commutity members
  const { data: usersData } = useQuery(GET_USERS);
  const users: TUser[] = usersData?.getAllUsers;
  return (
    <Table className="w-full overflow-x-auto">
      {/* table header */}
      <TableHeader>
        <TableItem>
          Member name
          <ArrowSwapVertical size={12} />
        </TableItem>
        <TableItem>
          Message
          <ArrowSwapVertical size={12} />
        </TableItem>
        <TableItem className="w-[180px]">
          Status
          <ArrowSwapVertical size={12} />
        </TableItem>
      </TableHeader>

      {/* table rows */}
      <TableBody>
        {users &&
          users.map((user, index) => (
            <TableRow key={index}>
              <TableItem>
                <Image
                  src={user?.profile_image}
                  alt="user"
                  className="w-8 h-8 rounded-full"
                  width={200}
                  height={200}
                />
                <div>
                  <p className="text-gray-800 font-medium">{user.username}</p>
                  <p className="text-xs">..{user.email.slice(5)}</p>
                </div>
              </TableItem>

              <TableItem>
                <Messages3 size="25" color="#8F00FF" />

                <p className="text-gray-800 font-medium">Chat</p>
              </TableItem>

              <TableItem className="justify-between w-[180px]">
                <div className="flex items-center gap-1 border rounded-full p-1">
                  <TickCircle
                    size={16}
                    variant="Bold"
                    className="text-emerald-500"
                  />
                  <p className="text-xs">Active</p>
                </div>
              </TableItem>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default Community;
