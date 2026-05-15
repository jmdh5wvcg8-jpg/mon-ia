"use client";

import { useState } from "react";

export default function Home() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!message) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    const data = await res.json();

    const aiMessage = {
      role: "assistant",
      content: data.reply,
    };

    setMessages((prev) => [...prev, aiMessage]);

    setMessage("");

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900" />

      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full" />

      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full" />

      <nav className="relative z-10 flex items-center justify-between px-10 py-6 border-b border-white/10 backdrop-blur-xl">

        <h1 className="text-3xl font-bold tracking-tight">
          Mon IA ✨
        </h1>

      </nav>

      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-12">

        <div className="w-full max-w-4xl">

          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-6">

            <div className="h-[500px] overflow-y-auto bg-black/20 rounded-2xl p-6 space-y-6">

              {messages.map((msg, index) => (

                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`px-5 py-4 rounded-3xl max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-blue-600"
                        : "bg-zinc-800 border border-white/10"
                    }`}
                  >
                    {msg.content}
                  </div>

                </div>

              ))}

              {loading && (
                <div className="text-zinc-500 animate-pulse">
                  L’IA réfléchit...
                </div>
              )}

            </div>

            <div className="flex items-center gap-4 mt-6">

              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écris ton message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none backdrop-blur-xl text-white placeholder:text-zinc-500"
              />

              <button
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-500 transition-all hover:scale-105 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/30"
              >
                Envoyer
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}