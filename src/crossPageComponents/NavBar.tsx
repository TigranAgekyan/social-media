import React from 'react'
import LogoTextOnly from '../assets/LogoTextOnly.png'
import {useNavigate} from 'react-router-dom'
import { motion } from 'motion/react'
import ProductsJSON from '../data/json/products.json'
import CubeFront from '../assets/cube-front.png'
import CubeSide from '../assets/cube-side.png'

interface Props {}

interface ISearchProductCard {

}

function SearchProductCard(props: ISearchProductCard) {
    return (
        <div className='w-full h-[100%] bg-bg-light'>
            
        </div>
    )
}

function NavBar(props: Props) {

    const navigate = useNavigate();
    const location = window.location.pathname;

    return (
    <motion.div initial={location === '/shop' ? {width: '25%'}:{transform: 'translateY(-50px)'}} animate={location === '/shop' ? {width: '100%'}:{transform: 'translateY(0px)'}} transition={{duration: 1.5, ease: location === '/shop' ? 'circOut': 'circIn'}} id='nav-bar' className='h-[10%] w-full flex items-center justify-between px-4 gap-4 bg-bg-light drop-shadow-sm z-99'> 
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.1}} className='h-full w-full items-center flex justify-between'>
            <button onClick={() => navigate('/')} className='h-1/2 hover:scale-105 transition-all ease-in-out'>
                <img src={LogoTextOnly} className='h-full pointer-events-none'/>
            </button>
        </motion.div>
        <div className='h-full w-fit items-center flex justify-between gap-8 whitespace-nowrap'>
            <motion.button initial={{opacity: 0, width: 0, paddingLeft: 16, paddingRight: 16}} animate={{opacity: 1, width: 120, paddingLeft: 16, paddingRight: 16}} transition={{delay: .8, ease: 'circOut'}} onClick={() => navigate("/cart")} className=' rounded-sm bg-accent-yellow py-2 border-2 border-accent-yellow transition-colors hover:bg-bg-light hover:text-yellow-400 overflow-clip'>Go To Cart</motion.button>
            <motion.button initial={{opacity: 0, width: 0, paddingLeft: 16, paddingRight: 16}} animate={{opacity: 1, width: 160, paddingLeft: 16, paddingRight: 16}} transition={{delay: .7, ease: 'circOut'}} onClick={() => navigate("/shop")} className=' rounded-sm border-2 py-2 border-accent-cyan-light text-accent-cyan-light transition-colors hover:bg-accent-cyan-light hover:text-black overflow-clip'>Start Shopping</motion.button>
        </div>
    </motion.div>
    )
}

export default NavBar
