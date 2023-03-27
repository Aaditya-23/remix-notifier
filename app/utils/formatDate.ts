export default function formatDate(date: Date) {
  const month = date.toLocaleDateString('en-us', {
    month: 'short',
  });

  const numericDate = date.getDate();
  const year = date.getFullYear();

  return `${month} ${numericDate}, ${year}`;
}
