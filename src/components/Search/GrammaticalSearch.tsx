import React, { useState } from "react";
import {
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { featuresDictionary } from "../../data/featuresDictionary";
import { syntaxDictionary } from "../../data/syntaxDictionary";
import GrammarModal from "./GrammarModal";

const partOfSpeechMapping = {
  NOUN: "Зат атооч",
  PRON: "Ат атооч",
  ADJ: "Сын атооч",
  NUM: "Сан атооч",
  VERB: "Этиш",
  ADV: "Тактооч",
  CCONJ: "Байламта",
  SCONJ: "Жандооч",
  PART: "Бөлүкчө",
  INTJ: "Модалдык сөз",
  TSOZ: "Тууранды сөз",
  SS: "Сырдык сөз",
};

interface SyntaxDictionary {
  [key: string]: string;
}

const GrammaticalSearch: React.FC = () => {
  const [word, setWord] = useState("");
  const [exactForm, setExactForm] = useState("");
  const [openGrammarModal, setOpenGrammarModal] = useState(false);
  const [openSyntaxModal, setOpenSyntaxModal] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<
    Record<string, string[]>
  >({});
  const [selectedSyntax, setSelectedSyntax] = useState<string>("");
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState<string>("");
  const [grammarInput, setGrammarInput] = useState("");
  const [syntaxInput, setSyntaxInput] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search parameters:", {
      word,
      exactForm,
      selectedFeatures,
      selectedSyntax,
    });
  };

  const handlePartOfSpeechChange = (event: SelectChangeEvent) => {
    setSelectedPartOfSpeech(event.target.value);
  };

  const handleFeatureChange = (feature: string, value: string) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [feature]: [value],
    }));
  };

  const handleSyntaxChange = (value: string) => {
    setSelectedSyntax(value);
  };

  const handleOpenGrammarModal = () => {
    setOpenGrammarModal(true);
  };

  const handleOpenSyntaxModal = () => {
    setOpenSyntaxModal(true);
  };

  const handleCloseGrammarModal = () => {
    setOpenGrammarModal(false);
  };

  const handleCloseSyntaxModal = () => {
    setOpenSyntaxModal(false);
  };

  const handleApplyFeatures = (
    features: Record<string, string[]>,
    partOfSpeech?: string
  ) => {
    setSelectedFeatures(features);
    if (partOfSpeech) setSelectedPartOfSpeech(partOfSpeech);
    const pos = partOfSpeech || selectedPartOfSpeech;
    const valueLabels = Object.entries(features).flatMap(([feature, values]) =>
      values.map(
        (value) => featuresDictionary[pos]?.[feature]?.values?.[value] || value
      )
    );
    setGrammarInput(valueLabels.join(", "));
    handleCloseGrammarModal();
  };

  const handleApplySyntax = () => {
    setSyntaxInput(
      selectedSyntax ? syntaxDictionary[selectedSyntax] || "" : ""
    );
    handleCloseSyntaxModal();
  };

  return (
    <>
      <Card elevation={0} sx={{ bgcolor: "background.default" }}>
        <CardContent>
          <Stack spacing={3} alignItems="center">
            <TextField
              sx={{ width: "50%" }}
              variant="outlined"
              label="Лемма"
              placeholder="Лемманы киргизиңиз..."
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />

            <TextField
              sx={{ width: "50%" }}
              variant="outlined"
              label="Сөзформа"
              placeholder="Сөзформаны киргизиңиз..."
              value={exactForm}
              onChange={(e) => setExactForm(e.target.value)}
            />

            <Box sx={{ width: "50%" }}>
              <TextField
                fullWidth
                label="Грамматикалык белгилер"
                value={grammarInput}
                placeholder="Грамматикалык белгилерди тандаңыз..."
                onClick={handleOpenGrammarModal}
                InputProps={{
                  readOnly: true,

                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="text"
                        onClick={handleOpenGrammarModal}
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
                  "& .MuiOutlinedInput-root": {
                    cursor: "pointer",
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
                label="Синтаксисттик белгилер"
                value={syntaxInput}
                placeholder="Синтаксисттик белгилерди тандаңыз..."
                onClick={handleOpenSyntaxModal}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="text"
                        onClick={handleOpenSyntaxModal}
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
                  "& .MuiOutlinedInput-root": {
                    cursor: "pointer",
                    "&:hover": {
                      "& > fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              sx={{
                width: "50%",
                py: 1,
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

      <GrammarModal
        open={openGrammarModal}
        onClose={handleCloseGrammarModal}
        onApply={handleApplyFeatures}
      />

      {/* Модальное окно для семантической информации */}
      <Dialog
        open={openSyntaxModal}
        onClose={handleCloseSyntaxModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "#1a1a1a",
            "&:hover": {
              background: "#0b0b0b",
            },
            color: "white",
            py: 2,
          }}
        >
          Синтаксисттик белги
          <IconButton
            aria-label="close"
            onClick={handleCloseSyntaxModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Тандоо</InputLabel>
              <Select
                value={selectedSyntax}
                label="Семантикалык маалымат"
                onChange={(e) => handleSyntaxChange(e.target.value)}
                displayEmpty
              >
                {Object.entries(syntaxDictionary).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: "background.default" }}>
          <Button
            onClick={handleCloseSyntaxModal}
            sx={{
              color: "text.secondary",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            Жокко чыгаруу
          </Button>
          <Button
            onClick={handleApplySyntax}
            variant="contained"
            sx={{
              background: "#1a1a1a",
              "&:hover": {
                background: "#0b0b0b",
              },
            }}
          >
            Колдонуу
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GrammaticalSearch;
