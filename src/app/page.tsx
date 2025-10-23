// src/app/page.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container flex justify-center items-start p-4 md:p-8 pt-16">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Mulai Rencanakan Karirmu</CardTitle>
          <CardDescription>
            Masukkan satu jabatan impianmu, dan biarkan AI kami memetakan
            jalannya untukmu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Contoh: 'Fullstack Web Developer' atau 'Data Scientist'"
              className="py-6" // Kita buat sedikit lebih besar
            />
            <Button size="lg">Generate Roadmap</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}