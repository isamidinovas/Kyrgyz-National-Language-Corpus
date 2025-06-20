import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SortModalProps {
  onSort: (sortBy: string) => void;
  currentSort: string;
}

export function SortModal({ onSort, currentSort }: SortModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-up-down"
          >
            <path d="m21 16-4 4-4-4" />
            <path d="M17 20V4" />
            <path d="m3 8 4-4 4 4" />
            <path d="M7 4v16" />
          </svg>
          Сорттоо
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Сорттоо параметрлери</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup
            defaultValue={currentSort}
            onValueChange={onSort}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="default" />
              <Label htmlFor="default">Демейки тартип</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text-asc" id="text-asc" />
              <Label htmlFor="text-asc">Текст боюнча (А-Я)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text-desc" id="text-desc" />
              <Label htmlFor="text-desc">Текст боюнча (Я-А)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="source-asc" id="source-asc" />
              <Label htmlFor="source-asc">Булак боюнча (А-Я)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="source-desc" id="source-desc" />
              <Label htmlFor="source-desc">Булак боюнча (Я-А)</Label>
            </div>
          </RadioGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
}
