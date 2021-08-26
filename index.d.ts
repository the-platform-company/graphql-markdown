export function loadSchemaJSON(url: string, options?: {headers?: Record<string, string | null>}): Promise<string>
export function renderSchema(
  url: string,
  {
    printer,
    skipTitle,
  }: { printer: (value: string) => void; skipTitle: boolean }
): Promise<string>
