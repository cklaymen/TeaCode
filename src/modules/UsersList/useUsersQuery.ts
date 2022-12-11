import { useQuery } from "react-query";

export interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}

const useUsersQuery = () =>
  useQuery<Array<User>>("users", () =>
    fetch(
      "https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json"
    )
      .then((res) => res.json())
      .then((users: User[]) =>
        users.sort((a, b) => a.last_name.localeCompare(b.last_name))
      )
  );

export default useUsersQuery;
