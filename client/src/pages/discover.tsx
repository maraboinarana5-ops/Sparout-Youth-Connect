import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Star, ShieldCheck, MapPin, ArrowLeft, Filter } from "lucide-react";
import type { Master } from "@shared/schema";
import logoPath from "@assets/ChatGPT_Image_Feb_24,_2026,_08_05_48_PM_1771981595797.png";

export default function Discover() {
  const [searchTerm, setSearchTerm] = useState("");
  const [styleFilter, setStyleFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const { data: masters, isLoading } = useQuery<Master[]>({
    queryKey: ["/api/masters"],
  });

  const filtered = masters?.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.martialArts.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStyle = styleFilter === "all" || m.martialArts.includes(styleFilter);
    const price = parseFloat(m.pricePerClass);
    const matchPrice = priceFilter === "all" ||
      (priceFilter === "under40" && price < 40) ||
      (priceFilter === "40to55" && price >= 40 && price <= 55) ||
      (priceFilter === "over55" && price > 55);
    return matchSearch && matchStyle && matchPrice;
  }) || [];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <img src={logoPath} alt="Sparout" className="h-7 w-7 object-contain" />
            <h1 className="font-bold text-lg text-foreground">Discover Masters</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, style, or city..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-search"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              data-testid="button-toggle-filters"
            >
              <Filter className="h-3 w-3 mr-1" />
              Filters
            </Button>
            {styleFilter !== "all" && (
              <Badge variant="secondary" className="text-xs">
                {styleFilter}
              </Badge>
            )}
            {priceFilter !== "all" && (
              <Badge variant="secondary" className="text-xs">
                {priceFilter === "under40" ? "Under $40" : priceFilter === "40to55" ? "$40-$55" : "Over $55"}
              </Badge>
            )}
          </div>

          {showFilters && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={styleFilter} onValueChange={setStyleFilter}>
                <SelectTrigger className="w-full sm:w-48" data-testid="select-style">
                  <SelectValue placeholder="Martial Art" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Styles</SelectItem>
                  <SelectItem value="Karate">Karate</SelectItem>
                  <SelectItem value="Taekwondo">Taekwondo</SelectItem>
                  <SelectItem value="Jiu-Jitsu">Jiu-Jitsu</SelectItem>
                  <SelectItem value="Boxing">Boxing</SelectItem>
                  <SelectItem value="MMA">MMA</SelectItem>
                  <SelectItem value="Muay Thai">Muay Thai</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-full sm:w-48" data-testid="select-price">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="under40">Under $40</SelectItem>
                  <SelectItem value="40to55">$40 - $55</SelectItem>
                  <SelectItem value="over55">Over $55</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="w-20 h-20 rounded-md flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">No masters found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((master) => (
              <Link key={master.id} href={`/masters/${master.id}`}>
                <Card className="p-4 cursor-pointer hover-elevate transition-all border-card-border" data-testid={`card-master-${master.id}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                      {master.photoUrl ? (
                        <img src={master.photoUrl} alt={master.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl font-bold">
                          {master.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <h3 className="font-semibold text-foreground truncate">{master.name}</h3>
                        {master.verified && (
                          <ShieldCheck className="w-4 h-4 text-[#FF6B35] flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-2 flex-wrap">
                        {master.martialArts.map((art) => (
                          <Badge key={art} variant="secondary" className="text-xs">
                            {art}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          {master.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {master.city}, {master.state}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-foreground">${master.pricePerClass}/class</span>
                        <Button size="sm" data-testid={`button-book-${master.id}`}>Book</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
