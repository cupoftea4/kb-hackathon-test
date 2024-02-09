import { headers } from "next/headers";

/** Server-side analogue of usePathname hook */
export function getPathname() {
  const headersList = headers();
  // read the custom x-url header that we set in middleware.ts
  const header_url = headersList.get('x-url') ?? '';
  try {
    const pathname = new URL(header_url).pathname;
    return pathname;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

/** Server-side analogue of css media query */
export function getViewport(): 'mobile' | 'desktop' {
  const headersList = headers();
  // read the custom x-viewport header that we set in middleware.ts
  const viewport = headersList.get('x-viewport') ?? '';

  return viewport === 'mobile' ? 'mobile' : 'desktop';
}
