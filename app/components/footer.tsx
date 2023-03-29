import { useSubmit } from '@remix-run/react';

export default function Footer() {
  const submit = useSubmit();

  function clearNotifications() {
    submit(
      {
        _action: 'clear-notifications',
      },
      {
        method: 'post',
      }
    );
  }

  return (
    <footer className='px-2 flex justify-end'>
      <button
        onClick={clearNotifications}
        className='text-xs capitalize underline underline-offset-2 text-blue-500 font-medium'
      >
        clear
      </button>
    </footer>
  );
}
