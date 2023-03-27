import { AiOutlineGithub } from 'react-icons/ai';

export default function Navbar() {
  return (
    <nav className='p-2 flex justify-between items-center'>
      <h1 className='text-2xl text-white font-semibold capitalize'>
        remix-notifier
      </h1>

      <a href='#' className='text-lg'>
        <AiOutlineGithub color='white' />
      </a>
    </nav>
  );
}
