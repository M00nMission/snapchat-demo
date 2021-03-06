import React from 'react';
import { User as UserInterface } from 'features/User/types';
import Avatar from 'common/Avatar';
import './index.scss';

const PodUser: React.FC<{
  readonly user: UserInterface;
}> = ({ user: { username, fullName, avatar } }) => (
  <article className="pod user">
    <Avatar src={avatar} size="sm" />
    <div className="meta">
      <header>{fullName}</header>
      <span>{username}</span>
    </div>
  </article>
);

export default PodUser;
