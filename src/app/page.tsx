// src/app/page.tsx
"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactMarkdown from "react-markdown"; // <-- 1. IMPORT REACT-MARKDOWN

export default function Home() {
  const [jobTitle, setJobTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // --- INI ADALAH FUNGSI 'handleSubmit' YANG BARU ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResult("");
    setError("");

    if (!jobTitle.trim()) {
      setError("Nama jabatan tidak boleh kosong.");
      setIsLoading(false);
      return;
    }

    // --- 2. LOGIC BARU: API CALL SEBENARNYA (BUKAN SIMULASI) ---
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Kirim 'jobTitle' dari state kita ke backend
        body: JSON.stringify({ jobTitle }),
      });

      // Best Practice: Cek jika response-nya tidak OK (misal: error 500)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Gagal menghubungi server. Coba lagi."
        );
      }

      // Jika sukses, ambil data JSON
      const data = await response.json();

      // 3. Set state 'result' dengan data 'roadmap' asli dari AI
      setResult(data.roadmap);
      setJobTitle(""); // Kosongkan input
    } catch (err: any) {
      // 4. Tangani semua error (network, atau error yg kita 'throw' di atas)
      setError(err.message || "Terjadi kesalahan yang tidak diketahui.");
    } finally {
      // 5. Best Practice: SELALU matikan loading, baik sukses maupun gagal
      setIsLoading(false);
    }
    // -----------------------------------------------------
  };

  return (
    <div className="container flex flex-col items-center justify-start p-4 md:p-8 pt-16">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Mulai Rencanakan Karirmu</CardTitle>
          <CardDescription>
            Masukkan satu jabatan impianmu, dan biarkan AI kami memetakan
            jalannya untukmu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Contoh: 'Fullstack Web Developer'"
              className="py-6"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              disabled={isLoading}
            />
            <Button size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Roadmap"
              )}
            </Button>
          </form>

          {error && (
            <p className="text-destructive text-sm mt-4 text-center">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* --- 6. RENDER HASIL DENGAN REACT-MARKDOWN --- */}
      {result && (
        <Card className="w-full max-w-lg mt-8">
          <CardHeader>
            <CardTitle>Roadmap Kamu Telah Siap!</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Ganti <pre> dengan <ReactMarkdown>
                Kita tambahkan sedikit styling 'prose' agar rapi.
                'prose' adalah class dari Tailwind.
                'max-w-none' memastikan ia mengisi lebar Card.
            */}
            <article className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{result}</ReactMarkdown>
            </article>
          </CardContent>
        </Card>
      )}
    </div>
  );
}