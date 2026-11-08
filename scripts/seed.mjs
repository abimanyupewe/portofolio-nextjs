// Usage: npm run seed
// Idempotent: only fills collections that are empty, never touches existing data.
import mongoose from "mongoose";

const faqs = [
  ["What do you do?", "I'm a full-stack and mobile developer who also does UI/UX design and quality assurance. I build web apps with JavaScript and Python, mobile apps with Kotlin and Dart, and I design the interfaces for them."],
  ["What are you working on right now?", "I'm a Quality Assurance intern at Jagoan Hosting (PT Beon Intermedia) in Malang, working on automated testing and manual regression testing."],
  ["Which technologies do you use?", "Frontend: React, Next.js, Tailwind CSS. Backend: Node.js, Python (Django). Mobile: Kotlin (Android) and Dart (Flutter). Design: Figma. The Tech Stack section above lists the full set."],
  ["Do you take freelance or collaboration work?", "Yes. I've done freelance UI/UX design for JobNation and built projects in hackathon teams. Send me a message with a short brief and I'll reply with whether it's a fit."],
  ["Have you worked with AI?", "Yes. At the IMPHNEN x Kolosal AI Hackathon I built the frontend of Magatra, a finance tracker that uses Gemini 2.5 Flash for receipt OCR and a sarcastic AI advisor."],
  ["What is your educational background?", "I'm studying computer science at the Institut Teknologi dan Bisnis Asia in Malang."],
  ["Can I see the code behind your projects?", "Many projects have a source link in their detail popup. Open any project card in the Projects section to find it."],
  ["How can I get in touch?", "Use the contact links in the About section, or leave a note in the Impressions section if you'd like to say hi publicly."],
].map(([question, answer], order) => ({ question, answer, order, created_at: new Date() }));

// Only organisations that appear in the existing Experience records / current position.
const companies = [
  { name: "Jagoan Hosting", industry: "Web Hosting & Cloud", description: "Quality Assurance intern: automated testing and manual regression testing.", period: "2026 - Present" },
  { name: "JobNation", industry: "Job Platform / HR Tech", description: "Freelance UI/UX designer for the job platform.", period: "Jun 2025 - Jun 2026", website: "https://jobnation.id" },
  { name: "Rakryan Digitalent Hub", industry: "Tech Education", description: "Mobile developer intern building Android apps with Kotlin.", period: "Aug 2022 - Feb 2023" },
  { name: "IMPHNEN x Kolosal AI", industry: "AI Hackathon", description: "Built the Magatra frontend with HTMX, Tailwind and DaisyUI.", period: "Nov 2025" },
].map((c) => ({ ...c, created_at: new Date() }));

await mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection.db;
for (const [name, docs] of [["faqs", faqs], ["companies", companies]]) {
  const col = db.collection(name);
  if (await col.countDocuments()) console.log(`${name}: skipped (not empty)`);
  else console.log(`${name}: inserted ${(await col.insertMany(docs)).insertedCount}`);
}
await mongoose.disconnect();
