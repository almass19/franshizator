import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, phone, business } = await req.json();

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Имя и телефон обязательны" },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
      return NextResponse.json(
        { ok: false, error: "Ошибка конфигурации сервера" },
        { status: 500 }
      );
    }

    const now = new Date().toLocaleString("ru-RU", {
      timeZone: "Asia/Almaty",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const text = [
      "📩 Новая заявка с сайта",
      "",
      `👤 Имя: ${name.trim()}`,
      `📞 Телефон: ${phone.trim()}`,
      business?.trim() ? `💼 Бизнес: ${business.trim()}` : "",
      "",
      `🕐 ${now}`,
    ]
      .filter(Boolean)
      .join("\n");

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram API error:", err);
      return NextResponse.json(
        { ok: false, error: "Не удалось отправить заявку" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Lead API error:", e);
    return NextResponse.json(
      { ok: false, error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
