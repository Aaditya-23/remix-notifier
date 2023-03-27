import { Prisma } from '@prisma/client';
import formatDate from '~/utils/formatDate';

export default function Notification(props: Props) {
  const {
    seen,
    text,
    createdAt,
    user: { userImageUrl },
  } = props.notification;

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

const notificationsWithUser = Prisma.validator<Prisma.NotificationArgs>()({
  include: {
    user: true,
  },
});

type NotificationsWithUser = Prisma.NotificationGetPayload<
  typeof notificationsWithUser
>;

type Props = {
  notification: NotificationsWithUser;
};
