import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, phone, business, page } = await req.json();

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

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedBusiness = business?.trim() || "";
    const pageUrl = page?.trim() || "";

    // --- Telegram ---
    const text = [
      "📩 Новая заявка с сайта",
      "",
      `👤 Имя: ${trimmedName}`,
      `📞 Телефон: ${trimmedPhone}`,
      trimmedBusiness ? `💼 Бизнес: ${trimmedBusiness}` : "",
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

    // --- Email (не блокирует ответ клиенту) ---
    const emailTo = process.env.EMAIL_TO;
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (emailTo && emailUser && emailPass) {
      const html = `<h1>Вам поступила новая заявка на франшизу «Франшизатор»</h1>

<p><i>Информация, указанная посетителем сайта:</i></p>

<p><b>Имя отправителя:</b> ${trimmedName}</p>

<p><b>Номер телефона:</b> ${trimmedPhone}</p>

${trimmedBusiness ? `<p><b>Бизнес:</b> ${trimmedBusiness}</p>` : ""}

<p><i>Информация из рекламной системы:</i></p>

<p><b>Url страницы, с которого пришла заявка:</b><br><a href="${pageUrl || "https://franshizator.vercel.app"}">${pageUrl || "https://franshizator.vercel.app"}</a></p>

<p><b><i>Свяжитесь с потенциальным покупателем в течение 15 минут!</i></b></p>`;

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: emailUser, pass: emailPass },
      });

      transporter
        .sendMail({
          from: `"Франшизатор" <${emailUser}>`,
          to: emailTo,
          subject: "Заявка на франшизу «Франшизатор»",
          html,
        })
        .catch((err: unknown) => console.error("Email send error:", err));
    } else {
      console.warn("Email not configured — skipping email notification");
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
