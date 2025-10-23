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

export default function Home() {
  // --- STATE MANAGEMENT ---
  // State untuk menyimpan nilai input
  const [jobTitle, setJobTitle] = useState("");
  // State untuk loading spinner
  const [isLoading, setIsLoading] = useState(false);
  // State untuk menyimpan hasil dari AI
  const [result, setResult] = useState("");
  // State untuk error handling
  const [error, setError] = useState("");

  // --- FORM SUBMISSION HANDLER ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 1. Mencegah halaman refresh (default behavior <form>)
    e.preventDefault();

    // 2. Reset state sebelum request baru
    setIsLoading(true);
    setResult("");
    setError("");

    // 3. Validasi input sederhana
    if (!jobTitle.trim()) {
      setError("Nama jabatan tidak boleh kosong.");
      setIsLoading(false); // Stop loading
      return; // Hentikan eksekusi
    }

    // --- INI ADALAH SIMULASI API CALL (FASE 5) ---
    // Kita pakai delay 2 detik untuk pura-pura memanggil AI
    console.log("Simulating AI call for:", jobTitle);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 4. Setelah "sukses", set hasil dummy dan matikan loading
    setResult(
      `Ini adalah roadmap dummy yang berhasil digenerate untuk: "${jobTitle}". \n\nKita akan mengganti ini dengan data AI asli di Fase 5.`
    );
    setIsLoading(false);
    setJobTitle(""); // Kosongkan input field
    // ----------------------------------------------
  };

  // --- JSX (VIEW) ---
  return (
    // Kita bungkus dengan flex-col agar hasil bisa muncul di bawah card
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
          {/* 5. Hubungkan <form> dengan handler handleSubmit 
          */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Contoh: 'Fullstack Web Developer'"
              className="py-6"
              // 6. Hubungkan Input dengan state 'jobTitle' (Controlled Component)
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              disabled={isLoading} // 7. Matikan input saat loading
            />
            <Button size="lg" disabled={isLoading}>
              {/* 8. Tampilkan spinner dan teks berbeda saat isLoading 
              */}
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

          {/* 9. Tampilkan pesan error jika ada */}
          {error && (
            <p className="text-destructive text-sm mt-4 text-center">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* 10. Tampilkan Card hasil di luar Card form, hanya jika 'result' ada 
      */}
      {result && (
        <Card className="w-full max-w-lg mt-8">
          <CardHeader>
            <CardTitle>Roadmap Kamu Telah Siap!</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Kita pakai <pre> agar format teks (new lines) terlihat
              Nantinya ini akan kita ganti dengan react-markdown 
            */}
            <pre className="whitespace-pre-wrap font-sans text-sm">
              {result}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}