import React from 'react'
import NavBar from '../crossPageComponents/NavBar'
import Cookies from 'js-cookie'
import productsJSON from '../data/json/products.json'
import {motion} from 'motion/react'
import { useNavigate } from 'react-router-dom'

interface Product {
        id: number;
        name: string;
        price: number;
        rating: number;
        material: string;
        category: string;
        color: string;
        availability: string;
        image1Url: string;
        image2Url: string;
        index: number;
    }

interface Props {}

const colorMatch = [
    ["White", "bg-white text-gray-900"],
    ["Black", "bg-black text-white"],
    ["Gray", "bg-gray-400 text-gray-900"],
    ["Brown", "bg-yellow-900 text-white"],
    ["Beige", "bg-yellow-100 text-gray-900"],
    ["Blue", "bg-blue-500 text-white"],
    ["Green", "bg-green-500 text-white"],
    ["Red", "bg-red-500 text-white"],
    ["Yellow", "bg-yellow-400 text-gray-900"],
    ["Gold", "bg-yellow-500 text-gray-900"],
    ["Silver", "bg-gray-300 text-gray-900"],
    ["Natural Wood", "bg-yellow-700 text-white"],
    ["Cream", "bg-yellow-50 text-gray-900"],
    ["Pink", "bg-pink-400 text-gray-900"],
    ["Orange", "bg-orange-400 text-gray-900"]
];

function ProductCard(props: {product: Product, index: number, removeHandle: (e: Product) => void}) {

        const [materialHover, setMaterialHover] = React.useState(false);
        const [removeHover, setRemoveHover] = React.useState(false);

        return (
            <div key={props.index} className='flex flex-row justify-between items-center border-b-2 border-gray-200 p-4'>
                <div className='w-full flex flex-col place-content-center gap-2'>
                    <div className='flex flex-row gap-2 items-center'>
                        <span className='text-lg font-bold'>{props.product.name}</span>
                        <motion.div layout style={{height: 24, width: materialHover ? 'auto' : 24, borderRadius: 999}} transition={{ease: 'circOut'}} onMouseEnter={() => setMaterialHover(true)} onMouseLeave={() => setMaterialHover(false)} className={`flex place-content-center items-center px-4 py-1 border-1 border-gray-900 ${colorMatch.find((colorMatch) => colorMatch[0] === props.product.color)?.[1]} drop-shadow-sm`}>
                            {
                                materialHover && (
                                    <motion.span initial={{opacity: 0}} animate={{opacity: 1}} className='text-xs font-bold cursor-default whitespace-nowrap'>{props.product.color}, {props.product.material}</motion.span>
                                )
                            }
                        </motion.div>
                    </div>
                    <span>{props.product.price}$</span>
                </div>
                <motion.div onClick={() => props.removeHandle(props.product)} layout style={{height: 24, width: removeHover ? 'auto' : 24, borderRadius: 999}} transition={{ease: 'circOut'}} onMouseEnter={() => setRemoveHover(true)} onMouseLeave={() => setRemoveHover(false)} className={`flex place-content-center items-center px-4 py-1 border-1 border-gray-900 bg-red-500 drop-shadow-sm`}>
                    {
                        removeHover && (
                            <motion.button initial={{opacity: 0}} animate={{opacity: 1}} className='text-xs font-bold cursor-default whitespace-nowrap'>Remove</motion.button>
                        )
                    }
                </motion.div>
            </div>
        );
    }

function DeliveryOption(props: {name: string, deliveryTime: number[], price: number, selected: boolean, onSelect?: () => void}) {

    props.selected ? console.log(props.name + 'selected') : console.log(props.name + 'not selected');

    return (
        <div onClick={props.onSelect} className={`flex flex-col p-4 bg-bg-dark rounded-sm drop-shadow-sm border-1 hover:border-accent-cyan-light transition-colors cursor-default ${props.selected ? 'border-accent-cyan-light' : 'border-bg-light'}`}>
            <span className='text-lg font-semibold'>{props.name}</span>
            <span className='text-sm text-gray-600'>Delivery Time: {props.deliveryTime.join(' - ')} days</span>
            <span className='text-sm text-gray-600'>Price: {props.price}$</span>
        </div>
    );
}

function Cart(props: Props) {
    const {} = props
    const [cartVersion, setCartVersion] = React.useState(0);
    const [shippingOption, setShippingOption] = React.useState<'none' | 'standard' | 'fast'>('none');

    const navigate = useNavigate();

    React.useEffect(() => {
        console.log(shippingOption);
    }, [shippingOption]);

    const deliveryOptions = [
        {name: 'Standard Shipping', deliveryTime: [5, 7], price: 5, id: 'standard'},
        {name: 'Fast Shipping', deliveryTime: [2, 3], price: 15, id: 'fast'}
    ];

    const removeHandle = (product: Product) => {
            const current: number[] = JSON.parse(Cookies.get('cart')!);
            current.splice(current.indexOf(product.id), 1);
            Cookies.set('cart', JSON.stringify(current));
            console.log(Cookies.get('cart'));
            setCartVersion(cartVersion+1);
    }

    const getProductById = (id: number): Product | undefined => {
        const products = JSON.parse(JSON.stringify(productsJSON));
        return products.find((product: Product) => product.id === id);
    }

    const cartCookies = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];
    const cartProducts: Product[] = [];
    cartCookies.forEach((id: number) => {
        const product = getProductById(id);
        if (product) {
            cartProducts.push(product);
        }
    });

    return (
        <div className='flex flex-col h-screen bg-bg-dark overflow-clip'>
            <NavBar/>
            <div className='w-full h-full grid grid-cols-3 p-16'>
                <div id='cart' key={cartVersion} className='bg-bg-light col-span-2 mx-8 rounded-lg drop-shadow-2xl flex flex-col overflow-scroll max-h-[90%] no-scrollbar hide-scrollbar'>
                    {
                        cartProducts.map((product: Product, index) => (
                            <ProductCard product={product} key={index} index={index} removeHandle={removeHandle} />
                        ))
                    }
                </div>
                <div key={cartVersion+1} id='purchase' className='bg-bg-light mx-8 rounded-lg drop-shadow-2xl h-fit flex flex-col p-4 gap-4'>
                    <div id='price' className='flex flex-col border-b-2 border-gray-200 pb-4'>
                        <span className='text-2xl font-semibold'>Sub-Total: {cartProducts.reduce((sum, product) => sum + product.price, 0)}$</span>
                    </div>
                    <div key={cartVersion} id='shipping' className='flex flex-col border-b-2 border-gray-200 pb-4 place-content-center items-center gap-2'>
                        <span className='text-lg font-semibold'>Select Preferred Shipping Option</span>
                        {
                            deliveryOptions.map((option, index) => (
                                <div key={index} className='w-full'>
                                    <DeliveryOption name={option.name} deliveryTime={option.deliveryTime} price={option.price} selected={shippingOption === option.id as 'standard' | 'fast'} onSelect={() => {setShippingOption(option.id as 'standard' | 'fast'); setCartVersion(cartVersion + 1);}}/>
                                </div>
                            ))
                        }
                    </div>
                    <div id='total' className='flex flex-col h-full justify-between gap-2'>
                        <span className='text-2xl font-semibold'>Total: {cartProducts.reduce((sum, product) => sum + product.price, 0) + (shippingOption === 'standard' ? 5 : shippingOption === 'fast' ? 15 : 0)}$</span>
                        <span className='text-xs'>Tax Not Included</span>
                        <button onClick={() => navigate('/checkout')} className='bg-accent-cyan hover:bg-accent-cyan-light text-accent-cyan-light hover:text-bg-light border-2 border-accent-cyan-light font-bold py-2 px-4 rounded drop-shadow-sm transition-colors disabled:bg-gray-400' disabled={cartProducts.length === 0 || shippingOption === 'none'}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
