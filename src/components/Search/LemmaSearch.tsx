import React, { useState } from "react";
import {
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import GrammarModal from "./GrammarModal";

const LemmaSearch = () => {
  const [lemma, setLemma] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [grammarFeatures, setGrammarFeatures] = useState<string[]>([]);
  const [isGrammarModalOpen, setIsGrammarModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lemma search:", { lemma, partOfSpeech, grammarFeatures });
  };

  const handleGrammarModalOpen = () => {
    setIsGrammarModalOpen(true);
  };

  const handleGrammarModalClose = () => {
    setIsGrammarModalOpen(false);
  };

  const handleGrammarFeaturesApply = (features: string[]) => {
    setGrammarFeatures(features);
  };

  return (
    <Card sx={{ mx: "auto", boxShadow: "none" }}>
      <CardContent>
        <form onSubmit={handleSearch}>
          <Stack spacing={3} alignItems="center">
            <Box sx={{ width: "50%" }}>
              <TextField
                fullWidth
                label="Лемма"
                value={lemma}
                onChange={(e) => setLemma(e.target.value)}
                placeholder="Лемманы киргизиңиз..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover": {
                      "& > fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ width: "50%" }}>
              <TextField
                fullWidth
                label="Сөз түркүмү"
                value={partOfSpeech}
                onChange={(e) => setPartOfSpeech(e.target.value)}
                placeholder="Сөз түркүмүн тандаңыз..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover": {
                      "& > fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ width: "50%" }}>
              <TextField
                fullWidth
                label="Грамматикалык белгилер"
                value={grammarFeatures.join(", ")}
                onClick={handleGrammarModalOpen}
                placeholder="Грамматикалык белгилерди тандаңыз..."
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="text"
                        onClick={handleGrammarModalOpen}
                        sx={{
                          minWidth: "auto",
                          p: 0.5,
                          color: "text.primary",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                          },
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </Button>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  cursor: "pointer",
                  "& .MuiOutlinedInput-root": {
                    "&:hover": {
                      "& > fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ width: "50%" }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  color: "white",
                  background: "#1a1a1a",
                  "&:hover": {
                    background: "#0b0b0b",
                  },
                  py: 1,
                }}
              >
                <SearchIcon sx={{ mr: 1 }} />
                Издөө
              </Button>
            </Box>
          </Stack>
        </form>

        <GrammarModal
          open={isGrammarModalOpen}
          onClose={handleGrammarModalClose}
          onApply={handleGrammarFeaturesApply}
        />
      </CardContent>
    </Card>
  );
};

export default LemmaSearch;
