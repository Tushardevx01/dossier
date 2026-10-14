import { Navbar } from "@/components/common";

export default function EngineeringNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
