// repair-device-brand images
import apple from './repair-widget/device-brand/apple.png'
import asus from './repair-widget/device-brand/asus.png'
import blackberry from './repair-widget/device-brand/blackberry.png'
import google from './repair-widget/device-brand/google.png'
import lg from './repair-widget/device-brand/lg.png'
import motorola from './repair-widget/device-brand/motorola.png'
import oneplus from './repair-widget/device-brand/oneplus.png'
import other from './repair-widget/device-brand/other.png'
import samsung from './repair-widget/device-brand/samsung.png'
import sony from './repair-widget/device-brand/sony.png'
import xiaomi from './repair-widget/device-brand/xiaomi.png'

// repair-device-model
import iPhoneHalf from './repair-widget/device-model/iPhone-half.png'
// import iPhoneWhole from './repair-widget/device-model/iPhone-whole.png'

// repair-quote-data
import requestQuote from './repair-widget/quote/requestQuote.png'
import thankQuote from './repair-widget/quote/thankQuote.png'

const repairWidget = {
  deviceBrand: {
    title: 'Choose Your Device Brand',
    placeholder: 'Search for your Device Brand or enter IMEI',
    mainTopic: {
      title: 'Find your device’s brand',
      content: [
        'Apple, Samsung, Huawei, Sony, etc. are examples of device brands(manufactures). If you don\'t know the brand of your device, don\'t panic!',
        'It is indicated on back of the device, on the front, or in the Settings/System/About phone section if you are on Android or Settings/Apple IDs if you are on IOS. It may also be shown on the original box and/or manual that came with your device.'
      ]
    },
    disableTopic: {
      title: 'How to find the model of your device',
      content: 'The device model is indicated in the Settings / System / About phone section or in Settings / General / Storage. It may also be shown on the original box and/or manual that came with your device.'
    },
    images: [
      { name: 'Apple', img: apple },
      { name: 'Samsung', img: samsung },
      { name: 'Google', img: google },
      { name: 'Lg', img: lg },
      { name: 'Motorola', img: motorola },
      { name: 'Asus', img: asus },
      { name: 'Sony', img: sony },
      { name: 'Oneplus', img: oneplus },
      { name: 'Blackberry', img: blackberry },
      { name: 'Xiaomi', img: xiaomi },
      { name: 'Other', img: other },
    ],
  },
  deviceModel: {
    title: 'Choose Your Device Model / Apple',
    placeholder: 'Search for your Model',
    mainTopic: {
      title: 'How to find the model of your device',
      content: [
        'The device model is indicated in the Settings / System / About phone section or in Settings / General / Storage. It may also be shown on the original box and/or manual that came with your device.',
      ]
    },
    disableTopic: { title: '', content: '' },
    images: [
      { name: 'iPhone 11 Pro Max', img: iPhoneHalf },
      { name: 'iPhone 11 Pro', img: iPhoneHalf },
      { name: 'iPhone 11', img: iPhoneHalf },
      { name: 'iPhone XS Max', img: iPhoneHalf },
      { name: 'iPhone XS', img: iPhoneHalf },
      { name: 'iPhone XR', img: iPhoneHalf },
      { name: 'iPhone X', img: iPhoneHalf },
      { name: 'iPhone SE 2020', img: iPhoneHalf },
      { name: 'iPhone 8 Plus', img: iPhoneHalf },
      { name: 'iPhone 8', img: iPhoneHalf },
      { name: 'iPhone 7 Plus', img: iPhoneHalf },
      { name: 'iPhone 7', img: iPhoneHalf },
      { name: 'iPhone 6S Plus', img: iPhoneHalf },
      { name: 'iPhone 6 Plus', img: iPhoneHalf },
    ],
  },
  deviceRepairs: {
    title: 'Choose Your Repair(s)',
    placeholder: 'What’s broken?',
    mainTopic: {
      title: 'Estimated repair time',
      content: []
    },
    types: [
      { name: 'Back Glass', bg: 'white', col: 'black', estimate: '35 minutes', selected: false },
      { name: 'Battery', bg: 'white', col: 'black', estimate: '60 minutes', selected: false },
      { name: 'Camera (Front)', bg: 'white', col: 'black', estimate: '135 minutes', selected: false },
      { name: 'Camera (Back)', bg: 'white', col: 'black', estimate: '155 minutes', selected: false },
      { name: 'Charging Port', bg: 'white', col: 'black', estimate: '275 minutes', selected: false },
      { name: 'Screen', bg: 'white', col: 'black', estimate: '55 minutes', selected: false },
    ],
  },
  repairAnotherDevice: {
    title: 'Repair Another Device?',
    mainTopic: {
      title: 'Repair another device?',
      content: 'Repair all your devices at once with us!'
    }
  },
  dropOffDevicce: {
    title: 'How Would You Like to Drop-Off Your Device(s)?',
    types: [      
      { name: 'Mail-In', bg: 'white', col: 'black', selected: false },
      { name: 'Pick-Up/ Drop-Off Service', bg: 'white', col: 'black', selected: false },
      { name: 'Curbside Drop-Off', bg: 'white', col: 'black', selected: false },
      { name: 'Outside Repair', bg: 'white', col: 'black', selected: false },
    ],
  },
  receiveQuote: {
    title: 'How Would You Like to Receive Your Quote?',
    types: [
      { name: 'Email', bg: 'white', col: 'black', selected: false },
      { name: 'Text', bg: 'white', col: 'black', selected: false },
      { name: 'Phone Call', bg: 'white', col: 'black', selected: false },
    ],
  },
  contactDetails: {
    title: 'Please Enter Your Contact Details',
    placeholder: {
      firstName: 'First Name*',
      lastName: 'Last Name*',
      emailAdd: 'E-mail Address*',
      phoneNum: 'Phone Number*',
      address1: 'Street Address*',
      address2: 'Address2*',
      country: 'Country*',
      city: 'City*',
      province: 'Province*',
      postalCode: 'Postal Code*'
    }
  },
  bookTime: {
    title: ['Select Mail-In Address', 'Schedule a Pick-Up', 'Book Your Time', 'Book Your Time' ],
    select: {
      location: {
        title: [
          'Please Select Preferred Service Location', 
          'Please Enter Your Address', 
          'Select Preferred Location', 
          'Enter Your Residential Address'
        ],
        option: ['111 Mailing Street, lqaluit NU', '555 Street, Canada'],
        mailInOption: [{name: '4160 Mailing Street, lqaluit NU', checked: true}, {name: '111 Mailing Street, lqaluit NU', checked: false}]     
      },
      time: {
        title: [
          'Please Enter Your Address for Return Shipment', 
          'Select a Pick-Up Time', 
          'Select Curbside Drop-Off Time', 
          'Select Visit Time'
        ],
        workingHours: [
          ['Monday - Friday', '9:00 a.m.-5:00 p.m.'],
          ['Saturday', '11:00 a.m.-4:00 p.m.'],
          ['Sunday', 'Closed'],
        ]
      }
    }
  },
  usefulInfo: {
    title: 'Enter a Message or Any Useful Information About This Repair',
    placeholder: 'Type your message here (optional)',
  },
  quoteData: [
    {
      img: requestQuote,
      title: 'Thank you for choosing DeviceList for your repair!',
      text: 'with a detailed service quote.'
    },
    {
      img: thankQuote,
      title: 'Thank you for choosing DeviceList for your repair!',
      text: 'with a detailed service quote and appointment information.'
    }
  ]
}

export {
  repairWidget
}