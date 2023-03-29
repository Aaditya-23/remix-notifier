import { db } from '~/utils/prisma.server';

export async function fetchNotifications() {
  const notifications = await db.notification.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const unreadNotificationsCount = await db.notification.count({
    where: { seen: false },
  });

  return { notifications, unreadNotificationsCount };
}

export async function readNotifications() {
  await db.notification.updateMany({
    where: {
      seen: false,
    },
    data: {
      seen: true,
    },
  });
}

export async function addNotification() {
  const generateRandomNumber = () =>
    Math.ceil(Math.random() * Math.random() * 100);

  const text = `Remix says ${generateRandomNumber()}, ${generateRandomNumber()}, ${generateRandomNumber()}`;

  await db.notification.create({
    data: {
      text,
    },
  });
}

export async function clearNotifications() {
  await db.notification.deleteMany();
}
