type SubmitResult =
  | { ok: true; id?: string }
  | { ok: false; status?: number; error?: string }

export async function submitToFormspree(
  formId: string,
  data: Record<string, unknown>,
): Promise<SubmitResult> {
  if (!formId) return { ok: false, error: "Form ID is missing" }

  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: unknown }
      return {
        ok: false,
        status: res.status,
        error: typeof body.error === "string" ? body.error : "Submission failed",
      }
    }
    const body = (await res.json().catch(() => ({}))) as { id?: unknown }
    return { ok: true, id: typeof body.id === "string" ? body.id : undefined }
  } catch (err) {
    return { ok: false, error: (err as Error).message }
  }
}
