import { db } from '~/utils/prisma.server';

export async function fetchNotifications() {
  return db.notification.findMany({
    include: {
      user: true,
    },
  });
}
