import { ReactHTML, useState } from 'react'
import './Profile.css'
import Avatar from './Avatar';

type Props = {
  name: string,
  age?: number,
}

type ClickHandler = (data: Props) => void;


type ProfileProps = {
  children?: React.ReactNode,
  onClickProfile?: ClickHandler
}

function Profile({ name, age, children, onClickProfile }: Props & ProfileProps) {
  function handleClick() {
    const eventData = { name, age }
    if (onClickProfile) {
      onClickProfile(eventData);
    }
  }
  return (
    <div className='profile-card' onClick={handleClick}>
      <Avatar />
      <div>
        <p>name: {name}</p>
        <p>age: {age ? age : '年龄未知✔'}</p>
        {children}
      </div>
    </div>
  )
}
export default Profile;