import { Navbar, Notification } from '~/components';
import { Popover } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineBell } from 'react-icons/hi';
import { BsLightningCharge } from 'react-icons/bs';
import { fetchNotifications } from '~/server/db';
import { typedjson } from 'remix-typedjson';
import { useTypedLoaderData } from 'remix-typedjson/dist/remix';

export async function loader() {
  const notifications = await fetchNotifications();

  return typedjson(notifications);
}

export default function Index() {
  const notifications = useTypedLoaderData<typeof loader>();

  const variants = {
    hidden: {
      scale: 0,
      x: '-50%',
    },
    active: {
      scale: 1,
      transformOrigin: 'center 0',
    },
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-r from-[#8a2387] via-[#e94057] to-[#f27121]'>
      <Navbar />

      <Popover className='mx-auto mt-10 w-max relative'>
        {({ open }) => (
          <>
            <Popover.Button className='p-1 bg-white rounded outline-none focus:outline-white'>
              <HiOutlineBell size='1.5em' />
            </Popover.Button>

            <AnimatePresence mode='wait'>
              {true && (
                <Popover.Panel
                  static
                  as={motion.div}
                  key={open ? 1 : 0}
                  variants={variants}
                  initial='hidden'
                  animate='active'
                  exit='hidden'
                  className='mt-2 px-1 py-2 w-[80vw] absolute left-1/2 space-y-4 bg-white rounded shadow'
                >
                  <Header />

                  <ul className='divide-y'>
                    {notifications.map((notification, index) => (
                      <Notification notification={notification} key={index} />
                    ))}
                  </ul>

                  <Footer />
                </Popover.Panel>
              )}
            </AnimatePresence>
          </>
        )}
      </Popover>
    </div>
  );
}

function Header() {
  return (
    <header className='px-2 flex justify-between items-center gap-2'>
      <h2 className='text-sm font-medium capitalize'>notifications</h2>
      <button className='group relative'>
        <BsLightningCharge />
        <span className='p-2 -mt-2 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full z-10  text-xs text-white font-medium bg-black/50 text-center capitalize rounded shadow-md scale-0 group-hover:scale-100 transition-transform '>
          add notification
        </span>
      </button>
    </header>
  );
}

function Footer() {
  return (
    <footer className='px-2 flex justify-between gap-2'>
      <button className='text-xs capitalize underline underline-offset-2 text-blue-500 font-medium'>
        load more
      </button>
      <button className='text-xs capitalize underline underline-offset-2 text-blue-500 font-medium'>
        clear
      </button>
    </footer>
  );
}

