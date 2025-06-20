import { useSearchParams } from "react-router-dom";
import { testSentences, Sentence } from "../lib/testData";
import Header from "@/components/Header";
import { useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { SortModal } from "@/components/SortModal";
import WordModal from "@/components/WordModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useNavigate } from "react-router-dom";

interface WordData {
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
}

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isWordModalOpen, setIsWordModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<WordData | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState("default");
  const itemsPerPage = 5;

  const filteredSentences = useMemo(() => {
    const filtered = testSentences.filter((sentence) => {
      const matchesQuery = sentence.text
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || sentence.category === categoryFilter;
      return matchesQuery && matchesCategory;
    });

    switch (sortBy) {
      case "text-asc":
        filtered.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case "text-desc":
        filtered.sort((a, b) => b.text.localeCompare(a.text));
        break;
      case "source-asc":
        filtered.sort((a, b) => a.source.localeCompare(b.source));
        break;
      case "source-desc":
        filtered.sort((a, b) => b.source.localeCompare(a.source));
        break;
      default:
        // Default order (by id)
        filtered.sort((a, b) => a.id - b.id);
    }

    return filtered;
  }, [query, sortBy, categoryFilter]);

  const pageCount = Math.ceil(filteredSentences.length / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredSentences.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const handleSort = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handleWordClick = (word: string) => {
    const wordData: WordData = {
      form: word,
      lemma: word,
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
    };
    setSelectedWord(wordData);
    setIsWordModalOpen(true);
  };

  const renderSentence = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        onClick={() => handleWordClick(word)}
        className="cursor-pointer hover:text-blue-600 hover:underline inline-block"
      >
        {word}{" "}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Издөө натыйжалары: "{query}"</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Сөздү издөө..."
                value={query}
                onChange={(e) => navigate(`/search?q=${e.target.value}`)}
                className="pl-8"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Бардык категориялар</SelectItem>
                <SelectItem value="Макал">Макал</SelectItem>
                <SelectItem value="Аңгеме">Аңгеме</SelectItem>
                <SelectItem value="Маалымат">Маалымат</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setIsSortModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Салалаштыруу
            </Button>
          </div>
        </div>

        {filteredSentences.length === 0 ? (
          <p className="text-gray-600">По вашему запросу ничего не найдено.</p>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {currentItems.map((sentence) => (
                <div
                  key={sentence.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <p className="text-lg mb-2">
                    {renderSentence(sentence.text)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Булак: {sentence.source}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Кийинки >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< Мурунку"
                renderOnZeroPageCount={null}
                containerClassName="flex gap-2 items-center"
                pageClassName="px-3 py-1 rounded hover:bg-blue-100"
                activeClassName="bg-blue-500 text-white hover:bg-blue-600"
                previousClassName="px-3 py-1 rounded hover:bg-blue-100"
                nextClassName="px-3 py-1 rounded hover:bg-blue-100"
                disabledClassName="opacity-50 cursor-not-allowed"
              />
            </div>
          </>
        )}

        {selectedWord && (
          <WordModal
            word={selectedWord}
            isOpen={isWordModalOpen}
            onClose={() => setIsWordModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
