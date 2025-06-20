import { useState } from "react";
import { Search, Book, Users, Database, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { NavLink, useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Текстер саны", value: "15,847", icon: Book },
    { label: "Сөздөр саны", value: "2.3M", icon: Database },
    { label: "Авторлор", value: "1,245", icon: Users },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-red-50 border-b">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Кыргыз адабий тилинин улуттук корпусу
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Кыргыз тилинин эң чоң электрондук текст коллекциясы.
              Лингвистикалык изилдөөлөр, тил үйрөнүү жана илимий иштер үчүн.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Interface */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">Издөө</TabsTrigger>
            <TabsTrigger value="browse">Корпусту карап чыгуу</TabsTrigger>
            <TabsTrigger value="results">Натыйжалар</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="mt-6">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Сөздү же фразаны киргизиңиз..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit">Издөө</Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="browse" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NavLink to="/search">
                <Card>
                  <CardHeader>
                    <CardTitle>Адабий чыгармалар</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Кыргыз адабиятынын классикалык жана заманбап чыгармалары
                    </p>
                  </CardContent>
                </Card>
              </NavLink>
              <Card>
                <CardHeader>
                  <CardTitle>Газета макалалары</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Кыргыз тилиндеги басма сөз материалдары
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Илимий эмгектер</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Илимий изилдөөлөр жана макалалар
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-6">
            <div className="text-center text-muted-foreground">
              <p>Издөө натыйжалары бул жерде көрсөтүлөт</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* About Section */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Корпус жөнүндө</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Кыргыз тилинин улуттук корпусу - бул XIX кылымдан башталып,
                  азыркы убакытка чейинки кыргыз тилиндеги текстердин чоң
                  коллекциясы. Корпуста адабий чыгармалар, газета макалалары,
                  илимий эмгектер жана башка түрдөгү текстер камтылган.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Колдонуу</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Корпус лингвистер, тилчилер, студенттер жана кыргыз тилин
                  үйрөнгөн адамдар үчүн түзүлгөн. Сиз сөздөрдү, фразаларды
                  издеп, алардын колдонулушун изилдей аласыз жана статистикалык
                  маалыматтарды ала аласыз.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-6">
        <div className="container mx-auto px-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © 2024 Кыргыз тилинин улуттук корпусу. Бардык укуктар корголгон.
            </p>
            <p className="mt-2">
              Кыргыз Республикасынын Илимдер академиясы • Тил жана адабият
              институту
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
