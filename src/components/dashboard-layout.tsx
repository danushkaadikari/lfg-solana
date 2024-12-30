import AppSidebar from "@/components/app-sidebar";
import DashboardHeader from "./dashboard-header";
import { cn } from "@/lib/utils";
import Footer from "./common/Footer";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function DashboardLayout(props: Readonly<Props>) {
  return (
    
    <main
      className={cn(
        "bg-stone-900 flex flex-col w-full h-full overflow-hidden relative",
        props.className
      )}
    >
      <div className="absolute inset-0 z-0 overflow-visible min-h-full w-full">
        <img
          className="size-full object-cover object-center overflow-visible"
          src="/images/dashboard-bg.svg"
          alt="home-bg"
        />
      </div>
      <div className="w-full flex flex-col relative z-[1]">
        <DashboardHeader />
        <div className="flex w-full min-h-[calc(100vh-80px)]">
          <AppSidebar />
          <div className="flex flex-col items-center flex-1 min-h-[calc(100vh-80px)] overflow-x-hidden ">
            {props.children}
          </div>
        </div>
      </div>
      <Footer isDark />
    </main>
  );
}
