import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@app/models';
import { head, take } from 'ramda';

@Pipe({
  name: 'userAvatar',
})
export class UserAvatarPipe implements PipeTransform {
  transform(user: User, fallback = '') {
    return user ? take(2)(user.name.split(' ').map(head).join('')) : fallback;
  }
}
