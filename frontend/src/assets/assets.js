import appointment_img from './appointment.jpg'
import header_img from './header.jpg'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact.jpg'
import about_image from './about_image.jpg'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'

import art1 from "./hair_artist1.jpg";
import art2 from "./hair_artist2.jpg";
import art3 from "./hair_artist3.jpg";
import art4 from "./hair_artist4.jpg";
import art5 from "./hair_artist5.jpg";
import art6 from "./makeup_artist6.jpg";
import art7 from "./makeup_artist7.jpg";
import art8 from "./makeup_artist8.jpg";
import art9 from "./makeup_artist9.jpg";
import art10 from "./makeup_artist10.jpg";
import art11 from "./masage_artist11.jpg";
import art12 from "./masage_artist12.jpg";
import art13 from "./masage_artist13.jpg";
import art14 from "./masage_artist14.jpg";
import art15 from "./masage_artist15.jpg";
import art16 from "./nail_artist16.jpg";
import art17 from "./nail_artist17.jpg";
import art18 from "./nail_artist18.jpg";
import art19 from "./nail_artist19.jpg";
import art20 from "./nail_artist20.jpg";
import hair from './hair.svg';
import makeup from './make-up.svg';
import masage from './massage.svg';
import nailart from './nail-polish.svg'


export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo
}

export const specialityData = [
  {
    speciality: 'Hair stylist',
    image: hair
  },
  {
    speciality: 'Makeup artist',
    image: makeup
  },
  {
    speciality: 'Masage Therapist',
    image: masage
  },
  {
    speciality: 'Nail artist',
    image: nailart
  }
  
]

export const artists = [
  {
    _id: "art1",
    name: "Lily",
    image: art1,
    speciality: "Hair stylist",
    experience: "4 Years",
    about:
      "Lily is a professional hair stylist with over 5 years of experience in the beauty industry. She specializes in modern haircuts, hair styling, and hair care treatments. Lily is passionate about helping clients look and feel their best by creating styles that match their personality and lifestyle. She stays updated with the latest hair trends and techniques to provide high-quality service and a relaxing salon experience.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "art2",
    name: "Rubby",
    image: art2,
    speciality: "Hair stylist",
    experience: "2 Years",
    about:
      "Rubby is a professional hair stylist with over 5 years of experience in the beauty industry. She specializes in modern haircuts, hair styling, and hair care treatments. Lily is passionate about helping clients look and feel their best by creating styles that match their personality and lifestyle. She stays updated with the latest hair trends and techniques to provide high-quality service and a relaxing salon experience.",
    fees: 30,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "art3",
    name: "Diva",
    image: art3,
    speciality: "Hair stylist",
    experience: "4 Years",
    about:
      "Diva is a professional hair stylist with over 5 years of experience in the beauty industry. She specializes in modern haircuts, hair styling, and hair care treatments. Lily is passionate about helping clients look and feel their best by creating styles that match their personality and lifestyle. She stays updated with the latest hair trends and techniques to provide high-quality service and a relaxing salon experience.",
    fees: 43,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "art4",
    name: "Isha",
    image: art4,
    speciality: "Hair stylist",
    experience: "5 Years",
    about:
      "Isha is a professional hair stylist with over 5 years of experience in the beauty industry. She specializes in modern haircuts, hair styling, and hair care treatments. Lily is passionate about helping clients look and feel their best by creating styles that match their personality and lifestyle. She stays updated with the latest hair trends and techniques to provide high-quality service and a relaxing salon experience.",
    fees: 55,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "art5",
    name: "Jiya",
    image: art5,
    speciality: "Hair stylist",
    experience: "2 Years",
    about:
      "Jiya is a professional hair stylist with over 5 years of experience in the beauty industry. She specializes in modern haircuts, hair styling, and hair care treatments. Lily is passionate about helping clients look and feel their best by creating styles that match their personality and lifestyle. She stays updated with the latest hair trends and techniques to provide high-quality service and a relaxing salon experience.",
    fees: 37,
    address: {
      line1: "26th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
{
    _id: 'art6',
    name: 'Sophia',
    image: art6,
    speciality: 'Makeup artist',
    experience: '5 Years',
    about: 'Sophia is a professional makeup artist with a passion for enhancing natural beauty. She specializes in bridal, party, and fashion makeup. With great attention to detail and modern techniques, she creates flawless and long-lasting looks for every occasion. Her goal is to make every client feel confident and beautiful.', 
    fees: 65,
    address: {
         line1: '17th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
    }
},
{
    _id: 'art7',
    name: 'Emma',
    image: art7,
    speciality: 'Makeup artist',
    experience: '4 Years',
    about: 'Emma is a professional makeup artist with a passion for enhancing natural beauty. She specializes in bridal, party, and fashion makeup. With great attention to detail and modern techniques, she creates flawless and long-lasting looks for every occasion. Her goal is to make every client feel confident and beautiful.', 
    fees: 55,
    address: {
         line1: '17th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
    },
},
{
    _id: 'art8',
    name: 'Mia',
    image: art8,
    speciality: 'Makeup artist',
    experience: '3 Years',
    about: 'Mia is a professional makeup artist with a passion for enhancing natural beauty. She specializes in bridal, party, and fashion makeup. With great attention to detail and modern techniques, she creates flawless and long-lasting looks for every occasion. Her goal is to make every client feel confident and beautiful.', 
    fees: 55,
    address: {
         line1: '57th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
    },
},
{
    _id: 'art9',
    name: 'Zoe',
    image: art9,
    speciality: 'Makeup artist',
    experience: '2 Years',
    about: 'Zoe is a professional makeup artist with a passion for enhancing natural beauty. She specializes in bridal, party, and fashion makeup. With great attention to detail and modern techniques, she creates flawless and long-lasting looks for every occasion. Her goal is to make every client feel confident and beautiful.', 
    fees: 40,
    address: {
         line1: '17th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
    },
},
{
    _id: 'art10',
    name: 'Hazel',
    image: art10,
    speciality: 'Makeup artist',
    experience: '8 Years',
    about: 'Hazel is a professional makeup artist with a passion for enhancing natural beauty. She specializes in bridal, party, and fashion makeup. With great attention to detail and modern techniques, she creates flawless and long-lasting looks for every occasion. Her goal is to make every client feel confident and beautiful.', 
    fees: 75,
    address: {
         line1: '37th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
    },
},
{
    _id: 'art11',
    name: 'Elena',
    image: art11,
    speciality: 'Masage Therapist',
    experience: '7 Years',
    about: 'Elena is a professional massage therapist who helps clients relax and relieve body stress. Skilled in different massage techniques that improve blood circulation, reduce muscle pain, and promote overall wellness. Provides a calm and comfortable experience to help clients feel refreshed and rejuvenated.', 
    fees: 65,
    address: {
         line1: '15th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
    },
},
{
    _id: 'art12',
    name: 'Isla',
    image: art12,
    speciality: 'Masage Therapist',
    experience: '2 Years',
    about: 'Isla is a professional massage therapist who helps clients relax and relieve body stress. Skilled in different massage techniques that improve blood circulation, reduce muscle pain, and promote overall wellness. Provides a calm and comfortable experience to help clients feel refreshed and rejuvenated.', 
    fees: 35,
    address: {
         line1: '22th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
    },
},
{
    _id: 'art13',
    name: 'Maya',
    image: art13,
    speciality: 'Masage Therapist',
    experience: '3 Years',
    about: 'Maya is a professional massage therapist who helps clients relax and relieve body stress. Skilled in different massage techniques that improve blood circulation, reduce muscle pain, and promote overall wellness. Provides a calm and comfortable experience to help clients feel refreshed and rejuvenated.', 
    fees: 55,
    address: {
         line1: '26th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
    },
},
{
    _id: 'art14',
    name: 'Freya',
    image: art14,
    speciality: 'Masage Therapist',
    experience: '3 Years',
    about: 'Freya is a professional massage therapist who helps clients relax and relieve body stress. Skilled in different massage techniques that improve blood circulation, reduce muscle pain, and promote overall wellness. Provides a calm and comfortable experience to help clients feel refreshed and rejuvenated.', 
    fees: 55,
    address: {
         line1: '31th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
    },
},
{
    _id: 'art15',
    name: 'Nova',
    image: art15,
    speciality: 'Masage Therapist',
    experience: '6 Years',
    about: 'Nova is a professional massage therapist who helps clients relax and relieve body stress. Skilled in different massage techniques that improve blood circulation, reduce muscle pain, and promote overall wellness. Provides a calm and comfortable experience to help clients feel refreshed and rejuvenated.', 
    fees: 65,
    address: {
         line1: '42th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
    },
},
{
    _id: 'art16',
    name: 'Maiya',
    image: art16,
    speciality: 'Nail artist',
    experience: '3 Years',
    about: 'Maiya is a Passionate Nail Artist with a creative eye for detail and beauty. Skilled in nail art, gel nails, acrylic extensions, and modern nail designs. Dedicated to providing clients with stylish, long-lasting, and hygienic nail services. Always focused on the latest trends to create elegant and unique nail looks for every client.', 
    fees: 36,
    address: {
         line1: '24th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
    },
},

{
    _id: 'art17',
    name: 'Layla',
    image: art17,
    speciality: 'Nail artist',
    experience: '4 Years',
    about: 'Layla is a Passionate Nail Artist with a creative eye for detail and beauty. Skilled in nail art, gel nails, acrylic extensions, and modern nail designs. Dedicated to providing clients with stylish, long-lasting, and hygienic nail services. Always focused on the latest trends to create elegant and unique nail looks for every client.', 
    fees: 40,
    address: {
         line1: '18th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
    },
},

{
    _id: 'art18',
    name: 'Aria',
    image: art18,
    speciality: 'Nail artist',
    experience: '5 Years',
    about: 'Aria is a Passionate Nail Artist with a creative eye for detail and beauty. Skilled in nail art, gel nails, acrylic extensions, and modern nail designs. Dedicated to providing clients with stylish, long-lasting, and hygienic nail services. Always focused on the latest trends to create elegant and unique nail looks for every client.', 
    fees: 50,
    address: {
         line1: '16th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
    },
},

{
    _id: 'art19',
    name: 'Nora',
    image: art19,
    speciality: 'Nail artist',
    experience: '4 Years',
    about: 'Nora is a Passionate Nail Artist with a creative eye for detail and beauty. Skilled in nail art, gel nails, acrylic extensions, and modern nail designs. Dedicated to providing clients with stylish, long-lasting, and hygienic nail services. Always focused on the latest trends to create elegant and unique nail looks for every client.', 
    fees: 52,
    address: {
         line1: '14th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
    },
},

{
    _id: 'art20',
    name: 'Bella',
    image: art20,
    speciality: 'Nail artist',
    experience: '3 Years',
    about: 'Bella is a Passionate Nail Artist with a creative eye for detail and beauty. Skilled in nail art, gel nails, acrylic extensions, and modern nail designs. Dedicated to providing clients with stylish, long-lasting, and hygienic nail services. Always focused on the latest trends to create elegant and unique nail looks for every client.', 
    fees: 48,
    address: {
         line1: '12th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
    },
},










];
