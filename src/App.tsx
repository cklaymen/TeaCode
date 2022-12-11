import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

import Header from "./modules/Header";
import Search from "./modules/Search";
import UsersList from "./modules/UsersList";

const queryClient = new QueryClient();

function App() {
  const [searchPhrase, setSearchPhrase] = useState<string>("");

  return (
    <QueryClientProvider client={queryClient}>
      <Grid
        sx={{
          height: "100vh",
          display: "grid",
          gridTemplateRows: "auto auto 1fr",
        }}
      >
        <Header />
        <Search value={searchPhrase} onChange={setSearchPhrase} />
        <UsersList searchPhrase={searchPhrase} />
      </Grid>
    </QueryClientProvider>
  );
}

export default App;
