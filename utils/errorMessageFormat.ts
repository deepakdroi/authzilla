export default function formatErrorMessage(obj: { [key: string]: string[] }) {
  const errorFields: string[] = [];
  const errorMessages: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    errorFields.push(key);
    errorMessages.push(value[0]);
  }

  return { errorFields, errorMessages };
}
