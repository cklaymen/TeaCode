import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  Avatar,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { User } from "./useUsersQuery";

interface Props {
  users: User[];
}

const MIN_LIST_HEIGHT = 72;

const UsersListContent: React.FC<Props> = ({ users }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [listHeight, setListHeight] = useState<number>(MIN_LIST_HEIGHT);
  const [selected, setSelected] = useState<Number[]>([]);
  const toggleSelectedUser = useCallback(
    (userId: number) => () => {
      setSelected((selected) => {
        const newSelected = [...selected];
        const index = newSelected.indexOf(userId);
        if (index >= 0) {
          newSelected.splice(index, 1);
        } else {
          newSelected.push(userId);
        }
        console.log(newSelected);
        return newSelected;
      });
    },
    []
  );
  const listItemFn = useCallback(
    ({ data, index, style }: ListChildComponentProps<User[]>) => {
      const user = data[index];
      return (
        <ListItem style={style} key={user.id} disablePadding>
          <ListItemButton onClick={toggleSelectedUser(user.id)}>
            <ListItemAvatar>
              {/* Lazy loading seems not to work in Avatar component... */}
              <Avatar
                alt={`${user.first_name} ${user.last_name}`}
                src={user.avatar}
                imgProps={{ loading: "lazy" }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${user.first_name} ${user.last_name}`}
              secondary={user.email}
            />
            <Checkbox edge="end" checked={selected.indexOf(user.id) !== -1} />
          </ListItemButton>
        </ListItem>
      );
    },
    [selected, toggleSelectedUser]
  );
  useLayoutEffect(() => {
    function handleWindowSizeChange() {
      const detectedHeight = listRef.current?.clientHeight;
      if (detectedHeight !== undefined) {
        setListHeight(Math.max(detectedHeight, MIN_LIST_HEIGHT));
      }
    }
    window.addEventListener("resize", handleWindowSizeChange);
    handleWindowSizeChange();
    return () => window.removeEventListener("resize", handleWindowSizeChange);
  }, [listRef]);

  return (
    <List ref={listRef} sx={{ padding: "0" }}>
      <FixedSizeList
        height={listHeight}
        itemCount={users.length}
        itemSize={72}
        width="100%"
        itemData={users}
        style={{ position: "absolute" }}
      >
        {listItemFn}
      </FixedSizeList>
    </List>
  );
};

export default UsersListContent;
