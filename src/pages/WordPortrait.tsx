import { useState } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface WordForm {
  id: number;
  form: string;
  type: string;
  frequency: number;
  examples: string[];
  lemma: string;
  pos: string;
  morphology: {
    number: string;
    case: string;
    person: string;
    tense: string;
    gender: string;
  };
  statistics: {
    total: number;
    inTexts: number;
    inSpoken: number;
    inWritten: number;
  };
  collocations: {
    left: string[];
    right: string[];
  };
  definitions: {
    text: string;
    examples: string[];
  }[];
  predicates: {
    text: string;
    examples: string[];
  }[];
  syntax: {
    roles: string[];
    examples: {
      role: string;
      sentence: string;
    }[];
  };
  cases: {
    name: string;
    form: string;
    example: string;
  }[];
  morphemes: {
    root: string;
    affixes: string[];
    analysis: string;
  };
}

// Тестовые данные для демонстрации
const testWordForms: WordForm[] = [
  {
    id: 1,
    form: "тил",
    lemma: "тил",
    pos: "Зат атооч",
    type: "Жалгыз сан",
    frequency: 120,
    examples: ["Кыргыз тили", "Тил билүү"],
    morphology: {
      number: "Жалгыз",
      case: "Атооч",
      person: "-",
      tense: "-",
      gender: "-",
    },
    statistics: {
      total: 120,
      inTexts: 85,
      inSpoken: 20,
      inWritten: 15,
    },
    collocations: {
      left: ["кыргыз", "улуттук", "элдин"],
      right: ["билүү", "үйрөнүү", "сактап калуу"],
    },
    definitions: [
      {
        text: "Адамдардын бири-бири менен сүйлөшүүсүнүн, ой жүгүртүүсүнүн жана бири-бирине маалымат берүүсүнүн негизги каражаты",
        examples: ["Кыргыз тили - кыргыз элинин тили", "Тил - элдин байлыгы"],
      },
      {
        text: "Бир нерсенин башка нерсеге тийип, урунуп, сүртүнүп жаткан бети",
        examples: ["Тиштин тили", "Бут кийимдин тили"],
      },
    ],
    predicates: [
      {
        text: "Сүйлөө, айтуу",
        examples: ["Тил ачуу", "Тил тийүү"],
      },
      {
        text: "Бир нерсенин башка нерсеге тийип, урунуп, сүртүнүп жаткан бети",
        examples: ["Тиштин тили", "Бут кийимдин тили"],
      },
    ],
    syntax: {
      roles: ["Баш сөз", "Толуктооч", "Аныктооч"],
      examples: [
        {
          role: "Баш сөз",
          sentence: "Тил - элдин байлыгы.",
        },
        {
          role: "Толуктооч",
          sentence: "Мен тилди үйрөнүүнү жакшы көрөм.",
        },
        {
          role: "Аныктооч",
          sentence: "Кыргыз тили - биздин тилибиз.",
        },
      ],
    },
    cases: [
      {
        name: "Атооч",
        form: "тил",
        example: "Тил - элдин байлыгы",
      },
      {
        name: "Илик",
        form: "тилдин",
        example: "Тилдин байлыгы",
      },
      {
        name: "Барыш",
        form: "тилге",
        example: "Тилге үйрөнүү",
      },
      {
        name: "Табыш",
        form: "тилди",
        example: "Тилди үйрөнүү",
      },
      {
        name: "Жатыш",
        form: "тилде",
        example: "Тилден башка",
      },
      {
        name: "Чыгыш",
        form: "тилден",
        example: "Тилде сүйлөө",
      },
    ],
    morphemes: {
      root: "тил",
      affixes: [],
      analysis: "тил - негизги сөз, жалгыз морфема",
    },
  },
  {
    id: 2,
    form: "тилдин",
    lemma: "тил",
    pos: "Зат атооч",
    type: "Жалгыз сан, иелик",
    frequency: 85,
    examples: ["Тилдин байлыгы", "Тилдин тарыхы"],
    morphology: {
      number: "Жалгыз",
      case: "Иелик",
      person: "-",
      tense: "-",
      gender: "-",
    },
    statistics: {
      total: 85,
      inTexts: 60,
      inSpoken: 15,
      inWritten: 10,
    },
    collocations: {
      left: ["кыргыз", "элдин", "биздин"],
      right: ["байлыгы", "тарыхы", "өнүгүшү"],
    },
    definitions: [],
    predicates: [],
  },
  {
    id: 3,
    form: "тилге",
    lemma: "тил",
    pos: "Зат атооч",
    type: "Жалгыз сан, багыт",
    frequency: 65,
    examples: ["Тилге үйрөнүү", "Тилге кызыгуу"],
    morphology: {
      number: "Жалгыз",
      case: "Барыш",
      person: "-",
      tense: "-",
      gender: "-",
    },
    statistics: {
      total: 65,
      inTexts: 45,
      inSpoken: 12,
      inWritten: 8,
    },
    collocations: {
      left: ["кыргыз", "жаңы", "башка"],
      right: ["үйрөнүү", "кызыгуу", "карата"],
    },
    definitions: [],
    predicates: [],
  },
  {
    id: 4,
    form: "тилдер",
    lemma: "тил",
    pos: "Зат атооч",
    type: "Көптүк сан",
    frequency: 45,
    examples: ["Дүйнөлүк тилдер", "Тилдердин тарыхы"],
    morphology: {
      number: "Көптүк",
      case: "Атооч",
      person: "-",
      tense: "-",
      gender: "-",
    },
    statistics: {
      total: 45,
      inTexts: 30,
      inSpoken: 8,
      inWritten: 7,
    },
    collocations: {
      left: ["дүйнөлүк", "бардык", "башка"],
      right: ["тарыхы", "өнүгүшү", "байлыгы"],
    },
    definitions: [],
    predicates: [],
  },
  {
    id: 5,
    form: "тилдердин",
    lemma: "тил",
    pos: "Зат атооч",
    type: "Көптүк сан, иелик",
    frequency: 30,
    examples: ["Тилдердин байлыгы", "Тилдердин өнүгүшү"],
    morphology: {
      number: "Көптүк",
      case: "Иелик",
      person: "-",
      tense: "-",
      gender: "-",
    },
    statistics: {
      total: 30,
      inTexts: 20,
      inSpoken: 5,
      inWritten: 5,
    },
    collocations: {
      left: ["дүйнөлүк", "бардык", "башка"],
      right: ["байлыгы", "өнүгүшү", "тарыхы"],
    },
    definitions: [],
    predicates: [],
  },
];

export default function WordPortrait() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWord, setSelectedWord] = useState<WordForm | null>(null);

  const filteredForms = testWordForms.filter((form) =>
    form.form.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Сөздүн портрети</h1>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-2">
            <Input
              placeholder="Сөздү киргизиңиз..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Издөө
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Сөз формалары</CardTitle>
                <CardDescription>
                  Сөздүн бардык грамматикалык формалары
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Форма</TableHead>
                      <TableHead>Түрү</TableHead>
                      <TableHead>Жыштык</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredForms.map((form) => (
                      <TableRow
                        key={form.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => setSelectedWord(form)}
                      >
                        <TableCell className="font-medium">
                          {form.form}
                        </TableCell>
                        <TableCell>{form.type}</TableCell>
                        <TableCell>{form.frequency}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {selectedWord && (
            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">
                        {selectedWord.form}
                      </CardTitle>
                      <CardDescription>{selectedWord.pos}</CardDescription>
                    </div>
                    <Badge variant="secondary">{selectedWord.lemma}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="morphology" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="statistics">Статистика</TabsTrigger>
                      <TabsTrigger value="collocations">
                        Сөз айкаштары
                      </TabsTrigger>
                      {/* <TabsTrigger value="definitions">Аныктамалар</TabsTrigger> */}
                      <TabsTrigger value="predicates">Этиштер</TabsTrigger>
                    </TabsList>

                    <TabsContent value="statistics" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold mb-2">Жалпы жыштык:</h3>
                          <p>{selectedWord.statistics.total} жолу</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Тексттерде:</h3>
                          <p>{selectedWord.statistics.inTexts} жолу</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">
                            Оозеки сүйлөөдө:
                          </h3>
                          <p>{selectedWord.statistics.inSpoken} жолу</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">
                            Жазуу тексттерде:
                          </h3>
                          <p>{selectedWord.statistics.inWritten} жолу</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="collocations" className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">
                          Сол жактагы сөздөр:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedWord.collocations.left.map((word, index) => (
                            <Badge key={index} variant="outline">
                              {word}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">
                          Оң жактагы сөздөр:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedWord.collocations.right.map(
                            (word, index) => (
                              <Badge key={index} variant="outline">
                                {word}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="predicates" className="space-y-4">
                      {selectedWord.predicates.map((predicate, index) => (
                        <div key={index} className="space-y-2">
                          <h3 className="font-semibold">
                            Сказуемое {index + 1}:
                          </h3>
                          <p className="text-gray-700">{predicate.text}</p>
                          <div className="mt-2">
                            <h4 className="font-medium text-sm text-gray-600">
                              Мисалдар:
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {predicate.examples.map((example, idx) => (
                                <li key={idx} className="text-gray-600">
                                  {example}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {selectedWord && (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Грамматика */}
            <Card>
              <CardHeader>
                <CardTitle>Грамматика</CardTitle>
                <CardDescription>
                  Сөздүн грамматикалык өзгөчөлүктөрү
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Сөз түркүмү:</p>
                    <p className="font-medium">{selectedWord.pos}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Лемма:</p>
                    <p className="font-medium">{selectedWord.lemma}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Морфология */}
            <Card>
              <CardHeader>
                <CardTitle>Морфология</CardTitle>
                <CardDescription>
                  Сөздүн морфологиялык өзгөчөлүктөрү
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Сан:</p>
                    <p className="font-medium">
                      {selectedWord.morphology.number}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Жөндөмө:</p>
                    <p className="font-medium">
                      {selectedWord.morphology.case}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Жак:</p>
                    <p className="font-medium">
                      {selectedWord.morphology.person}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Убакыт:</p>
                    <p className="font-medium">
                      {selectedWord.morphology.tense}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Жөндөмөлөр */}
            <Card>
              <CardHeader>
                <CardTitle>Жөндөмөлөр</CardTitle>
                <CardDescription>
                  Сөздүн жөндөмөлөрдөгү формалары
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedWord.cases.map((caseForm, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded-md">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">{caseForm.name}:</p>
                        <Badge variant="outline">{caseForm.form}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {caseForm.example}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Морфемалык талдоо */}
            <Card>
              <CardHeader>
                <CardTitle>Морфемалык талдоо</CardTitle>
                <CardDescription>Сөздүн морфемаларга бөлүнүшү</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Негизги сөз:</p>
                    <p className="font-medium">{selectedWord.morphemes.root}</p>
                  </div>
                  {selectedWord.morphemes.affixes.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-500">Жалгамалар:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedWord.morphemes.affixes.map((affix, index) => (
                          <Badge key={index} variant="secondary">
                            {affix}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Талдоо:</p>
                    <p className="text-gray-700">
                      {selectedWord.morphemes.analysis}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Синтаксис */}
            <Card>
              <CardHeader>
                <CardTitle>Синтаксис</CardTitle>
                <CardDescription>
                  Сөздүн синтаксистик өзгөчөлүктөрү
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Сүйлөм мүчөсү:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedWord.syntax.roles.map((role, index) => (
                        <Badge key={index} variant="secondary">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Синтаксистик мисалдар:
                    </p>
                    <div className="space-y-2 mt-2">
                      {selectedWord.syntax.examples.map((example, index) => (
                        <div key={index} className="p-2 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-500 mb-1">
                            {example.role}:
                          </p>
                          <p className="text-gray-700">{example.sentence}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Семантика */}
            <Card>
              <CardHeader>
                <CardTitle>Семантика</CardTitle>
                <CardDescription>
                  Сөздүн мааниси жана колдонулушу
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Аныктамалар:</p>
                    <div className="space-y-2 mt-2">
                      {selectedWord.definitions.map((definition, index) => (
                        <div key={index} className="p-2 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-500 mb-1">
                            Аныктама {index + 1}:
                          </p>
                          <p className="text-gray-700">{definition.text}</p>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">Мисалдар:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              {definition.examples.map((example, idx) => (
                                <li key={idx} className="text-gray-600">
                                  {example}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {selectedWord.predicates.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-500">Этиштер:</p>
                      <div className="space-y-2 mt-2">
                        {selectedWord.predicates.map((predicate, index) => (
                          <div
                            key={index}
                            className="p-2 bg-gray-50 rounded-md"
                          >
                            <p className="text-gray-700">{predicate.text}</p>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">Мисалдар:</p>
                              <ul className="list-disc pl-5 space-y-1">
                                {predicate.examples.map((example, idx) => (
                                  <li key={idx} className="text-gray-600">
                                    {example}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
