import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentAnimeMovie from "./HomePage/RecentAnimeMovie";
import RecentAnimeSeries from "./HomePage/RecentAnimeSeries";
import RecentBanglaMovies from "./HomePage/RecentBanglaMovies";
import RecentHollywoodMovies from "./HomePage/RecentHollywoodMovies";
import RecentBollywoodMovies from "./HomePage/RecentBollywoodMovies";
import RecentKoreanMovies from "./HomePage/RecentKoreanMovies";
import RecentBanglaSeries from "./HomePage/RecentBanglaSeries";
import RecentHindiSeries from "./HomePage/RecentHindiSeries";
import RecentEnglishTVSeries from "./HomePage/RecentEnglishSeries";
import RecentKoreanTVSeries from "./HomePage/RecentKoreanSeries";

const RecentMovie = () => {
  return (
    <div className="mt-24">
      <h2 className="text-2xl font-semibold text-center my-10">
        <span className="text-red-500">Recent</span> Movie & Series
      </h2>
      <Tabs defaultValue="Anime Movie" className="container mx-auto mt-12">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 gap-2 px-2 md:px-0">
          <TabsTrigger className="border p-2" value="Anime Movie">
            Anime Movie
          </TabsTrigger>
          <TabsTrigger className="border p-2" value="Anime Series">
            Anime Series
          </TabsTrigger>
          <TabsTrigger className="border p-2" value="Bangla Movie">
            Bangla Movie
          </TabsTrigger>
          <TabsTrigger className="border p-2" value="Hollywood Movie">
            Hollywood Movie
          </TabsTrigger>
          <TabsTrigger className="border p-2" value="Bollywood Movie">
            Bollywood Movie
          </TabsTrigger>
          <TabsTrigger className="border p-2" value="Korean Movie">
            Korean Movie
          </TabsTrigger>
          <TabsTrigger className="border p-2" value="Bangla Web series">
            Bangla Web series
          </TabsTrigger>
          <TabsTrigger className="border p-2" value="Hindi Web series">
            Hindi Web series
          </TabsTrigger>
          <TabsTrigger className="border p-2" value="English TV series">
            English TV series
          </TabsTrigger>
          <TabsTrigger className="border p-2" value="Korean TV series">
            Korean TV series
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Anime Movie">
          <RecentAnimeMovie />
        </TabsContent>
        <TabsContent value="Anime Series">
          <RecentAnimeSeries />
        </TabsContent>
        <TabsContent value="Bangla Movie">
          <RecentBanglaMovies />
        </TabsContent>
        <TabsContent value="Hollywood Movie">
          <RecentHollywoodMovies />
        </TabsContent>
        <TabsContent value="Bollywood Movie">
          <RecentBollywoodMovies />
        </TabsContent>
        <TabsContent value="Korean Movie">
          <RecentKoreanMovies />
        </TabsContent>
        <TabsContent value="Bangla Web series">
          <RecentBanglaSeries />
        </TabsContent>
        <TabsContent value="Hindi Web series">
          <RecentHindiSeries />
        </TabsContent>
        <TabsContent value="English TV series">
          <RecentEnglishTVSeries />
        </TabsContent>
        <TabsContent value="Korean TV series">
          <RecentKoreanTVSeries />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecentMovie;
