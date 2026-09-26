import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MOCK_PROFESSIONALS,
  MOCK_BOOKINGS,
  MOCK_REVIEWS,
  MOCK_STATS,
} from '../constants/mockData';
import { CREATIVE_CATEGORIES } from '../constants/categories';
import { messageService } from '../services/messageService';

export const PlatformContext = createContext(null);

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};

const STORAGE_KEYS = {
  BOOKINGS: 'lenscraft_platform_bookings',
  PROFESSIONALS: 'lenscraft_platform_professionals',
  REVIEWS: 'lenscraft_platform_reviews',
  WISHLIST: 'lenscraft_platform_wishlist',
  CATEGORIES: 'lenscraft_platform_categories',
  USERS: 'lenscraft_platform_users',
  PRICING: 'lenscraft_platform_pricing',
  AVAILABILITY: 'lenscraft_platform_availability',
  CONVERSATIONS: 'lenscraft_platform_conversations',
};

export const PlatformProvider = ({ children }) => {
  // 1. Initial State with LocalStorage Fallback
  const [professionals, setProfessionals] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFESSIONALS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= MOCK_PROFESSIONALS.length) {
          return parsed;
        }
      }
      return MOCK_PROFESSIONALS;
    } catch {
      return MOCK_PROFESSIONALS;
    }
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : MOCK_BOOKINGS;
    } catch {
      return MOCK_BOOKINGS;
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : MOCK_REVIEWS;
    } catch {
      return MOCK_REVIEWS;
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['pro-1', 'pro-2'];
    } catch {
      return ['pro-1', 'pro-2'];
    }
  });

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : CREATIVE_CATEGORIES;
    } catch {
      return CREATIVE_CATEGORIES;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved
        ? JSON.parse(saved)
        : [
            { id: 'u-1', name: 'Pooja Sethi', email: 'pooja@example.com', role: 'user', joined: '2025-01-10', status: 'active', phone: '+91 98200 11223' },
            { id: 'u-2', name: 'Vikram Malhotra', email: 'vikram@example.com', role: 'user', joined: '2025-02-15', status: 'active', phone: '+91 98200 44556' },
            { id: 'u-3', name: 'Ananya Roy', email: 'ananya@example.com', role: 'user', joined: '2025-03-01', status: 'active', phone: '+91 98200 77889' },
          ];
    } catch {
      return [];
    }
  });

  const [pricingRates, setPricingRates] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRICING);
      return saved
        ? JSON.parse(saved)
        : {
            hourly: '5000',
            fullDay: '35000',
            halfDay: '20000',
            droneAddon: '8000',
            secondShooter: '12000',
          };
    } catch {
      return { hourly: '5000', fullDay: '35000', halfDay: '20000', droneAddon: '8000', secondShooter: '12000' };
    }
  });

  const [availabilitySchedule, setAvailabilitySchedule] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AVAILABILITY);
      return saved
        ? JSON.parse(saved)
        : {
            Monday: true,
            Tuesday: true,
            Wednesday: true,
            Thursday: true,
            Friday: true,
            Saturday: true,
            Sunday: true,
          };
    } catch {
      return { Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: true, Sunday: true };
    }
  });

  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'conv-1',
          creatorId: 'pro-1',
          creatorName: 'Aarav Mehta',
          creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          creatorRole: 'Royal Wedding Photographer',
          clientId: 'u-1',
          clientName: 'Pooja Sethi',
          clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
          lastMessage: 'Looking forward to the Udaipur pre-wedding shoot! I have shortlisted 3 palace courtyards for golden hour.',
          lastUpdated: '10 mins ago',
          unreadCount: 1,
          messages: [
            {
              id: 'm-1',
              sender: 'client',
              senderName: 'Pooja Sethi',
              text: 'Hi Aarav! We love your editorial lighting. Are you available for a 2-day shoot in Udaipur this October?',
              timestamp: '10:30 AM',
            },
            {
              id: 'm-2',
              sender: 'creator',
              senderName: 'Aarav Mehta',
              text: 'Hello Pooja! Thank you so much. Yes, October is a magnificent month in Rajasthan. The natural lighting at sunset across Lake Pichola is breathtaking.',
              timestamp: '10:32 AM',
            },
            {
              id: 'm-3',
              sender: 'creator',
              senderName: 'Aarav Mehta',
              text: 'Looking forward to the Udaipur pre-wedding shoot! I have shortlisted 3 palace courtyards for golden hour.',
              timestamp: '10:35 AM',
            },
          ],
        },
        {
          id: 'conv-2',
          creatorId: 'pro-2',
          creatorName: 'Kabir Varma',
          creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
          creatorRole: 'Cinematic Wedding Filmmaker',
          clientId: 'u-1',
          clientName: 'Pooja Sethi',
          clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
          lastMessage: 'Drone flight permits for the beach location in Goa are cleared.',
          lastUpdated: '2 hours ago',
          unreadCount: 0,
          messages: [
            {
              id: 'm-201',
              sender: 'client',
              senderName: 'Pooja Sethi',
              text: 'Hey Kabir, do you provide 4K ProRes master files on SSD with the teaser film?',
              timestamp: 'Yesterday',
            },
            {
              id: 'm-202',
              sender: 'creator',
              senderName: 'Kabir Varma',
              text: 'Absolutely! All our cinematic films are mastered in 4K ProRes 422 with a Sandisk Extreme Pro SSD delivered to your home.',
              timestamp: 'Yesterday',
            },
            {
              id: 'm-203',
              sender: 'creator',
              senderName: 'Kabir Varma',
              text: 'Drone flight permits for the beach location in Goa are cleared.',
              timestamp: '2 hours ago',
            },
          ],
        },
      ];
    } catch {
      return [];
    }
  });

  const [searchFilters, setSearchFilters] = useState({
    search: '',
    category: 'all',
    city: 'all',
    price: 'all',
    rating: 'all',
  });

  // 2. LocalStorage Sync on Change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFESSIONALS, JSON.stringify(professionals));
  }, [professionals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(pricingRates));
  }, [pricingRates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AVAILABILITY, JSON.stringify(availabilitySchedule));
  }, [availabilitySchedule]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
  }, [conversations]);

  // Real-time cross-tab synchronization for direct customer & photographer chat
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEYS.CONVERSATIONS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setConversations(parsed);
          }
        } catch {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 3. Platform Actions

  // Create Booking
  const createBooking = (bookingData) => {
    const newBookingId = bookingData.id || `bk-${Date.now()}`;
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const bookingNumber = `LC-${new Date().getFullYear()}-${randNum}`;

    const totalVal = Number(bookingData.totalAmount) || 25000;
    const advanceVal = Number(bookingData.advancePaid) || Number(bookingData.advanceAmount) || Number(bookingData.advanceEscrowDeposit) || Math.round(totalVal * 0.25);
    const balDue = Number(bookingData.balanceRemaining) !== undefined ? Number(bookingData.balanceRemaining) : (totalVal - advanceVal);

    const newBooking = {
      id: newBookingId,
      bookingNumber,
      bookingReference: bookingNumber,
      user: bookingData.user || {
        id: 'u-current',
        name: 'Pooja Sethi',
        email: 'pooja@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      },
      userName: bookingData.userName || bookingData.user?.name || 'Pooja Sethi',
      userEmail: bookingData.userEmail || bookingData.user?.email || 'pooja@example.com',
      userAvatar: bookingData.userAvatar || bookingData.user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      professional: bookingData.professional,
      professionalId: bookingData.professionalId || bookingData.professional?.id || 'pro-1',
      professionalName: bookingData.creatorName || bookingData.professionalName || bookingData.professional?.name || 'Aarav Mehta',
      professionalAvatar: bookingData.creatorAvatar || bookingData.professionalAvatar || bookingData.professional?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      service: bookingData.service,
      serviceTitle: typeof bookingData.service === 'string' ? bookingData.service : (bookingData.serviceTitle || bookingData.service?.title || 'Custom Shoot'),
      eventDate: bookingData.date || bookingData.eventDate || new Date().toISOString(),
      eventTime: bookingData.time || bookingData.eventTime || '09:00 AM',
      location: typeof bookingData.location === 'object' && bookingData.location !== null
        ? {
            city: bookingData.location.city || bookingData.eventCity || 'Mumbai',
            address: bookingData.location.address || 'Client Venue',
          }
        : {
            city: bookingData.eventLocation || bookingData.location || 'Mumbai',
            address: bookingData.eventLocation || bookingData.location || 'Client Venue',
          },
      eventType: typeof bookingData.service === 'string' ? bookingData.service : (bookingData.eventType || 'Wedding Ceremony'),
      package: bookingData.package || 'Signature',
      totalAmount: totalVal,
      advancePaid: advanceVal,
      advanceAmount: advanceVal,
      balanceRemaining: balDue,
      status: (bookingData.status || 'confirmed').toLowerCase(),
      paymentStatus: 'advance_paid',
      notes: bookingData.requirements || bookingData.notes || '',
      requirements: bookingData.requirements || bookingData.notes || '',
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  // Update Booking Status
  const updateBookingStatus = (bookingId, newStatus, notes) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId || b.bookingNumber === bookingId) {
          return {
            ...b,
            status: newStatus.toLowerCase(),
            notes: notes !== undefined ? notes : b.notes,
            paymentStatus: newStatus.toLowerCase() === 'completed' ? 'paid' : b.paymentStatus,
          };
        }
        return b;
      })
    );
  };

  // Cancel Booking
  const cancelBooking = (bookingId, cancellationReason) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId || b.bookingNumber === bookingId) {
          return {
            ...b,
            status: 'cancelled',
            paymentStatus: 'refunded',
            cancellationReason: cancellationReason || 'Cancelled by client',
          };
        }
        return b;
      })
    );
  };

  // Add Review & recalculate creator rating
  const addReview = (reviewData) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      creatorId: reviewData.creatorId || reviewData.professionalId || 'pro-1',
      creatorName: reviewData.creatorName || reviewData.professionalName || 'Aarav Mehta',
      creatorAvatar: reviewData.creatorAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      clientName: reviewData.clientName || reviewData.userName || 'Pooja Sethi',
      clientAvatar: reviewData.clientAvatar || reviewData.userAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      rating: Number(reviewData.rating) || 5,
      date: new Date().toISOString().split('T')[0],
      event: reviewData.event || reviewData.eventType || 'Wedding Shoot',
      comment: reviewData.comment || 'Outstanding experience and brilliant quality of work!',
    };

    setReviews((prev) => [newReview, ...prev]);

    // Recalculate target professional rating and review count
    setProfessionals((prev) =>
      prev.map((pro) => {
        if (pro.id === newReview.creatorId) {
          const proReviews = reviews.filter((r) => r.creatorId === pro.id).concat(newReview);
          const avg = proReviews.reduce((sum, r) => sum + r.rating, 0) / proReviews.length;
          return {
            ...pro,
            rating: Math.round(avg * 100) / 100,
            reviewCount: proReviews.length,
          };
        }
        return pro;
      })
    );

    return newReview;
  };

  // Add Portfolio Item to Professional
  const addPortfolioItem = (proId, item) => {
    const newItem = {
      id: `port-${Date.now()}`,
      title: item.title,
      category: item.category || 'General',
      url: item.url,
      mediaType: item.mediaType || 'image',
    };

    setProfessionals((prev) =>
      prev.map((pro) => {
        if (pro.id === proId || (!proId && pro.id === 'pro-1')) {
          return {
            ...pro,
            portfolio: [newItem, ...(pro.portfolio || [])],
          };
        }
        return pro;
      })
    );

    return newItem;
  };

  // Delete Portfolio Item
  const deletePortfolioItem = (proId, itemId) => {
    setProfessionals((prev) =>
      prev.map((pro) => {
        if (pro.id === proId || (!proId && pro.id === 'pro-1')) {
          return {
            ...pro,
            portfolio: (pro.portfolio || []).filter((p) => p.id !== itemId),
          };
        }
        return pro;
      })
    );
  };

  // Add Service Package to Professional
  const addService = (proId, serviceData) => {
    const newService = {
      id: `srv-${Date.now()}`,
      title: serviceData.title,
      price: Number(serviceData.price),
      pricingType: serviceData.pricingType || 'per_day',
      deliveryDays: Number(serviceData.deliveryDays) || 7,
      description: serviceData.description,
      inclusions: serviceData.inclusions || [
        'High-Resolution Retouched Deliverables',
        'Direct Cloud Storage Link',
        'Full Commercial & Social License',
      ],
    };

    setProfessionals((prev) =>
      prev.map((pro) => {
        if (pro.id === proId || (!proId && pro.id === 'pro-1')) {
          return {
            ...pro,
            services: [newService, ...(pro.services || [])],
          };
        }
        return pro;
      })
    );

    return newService;
  };

  // Delete Service Package
  const deleteService = (proId, serviceId) => {
    setProfessionals((prev) =>
      prev.map((pro) => {
        if (pro.id === proId || (!proId && pro.id === 'pro-1')) {
          return {
            ...pro,
            services: (pro.services || []).filter((s) => s.id !== serviceId),
          };
        }
        return pro;
      })
    );
  };

  // Wishlist / Favorites Actions (Supports both pro objects and pro IDs)
  const toggleWishlist = (proOrId) => {
    const id = typeof proOrId === 'object' && proOrId !== null ? proOrId.id : proOrId;
    if (!id) return;
    setWishlist((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleFavorite = toggleWishlist;

  const isWishlisted = (proOrId) => {
    const id = typeof proOrId === 'object' && proOrId !== null ? proOrId.id : proOrId;
    return wishlist.includes(id);
  };

  const favorites = professionals.filter((p) => wishlist.includes(p.id));

  // Toggle User Status (Admin)
  const toggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return { ...u, status: u.status === 'active' ? 'deactivated' : 'active' };
        }
        return u;
      })
    );
  };

  // Update User Profile
  const updateUserProfile = (userId, updatedData) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return { ...u, ...updatedData };
        }
        return u;
      })
    );
  };

  // Add Category (Admin)
  const addCategory = (categoryData) => {
    const newCat = {
      id: `cat-${Date.now()}`,
      name: categoryData.name,
      slug: categoryData.name.toLowerCase().replace(/\s+/g, '-'),
      role: categoryData.role || 'photographer',
      image:
        categoryData.image ||
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      count: '1 Studio Available',
    };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  // Delete Category (Admin)
  const deleteCategory = (categoryId) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
  };

  // Add New Professional (Creator Onboarding)
  const addProfessional = (proData) => {
    const newPro = {
      id: `pro-${Date.now()}`,
      name: proData.name || 'New Creator Studio',
      email: proData.email || 'creator@lenscraft.com',
      role: proData.role || 'photographer',
      category: proData.tagline || 'Fine Art Creator',
      tagline: proData.tagline || 'Visual Storyteller',
      bio: proData.bio || 'Preserving emotional human moments with cinematic lighting and timeless film tones.',
      location: {
        city: (proData.city || 'Indore').split(',')[0].trim(),
        state: (proData.city || '').split(',')[1]?.trim() || 'Madhya Pradesh',
        country: 'India',
      },
      startingPrice: Number(proData.startingPrice) || 25000,
      priceUnit: 'per_day',
      rating: 5.0,
      reviewCount: 1,
      completedShoots: 10,
      avatar: proData.uploadedImages?.[0] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      coverImage: proData.uploadedImages?.[0] || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      isVerified: true,
      specialties: typeof proData.specialties === 'string'
        ? proData.specialties.split(',').map((s) => s.trim())
        : (proData.specialties || ['Weddings', 'Portraits']),
      portfolio: (proData.uploadedImages || []).map((url, i) => ({
        id: `port-init-${i}`,
        title: `${proData.name} Showcase ${i + 1}`,
        category: 'Showcase',
        url,
        mediaType: 'image',
      })),
      services: [
        {
          id: `srv-init-${Date.now()}`,
          title: 'Standard Creative Coverage',
          price: Number(proData.startingPrice) || 25000,
          pricingType: 'per_day',
          deliveryDays: 7,
          description: 'Comprehensive creative coverage with hand-edited color graded master exports.',
          inclusions: ['4K Raw / Master JPEG Files', 'Cloud Archival Access', 'Commercial & Social License'],
        },
      ],
    };
    setProfessionals((prev) => [newPro, ...prev]);
    return newPro;
  };

  // Update Studio Profile Data
  const updateStudioProfile = (proId, profileData) => {
    setProfessionals((prev) =>
      prev.map((pro) => {
        if (pro.id === proId || (!proId && pro.id === 'pro-1')) {
          return {
            ...pro,
            ...profileData,
            location: {
              ...(pro.location || {}),
              ...(profileData.location || {}),
            },
          };
        }
        return pro;
      })
    );
  };

  // Send Real Message between Customer & Photographer
  const sendMessage = async ({
    creatorId,
    creatorName,
    creatorAvatar,
    clientId = 'u-1',
    clientName = 'Client',
    clientAvatar,
    sender = 'client',
    senderName,
    text,
    attachments = [],
  }) => {
    if (!text || !creatorId) return;

    const resolvedSenderName =
      senderName || (sender === 'creator' ? creatorName || 'Studio' : clientName || 'Client');

    const newMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sender,
      senderName: resolvedSenderName,
      text: text.trim(),
      attachments,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations((prev) => {
      const existingIdx = prev.findIndex(
        (c) => c.creatorId === creatorId || c.creatorName === creatorName
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        const conv = updated[existingIdx];
        updated[existingIdx] = {
          ...conv,
          lastMessage: text.trim(),
          lastUpdated: 'Just now',
          unreadCount: sender === 'client' ? (conv.unreadCount || 0) + 1 : 0,
          messages: [...(conv.messages || []), newMessage],
        };
        return updated;
      } else {
        const newConv = {
          id: `conv-${Date.now()}`,
          creatorId,
          creatorName: creatorName || 'Studio',
          creatorAvatar: creatorAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          creatorRole: 'Creative Studio',
          clientId: clientId || 'u-1',
          clientName: clientName || 'Client',
          clientAvatar: clientAvatar || '',
          lastMessage: text.trim(),
          lastUpdated: 'Just now',
          unreadCount: sender === 'client' ? 1 : 0,
          messages: [newMessage],
        };
        return [newConv, ...prev];
      }
    });

    // Synchronize with backend API asynchronously
    try {
      await messageService.sendMessage({
        creatorId,
        creatorName,
        creatorAvatar,
        clientId,
        clientName,
        clientAvatar,
        sender,
        senderName: resolvedSenderName,
        text: text.trim(),
        attachments,
      });
    } catch (err) {
      // Offline / mock mode fallback handled gracefully
    }

    return newMessage;
  };

  const value = {
    professionals,
    bookings,
    reviews,
    wishlist,
    favorites,
    conversations,
    categories,
    users,
    pricingRates,
    setPricingRates,
    availabilitySchedule,
    setAvailabilitySchedule,
    searchFilters,
    setSearchFilters,
    createBooking,
    updateBookingStatus,
    cancelBooking,
    addReview,
    addPortfolioItem,
    deletePortfolioItem,
    addService,
    deleteService,
    toggleWishlist,
    toggleFavorite,
    isWishlisted,
    toggleUserStatus,
    updateUserProfile,
    addCategory,
    deleteCategory,
    addProfessional,
    updateStudioProfile,
    sendMessage,
  };

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
};
