import { z } from 'zod';

export const actionSchema = z.object({
  _action: z.enum(
    ['add-notification', 'read-notifications', 'clear-notifications'],
    {
      required_error: '_action is required',
    }
  ),
});

