"use client";

import { useMemo, useState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";

type FormState = {
  name: string;
  contact: string;
  message: string;
};

const empty: FormState = {
  name: "",
  contact: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormState>(empty);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const email = siteConfig.contacts.email;

  const draft = useMemo(() => {
    return [
      `Имя: ${values.name.trim()}`,
      `Контакт: ${values.contact.trim()}`,
      "",
      values.message.trim(),
    ].join("\n");
  }, [values]);

  function validate(): boolean {
    if (!values.name.trim() || !values.contact.trim() || !values.message.trim()) {
      setError("Заполните имя, контакт и сообщение.");
      return false;
    }

    setError(null);
    return true;
  }

  async function onCopy() {
    if (!validate()) {
      return;
    }

    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
    } catch {
      setError("Не удалось скопировать. Выделите текст вручную.");
    }
  }

  function onMailto() {
    if (!validate() || !email) {
      return;
    }

    const subject = encodeURIComponent(`Запрос с сайта портфолио — ${values.name.trim()}`);
    const body = encodeURIComponent(draft);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      className="max-w-xl space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (email) {
          onMailto();
        } else {
          void onCopy();
        }
      }}
      noValidate
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Имя
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) =>
            setValues((current) => ({ ...current, name: event.target.value }))
          }
          className="mt-1 h-11 w-full border border-border bg-elevated px-3 text-foreground"
          required
        />
      </div>
      <div>
        <label htmlFor="contact" className="block text-sm font-medium">
          Email или Telegram
        </label>
        <input
          id="contact"
          name="contact"
          autoComplete="email"
          value={values.contact}
          onChange={(event) =>
            setValues((current) => ({ ...current, contact: event.target.value }))
          }
          className="mt-1 h-11 w-full border border-border bg-elevated px-3 text-foreground"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Сообщение
        </label>
        <textarea
          id="message"
          name="message"
          rows={7}
          value={values.message}
          onChange={(event) =>
            setValues((current) => ({ ...current, message: event.target.value }))
          }
          className="mt-1 w-full border border-border bg-elevated px-3 py-2 text-foreground"
          required
        />
      </div>

      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}

      {copied ? (
        <Callout title="Текст скопирован">
          Вставьте его в почту или Telegram.
        </Callout>
      ) : null}

      <div className="flex flex-wrap gap-3">
        {email ? (
          <Button type="submit">Открыть в почте</Button>
        ) : null}
        <Button
          type="button"
          variant={email ? "secondary" : "primary"}
          onClick={() => {
            void onCopy();
          }}
        >
          Скопировать текст
        </Button>
      </div>

      {!email ? (
        <p className="text-sm text-muted">
          Сообщение можно скопировать и отправить удобным каналом.
        </p>
      ) : null}
    </form>
  );
}
