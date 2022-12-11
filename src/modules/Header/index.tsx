import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography
        variant="h6"
        textAlign="center"
        component="div"
        sx={{ flexGrow: 1 }}
      >
        Contacts
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
