import { HistoryItem } from "@/types/app";

const HISTORY_STORAGE_KEY = "visionmate_history";

export function loadHistory(): HistoryItem[] {
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveHistory(history: HistoryItem[]): void {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
}

export function addHistoryItem(item: HistoryItem): void {
  const history = loadHistory();
  history.unshift(item);
  saveHistory(history);
}

export function deleteHistoryItem(id: string): void {
  const history = loadHistory();
  const updated = history.filter((item) => item.id !== id);
  saveHistory(updated);
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
}
