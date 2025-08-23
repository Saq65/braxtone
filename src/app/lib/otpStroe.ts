type Entry = { txnId?: string; expiresAt: number };
const STORE = new Map<string, Entry>(); // key: phone
const TTL_MS = 5 * 60 * 1000;

export function saveTxn(phone: string, txnId: string | undefined) {
  STORE.set(phone, { txnId, expiresAt: Date.now() + TTL_MS });
}

export function getTxn(phone: string): string | undefined {
  const e = STORE.get(phone);
  if (!e) return undefined;
  if (Date.now() > e.expiresAt) {
    STORE.delete(phone);
    return undefined;
  }
  return e.txnId;
}

export function clear(phone: string) {
  STORE.delete(phone);
}
