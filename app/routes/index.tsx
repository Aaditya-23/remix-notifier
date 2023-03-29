import { Navbar, Pannel } from '~/components';
import { Popover } from '@headlessui/react';
import { AnimatePresence } from 'framer-motion';
import { HiOutlineBell } from 'react-icons/hi';
import {
  addNotification,
  clearNotifications,
  fetchNotifications,
  readNotifications,
} from '~/server/db';
import { HiLightningBolt } from 'react-icons/hi';
import { typedjson } from 'remix-typedjson';
import { useTypedLoaderData } from 'remix-typedjson';
import { json } from '@remix-run/node';
import type { ActionArgs } from '@remix-run/node';
import { actionSchema } from '~/server/schema';
import type { ShouldRevalidateFunction } from '@remix-run/react';
import { useSubmit } from '@remix-run/react';

export async function loader() {
  const data = await fetchNotifications();
  return typedjson(data);
}

export default function Index() {
  const { notifications, unreadNotificationsCount } =
    useTypedLoaderData<typeof loader>();
  const submit = useSubmit();

  function addNotification() {
    submit({ _action: 'add-notification' }, { method: 'post' });
  }

  function readNotifications(open: boolean) {
    if (!open) submit({ _action: 'read-notifications' }, { method: 'post' });
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-r from-[#8a2387] via-[#e94057] to-[#f27121]'>
      <Navbar />

      <div className='mx-auto mt-10 w-max flex gap-4'>
        <Popover className='relative'>
          {({ open }) => (
            <>
              <Popover.Button
                onClick={() => readNotifications(open)}
                className='p-1 relative bg-white rounded outline-none focus:outline-white'
              >
                <HiOutlineBell size='1.5em' />
                <span className='p-px w-5 aspect-square absolute -bottom-2 -right-3 text-xs font-semibold text-white bg-red-400 rounded-full'>
                  {unreadNotificationsCount}
                </span>
              </Popover.Button>

              <AnimatePresence mode='wait'>
                {open && <Pannel notifications={notifications} open={open} />}
              </AnimatePresence>
            </>
          )}
        </Popover>

        <button
          onClick={addNotification}
          className='group relative p-1 bg-white rounded outline-none focus:outline-white'
        >
          <HiLightningBolt size='1.5em' />
          <span className='p-2 -mt-2 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full z-10  text-xs text-white font-medium bg-black/50 text-center capitalize rounded shadow-md scale-0 group-hover:scale-100 transition-transform '>
            add notification
          </span>
        </button>
      </div>
    </div>
  );
}

export const shouldRevalidate: ShouldRevalidateFunction = ({
  defaultShouldRevalidate,
  formData,
}) => {
  const _action = formData?.get('_action');
  if (_action === 'read-notifications') {
    return false;
  }
  return defaultShouldRevalidate;
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const input = actionSchema.parse(Object.fromEntries(formData));

  if (input._action === 'add-notification') {
    await addNotification();
  } else if (input._action === 'clear-notifications') {
    await clearNotifications();
  } else if (input._action === 'read-notifications') {
    await readNotifications();
  }

  return json({ ok: true });
}

