
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

export function generateAvatar(seed) {

    const  avatar = createAvatar(lorelei, {
      seed,
      size: 100,
      radius: 50,
    }).toDataUri();

    return avatar;
}