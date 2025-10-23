// src/app/api/generate/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Constructor ini sudah benar (membutuhkan API key)
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

// --- PROMPT KITA TETAP SAMA ---
function buildPrompt(jobTitle: string) {
  return `
    Anda adalah seorang "AI Career Coach" yang ahli dan berpengalaman.
    Tugas Anda adalah membuat career roadmap yang personal, mendetail, dan actionable.

    Jabatan Impian Pengguna: "${jobTitle}"

    Buat roadmap langkah-demi-langkah untuk pengguna tersebut. 
    Ikuti struktur berikut dengan TEPAT:

    ## 🚀 Roadmap Menuju: ${jobTitle}
    [Berikan paragraf singkat yang memotivasi tentang peran ini]

    ---

    ### Fase 1: Fondasi & Keterampilan Dasar
    * **Keterampilan Teknis:** [Sebutkan 3-5 keterampilan teknis utama. Contoh: 'HTML, CSS, JavaScript', 'Statistika Dasar', 'Python']
    * **Keterampilan Non-Teknis (Soft Skills):** [Sebutkan 2-3 soft skills penting. Contoh: 'Problem Solving', 'Komunikasi']
    * **Alat (Tools):** [Sebutkan 2-3 tools yang harus dikuasai. Contoh: 'VS Code', 'Git & GitHub']

    ### Fase 2: Pembelajaran Mendalam & Spesialisasi
    * **Teknologi Inti:** [Sebutkan 3-5 teknologi inti. Contoh: 'React.js', 'Node.js/Express', 'TensorFlow/PyTorch']
    * **Konsep Lanjutan:** [Sebutkan 2-3 konsep lanjutan. Contoh: 'State Management (Redux)', 'REST API', 'Machine Learning Algorithms']
    * **Platform:** [Sebutkan platform terkait. Contoh: 'Vercel/Netlify', 'AWS/GCP', 'Kaggle']

    ### Fase 3: Membangun Portofolio
    * **Ide Proyek 1 (Mudah):** [Berikan 1 ide proyek sederhana]
    * **Ide Proyek 2 (Menengah):** [Berikan 1 ide proyek yang lebih kompleks]
    * **Ide Proyek 3 (Ahli):** [Berikan 1 ide proyek canggih yang bisa dipamerkan ke recruiter]

    ### Fase 4: Siap Kerja (Job-Ready)
    * **Membangun Jaringan:** [Berikan 2 tips networking. Contoh: 'Aktif di LinkedIn', 'Kontribusi ke project Open-Source']
    * **Persiapan Wawancara:** [Sebutkan 2 area fokus. Contoh: 'Latihan soal Algoritma (LeetCode)', 'Siapkan studi kasus portofolio']

    ---

    **Catatan Penting:** [Berikan 1-2 kalimat penutup sebagai penyemangat]
  `;
}

// --- API HANDLER ---
export async function POST(request: Request) {
  try {
    // 1. Validasi API Key
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set.");
    }

    // 2. Parse request body
    const body = await request.json();
    const { jobTitle } = body;

    // 3. Validasi input
    if (!jobTitle || typeof jobTitle !== "string") {
      return NextResponse.json(
        { error: "Invalid job title provided." },
        { status: 400 }
      );
    }

    // 4. Buat prompt
    const prompt = buildPrompt(jobTitle);

    // 5. Panggil AI (Sintaks ini sudah benar)
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // --- PERBAIKAN 3: HAPUS TANDA KURUNG () ---
    // 'result.text' adalah properti (get accessor), BUKAN fungsi.
    const text = result.text;

    // 6. Kirim hasil
    return NextResponse.json({
      roadmap: text,
    });
  } catch (error) {
    // 7. Error Handling
    console.error("Error generating roadmap:", error);
    return NextResponse.json(
      { error: "Failed to generate roadmap. Please try again." },
      { status: 500 }
    );
  }
}