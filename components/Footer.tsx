import React from 'react'
import {FaDiscord,FaTwitter,FaTelegram} from 'react-icons/fa'
import {TbNotebook} from "react-icons/tb"

const socials = [
    {
        name: 'Twitter',
        icon: <FaTwitter className='h-[20px]'/>,
        link: 'https://twitter.com/PTCToken'

    },
    {
        name: 'Discord',
        icon: <FaDiscord className='h-[20px]'/>,
        link: 'https://discord.gg/u44xB8rTyK'
    },
    {
        name: 'Telegram',
        icon: <FaTelegram className='h-[20px]'/>,
        link: 'https://t.me/PTCToken'
    },
    {
        name: 'WhitePaper',
        icon: <TbNotebook className='h-[20px]'/>,
        link: 'https://ptctoken.gitbook.io/ptc-token/'
    }
]



export default function Footer() {
  return (
    <div className='flex justify-center items-center h-16  text-white'>
        <div className='flex justify-center items-center gap-4'>
            {socials.map((social, index) => (
                <a key={index} href={social.link} target='_blank' rel='noreferrer' >
                    {social.icon}
                </a>
            ))}

        </div>
    </div>
  )
}
