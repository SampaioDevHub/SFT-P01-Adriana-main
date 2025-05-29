export function sanitizeObject<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject) as T;
  }

  if (typeof obj === 'object' && obj !== null) {
    const sanitizedObj: any = {};
    for (const key in obj) {
      const value = (obj as any)[key];

      if (value === undefined) {
        sanitizedObj[key] = ''; // Substitui apenas undefined por string vazia
      } else if (value === null) {
        sanitizedObj[key] = null; // Preserva null
      } else if (typeof value === 'object') {
        sanitizedObj[key] = sanitizeObject(value);
      } else {
        sanitizedObj[key] = value;
      }
    }
    return sanitizedObj;
  }

  return obj;
}
