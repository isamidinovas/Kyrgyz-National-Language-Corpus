import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import WordModal from "@/components/WordModal";

interface SavedWord {
  id: string;
  form: string;
  lemma: string;
  pos: string;
  morphology: {
    number: string;
    case: string;
    person: string;
    tense: string;
    gender: string;
  };
  similarWords: {
    synonyms: string[];
    antonyms: string[];
    related: string[];
  };
  savedAt: string;
}

export default function SavedWords() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isWordModalOpen, setIsWordModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<SavedWord | null>(null);

  // Тестовые данные
  const savedWords: SavedWord[] = [
    {
      id: "1",
      form: "тил",
      lemma: "тил",
      pos: "Зат атооч",
      morphology: {
        number: "Жалгыз",
        case: "Атооч",
        person: "-",
        tense: "-",
        gender: "-",
      },
      similarWords: {
        synonyms: ["сөз", "лексика", "термин"],
        antonyms: ["үн", "тынчтык"],
        related: ["сүйлөө", "айтуу", "жазуу", "окуу"],
      },
      savedAt: "2024-03-20",
    },
    {
      id: "2",
      form: "сөз",
      lemma: "сөз",
      pos: "Зат атооч",
      morphology: {
        number: "Жалгыз",
        case: "Атооч",
        person: "-",
        tense: "-",
        gender: "-",
      },
      similarWords: {
        synonyms: ["тил", "лексика", "термин"],
        antonyms: ["үн", "тынчтык"],
        related: ["сүйлөө", "айтуу", "жазуу", "окуу"],
      },
      savedAt: "2024-03-19",
    },
  ];

  const filteredWords = savedWords.filter(
    (word) =>
      word.form.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.lemma.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWordClick = (word: SavedWord) => {
    setSelectedWord(word);
    setIsWordModalOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Сакталган сөздөр</h1>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Сөздү издөө..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Сөз</TableHead>
              <TableHead>Лемма</TableHead>
              <TableHead>Сөз түркүмү</TableHead>
              <TableHead>Сакталган күнү</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWords.map((word) => (
              <TableRow
                key={word.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleWordClick(word)}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{word.form}</span>
                    <Badge variant="secondary">{word.pos}</Badge>
                  </div>
                </TableCell>
                <TableCell>{word.lemma}</TableCell>
                <TableCell>{word.pos}</TableCell>
                <TableCell>{word.savedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedWord && (
        <WordModal
          isOpen={isWordModalOpen}
          onClose={() => setIsWordModalOpen(false)}
          word={selectedWord}
        />
      )}
    </div>
  );
}
