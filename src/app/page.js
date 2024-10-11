import Hero from "@/components/Hero";
import RecentBlog from "@/components/HomePage/RecentBlog";
import RecentMovie from "@/components/RecentMovie";

export default function Home() {
  return (
    <div>
      <Hero />
      <RecentMovie />
      <RecentBlog />
    </div>
  );
}
