import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { featuresDictionary } from "../../data/featuresDictionary";

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

interface GrammarModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (features: Record<string, string[]>) => void;
}

const GrammarModal: React.FC<GrammarModalProps> = ({
  open,
  onClose,
  onApply,
}) => {
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<
    Record<string, string[]>
  >({});

  const handlePartOfSpeechChange = (event: SelectChangeEvent) => {
    setSelectedPartOfSpeech(event.target.value);
  };

  const handleFeatureChange = (feature: string, value: string) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [feature]: [value],
    }));
  };

  const handleApply = () => {
    onApply(selectedFeatures);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        Грамматикалык белгилер
        <IconButton
          aria-label="close"
          onClick={onClose}
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
            {Object.entries(featuresDictionary[selectedPartOfSpeech] || {}).map(
              ([feature, { label, values }]) => (
                <Box key={feature} sx={{ mb: 4 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 2,
                      color: "text.secondary",
                      fontWeight: "medium",
                    }}
                  >
                    {label}
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel>Тандоо</InputLabel>
                    <Select
                      value={(selectedFeatures[feature] || [])[0] || ""}
                      onChange={(e) =>
                        handleFeatureChange(feature, e.target.value)
                      }
                      displayEmpty
                    >
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
          onClick={onClose}
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
          onClick={handleApply}
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
  );
};

export default GrammarModal;
