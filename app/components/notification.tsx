import type { Notification as PrismaNotification } from '@prisma/client';
import formatDate from '~/utils/formatDate';

const userImageUrl =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';

export default function Notification(props: Props) {
  const { seen, text, createdAt } = props.notification;

  return (
    <li className='p-2 flex gap-3'>
      <span
        className={`mt-2 min-w-[0.5rem] aspect-square self-start ${
          seen ? '' : 'bg-blue-500'
        } rounded-full`}
      ></span>
      <div className='flex-grow text-xs flex flex-col gap-1 cursor-pointer'>
        <span className='font-medium first-letter:capitalize'>{text}</span>
        <span className='text-[grey]'>{formatDate(createdAt)}</span>
      </div>

      <div className='ml-auto min-w-[2.5rem] w-[2.5rem] aspect-square self-center rounded-full overflow-hidden'>
        <img src={userImageUrl} alt='person' className='w-full scale-150' />
      </div>
    </li>
  );
}

type Props = {
  notification: PrismaNotification;
};
