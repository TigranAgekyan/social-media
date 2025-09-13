import React from 'react'
import NavBar from '../crossPageComponents/NavBar'
import { AnimatePresence, motion } from 'motion/react'

import creditCardPNG from '../assets/paymentMethodsIcons/creditCard.png'
import paypalPNG from '../assets/paymentMethodsIcons/paypal.png'
import applePayPNG from '../assets/paymentMethodsIcons/applePay.png'
import googlePayPNG from '../assets/paymentMethodsIcons/googlePay.png'
import stripePNG from '../assets/paymentMethodsIcons/stripe.png'
import squarePNG from '../assets/paymentMethodsIcons/square.png'
import authorizeNetPNG from '../assets/paymentMethodsIcons/authorizeNet.png'
import amazonPayPNG from '../assets/paymentMethodsIcons/amazonPay.png'
import afterpayPNG from '../assets/paymentMethodsIcons/afterpay.png'
import helcimPNG from '../assets/paymentMethodsIcons/helcim.webp'


interface Props {}

interface Adress {
    street: string,
    city: string,
    state: string,
    zip: string,
    countryID: number,
}

// All countries
const country_list = [
    { name: "Afghanistan", id: 1 },
    { name: "Åland Islands", id: 2 },
    { name: "Albania", id: 3 },
    { name: "Algeria", id: 4 },
    { name: "American Samoa", id: 5 },
    { name: "Andorra", id: 6 },
    { name: "Angola", id: 7 },
    { name: "Anguilla", id: 8 },
    { name: "Antarctica", id: 9 },
    { name: "Antigua and Barbuda", id: 10 },
    { name: "Argentina", id: 11 },
    { name: "Armenia", id: 12 },
    { name: "Aruba", id: 13 },
    { name: "Australia", id: 14 },
    { name: "Austria", id: 15 },
    { name: "Azerbaijan", id: 16 },
    { name: "Bahamas", id: 17 },
    { name: "Bahrain", id: 18 },
    { name: "Bangladesh", id: 19 },
    { name: "Barbados", id: 20 },
    { name: "Belarus", id: 21 },
    { name: "Belgium", id: 22 },
    { name: "Belize", id: 23 },
    { name: "Benin", id: 24 },
    { name: "Bermuda", id: 25 },
    { name: "Bhutan", id: 26 },
    { name: "Bolivia (Plurinational State of)", id: 27 },
    { name: "Bosnia and Herzegovina", id: 28 },
    { name: "Botswana", id: 29 },
    { name: "Bouvet Island", id: 30 },
    { name: "Brazil", id: 31 },
    { name: "British Indian Ocean Territory", id: 32 },
    { name: "Brunei Darussalam", id: 33 },
    { name: "Bulgaria", id: 34 },
    { name: "Burkina Faso", id: 35 },
    { name: "Burundi", id: 36 },
    { name: "Cabo Verde", id: 37 },
    { name: "Cambodia", id: 38 },
    { name: "Cameroon", id: 39 },
    { name: "Canada", id: 40 },
    { name: "Caribbean Netherlands", id: 41 },
    { name: "Cayman Islands", id: 42 },
    { name: "Central African Republic", id: 43 },
    { name: "Chad", id: 44 },
    { name: "Chile", id: 45 },
    { name: "China", id: 46 },
    { name: "Christmas Island", id: 47 },
    { name: "Cocos (Keeling) Islands", id: 48 },
    { name: "Colombia", id: 49 },
    { name: "Comoros", id: 50 },
    { name: "Congo", id: 51 },
    { name: "Congo, Democratic Republic of the", id: 52 },
    { name: "Cook Islands", id: 53 },
    { name: "Costa Rica", id: 54 },
    { name: "Croatia", id: 55 },
    { name: "Cuba", id: 56 },
    { name: "Curaçao", id: 57 },
    { name: "Cyprus", id: 58 },
    { name: "Czech Republic", id: 59 },
    { name: "Côte d'Ivoire", id: 60 },
    { name: "Denmark", id: 61 },
    { name: "Djibouti", id: 62 },
    { name: "Dominica", id: 63 },
    { name: "Dominican Republic", id: 64 },
    { name: "Ecuador", id: 65 },
    { name: "Egypt", id: 66 },
    { name: "El Salvador", id: 67 },
    { name: "Equatorial Guinea", id: 68 },
    { name: "Eritrea", id: 69 },
    { name: "Estonia", id: 70 },
    { name: "Eswatini (Swaziland)", id: 71 },
    { name: "Ethiopia", id: 72 },
    { name: "Falkland Islands (Malvinas)", id: 73 },
    { name: "Faroe Islands", id: 74 },
    { name: "Fiji", id: 75 },
    { name: "Finland", id: 76 },
    { name: "France", id: 77 },
    { name: "French Guiana", id: 78 },
    { name: "French Polynesia", id: 79 },
    { name: "French Southern Territories", id: 80 },
    { name: "Gabon", id: 81 },
    { name: "Gambia", id: 82 },
    { name: "Georgia", id: 83 },
    { name: "Germany", id: 84 },
    { name: "Ghana", id: 85 },
    { name: "Gibraltar", id: 86 },
    { name: "Greece", id: 87 },
    { name: "Greenland", id: 88 },
    { name: "Grenada", id: 89 },
    { name: "Guadeloupe", id: 90 },
    { name: "Guam", id: 91 },
    { name: "Guatemala", id: 92 },
    { name: "Guernsey", id: 93 },
    { name: "Guinea", id: 94 },
    { name: "Guinea-Bissau", id: 95 },
    { name: "Guyana", id: 96 },
    { name: "Haiti", id: 97 },
    { name: "Heard Island and Mcdonald Islands", id: 98 },
    { name: "Honduras", id: 99 },
    { name: "Hong Kong", id: 100 },
    { name: "Hungary", id: 101 },
    { name: "Iceland", id: 102 },
    { name: "India", id: 103 },
    { name: "Indonesia", id: 104 },
    { name: "Iran", id: 105 },
    { name: "Iraq", id: 106 },
    { name: "Ireland", id: 107 },
    { name: "Isle of Man", id: 108 },
    { name: "Israel", id: 109 },
    { name: "Italy", id: 110 },
    { name: "Jamaica", id: 111 },
    { name: "Japan", id: 112 },
    { name: "Jersey", id: 113 },
    { name: "Jordan", id: 114 },
    { name: "Kazakhstan", id: 115 },
    { name: "Kenya", id: 116 },
    { name: "Kiribati", id: 117 },
    { name: "Korea, North", id: 118 },
    { name: "Korea, South", id: 119 },
    { name: "Kosovo", id: 120 },
    { name: "Kuwait", id: 121 },
    { name: "Kyrgyzstan", id: 122 },
    { name: "Lao People's Democratic Republic", id: 123 },
    { name: "Latvia", id: 124 },
    { name: "Lebanon", id: 125 },
    { name: "Lesotho", id: 126 },
    { name: "Liberia", id: 127 },
    { name: "Libya", id: 128 },
    { name: "Liechtenstein", id: 129 },
    { name: "Lithuania", id: 130 },
    { name: "Luxembourg", id: 131 },
    { name: "Macao", id: 132 },
    { name: "Macedonia North", id: 133 },
    { name: "Madagascar", id: 134 },
    { name: "Malawi", id: 135 },
    { name: "Malaysia", id: 136 },
    { name: "Maldives", id: 137 },
    { name: "Mali", id: 138 },
    { name: "Malta", id: 139 },
    { name: "Marshall Islands", id: 140 },
    { name: "Martinique", id: 141 },
    { name: "Mauritania", id: 142 },
    { name: "Mauritius", id: 143 },
    { name: "Mayotte", id: 144 },
    { name: "Mexico", id: 145 },
    { name: "Micronesia", id: 146 },
    { name: "Moldova", id: 147 },
    { name: "Monaco", id: 148 },
    { name: "Mongolia", id: 149 },
    { name: "Montenegro", id: 150 },
    { name: "Montserrat", id: 151 },
    { name: "Morocco", id: 152 },
    { name: "Mozambique", id: 153 },
    { name: "Myanmar (Burma)", id: 154 },
    { name: "Namibia", id: 155 },
    { name: "Nauru", id: 156 },
    { name: "Nepal", id: 157 },
    { name: "Netherlands", id: 158 },
    { name: "New Caledonia", id: 159 },
    { name: "New Zealand", id: 160 },
    { name: "Nicaragua", id: 161 },
    { name: "Niger", id: 162 },
    { name: "Nigeria", id: 163 },
    { name: "Niue", id: 164 },
    { name: "Norfolk Island", id: 165 },
    { name: "Northern Mariana Islands", id: 166 },
    { name: "Norway", id: 167 },
    { name: "Oman", id: 168 },
    { name: "Pakistan", id: 169 },
    { name: "Palau", id: 170 },
    { name: "Palestine", id: 171 },
    { name: "Panama", id: 172 },
    { name: "Papua New Guinea", id: 173 },
    { name: "Paraguay", id: 174 },
    { name: "Peru", id: 175 },
    { name: "Philippines", id: 176 },
    { name: "Pitcairn Islands", id: 177 },
    { name: "Poland", id: 178 },
    { name: "Portugal", id: 179 },
    { name: "Puerto Rico", id: 180 },
    { name: "Qatar", id: 181 },
    { name: "Reunion", id: 182 },
    { name: "Romania", id: 183 },
    { name: "Russian Federation", id: 184 },
    { name: "Rwanda", id: 185 },
    { name: "Saint Barthelemy", id: 186 },
    { name: "Saint Helena", id: 187 },
    { name: "Saint Kitts and Nevis", id: 188 },
    { name: "Saint Lucia", id: 189 },
    { name: "Saint Martin", id: 190 },
    { name: "Saint Pierre and Miquelon", id: 191 },
    { name: "Saint Vincent and the Grenadines", id: 192 },
    { name: "Samoa", id: 193 },
    { name: "San Marino", id: 194 },
    { name: "Sao Tome and Principe", id: 195 },
    { name: "Saudi Arabia", id: 196 },
    { name: "Senegal", id: 197 },
    { name: "Serbia", id: 198 },
    { name: "Seychelles", id: 199 },
    { name: "Sierra Leone", id: 200 },
    { name: "Singapore", id: 201 },
    { name: "Sint Maarten", id: 202 },
    { name: "Slovakia", id: 203 },
    { name: "Slovenia", id: 204 },
    { name: "Solomon Islands", id: 205 },
    { name: "Somalia", id: 206 },
    { name: "South Africa", id: 207 },
    { name: "South Georgia and the South Sandwich Islands", id: 208 },
    { name: "South Sudan", id: 209 },
    { name: "Spain", id: 210 },
    { name: "Sri Lanka", id: 211 },
    { name: "Sudan", id: 212 },
    { name: "Suriname", id: 213 },
    { name: "Svalbard and Jan Mayen", id: 214 },
    { name: "Sweden", id: 215 },
    { name: "Switzerland", id: 216 },
    { name: "Syria", id: 217 },
    { name: "Taiwan", id: 218 },
    { name: "Tajikistan", id: 219 },
    { name: "Tanzania", id: 220 },
    { name: "Thailand", id: 221 },
    { name: "Timor-Leste", id: 222 },
    { name: "Togo", id: 223 },
    { name: "Tokelau", id: 224 },
    { name: "Tonga", id: 225 },
    { name: "Trinidad and Tobago", id: 226 },
    { name: "Tunisia", id: 227 },
    { name: "Turkey (Türkiye)", id: 228 },
    { name: "Turkmenistan", id: 229 },
    { name: "Turks and Caicos Islands", id: 230 },
    { name: "Tuvalu", id: 231 },
    { name: "U.S. Outlying Islands", id: 232 },
    { name: "Uganda", id: 233 },
    { name: "Ukraine", id: 234 },
    { name: "United Arab Emirates", id: 235 },
    { name: "United Kingdom", id: 236 },
    { name: "United States", id: 237 },
    { name: "Uruguay", id: 238 },
    { name: "Uzbekistan", id: 239 },
    { name: "Vanuatu", id: 240 },
    { name: "Vatican City Holy See", id: 241 },
    { name: "Venezuela", id: 242 },
    { name: "Vietnam", id: 243 },
    { name: "Virgin Islands, British", id: 244 },
    { name: "Virgin Islands, U.S", id: 245 },
    { name: "Wallis and Futuna", id: 246 },
    { name: "Western Sahara", id: 247 },
    { name: "Yemen", id: 248 },
    { name: "Zambia", id: 249 },
    { name: "Zimbabwe", id: 250 }
];

function ProgressBar(props: {checkoutStage: number}) {
    const stage = props.checkoutStage;

    const CheckPoint = (props: {label: string, complete: boolean, index: number}) => {
        return (
            <div className='h-full aspect-square flex flex-col place-content-center items-center gap-2'>
                <div className={`rounded-full ${props.complete ? 'bg-accent-cyan-light': 'bg-zinc-400'} aspect-square h-[75%] p-2 place-content-center items-center flex`}>
                    <motion.div initial={{height: props.index < stage ? '100%' : 0}} animate={{height: props.complete ? '100%' : 0}} transition={{ease: 'circOut', duration: .5}} className='rounded-full bg-bg-light aspect-square'/>
                </div>
                <span className='font-thin fixed translate-y-9'>{props.label}</span>
            </div>
        );
    }

    return (
        <div className='w-full h-full flex place-content-center items-center justify-between'>
            <CheckPoint label='Address' complete={props.checkoutStage >= 0} index={0}/>
            <div className='h-[25%] w-full bg-zinc-400 rounded-sm overflow-clip'>
                <motion.div layout style={{width: props.checkoutStage >= 1 ? '100%' : '0%'}} transition={{ease: 'circOut', duration: 2}} className='h-full bg-accent-cyan-light'/>
            </div>
            <CheckPoint label='Billing' complete={props.checkoutStage >= 1} index={1}/>
            <div className='h-[25%] w-full bg-zinc-400 rounded-sm overflow-clip'>
                <motion.div layout style={{width: props.checkoutStage === 2 ? '100%' : '0%'}} transition={{ease: 'circOut', duration: 2}} className='h-full bg-accent-cyan-light'/>
            </div>
            <CheckPoint label='Comfirmation' complete={props.checkoutStage === 2} index={2}/>
        </div>
    );
}

function Footer(props: {buttonHandler?: (btnFunction: string) => void}) {

    return (
        <div className='w-full h-[15%] flex flex-row justify-between place-content-center items-center'>
            <button onClick={() => props.buttonHandler && props.buttonHandler('back')} className='border-1 border-red-500 hover:bg-red-500 transition-colors rounded-md px-2 py-1'>Back</button>
            <button onClick={() => props.buttonHandler && props.buttonHandler('continue')} className='border-1 border-accent-cyan-light hover:bg-accent-cyan-light transition-colors rounded-md px-2 py-1'>Continue</button>
        </div>
    );
}

function AddressScreen() {

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full h-full'>
                <form className='w-full h-full flex flex-row gap-8'>
                    <div id='addressFields' className='w-full h-[85%] grid grid-cols-2 grid-rows-3 gap-4 border-l-2 border-accent-cyan-light pl-4 pr-8 py-4'>
                        <motion.div initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0}} className='w-full flex flex-col gap-1'>
                            <label htmlFor='street' className='font-semibold'>Street Address</label>
                            <input id='street' type='text' className='w-full p-2 border-1 border-gray-300 rounded-sm'/>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0.1}} className='w-full flex flex-col gap-1'>
                            <label htmlFor='city' className='font-semibold'>City</label>
                            <input id='city' type='text' className='w-full p-2 border-1 border-gray-300 rounded-sm'/>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0.2}} className='w-full flex flex-col gap-1'>
                            <label htmlFor='state' className='font-semibold'>State/Province</label>
                            <input id='state' type='text' className='w-full p-2 border-1 border-gray-300 rounded-sm'/>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0.3}} className='w-full flex flex-col gap-1'>
                            <label htmlFor='zip' className='font-semibold'>ZIP/Postal Code</label>
                            <input id='zip' type='text' className='w-full p-2 border-1 border-gray-300 rounded-sm'/>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0.4}} className='w-full flex flex-col gap-1'>
                            <label htmlFor='country' className='font-semibold'>Country</label>
                            <select id='country' className='w-full p-2 border-1 border-gray-300 rounded-sm'>
                                {
                                    country_list.map((country) => (
                                        <option key={country.id} value={country.id}>{country.name}</option>
                                    ))
                                }
                            </select>
                        </motion.div>
                    </div>
                    <div id='personalInfo' className='w-full flex flex-col gap-4 border-l-2 border-accent-cyan-light pl-4 pr-8 py-4'>
                        <motion.div initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0}} className='w-full flex flex-col gap-1'>
                            <label htmlFor='fullName' className='font-semibold'>Full Name</label>
                            <input id='fullName' type='text' className='w-full p-2 border-1 border-gray-300 rounded-sm' />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0.1}} className='w-full flex flex-col gap-1'>
                            <label htmlFor='email' className='font-semibold'>Email</label>
                            <input id='email' type='email' className='w-full p-2 border-1 border-gray-300 rounded-sm' />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0.2}} className='w-full flex flex-col gap-1'>
                            <label htmlFor='phone' className='font-semibold'>Phone Number</label>
                            <input id='phone' type='tel' className='w-full p-2 border-1 border-gray-300 rounded-sm' />
                        </motion.div>
                    </div>
                </form>
            </div>
        </div>
    );
}

function BillingScreen() {

    const [paymentMethod, setPaymentMethod] = React.useState('none');

    const paymentMethods = [
        { name: 'Credit Card', id: 'creditCard', img: creditCardPNG },
        { name: 'PayPal', id: 'paypal', img: paypalPNG },
        { name: 'Apple Pay', id: 'applePay', img: applePayPNG },
        { name: 'Google Pay', id: 'googlePay', img: googlePayPNG },
        { name: 'Stripe', id: 'stripe', img: stripePNG },
        { name: 'Square', id: 'square', img: squarePNG },
        { name: 'Authorize.Net', id: 'authorizeNet', img: authorizeNetPNG },
        { name: 'Amazon Pay', id: 'amazonPay', img: amazonPayPNG },
        { name: 'Afterpay', id: 'afterpay', img: afterpayPNG },
        { name: 'Helcim', id: 'helcim', img: helcimPNG }
    ];

    const PaymentMethodButton = (props: {method: {name: string, id: string, img: string}}) => {

        return (
            <div className='w-full h-[10%]'>
                <button onClick={() => setPaymentMethod(props.method.id)} className={`gap-2 w-full h-full flex flex-row items-center p-2 rounded-sm border-1 border-gray-300 hover:border-accent-cyan-light ${paymentMethod === props.method.id ? 'bg-cyan-100' : ''} transition-colors`}>
                    <img src={props.method.img} alt={props.method.name} className='h-full object-contain'/>
                    <span>{props.method.name}</span>
                </button>
            </div>
        );
    }

    const CreditCardInfo = () => {
        return (
            <div className='w-full h-full flex flex-col gap-4'>
                <motion.div initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0}} className='w-full flex flex-col gap-1'>
                    <label htmlFor='cardNumber' className='font-semibold'>Card Number</label>
                    <input id='cardNumber' type='text' className='w-full p-2 border-1 border-gray-300 rounded-sm' />
                </motion.div>
                <motion.div initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0.1}} className='w-full flex flex-col gap-1'>
                    <label htmlFor='cardName' className='font-semibold'>Name on Card</label>
                    <input id='cardName' type='text' className='w-full p-2 border-1 border-gray-300 rounded-sm' />
                </motion.div>
                <motion.div initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0.2}} className='w-full flex flex-row gap-4'>
                    <div className='w-1/2 flex flex-col gap-1'>
                        <label htmlFor='expDate' className='font-semibold'>Expiration Date</label>
                        <input id='expDate' type='text' placeholder='MM/YY' className='w-full p-2 border-1 border-gray-300 rounded-sm' />
                    </div>
                    <motion.div initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0.3}} className='w-1/2 flex flex-col gap-1'>
                        <label htmlFor='cvv' className='font-semibold'>CVV</label>
                        <input id='cvv' type='text' className='w-full p-2 border-1 border-gray-300 rounded-sm' />
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    const PayPalInfo = () => {
        return (
            <div className='w-full h-full flex place-content-center items-center gap-4'>
                <motion.button initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0}} className='px-2 py-1 border-1 border-gray-300 hover:border-accent-cyan-light drop-shadow-sm hover:bg-cyan-100 transition-colors w-fit h-fit rounded-md'>Pay with PayPal</motion.button>
            </div>
        );
    }

    const ApplePayInfo = () => {
        return (
            <div className='w-full h-full flex place-content-center items-center gap-4'>
                <motion.button initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0}} className='px-2 py-1 border-1 border-gray-300 hover:border-accent-cyan-light drop-shadow-sm hover:bg-cyan-100 transition-colors w-fit h-fit rounded-md'>Pay with Apple Pay</motion.button>
            </div>
        );
    }

    const GooglePayInfo = () => {
        return (
            <div className='w-full h-full flex place-content-center items-center gap-4'>
                <motion.button initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0}} className='px-2 py-1 border-1 border-gray-300 hover:border-accent-cyan-light drop-shadow-sm hover:bg-cyan-100 transition-colors w-fit h-fit rounded-md'>Pay with Google Pay</motion.button>
            </div>
        );
    }

    const StripeInfo = () => {
        return (
            <div className='w-full h-full flex place-content-center items-center gap-4'>
                <motion.button initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0}} className='px-2 py-1 border-1 border-gray-300 hover:border-accent-cyan-light drop-shadow-sm hover:bg-cyan-100 transition-colors w-fit h-fit rounded-md'>Pay with Stripe</motion.button>
            </div>
        );
    }

    const SquareInfo = () => {
        return (
            <div className='w-full h-full flex place-content-center items-center gap-4'>
                <motion.button initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0}} className='px-2 py-1 border-1 border-gray-300 hover:border-accent-cyan-light drop-shadow-sm hover:bg-cyan-100 transition-colors w-fit h-fit rounded-md'>Pay with Square</motion.button>
            </div>
        );
    }

    const AuthorizeNetInfo = () => {
        return (
            <div className='w-full h-full flex place-content-center items-center gap-4'>
                <motion.button initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0}} className='px-2 py-1 border-1 border-gray-300 hover:border-accent-cyan-light drop-shadow-sm hover:bg-cyan-100 transition-colors w-fit h-fit rounded-md'>Pay with Authorize.Net</motion.button>
            </div>
        );
    }

    const AmazonPayInfo = () => {
        return (
            <div className='w-full h-full flex place-content-center items-center gap-4'>
                <motion.button initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0}} className='px-2 py-1 border-1 border-gray-300 hover:border-accent-cyan-light drop-shadow-sm hover:bg-cyan-100 transition-colors w-fit h-fit rounded-md'>Pay with Amazon Pay</motion.button>
            </div>
        );
    }

    const AfterPayInfo = () => {
        return (
            <div className='w-full h-full flex place-content-center items-center gap-4'>
                <motion.button initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0}} className='px-2 py-1 border-1 border-gray-300 hover:border-accent-cyan-light drop-shadow-sm hover:bg-cyan-100 transition-colors w-fit h-fit rounded-md'>Pay with Afterpay</motion.button>
            </div>
        );
    }

    const HelcimInfo = () => {
        return (
            <div className='w-full h-full flex place-content-center items-center gap-4'>
                <motion.button initial={{ opacity: 0, transform: 'translateX(10px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} transition={{delay: 0}} className='px-2 py-1 border-1 border-gray-300 hover:border-accent-cyan-light drop-shadow-sm hover:bg-cyan-100 transition-colors w-fit h-fit rounded-md'>Pay with Helcim</motion.button>
            </div>
        );
    }

    return (
        <div className='w-full h-full flex flex-row gap-8'>
            <div id='paymentOption' className='h-full w-[25%] flex flex-col gap-2 overflow-scroll hide-scrollbar'>
                {
                    paymentMethods.map((method) => (
                        <PaymentMethodButton key={method.id} method={method} />
                    ))
                }
            </div>
            <div id='paymentInfo' className='h-full w-full border-l-2 border-accent-cyan-light'>
                <div className='w-full h-[15%]'>
                    <AnimatePresence>
                        <motion.span key={paymentMethod} initial={{ opacity: 0, transform: 'translateY(-20px)' }} animate={{ opacity: 1, transform: 'translateY(0)' }} exit={{ opacity: 0, transform: 'translateY(30px)' }} transition={{ duration: .5 , ease: 'backOut'}} className='text-2xl fixed font-semibold w-full p-2'>{paymentMethods.find(x => paymentMethod === x.id)?.name}</motion.span>
                    </AnimatePresence>
                </div>
                <div className='w-full h-[85%] p-4'>
                    {paymentMethod === 'creditCard' && <CreditCardInfo />}
                    {paymentMethod === 'paypal' && <PayPalInfo />}
                    {paymentMethod === 'applePay' && <ApplePayInfo />}
                    {paymentMethod === 'googlePay' && <GooglePayInfo />}
                    {paymentMethod === 'stripe' && <StripeInfo />}
                    {paymentMethod === 'square' && <SquareInfo />}
                    {paymentMethod === 'authorizeNet' && <AuthorizeNetInfo />}
                    {paymentMethod === 'amazonPay' && <AmazonPayInfo />}
                    {paymentMethod === 'afterpay' && <AfterPayInfo />}
                    {paymentMethod === 'helcim' && <HelcimInfo />}
                    {paymentMethod === 'none' && <div className='w-full h-full flex place-content-center items-center'>Select a payment method</div>}
                </div>
            </div>
        </div>
    );
}

function ConfirmationScreen() {
    return (
        <div className='w-full h-full flex flex-col'>
            Confirmation Screen
        </div>
    );
}

function CheckOut(props: Props) {
    const [checkoutStage, setCheckoutStage] = React.useState(0);
    const [checkOutVersion, setCheckoutVersion] = React.useState(0);

    const handleFooterButtons = (btnFunction: string) => {
        if (btnFunction === 'back' && checkoutStage > 0) {
            setCheckoutStage(checkoutStage - 1);
        } else if (btnFunction === 'continue' && checkoutStage < 2) {
            setCheckoutStage(checkoutStage + 1);
        }
    }

    return (
        <div className='w-screen h-screen flex flex-col'>
            <NavBar/>
            <div className='w-full h-full bg-bg-dark p-16'>
                <div className='w-full h-full rounded-md bg-bg-light drop-shadow-2xl flex flex-col p-8 gap-8'>
                    <div id='progressBar' className=' w-full h-[20%] flex place-content-center items-center'>
                        <ProgressBar checkoutStage={checkoutStage}/>
                    </div>
                    <div id='information' className=' w-full h-[70%]'>
                        {checkoutStage === 0 && <AddressScreen key={checkOutVersion}/>}
                        {checkoutStage === 1 && <BillingScreen key={checkOutVersion}/>}
                        {checkoutStage === 2 && <ConfirmationScreen key={checkOutVersion}/>}
                    </div>
                    <div id='footer' className='w-full h-[10%]'>
                        <Footer buttonHandler={handleFooterButtons}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut
