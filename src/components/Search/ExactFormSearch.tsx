import React, { useState } from "react";
import { Card, CardContent, Stack, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ExactFormSearch: React.FC = () => {
  const [exactForm, setExactForm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search exact form:", exactForm);
  };

  return (
    <Card elevation={0} sx={{ bgcolor: "background.default" }}>
      <CardContent>
        <Stack spacing={3} alignItems="center">
          <TextField
            sx={{ width: "50%", color: "#1a1a1a" }}
            variant="outlined"
            label="Сөзформа"
            placeholder="Сөзформаны киргизиңиз..."
            value={exactForm}
            onChange={(e) => setExactForm(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            sx={{
              width: "50%",
              py: 1,
              fontSize: "1rem",
              background: "#1a1a1a",
              "&:hover": {
                background: "#0b0b0b",
              },
            }}
          >
            Издөө
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ExactFormSearch;
