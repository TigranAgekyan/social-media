import React from 'react'
import NavBar from '../crossPageComponents/NavBar'
import 'rc-slider/assets/index.css'
import ProductsJSON from '../data/json/products.json'
import CubeFront from '../assets/cube-front.png'
import CubeSide from '../assets/cube-side.png'
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import {AnimatePresence, delay, motion} from 'motion/react'
import Slider from 'rc-slider';

interface Props {}

const commonFilterDivStyle = ' flex items-center gap-2 ';

interface CustomCheckBoxProps {
    label: string;
    type: "category" | "color" | "material";
    index: number;
}

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

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ label , type, index}) => {
    const [checked, setChecked] = React.useState(false);
    const checkedStyle = 'border-1 rounded-md px-2 py-1 bg-accent-cyan-light border-accent-cyan-light text-bg-light transition-colors';
    const uncheckedStyle = 'border-1 rounded-md px-2 py-1 hover:bg-accent-cyan-dark hover:border-accent-cyan-dark hover:text-bg-light transition-colors';

    React.useEffect(() => {
        setChecked(JSON.parse(Cookies.get(type === 'category' ? 'selectedCategories' : type === 'material' ? 'selectedMaterials' : 'selectedColors')!).includes(label));
    }, []);

    const modifyFilter = (cookieName: string) => {
        if(!checked){
            const current: string[] = JSON.parse(Cookies.get(cookieName)!);
            current.push(label);
            Cookies.set(cookieName, JSON.stringify(current));
            console.log(`${cookieName}: ` + Cookies.get(cookieName));
        }else{
            const current: string[] = JSON.parse(Cookies.get(cookieName)!);
            current.splice(current.indexOf(label), 1);
            Cookies.set(cookieName, JSON.stringify(current));
            console.log(Cookies.get(cookieName));
        }
    }

    const handleClickFunction = () => {
        setChecked(!checked)
        
        if(type === 'category'){
            modifyFilter('selectedCategories');
        } else if (type === 'material') {
            modifyFilter('selectedMaterials');
        } else {
            modifyFilter('selectedColors')
        }

    }

    return (
        <motion.button initial={{ opacity: 0, transform: type === 'category' ? 'translateY(-25px)' : 'translateX(-10px)' }} animate={{ opacity: 1, transform: type === 'category' ? 'translateY(0)' : 'translateX(0)' }} transition={{delay: type === 'category' ? (index * 0.05) + 1.5 : type === 'color' ? (index * 0.05) + 1 : (index * 0.05) + 1.9}} onClick={() => handleClickFunction()} className={`${checked ? checkedStyle : uncheckedStyle} whitespace-nowrap`}>{label}</motion.button>
    );
};

function FilterName() {

    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [inputValue, setInputValue] = React.useState<string>('');

    const handleChange = () => {
        if(searchTerm === ''){
            Cookies.set('userTag', '');
        } else {
            Cookies.set('userTag', searchTerm);
        }
    }

    React.useEffect(handleChange, [searchTerm]);

    return (
        <div className={commonFilterDivStyle + 'flex-col'}>
            <motion.span initial={{ opacity: 0, transform: 'translateX(-10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} className=''>Search By Name:</motion.span>
            <input placeholder='Search' className={`border-1 border-black rounded-md drop-shadow-sm text-center px-2 py-1 ${searchTerm === '' ? 'bg-bg-dark' : 'bg-accent-cyan-light text-bg-light'}`} value={inputValue} onKeyDown={(e) => {if(e.key === 'Enter') {setSearchTerm(inputValue);}}} onChange={(e) => setInputValue(e.target.value)} onFocus={() => {setSearchTerm(''); setInputValue('');}}/>
        </div>
    )
}

function FilterCategory() {

    const CategoryList = [
        { label: "Sofas & Couches" },
        { label: "Armchairs" },
        { label: "Coffee Tables" },
        { label: "Dining Tables" },
        { label: "Dining Chairs" },
        { label: "Beds" },
        { label: "Dressers" },
        { label: "Nightstands" },
        { label: "Desks" },
        { label: "Bookcases" },
        { label: "TV Stands" },
        { label: "Cabinets" },
        { label: "Benches" },
        { label: "Ottomans" },
        { label: "Wardrobes" },
        { label: "Side Tables" },
        { label: "Bar Stools" },
        { label: "Console Tables" },
        { label: "Shelving Units" },
        { label: "Recliners" }
    ];

    return (
        <div className='w-full h-[15%] flex flex-row flex-nowrap items-center gap-2 overflow-x-auto px-4 hide-scrollbar'>
            {
                CategoryList.map((category, index) => (
                    <CustomCheckBox key={index} label={category.label} type='category' index={index}/>
                ))
            }
        </div>
    )
}

function FilterPrice() {
    const [priceRange, setPriceRange] = React.useState([0, 5000]);

    React.useEffect(() => {
        setPriceRange(JSON.parse(Cookies.get('priceRange') || '[0, 5000]'));
    }, []);

    const handleOnChange = (range: number[]) => {
        setPriceRange(range);
        Cookies.set('priceRange', JSON.stringify(range));
    }

    return (
        <div className={commonFilterDivStyle + 'flex-col'}>
            <motion.span initial={{ opacity: 0, transform: 'translateX(-10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{ delay: 0.7 }} className=''>Price Range: {priceRange[0] + '$ - ' + priceRange[1] + '$'}</motion.span>
            <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: '100%' }} transition={{ delay: 0.8 }} className='w-full'>
                <Slider range min={0} max={5000} onChange={handleOnChange} value={priceRange} defaultValue={[0, 5000]}/>
            </motion.div>
        </div>
    )
}

function FilterColor() {
    
    const colorOptions = [
        { name: "White" },
        { name: "Black" },
        { name: "Gray" },
        { name: "Brown" },
        { name: "Beige" },
        { name: "Blue" },
        { name: "Green" },
        { name: "Red" },
        { name: "Yellow" },
        { name: "Gold" },
        { name: "Silver" },
        { name: "Natural Wood" },
        { name: "Cream" },
        { name: "Pink" },
        { name: "Orange" }
    ];

    return (
        <div className={commonFilterDivStyle + 'flex-row flex-wrap'}>
            <motion.span initial={{ opacity: 0, transform: 'translateX(-10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{ delay: 0.9 }} className='w-full text-center'>Colors</motion.span>
            {
                colorOptions.map((color, index) => (
                    <CustomCheckBox key={index} label={color.name} type='color' index={index}/>
                ))
            }
        </div>
    )
}

function FilterMaterial() {
    
    const materialOptions = [
        { name: "Wood" },
        { name: "Metal" },
        { name: "Glass" },
        { name: "Marble" },
        { name: "Leather" },
        { name: "Fabric" },
        { name: "Velvet" },
        { name: "Rattan" },
        { name: "Wicker" },
        { name: "Plastic" },
        { name: "Acrylic" },
        { name: "Stone" },
        { name: "Bamboo" },
        { name: "Ceramic" }
    ];

    return (
        <div className={commonFilterDivStyle + 'flex-row flex-wrap'}>
            <motion.span initial={{ opacity: 0, transform: 'translateX(-10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{ delay: 1.8 }} className='w-full text-center'>Materials</motion.span>
            {
                materialOptions.map((material, index) => (
                    <CustomCheckBox key={index} label={material.name} type='material' index={index}/>
                ))
            }
        </div>
    )
}

function SortOptions() {

    const [selectedOption, setSelectedOption] = React.useState('relevance');
    
    const sortOptions = [
        { label: "Relevance", value: "relevance" },
        { label: "Price: Low to High", value: "price-asc" },
        { label: "Price: High to Low", value: "price-desc" },
        { label: "Newest Arrivals", value: "newest" },
        { label: "Best Sellers", value: "bestsellers" },
        { label: "Customer Rating", value: "rating" },
        { label: "Name: A to Z", value: "name-asc" },
        { label: "Name: Z to A", value: "name-desc" }
    ];

    React.useEffect(() => {
        const sortOption = Cookies.get('sortOption')!;
        setSelectedOption(sortOption);
    }, []);

    const handleOnChange = (e: string) => {
        setSelectedOption(e)
        Cookies.set('sortOption', e);
    }

    return (
        <div className={commonFilterDivStyle + 'flex-col'}>
            <motion.span initial={{ opacity: 0, transform: 'translateX(-10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{ delay: 0.1 }} className=''>Sorting By</motion.span>
            <motion.select initial={{ opacity: 0, transform: 'translateX(-10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{ delay: 0.2 }} className='border-1 rounded-md p-2' value={selectedOption} onChange={(e) => handleOnChange(e.target.value)}>
                {sortOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </motion.select>
        </div>
    )
}

function Availability() {

    const availabilityList = [
        { label: "In Stock" },
        { label: "Out of Stock" },
        { label: "All" }
    ];

    const [selectedOption, setSelectedOption] = React.useState<string>(availabilityList[0].label);

    React.useEffect(() => {
        switch (Cookies.get('selectedAvailability')) {
            case 'inStock':
                setSelectedOption('In Stock');
                break;
            case 'all':
                setSelectedOption('All');
                break;
            default:
                setSelectedOption('Out of Stock');
                break;
        }
    }, []);

    const handleOnChange = (e: string) => {
        setSelectedOption(e);
        console.log(e);
        switch (e) {
            case 'In Stock':
                Cookies.set('selectedAvailability', 'inStock');
                break;
            case 'All':
                Cookies.set('selectedAvailability', 'all');
                break;
            default:
                Cookies.set('selectedAvailability', 'unavailable');
                break;
        }
        
    }

    return (
        <div className={commonFilterDivStyle + 'flex-col'}>
            <motion.span initial={{ opacity: 0, transform: 'translateX(-10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{ delay: 0.3 }} className=''>Availability</motion.span>
            <motion.select initial={{ opacity: 0, transform: 'translateX(-10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{ delay: 0.4 }} className='border-1 rounded-md p-2' value={selectedOption} onChange={(e) => handleOnChange(e.target.value)}>
                {availabilityList.map((option, index) => (
                    <option key={index} value={option.label}>
                        {option.label}
                    </option>
                ))}
            </motion.select>
        </div>
    )
}

function FilterRating() {

    const [hovered, setHovered] = React.useState(-1);
    const [selected, setSelected] = React.useState(-1);

    React.useEffect(() => {
        setSelected(JSON.parse(Cookies.get('selectedRating')!) - 1 );
    }, []);

    const handleOnClick = (i: number) => {
        if(selected === i) {
            setSelected(-1);
            Cookies.set('selectedRating', '-1');
        } else {
            setSelected(i);
            Cookies.set('selectedRating', (i + 1).toString());
        }
    }

    return (
        <div className={commonFilterDivStyle + 'flex-col'}>
            <motion.span initial={{ opacity: 0, transform: 'translateX(-10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{ delay: 0.5 }} className='w-full text-center'>Rating</motion.span>
            <div className='w-fit flex flex-row justify-center items-center gap-2' onMouseLeave={() => setHovered(-1)}>
                {
                    Array.from({ length: 5 }).map((_, i) => (
                        <motion.div initial={{ opacity: 0, transform: 'translateY(-10px)' }} animate={{ opacity: 1, transform: 'translateY(0)' }} transition={{ delay: 0.6 + (i * 0.05) }} key={i} className={`w-6 h-6 rounded-full border-1 transition-colors ${
                            (hovered !== null && i <= hovered) || ( hovered !== null && selected >= i)
                                ? 'bg-amber-300 border-amber-300'
                                : 'bg-bg-light'
                        }`} onMouseEnter={() => setHovered(i)}
                        onClick={() => handleOnClick(i)} />
                    ))
                }
            </div>
        </div>
    )
}

function FilterResetOrApply({onApply}: {onApply: () => void}) {
    const navigate = useNavigate();

    const filterReset = () => {
        Cookies.set('selectedCategories', '[]');
        Cookies.set('priceRange', '[0,5000]');
        Cookies.set('selectedColors', '[]');
        Cookies.set('selectedMaterials', '[]');
        Cookies.set('selectedRating', '-1');
        Cookies.set('selectedAvailability', 'all');
        Cookies.set('sortOption', 'relevance'); 
        window.location.reload();
    }

    return (
        <motion.div initial={{transform: 'translateY(75px)'}} animate={{transform: 'translateY(0)'}} transition={{ease: 'circIn', duration: 1, delay: 2}} className={commonFilterDivStyle + 'flex-row fixed bottom-0 left-0 bg-bg-light p-4 justify-between w-[25vw]'} style={{boxShadow: '0 -0px 8px -0px rgba(0,0,0,0.25)'}}>
            <button onClick={() => filterReset()} className='border-1 rounded-md px-2 py-1 border-rose-600 hover:bg-rose-600 hover:border-rose-600 hover:text-bg-light transition-all'>Reset All Filters</button>
            <button onClick={onApply} className='border-1 rounded-md px-2 py-1 border-accent-cyan-light hover:bg-accent-cyan-light hover:border-accent-cyan-light hover:text-bg-light transition-all'>Apply Filters</button>
        </motion.div>
    )
}

function SidePanel({onApply}: {onApply: () => void}) {
    return (
        <div className='bg-bg-light h-full w-[25%] px-8 pt-4 pb-16 flex flex-col gap-4 items-center overflow-y-auto hide-scrollbar'>
            <div className="w-full pb-4 border-b border-gray-200"><FilterName /></div>
            <div className="w-full pb-4 border-b border-gray-200"><SortOptions /></div>
            <div className="w-full pb-4 border-b border-gray-200"><Availability /></div>
            <div className="w-full pb-4 border-b border-gray-200"><FilterRating /></div>
            <div className="w-full pb-4 border-b border-gray-200"><FilterPrice /></div>
            <div className="w-full pb-4 border-b border-gray-200"><FilterColor /></div>
            <div className="w-full pb-4 border-b border-gray-200"><FilterMaterial /></div>
            <div className="w-full"><FilterResetOrApply onApply={onApply}/></div>
        </div>
    )
}

function AddToCartButton(props: { hover: boolean, product: Product }) {

    const [inCart, setInCart] = React.useState(false);

    React.useEffect(() => {
        if(Cookies.get('cart')){
            const current: number[] = JSON.parse(Cookies.get('cart')!);
            current.find((item) => item === props.product.id) && setInCart(true);
        }
    }, []);

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, product: Product) => {
        Cookies.get('cart') && Cookies.set('cart', JSON.stringify([...JSON.parse(Cookies.get('cart')!), product.id]));
        setInCart(true);
    }

    return (
        <AnimatePresence>
            {
                props.hover &&
                <motion.button onClick={(e) => handleOnClick(e, props.product)} key="modal" initial={{width: 0, opacity: 0}} animate={{width: inCart ? 64 : 128, opacity: 1}} exit={{width: 0, opacity: 0}} className={`border-1 border-amber-400 bg-accent-yellow ${inCart ? 'bg-amber-400' : 'hover:bg-amber-400'} transition-colors fixed z-1 m-2 rounded-full px-2 py-1 text-sm overflow-clip whitespace-nowrap`}>{inCart ? 'In Cart' : 'Add to Cart'}</motion.button>
            }
        </AnimatePresence>
    )
}

function ProductCard(props: Product) {

    const [hover, setHover] = React.useState<boolean>(false);

    return (
        <div className='px-2 py-2 group' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <motion.div initial={{ opacity: 0, transform: 'translateY(-10px)' }} animate={{ opacity: 1, transform: 'translateY(0)' }} transition={{ delay: props.index * 0.05, duration: .25 }} className='w-64 h-80 group bg-bg-light border-1 border-gray-300 rounded-md shadow-md flex flex-col relative overflow-clip transition-colors whitespace-nowrap hover:whitespace-break-spaces'>
                {
                    props.availability === 'unavailable' &&
                    <span className='absolute right-2 top-2 z-99 bg-rose-500 rounded-full px-2 py-1 text-sm text-bg-light pointer-events-none'>Unavailable</span>
                }
                <AddToCartButton hover={hover} product={props}/>
                <img src={hover ? props.image2Url : props.image1Url} className='z-0 drop-shadow-md'/>
                <div className='w-full h-[30%] bg-accent-bg-light z-10 bg-bg-light absolute bottom-0 left-0 flex flex-row px-2 py-1 group-hover:bg-accent-cyan-light transition-colors' style={{boxShadow: '0 -0px 16px -0px rgba(0,0,0,0.25)'}}>
                    <div className='flex flex-col gap-1'>
                        <div>
                            <motion.span  className='font-bold text-lg cursor-default'>{
                                (props.name.length > 24 && !hover) ? 
                                props.name.slice(0, 24) + '...' : props.name
                                }</motion.span>
                        </div>
                        <span className='font-light cursor-default'>${props.price.toFixed(2)}</span>
                        <div className='flex gap-1'>
                            {
                                Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className={`inline-block w-4 h-4 rounded-full ${i < props.rating ? 'bg-amber-300' : 'bg-gray-300'}`} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

function Shop(props: Props) {

    const productsString = JSON.stringify(ProductsJSON);
    const productsParsed = JSON.parse(productsString) as Product[];
    const [products, setProducts] = React.useState<Product[]>(productsParsed);
    const [filtersVersion, setFilterVersions] = React.useState(0);

    if(!Cookies.get('selectedCategories')){
            Cookies.set('selectedCategories', '[]');
            Cookies.set('priceRange', '[0,5000]');
            Cookies.set('selectedColors', '[]');
            Cookies.set('selectedMaterials', '[]');
            Cookies.set('selectedRating', '-1');
            Cookies.set('selectedAvailability', 'all');
            Cookies.set('sortOption', 'relevance');
            Cookies.set('cart', '[]');
    }

    const filteredProducts = products.filter(product => {
        if (!JSON.parse(Cookies.get('selectedCategories')!)?.includes(product.category) && Cookies.get('selectedCategories') !== '[]') return false;
        if (!JSON.parse(Cookies.get('selectedColors')!)?.includes(product.color) && Cookies.get('selectedColors') !== '[]') return false;
        if (!JSON.parse(Cookies.get('selectedMaterials')!)?.includes(product.material) && Cookies.get('selectedMaterials') !== '[]') return false;
        if (product.price < JSON.parse(Cookies.get('priceRange')!)[0] || product.price > JSON.parse(Cookies.get('priceRange')!)[1]) return false;
        if (JSON.parse(Cookies.get('selectedRating')!) > product.rating && Cookies.get('selectedRating') !== '-1') return false;
        if (Cookies.get('selectedAvailability') !== product.availability && Cookies.get('selectedAvailability') !== 'all') return false;
        if (Cookies.get('userTag') !== '' && !product.name.toLowerCase().includes(Cookies.get('userTag')?.toLowerCase()!)) return false;
        return true;
    });

    const sortedProducts = (FP: Product[]) => {
        const sortOption = Cookies.get('sortOption')!;
        switch (sortOption) {
            case 'price-asc':
                return FP.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                return FP.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                return FP.sort((a, b) => b.rating - a.rating);
                break;
            case 'name-asc':
                return FP.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                return FP.sort((a, b) => b.name.localeCompare(a.name));
            default:
                return FP;
                break;
        }
    }

    return (
        <div className='w-screen h-screen bg-bg-dark flex flex-col'>
            <NavBar/>
            <div className='h-[90%] w-full flex flex-row'>
                <SidePanel onApply={() => setFilterVersions(filtersVersion + 1)}/>
                <div className='h-full w-[75%] flex flex-col items-center'>
                    <FilterCategory />
                    <motion.div key={filtersVersion} className='w-full h-full flex flex-row flex-wrap items-center justify-center p-4 overflow-y-auto hide-scrollbar'>
                        { 
                            sortedProducts(filteredProducts).map((product, key) => (
                                <ProductCard key={key} {...product} image1Url={CubeFront} image2Url={CubeSide} index={key}/>
                            ))
                        }
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Shop
