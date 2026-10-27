import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import ProfessionalProfile from './models/ProfessionalProfile.js';
import Service from './models/Service.js';
import Category from './models/Category.js';
import Booking from './models/Booking.js';
import { ROLES } from './constants/roles.js';
import { BOOKING_STATUS, PAYMENT_STATUS } from './constants/bookingStatus.js';

dotenv.config();

const categoriesData = [
  {
    name: 'Wedding Photography',
    slug: 'wedding-photography',
    professionType: ROLES.PHOTOGRAPHER,
    description: 'Breathtaking candid, traditional, and ritual coverage for weddings and pre-wedding celebrations.',
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    order: 1,
  },
  {
    name: 'Cinematic Videography',
    slug: 'cinematic-videography',
    professionType: ROLES.VIDEOGRAPHER,
    description: '4K/6K cinema camera shoots, storytelling films, wedding trailers, and music videos.',
    icon: 'Video',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    order: 2,
  },
  {
    name: 'Commercial & Brand Shoots',
    slug: 'commercial-shoots',
    professionType: ROLES.PHOTOGRAPHER,
    description: 'High-conversion product photography, lookbooks, corporate headshots, and marketing assets.',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    order: 3,
  },
  {
    name: 'Fashion & Portrait',
    slug: 'fashion-portrait',
    professionType: ROLES.PHOTOGRAPHER,
    description: 'Editorial portraits, model portfolio shoots, studio lighting, and high-fashion aesthetics.',
    icon: 'User',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    order: 4,
  },
  {
    name: 'Drone & Aerial Shoots',
    slug: 'drone-aerial',
    professionType: ROLES.VIDEOGRAPHER,
    description: 'Licensed drone pilots providing majestic aerial perspectives for real estate, events, and films.',
    icon: 'Compass',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    order: 5,
  },
  {
    name: 'Reels & Short-Form Video',
    slug: 'reels-editing',
    professionType: ROLES.EDITOR,
    description: 'Viral Instagram Reels, TikToks, and YouTube Shorts crafted with dynamic captions, sound design, and pacing.',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    order: 6,
  },
  {
    name: 'Color Grading & Post-Production',
    slug: 'color-grading',
    professionType: ROLES.EDITOR,
    description: 'Hollywood-grade DaVinci Resolve color grading, LUT creation, audio mastering, and VFX polish.',
    icon: 'Film',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    order: 7,
  },
];

const professionalsData = [
  {
    user: {
      name: 'Aarav Sharma',
      email: 'aarav.photographer@lenscraft.com',
      password: 'password123',
      role: ROLES.PHOTOGRAPHER,
      phone: '+91 98765 43210',
      avatar: {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      },
      location: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        address: 'Bandra West, Mumbai',
      },
      bio: 'Award-winning wedding and portrait photographer with over 8 years of experience capturing raw emotional milestones.',
    },
    profile: {
      professionType: ROLES.PHOTOGRAPHER,
      tagline: 'Capturing Timeless Stories in Frame & Light',
      about: 'I specialize in luxury wedding photography and emotive editorial portraits. Having covered over 200+ weddings across India and Europe, my aim is to deliver frames that make you relive those exact feelings decades later.',
      experienceYears: 8,
      specialties: ['Wedding Photography', 'Pre-Wedding', 'Candid', 'Portraits', 'Fashion'],
      equipment: ['Sony A7R V', 'Sony FX3', 'GM 24-70mm f/2.8', 'GM 85mm f/1.4', 'Profoto B10X Lights'],
      softwareSkills: ['Adobe Lightroom Classic', 'Photoshop', 'Capture One Pro'],
      startingPrice: 25000,
      priceUnit: 'per_day',
      rating: 4.9,
      reviewCount: 48,
      completedBookingsCount: 82,
      isFeatured: true,
      instagramUrl: 'https://instagram.com/lenscraft_aarav',
      portfolio: [
        {
          title: 'Royal Udaipur Heritage Wedding',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
          category: 'Wedding',
          tags: ['Wedding', 'Royal', 'Candid', 'Heritage'],
          isFeatured: true,
        },
        {
          title: 'Sunset Beach Pre-Wedding Shoot',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
          category: 'Pre-Wedding',
          tags: ['Pre-Wedding', 'Sunset', 'Romance'],
          isFeatured: true,
        },
        {
          title: 'Editorial Haute Couture Portrait',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
          category: 'Fashion',
          tags: ['Editorial', 'Studio', 'Fashion'],
          isFeatured: false,
        },
      ],
      availability: [
        { dayOfWeek: 'Monday', isAvailable: true, startTime: '09:00', endTime: '19:00' },
        { dayOfWeek: 'Tuesday', isAvailable: true, startTime: '09:00', endTime: '19:00' },
        { dayOfWeek: 'Wednesday', isAvailable: true, startTime: '09:00', endTime: '19:00' },
        { dayOfWeek: 'Thursday', isAvailable: true, startTime: '09:00', endTime: '19:00' },
        { dayOfWeek: 'Friday', isAvailable: true, startTime: '09:00', endTime: '21:00' },
        { dayOfWeek: 'Saturday', isAvailable: true, startTime: '08:00', endTime: '22:00' },
        { dayOfWeek: 'Sunday', isAvailable: true, startTime: '08:00', endTime: '22:00' },
      ],
    },
    services: [
      {
        title: 'Full Day Luxury Wedding Photography',
        category: 'Wedding Photography',
        professionType: ROLES.PHOTOGRAPHER,
        description: 'Complete 10-hour event coverage with 2 primary shooters, candid portraiture, ceremony highlights, and 300+ color-corrected high-res images.',
        price: 35000,
        pricingType: 'daily',
        deliveryDays: 14,
        inclusions: ['2 Photographers', 'All RAW & Edited Photos', 'Custom Online Gallery', 'Free Pre-Wedding Session'],
        revisionsAllowed: 3,
        coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Cinematic Couple Pre-Wedding Shoot',
        category: 'Wedding Photography',
        professionType: ROLES.PHOTOGRAPHER,
        description: '4-hour outdoor or studio shoot with 3 outfit changes, 40 finely retouched photographs, and artistic lighting setup.',
        price: 18000,
        pricingType: 'fixed',
        deliveryDays: 7,
        inclusions: ['4 Hours Shoot', '40 Retouched Images', 'Location Scouting Assistance'],
        revisionsAllowed: 2,
        coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    user: {
      name: 'Rohan Verma',
      email: 'rohan.video@lenscraft.com',
      password: 'password123',
      role: ROLES.VIDEOGRAPHER,
      phone: '+91 98111 22334',
      avatar: {
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      },
      location: {
        city: 'Bengaluru',
        state: 'Karnataka',
        country: 'India',
        address: 'Indiranagar, Bengaluru',
      },
      bio: 'Commercial film director & drone cinematographer creating high-impact visual stories for tech startups, events, and luxury brands.',
    },
    profile: {
      professionType: ROLES.VIDEOGRAPHER,
      tagline: 'Cinematic Storytelling for Visionary Brands & Events',
      about: 'Specialized in 4K/6K cinema camera workflows, licensed FPV and aerial cinematography, and high-energy music & promotional films.',
      experienceYears: 6,
      specialties: ['Commercials', 'Drone Cinematography', 'Music Videos', 'Corporate Films', 'Events'],
      equipment: ['RED Komodo 6K', 'Sony FX6', 'DJI Inspire 3 Drone', 'Ronin 4D Gimbal', 'Aputure 600d Lights'],
      softwareSkills: ['DaVinci Resolve Studio', 'Premiere Pro', 'Final Cut Pro'],
      startingPrice: 30000,
      priceUnit: 'per_day',
      rating: 5.0,
      reviewCount: 34,
      completedBookingsCount: 56,
      isFeatured: true,
      instagramUrl: 'https://instagram.com/rohanfilms',
      portfolio: [
        {
          title: 'Hyper-Car Commercial Promo',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
          category: 'Commercial',
          tags: ['Commercial', 'Automotive', 'Cinema'],
          isFeatured: true,
        },
        {
          title: 'Misty Mountains Aerial Reel',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
          category: 'Drone',
          tags: ['Drone', 'Nature', '4K'],
          isFeatured: true,
        },
      ],
      availability: [
        { dayOfWeek: 'Monday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Tuesday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Wednesday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Thursday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Friday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Saturday', isAvailable: true, startTime: '10:00', endTime: '20:00' },
      ],
    },
    services: [
      {
        title: 'Brand Commercial & Product Film (4K/6K)',
        category: 'Cinematic Videography',
        professionType: ROLES.VIDEOGRAPHER,
        description: 'Full commercial production including storyboarding, cinema cameras, pro lighting, voiceover sync, and master 60s & 30s deliverables.',
        price: 45000,
        pricingType: 'fixed',
        deliveryDays: 10,
        inclusions: ['Director + Camera Op', 'Full Lighting Kit', '4K ProRes Delivery', 'Sound Design & Royalty-Free Music'],
        revisionsAllowed: 3,
        coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    user: {
      name: 'Priya Nambiar',
      email: 'priya.editor@lenscraft.com',
      password: 'password123',
      role: ROLES.EDITOR,
      phone: '+91 97654 11223',
      avatar: {
        url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      },
      location: {
        city: 'Delhi',
        state: 'Delhi NCR',
        country: 'India',
        address: 'Hauz Khas, New Delhi',
      },
      bio: 'Master Colorist & Video Editor specializing in viral YouTube retention edits, Instagram Reels, and feature film color grading.',
    },
    profile: {
      professionType: ROLES.EDITOR,
      tagline: 'Crafting High-Retention Edits & Hollywood Color Grades',
      about: 'Over 5+ years of experience editing for top creators and brands. From pacing and sound effects to cinematic color spaces, I transform raw footage into captivating masterworks.',
      experienceYears: 5,
      specialties: ['Color Grading', 'Reels & TikToks', 'YouTube Editing', 'Sound Design', 'Motion Graphics'],
      equipment: ['Apple Mac Studio M2 Ultra', 'Reference OLED Color Monitor', 'DaVinci Resolve Mini Panel'],
      softwareSkills: ['DaVinci Resolve Studio', 'Adobe Premiere Pro', 'After Effects', 'Pro Tools'],
      startingPrice: 3000,
      priceUnit: 'per_video',
      rating: 4.95,
      reviewCount: 62,
      completedBookingsCount: 120,
      isFeatured: true,
      instagramUrl: 'https://instagram.com/priyacolorist',
      portfolio: [
        {
          title: 'Cinematic Fashion Film Color Grading',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
          category: 'Color Grading',
          tags: ['DaVinci Resolve', 'Color Grade', 'LUT'],
          isFeatured: true,
        },
      ],
      availability: [
        { dayOfWeek: 'Monday', isAvailable: true, startTime: '10:00', endTime: '20:00' },
        { dayOfWeek: 'Tuesday', isAvailable: true, startTime: '10:00', endTime: '20:00' },
        { dayOfWeek: 'Wednesday', isAvailable: true, startTime: '10:00', endTime: '20:00' },
        { dayOfWeek: 'Thursday', isAvailable: true, startTime: '10:00', endTime: '20:00' },
        { dayOfWeek: 'Friday', isAvailable: true, startTime: '10:00', endTime: '20:00' },
      ],
    },
    services: [
      {
        title: 'Pack of 5 Viral Short-Form Reels / Shorts',
        category: 'Reels & Short-Form Video',
        professionType: ROLES.EDITOR,
        description: '5 high-impact short-form videos with animated kinetic captions, sound design, jump cuts, motion graphics, and background music.',
        price: 8000,
        pricingType: 'fixed',
        deliveryDays: 4,
        inclusions: ['5 Rendered 9:16 Reels', 'Kinetic Subtitles', 'Sound FX & Mix', '2 Rounds of Revision per Video'],
        revisionsAllowed: 2,
        coverImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    user: {
      name: 'Kabir Sen',
      email: 'kabir.bhopal@lenscraft.com',
      password: 'password123',
      role: ROLES.PHOTOGRAPHER,
      phone: '+91 98260 12345',
      avatar: {
        url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      },
      location: {
        city: 'Bhopal',
        state: 'Madhya Pradesh',
        country: 'India',
        address: 'Arera Colony, Bhopal',
      },
      bio: 'Bhopal-based candid wedding and pre-wedding photographer passionate about authentic emotions, subtle lighting, and joyous family celebrations.',
    },
    profile: {
      professionType: ROLES.PHOTOGRAPHER,
      tagline: 'Soulful candid moments & authentic Bhopal wedding memories',
      about: 'Specialized in candid wedding and lifestyle portraiture across Bhopal and central India. Over 6 years of experience documenting intimate weddings and grand celebrations.',
      experienceYears: 6,
      specialties: ['Wedding Photography', 'Candid', 'Portraits', 'Pre-Wedding'],
      equipment: ['Sony A7 IV', 'Sony 35mm f/1.4 GM', 'Sony 85mm f/1.8', 'Godox V1 Flash'],
      softwareSkills: ['Adobe Lightroom Classic', 'Photoshop'],
      startingPrice: 12000,
      priceUnit: 'per_day',
      rating: 4.92,
      reviewCount: 38,
      completedBookingsCount: 64,
      isFeatured: true,
      instagramUrl: 'https://instagram.com/kabir_candid_bhopal',
      portfolio: [
        {
          title: 'Bhopal Lake View Candid Wedding',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
          category: 'Wedding',
          tags: ['Candid', 'Wedding', 'Bhopal', 'Emotions'],
          isFeatured: true,
        },
        {
          title: 'Upper Lake Sunset Pre-Wedding',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
          category: 'Pre-Wedding',
          tags: ['Pre-Wedding', 'Candid', 'Sunset'],
          isFeatured: true,
        },
      ],
      availability: [
        { dayOfWeek: 'Monday', isAvailable: true, startTime: '09:00', endTime: '20:00' },
        { dayOfWeek: 'Tuesday', isAvailable: true, startTime: '09:00', endTime: '20:00' },
        { dayOfWeek: 'Wednesday', isAvailable: true, startTime: '09:00', endTime: '20:00' },
        { dayOfWeek: 'Thursday', isAvailable: true, startTime: '09:00', endTime: '20:00' },
        { dayOfWeek: 'Friday', isAvailable: true, startTime: '09:00', endTime: '21:00' },
        { dayOfWeek: 'Saturday', isAvailable: true, startTime: '08:00', endTime: '22:00' },
        { dayOfWeek: 'Sunday', isAvailable: true, startTime: '08:00', endTime: '22:00' },
      ],
    },
    services: [
      {
        title: 'Intimate Candid Wedding Package',
        category: 'Wedding Photography',
        professionType: ROLES.PHOTOGRAPHER,
        description: 'Full day candid wedding ceremony coverage with 1 lead candid shooter, raw emotion capture, family portraits, and 150+ color-graded high-res stills.',
        price: 14000,
        pricingType: 'daily',
        deliveryDays: 10,
        inclusions: ['1 Dedicated Candid Shooter', '150+ Color-Graded Photos', 'Online Digital Gallery', 'High-Res Delivery'],
        revisionsAllowed: 2,
        coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Pre-Wedding Candid Shoot',
        category: 'Wedding Photography',
        professionType: ROLES.PHOTOGRAPHER,
        description: '3 hours relaxed couple shoot around scenic Bhopal locations with 35 retouched frames.',
        price: 9500,
        pricingType: 'fixed',
        deliveryDays: 5,
        inclusions: ['3 Hours Shoot', '35 Retouched Images', 'Location Assistance'],
        revisionsAllowed: 2,
        coverImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    user: {
      name: 'Devansh Patel',
      email: 'devansh.indore@lenscraft.com',
      password: 'password123',
      role: ROLES.PHOTOGRAPHER,
      phone: '+91 98270 54321',
      avatar: {
        url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      },
      location: {
        city: 'Indore',
        state: 'Madhya Pradesh',
        country: 'India',
        address: 'Vijay Nagar, Indore',
      },
      bio: 'Candid and documentary wedding specialist based in Indore, actively traveling across Bhopal, Ujjain, and Central India.',
    },
    profile: {
      professionType: ROLES.PHOTOGRAPHER,
      tagline: 'Documentary Wedding Stills & Candid Frames Across MP',
      about: 'Known for unobtrusive candid coverage that captures real moments as they happen without staging.',
      experienceYears: 5,
      specialties: ['Wedding Photography', 'Candid', 'Cinematic', 'Events'],
      equipment: ['Canon EOS R6 Mark II', 'Canon RF 24-70mm f/2.8', 'RF 50mm f/1.2'],
      softwareSkills: ['Lightroom', 'Photoshop'],
      startingPrice: 15000,
      priceUnit: 'per_day',
      travelsToClient: true,
      maxTravelDistanceKm: 250,
      rating: 4.86,
      reviewCount: 29,
      completedBookingsCount: 42,
      isFeatured: false,
      portfolio: [
        {
          title: 'Indore Grand Sangeet Candid Shots',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
          category: 'Wedding',
          tags: ['Candid', 'Sangeet', 'Wedding'],
          isFeatured: true,
        },
      ],
      availability: [
        { dayOfWeek: 'Monday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Tuesday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Wednesday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Thursday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Friday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Saturday', isAvailable: true, startTime: '09:00', endTime: '21:00' },
        { dayOfWeek: 'Sunday', isAvailable: true, startTime: '09:00', endTime: '21:00' },
      ],
    },
    services: [
      {
        title: 'Candid Ceremony Highlights',
        category: 'Wedding Photography',
        professionType: ROLES.PHOTOGRAPHER,
        description: 'Complete ceremony coverage with 1 lead candid shooter and delivery of 120 color-graded frames.',
        price: 15000,
        pricingType: 'daily',
        deliveryDays: 7,
        inclusions: ['1 Shooter', '120 Edited Photos', 'Travel within MP Included'],
        revisionsAllowed: 2,
        coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    user: {
      name: 'Ananya Deshmukh',
      email: 'ananya.traditional@lenscraft.com',
      password: 'password123',
      role: ROLES.PHOTOGRAPHER,
      phone: '+91 94250 88990',
      avatar: {
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      },
      location: {
        city: 'Bhopal',
        state: 'Madhya Pradesh',
        country: 'India',
        address: 'MP Nagar, Bhopal',
      },
      bio: 'Traditional and ritual wedding photographer in Bhopal with 10+ years covering royal heritage and traditional ceremonies.',
    },
    profile: {
      professionType: ROLES.PHOTOGRAPHER,
      tagline: 'Preserving Heritage Rituals & Traditional Grandeur',
      about: 'Focusing on formal stage portraits, traditional wedding rituals, and comprehensive family coverage.',
      experienceYears: 10,
      specialties: ['Traditional Wedding', 'Ritual Photography', 'Events'],
      equipment: ['Nikon Z8', 'Nikkor Z 24-70mm f/2.8 S', 'Elinchrom Studio Strobes'],
      softwareSkills: ['Photoshop', 'Lightroom'],
      startingPrice: 20000,
      priceUnit: 'per_day',
      rating: 4.75,
      reviewCount: 42,
      completedBookingsCount: 95,
      isFeatured: false,
      portfolio: [
        {
          title: 'Traditional Vedic Wedding Rituals',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
          category: 'Wedding',
          tags: ['Traditional', 'Wedding', 'Rituals'],
          isFeatured: true,
        },
      ],
      availability: [
        { dayOfWeek: 'Monday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Tuesday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Wednesday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Thursday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Friday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Saturday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Sunday', isAvailable: false }, // Closed on Sundays!
      ],
    },
    services: [
      {
        title: 'Grand Traditional Wedding Coverage',
        category: 'Wedding Photography',
        professionType: ROLES.PHOTOGRAPHER,
        description: 'Comprehensive 8-hour stage and ritual coverage with 2 photographers and printed photobook.',
        price: 22000,
        pricingType: 'daily',
        deliveryDays: 14,
        inclusions: ['2 Photographers', 'All RAW & JPEGs', 'Hardcover Photobook'],
        revisionsAllowed: 1,
        coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    user: {
      name: 'Vikramaditya Rao',
      email: 'vikram.booked@lenscraft.com',
      password: 'password123',
      role: ROLES.PHOTOGRAPHER,
      phone: '+91 98930 11223',
      avatar: {
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      },
      location: {
        city: 'Bhopal',
        state: 'Madhya Pradesh',
        country: 'India',
        address: 'Shahpura, Bhopal',
      },
      bio: 'Contemporary candid wedding photographer based in Bhopal.',
    },
    profile: {
      professionType: ROLES.PHOTOGRAPHER,
      tagline: 'Modern Candid Visuals for Nuptials in MP',
      about: 'Capturing candid wedding frames with modern cinematic grading.',
      experienceYears: 4,
      specialties: ['Candid', 'Wedding Photography', 'Pre-Wedding'],
      equipment: ['Sony A7 III', 'Sigma 24-70mm f/2.8'],
      softwareSkills: ['Lightroom'],
      startingPrice: 15000,
      priceUnit: 'per_day',
      rating: 4.8,
      reviewCount: 22,
      completedBookingsCount: 30,
      portfolio: [
        {
          title: 'Candid Joy in Bhopal Courtyard',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
          category: 'Wedding',
          tags: ['Candid', 'Wedding'],
          isFeatured: true,
        },
      ],
      availability: [
        { dayOfWeek: 'Monday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Tuesday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Wednesday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Thursday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Friday', isAvailable: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Saturday', isAvailable: true, startTime: '09:00', endTime: '20:00' },
        { dayOfWeek: 'Sunday', isAvailable: true, startTime: '09:00', endTime: '20:00' },
      ],
    },
    services: [
      {
        title: 'Essential Candid Wedding',
        category: 'Wedding Photography',
        professionType: ROLES.PHOTOGRAPHER,
        description: 'Single shooter candid wedding day coverage.',
        price: 15000,
        pricingType: 'daily',
        deliveryDays: 7,
        inclusions: ['1 Photographer', '100 Edited Photos'],
        revisionsAllowed: 1,
        coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    user: {
      name: 'Neha Kapoor',
      email: 'neha.bhopal@lenscraft.com',
      password: 'password123',
      role: ROLES.PHOTOGRAPHER,
      phone: '+91 97555 44332',
      avatar: {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      },
      location: {
        city: 'Bhopal',
        state: 'Madhya Pradesh',
        country: 'India',
        address: 'Kolar Road, Bhopal',
      },
      bio: 'Fashion and portrait photographer with creative studio setups.',
    },
    profile: {
      professionType: ROLES.PHOTOGRAPHER,
      tagline: 'High-Fashion & Studio Portraits in Bhopal',
      about: 'Editorial fashion portraits, brand lookbooks, and modeling portfolios.',
      experienceYears: 3,
      specialties: ['Fashion', 'Portraits', 'Candid'],
      equipment: ['Canon EOS R5', 'Canon 85mm f/1.4'],
      softwareSkills: ['Photoshop', 'Capture One'],
      startingPrice: 16000,
      priceUnit: 'per_day',
      rating: 4.7,
      reviewCount: 15,
      completedBookingsCount: 18,
      portfolio: [
        {
          title: 'Studio Haute Couture',
          mediaType: 'image',
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
          category: 'Fashion',
          tags: ['Fashion', 'Studio'],
          isFeatured: true,
        },
      ],
      availability: [], // EMPTY SCHEDULE: To test unverified availability handling
    },
    services: [
      {
        title: 'Editorial Portrait & Fashion Shoot',
        category: 'Fashion',
        professionType: ROLES.PHOTOGRAPHER,
        description: '4-hour fashion shoot in studio with 20 retouched editorial portraits.',
        price: 16000,
        pricingType: 'fixed',
        deliveryDays: 5,
        inclusions: ['4 Hours', '20 Retouched Images'],
        revisionsAllowed: 2,
        coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
];

const demoClientsAndAdmin = [
  {
    name: 'Admin User',
    email: 'admin@lenscraft.com',
    password: 'adminpassword123',
    role: ROLES.ADMIN,
    phone: '+91 99999 00000',
    avatar: {
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    },
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    bio: 'Platform System Administrator for LensCraft Creative Marketplace.',
    isVerified: true,
  },
  {
    name: 'Ananya Gupta',
    email: 'client@lenscraft.com',
    password: 'password123',
    role: ROLES.USER,
    phone: '+91 98888 77777',
    avatar: {
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    },
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    bio: 'Creative director & bride-to-be searching for top-tier creative talents.',
    isVerified: true,
  },
];

export const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lenscraft_db';
    console.log(`Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);
    console.log('✓ Connected to MongoDB for seeding.');

    // Clear existing collections
    await User.deleteMany({});
    await ProfessionalProfile.deleteMany({});
    await Service.deleteMany({});
    await Category.deleteMany({});
    await Booking.deleteMany({});
    console.log('✓ Cleared existing collections (Users, Profiles, Services, Categories, Bookings).');

    // 1. Seed Categories
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`✓ Inserted ${createdCategories.length} categories.`);

    // 2. Seed Admin & Demo Client
    let demoClientUser = null;
    for (const item of demoClientsAndAdmin) {
      const u = await User.create(item);
      if (item.role === ROLES.USER) {
        demoClientUser = u;
      }
    }
    console.log(`✓ Created demo admin and client users.`);

    // 3. Seed Professionals + Profiles + Services
    let vikramUser = null;
    for (const prof of professionalsData) {
      // Create user
      const user = await User.create(prof.user);

      if (user.email === 'vikram.booked@lenscraft.com') {
        vikramUser = user;
      }

      // Create professional profile
      const profileData = {
        ...prof.profile,
        user: user._id,
      };
      const createdProfile = await ProfessionalProfile.create(profileData);

      // Link profile to user
      user.professionalProfile = createdProfile._id;
      user.isVerified = true;
      await user.save();

      // Create services
      for (const s of prof.services) {
        await Service.create({
          ...s,
          professional: user._id,
        });
      }
    }

    // 4. Seed a confirmed booking for Vikramaditya Rao on 2026-11-15 to test availability exclusion
    if (vikramUser && demoClientUser) {
      const bookedDate = new Date('2026-11-15T10:00:00.000Z');
      await Booking.create({
        bookingReference: `LC-TEST-BOOKED`,
        user: demoClientUser._id,
        professional: vikramUser._id,
        eventType: 'Wedding Photography',
        eventDate: bookedDate,
        startTime: '09:00',
        endTime: '19:00',
        durationHours: 10,
        location: {
          city: 'Bhopal',
          venueName: 'Jehan Numa Palace',
          address: 'Shamla Hills, Bhopal',
        },
        totalAmount: 15000,
        advanceAmount: 4500,
        status: BOOKING_STATUS.ACCEPTED,
        paymentStatus: PAYMENT_STATUS.ADVANCE_PAID,
        notes: 'Confirmed wedding shoot booking in Bhopal for testing calendar collision.',
      });
      console.log('✓ Created confirmed test booking for Vikramaditya Rao on 2026-11-15.');
    }

    console.log(`✓ Inserted ${professionalsData.length} professional profiles and services.`);
    console.log('\n=============================================');
    console.log('🚀 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('=============================================');
    console.log('Demo Credentials:');
    console.log('• Admin: admin@lenscraft.com / adminpassword123');
    console.log('• Client: client@lenscraft.com / password123');
    console.log('• Photographer (Mumbai): aarav.photographer@lenscraft.com / password123');
    console.log('• Photographer (Bhopal Candid, ₹14k): kabir.bhopal@lenscraft.com / password123');
    console.log('• Photographer (Indore, ₹15k): devansh.indore@lenscraft.com / password123');
    console.log('• Photographer (Bhopal Traditional, ₹22k): ananya.traditional@lenscraft.com / password123');
    console.log('• Photographer (Bhopal Booked 2026-11-15): vikram.booked@lenscraft.com / password123');
    console.log('• Photographer (Bhopal Unverified Avail): neha.bhopal@lenscraft.com / password123');
    console.log('• Videographer: rohan.video@lenscraft.com / password123');
    console.log('• Video Editor: priya.editor@lenscraft.com / password123');
    console.log('=============================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('✗ Database seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
