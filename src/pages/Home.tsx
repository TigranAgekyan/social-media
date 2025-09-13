import React from 'react'
import Logo from '../assets/Logo.png'
import LogoTextOnly from '../assets/LogoTextOnly.png'
import LogoNoText from '../assets/LogoNoText.png'
import {useNavigate} from 'react-router-dom'
import NavBar from '../crossPageComponents/NavBar'
import { motion } from 'motion/react'

interface Props {}

function Home(props: Props) {

    const navigate = useNavigate();

    return (
        <div className='w-screen h-screen bg-bg-light flex flex-col items-center'>
            <NavBar/>
            <div id='content' className='w-full h-full flex flex-row items-center justify-between p-16'>
                <div className='h-full w-1/2 flex flex-col items-start justify-center gap-4'>
                    <motion.span initial={{opacity: 0, transform: 'translateY(-10px)'}} animate={{opacity: 1, transform: 'translateY(0px)'}} transition={{duration: .75}} className='text-5xl font-bold'>Where Lasting Quality <br/> meets timeless style</motion.span>
                    <motion.span initial={{opacity: 0, transform: 'translateX(-10px)'}} animate={{opacity: 1, transform: 'translateX(0px)'}} transition={{duration: .75, delay: .25}} className='text-2xl font-light'>— welcome to TigrushDecor.</motion.span>
                    <motion.button initial={{opacity: 0, transform: 'translateY(10px)'}} animate={{opacity: 1, transform: 'translateY(0px)'}} transition={{delay: .5}} onClick={() => navigate("/shop")} className=' rounded-sm border-2 py-2 px-4 border-accent-cyan-light text-accent-cyan-light transition-colors hover:bg-accent-cyan-light hover:text-black overflow-clip whitespace-nowrap'>Start Shopping</motion.button>
                </div>
                <div className='h-full w-1/2 flex flex-col items-start justify-center gap-4'>
                    <motion.img initial={{scale: 1.25, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{duration: 1, ease: 'circOut'}} src={LogoNoText} className='pointer-events-none drop-shadow-2xl'/>
                </div>
            </div>
        </div>
    )
}

export default Home
