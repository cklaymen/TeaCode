import { useMemo } from "react";
import { Alert, LinearProgress } from "@mui/material";

import useUserQuery from "./useUsersQuery";
import UsersListContent from "./UsersListContent";

interface Props {
  searchPhrase: string;
}

const UsersList: React.FC<Props> = ({ searchPhrase }) => {
  const { data, isLoading, isError } = useUserQuery();
  const filteredUsers = useMemo(
    () =>
      (data && searchPhrase
        ? data.filter((user) =>
            `${user.first_name} ${user.last_name}`
              .toLowerCase()
              .includes(searchPhrase.toLowerCase())
          )
        : data) || [],
    [searchPhrase, data]
  );

  if (isLoading) {
    return <LinearProgress />;
  }
  if (isError) {
    return <Alert severity="error">Something went wrong.</Alert>;
  }
  return <UsersListContent users={filteredUsers} />;
};

export default UsersList;
