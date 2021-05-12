export function loadSchemaJSON(url: string): Promise<string>
export function renderSchema(
  url: string,
  {
    printer,
    skipTitle,
  }: { printer: (value: string) => void; skipTitle: boolean }
): Promise<string>
