import localFont from "next/font/local";
import Footer from "@/components/common/Footer";
import { cn } from "@/lib/utils";
import Header from "@/components/common/Header";
import MainContent from "@/components/landing/MainContent";

const mazzard = localFont({
  src: [
    {
      path: "./fonts/Mazzard/MazzardH-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Mazzard/MazzardH-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Mazzard/MazzardH-ExtraLightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/Mazzard/MazzardH-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Mazzard/MazzardH-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/Mazzard/MazzardH-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Mazzard/MazzardH-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Mazzard/MazzardH-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/Mazzard/MazzardH-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Mazzard/MazzardH-SemiBoldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/Mazzard/MazzardH-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Mazzard/MazzardH-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/Mazzard/MazzardH-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Mazzard/MazzardH-ExtraBoldItalic.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-mazzard",
});

export default function Home() {
  return (
    <div className={cn(mazzard.variable, "font-mazzard bg-white")}>
      <div className="flex justify-start items-center w-full min-h-[3000px] relative overflow-hidden gap-2.5 ">
       
        <div className="min-h-screen w-full flex flex-col items-center justify-start relative z-[1]">
          <Header />
          <MainContent />
          <Footer />
        </div>
      </div>
    </div>
  );
}
