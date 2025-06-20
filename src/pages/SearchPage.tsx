import React, { useState } from "react";
import {
  Box,
  Container,
  Button,
  Typography,
  Paper,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { featuresDictionary } from "../data/featuresDictionary";
import ExactFormSearch from "../components/Search/ExactFormSearch";
import LemmaSearch from "../components/Search/LemmaSearch";
import GrammaticalSearch from "../components/Search/GrammaticalSearch";
import Header from "@/components/Header";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`search-tabpanel-${index}`}
      aria-labelledby={`search-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `search-tab-${index}`,
    "aria-controls": `search-tabpanel-${index}`,
  };
}

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

const SearchPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [searchParams, setSearchParams] = useState<Record<string, string[]>>(
    {}
  );
  const [word, setWord] = useState("");
  const [exactForm, setExactForm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<
    Record<string, string[]>
  >({});
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState<string>("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search parameters:", {
      value,
      word,
      exactForm,
      selectedFeatures,
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

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleApplyFeatures = () => {
    setSearchParams(selectedFeatures);
    handleCloseModal();
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          width: "100vw",
          minWidth: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          borderBottom: 1,
          borderColor: "divider",
          background: "linear-gradient(to right, #EFF6FF, #FEF2F2)",
          px: 0,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            py: 6,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Кыргыз тилинин корпусу
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="search tabs"
          centered
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "white",
              height: 3,
              borderRadius: "3px 3px 0 0",
            },
            "& .MuiTab-root": {
              fontSize: "1.1rem",
              fontWeight: 500,
              textTransform: "none",
              minWidth: 200,
              "&.Mui-selected": {
                fontWeight: 600,
                color: "#1a1a1a",
              },
            },
          }}
        >
          <Tab label="Точная форма" {...a11yProps(0)} />
          <Tab label="Лемма" {...a11yProps(1)} />
          <Tab label="Грамматикалык издөө" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Container maxWidth="4xl">
        <Paper elevation={0} sx={{ overflow: "hidden" }}>
          <TabPanel value={value} index={0}>
            <ExactFormSearch />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <LemmaSearch />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <GrammaticalSearch />
          </TabPanel>

          {/* Модальное окно для грамматических признаков */}
          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 2,
                boxShadow: "none", // Убрана тень у модального окна
                border: "1px solid #ddd", // можно добавить тонкую рамку
              },
            }}
          >
            <DialogTitle
              sx={{
                background: "#2196F3",
                color: "white",
                py: 2,
              }}
            >
              Грамматикалык белгилер
              <IconButton
                aria-label="close"
                onClick={handleCloseModal}
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
              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Сөз түрү</InputLabel>
                  <Select
                    value={selectedPartOfSpeech}
                    label="Сөз түрү"
                    onChange={handlePartOfSpeechChange}
                    sx={{ mb: 2 }}
                  >
                    {Object.keys(featuresDictionary).map((pos) => (
                      <MenuItem key={pos} value={pos}>
                        {partOfSpeechMapping[pos] || pos}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {selectedPartOfSpeech && (
                <Box sx={{ flexGrow: 1 }}>
                  {Object.entries(featuresDictionary[selectedPartOfSpeech]).map(
                    ([feature, { label, values }]) => (
                      <Box key={feature} sx={{ mb: 4 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "text.secondary",
                            fontWeight: "medium",
                          }}
                        >
                          {label}
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            value={(selectedFeatures[feature] || [])[0] || ""}
                            onChange={(e) =>
                              handleFeatureChange(feature, e.target.value)
                            }
                            displayEmpty
                          >
                            <MenuItem value="">
                              <em>Тандоо</em>
                            </MenuItem>
                            {Object.entries(values).map(([value, label]) => (
                              <MenuItem key={value} value={value}>
                                {label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    )
                  )}
                </Box>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 2, bgcolor: "background.default" }}>
              <Button
                onClick={handleCloseModal}
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
                onClick={handleApplyFeatures}
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
        </Paper>
      </Container>
    </>
  );
};

export default SearchPage;
