import { ListItem, Stack, UnorderedList } from "@chakra-ui/react";
import { Link as ReachLink, Outlet } from "react-router-dom";

import AuthStatus from "./AuthStatus";

function Layout() {
  return (
    <Stack>
      <AuthStatus />

      <UnorderedList>
        <ListItem>
          <ReachLink to="/">Public Page</ReachLink>
        </ListItem>
        <ListItem>
          <ReachLink to="/protected">Protected Page</ReachLink>
        </ListItem>
      </UnorderedList>

      <Outlet />
    </Stack>
  );
}

export default Layout;
