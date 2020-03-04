let idCounter = 0;
export const generateId = (): string =>
  String(new Date().getTime() + idCounter++);
