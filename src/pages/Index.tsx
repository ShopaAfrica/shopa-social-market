import { Navbar } from "@/components/Layout/Navbar";
import { HomePage } from "@/components/Home/HomePage";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HomePage />
    </div>
  );
};

export default Index;
