import { useEffect } from 'react';
import { Popover } from '@headlessui/react';
import Footer from './footer';
import Header from './header';
import { motion, useIsPresent } from 'framer-motion';
import type { Notification as NotificationType } from '@prisma/client';
import Notification from './notification';
import { useRevalidator } from '@remix-run/react';

export default function Pannel(props: PropType) {
  const { notifications, open } = props;

  const isPresent = useIsPresent();
  const revalidator = useRevalidator();

  const variants = {
    hidden: {
      scaleY: 0,
      x: '-50%',
    },
    active: {
      scaleY: 1,
    },
  };

  useEffect(() => {
    if (!isPresent && revalidator.state === 'idle') revalidator.revalidate();
  }, [isPresent, revalidator]);

  return (
    <Popover.Panel
      static
      as={motion.div}
      key={open ? 1 : 0}
      variants={variants}
      initial='hidden'
      animate='active'
      exit='hidden'
      className='mt-2 px-1 py-2 w-[80vw] absolute left-1/2 space-y-4 bg-white rounded shadow origin-top'
    >
      <Header />

      <ul className='divide-y max-h-[15rem] overflow-y-auto [&::-webkit-scrollbar]:hidden '>
        {notifications.map((notification, index) => (
          <Notification notification={notification} key={index} />
        ))}
      </ul>

      <Footer />
    </Popover.Panel>
  );
}

type PropType = {
  notifications: NotificationType[];
  open: boolean;
};
