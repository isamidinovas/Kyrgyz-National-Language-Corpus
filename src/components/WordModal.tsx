import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface WordModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: {
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
    similarWords?: {
      synonyms: string[];
      antonyms: string[];
      related: string[];
    };
  };
}

export default function WordModal({ isOpen, onClose, word }: WordModalProps) {
  const navigate = useNavigate();

  const handleViewPortrait = () => {
    navigate(`/word-portrait?word=${word.form}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{word.form}</DialogTitle>
              <DialogDescription>{word.pos}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Грамматика:</p>
              {/* <p className="font-medium">{word.morphology.number}</p> */}
            </div>
            <div>
              <p className="text-sm text-gray-500">Семантика:</p>
              {/* <p className="font-medium">{word.morphology.case}</p> */}
            </div>
          </div>

          {word.similarWords && (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Байланыштуу сөздөр:
                </p>
                <div className="flex flex-wrap gap-2">
                  {word.similarWords.related.map((related, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        const newWord = {
                          ...word,
                          form: related,
                          lemma: related,
                        };
                        navigate(`/word-portrait?word=${related}`);
                        onClose();
                      }}
                    >
                      {related}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={handleViewPortrait}>Толук портрет</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
