import { useState } from "react"
import './Avatar.css'

const defaultAvatarPath: string = 'https://tupian.qqw21.com/article/UploadPic/2020-9/20209821183917395.jpg'
export default function Avatar() {

  const [defaultAvatar, setDefaultAvatar] = useState(defaultAvatarPath)
  return (
    <img
        className='avatar'
        src={defaultAvatar}
        alt={defaultAvatar}
      />
  )
}