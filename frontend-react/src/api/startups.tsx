import { Startup, StartupCreateInput, Filters } from "../types/startup";

const API_URL = "http://localhost:4000/api/v1";

export async function fetchStartups(
  filters: Filters = {},
  signal?: AbortSignal
): Promise<Startup[]> {
  const url = new URL(`${API_URL}/startups`);
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== "" && v !== null && v !== undefined) {
      url.searchParams.set(k, String(v))
    }
  })
  const res = await fetch(url.toString(), { signal });
  if (!res.ok) throw new Error("Failed to fetch startups");
  return await res.json();
}

export async function createStartups(
  startup: StartupCreateInput
): Promise<Startup> {
  const res = await fetch(`${API_URL}/startups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({startup})
  })
  if (!res.ok) throw new Error("failed to create new startup");

  return await res.json();
}
