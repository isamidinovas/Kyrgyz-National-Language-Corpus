
import { Search, BookOpen, Volume2, FileText, Users, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Кыргыз Тилинин Корпусу</h1>
                <p className="text-sm text-gray-600">Kyrgyz Language Corpus</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#search" className="text-gray-700 hover:text-blue-600 transition-colors">Издөө / Search</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">Жөнүндө / About</a>
              <a href="#texts" className="text-gray-700 hover:text-blue-600 transition-colors">Тексттер / Texts</a>
              <a href="#statistics" className="text-gray-700 hover:text-blue-600 transition-colors">Статистика / Statistics</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Кыргыз Тилинин Улуттук Корпусу
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            National Corpus of the Kyrgyz Language - A comprehensive digital collection of Kyrgyz texts 
            for linguistic research, language learning, and cultural preservation.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Badge variant="secondary" className="text-sm py-2 px-4">1.5M+ сөз / words</Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">500+ текст / texts</Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">XIX-XXI кылым / centuries</Badge>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search" className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8">Корпустан издөө / Search the Corpus</h3>
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Сөздү же сөз айкашын киргизиңиз / Enter word or phrase..."
                    className="flex-1 text-lg py-3"
                  />
                  <Button size="lg" className="px-8">
                    <Search className="h-5 w-5 mr-2" />
                    Издөө
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Жөнөкөй издөө / Simple</Button>
                  <Button variant="outline" size="sm">Кеңейтилген / Advanced</Button>
                  <Button variant="outline" size="sm">Лексика / Lexical</Button>
                  <Button variant="outline" size="sm">Грамматика / Grammar</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Corpus Types */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Корпустун түрлөрү / Corpus Types</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-6 w-6 mr-3 text-blue-600" />
                  Жазуу тексттер
                </CardTitle>
                <CardDescription>Written Texts Corpus</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Адабият, журналистика, илимий жана расмий документтер
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Тексттер:</span>
                    <span className="font-semibold">350+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Сөздөр:</span>
                    <span className="font-semibold">1.2M+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Volume2 className="h-6 w-6 mr-3 text-green-600" />
                  Оозеки сүйлөө
                </CardTitle>
                <CardDescription>Spoken Language Corpus</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Маектешүүлөр, интервьюлар жана оозеки чыгармачылык
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Записи:</span>
                    <span className="font-semibold">150+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Сөздөр:</span>
                    <span className="font-semibold">300K+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 mr-3 text-purple-600" />
                  Диалекттер
                </CardTitle>
                <CardDescription>Regional Dialects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Түндүк, түштүк жана борбордук диалекттердин үлгүлөрү
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Аймактар:</span>
                    <span className="font-semibold">7</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Үлгүлөр:</span>
                    <span className="font-semibold">200+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section id="statistics" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Корпустун статистикасы / Corpus Statistics</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <Database className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h4 className="text-2xl font-bold text-gray-900">1.5M+</h4>
              <p className="text-gray-600">Жалпы сөздөр / Total Words</p>
            </Card>
            <Card className="text-center p-6">
              <FileText className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h4 className="text-2xl font-bold text-gray-900">500+</h4>
              <p className="text-gray-600">Тексттер / Texts</p>
            </Card>
            <Card className="text-center p-6">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h4 className="text-2xl font-bold text-gray-900">250+</h4>
              <p className="text-gray-600">Авторлор / Authors</p>
            </Card>
            <Card className="text-center p-6">
              <Users className="h-12 w-12 mx-auto mb-4 text-orange-600" />
              <h4 className="text-2xl font-bold text-gray-900">200+</h4>
              <p className="text-gray-600">Жылдар / Years Covered</p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Долбоор жөнүндө / About the Project</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">Максаттар / Objectives</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Кыргыз тилинин байлыгын сактоо</li>
                  <li>• Лингвистикалык изилдөөлөргө колдоо көрсөтүү</li>
                  <li>• Тил үйрөнүүчүлөргө ресурс камсыз кылуу</li>
                  <li>• Маданий мурасты дигиталдаштыруу</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Features</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Advanced morphological analysis</li>
                  <li>• Multi-level text annotation</li>
                  <li>• Historical language tracking</li>
                  <li>• Dialectal variation studies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h5 className="font-semibold mb-4">Кыргыз Тилинин Корпусу</h5>
              <p className="text-gray-400">
                Кыргыз тилинин улуттук корпусу - тилди изилдөө жана үйрөнүү үчүн негизги ресурс.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Байланыш / Contact</h5>
              <p className="text-gray-400">corpus@kyrgyz-lang.kg</p>
              <p className="text-gray-400">+996 XXX XXX XXX</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Шериктештер / Partners</h5>
              <p className="text-gray-400">Кыргыз Республикасынын Билим министрлиги</p>
              <p className="text-gray-400">КР Илимдер академиясы</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Кыргыз Тилинин Корпусу. Бардык укуктар корголгон.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
