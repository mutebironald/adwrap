'use client';
import MediaTable from "@/components/table/MediaTable";
import { useRouter } from "next/navigation";

export default function MediaTablePage() {

  const router = useRouter();
  return (
    <div className="p-8">
      <MediaTable onBack={() => router.push("/")}/>
    </div>
  );
}
