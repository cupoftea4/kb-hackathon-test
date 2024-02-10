import { fetchJson } from "@/utils/fetchJson"

export const fetchActions = () => {
  return fetchJson<Auction[]>('auction')
}
