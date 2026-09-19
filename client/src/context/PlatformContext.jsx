import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MOCK_PROFESSIONALS,
  MOCK_BOOKINGS,
  MOCK_REVIEWS,
  MOCK_STATS,
} from '../constants/mockData';
import { CREATIVE_CATEGORIES } from '../constants/categories';

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
};

export const PlatformProvider = ({ children }) => {
  // 1. Initial State with LocalStorage Fallback
  const [professionals, setProfessionals] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFESSIONALS);
      return saved ? JSON.parse(saved) : MOCK_PROFESSIONALS;
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

  // 3. Platform Actions

  // Create Booking
  const createBooking = (bookingData) => {
    const newBookingId = `bk-${Date.now()}`;
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const bookingNumber = `LC-${new Date().getFullYear()}-${randNum}`;

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
      professionalId: bookingData.professional?.id || 'pro-1',
      professionalName: bookingData.professional?.name || 'Aarav Mehta',
      professionalAvatar: bookingData.professional?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      service: bookingData.service,
      serviceTitle: bookingData.service?.title || 'Custom Shoot',
      eventDate: bookingData.eventDate || new Date().toISOString(),
      eventTime: bookingData.eventTime || '09:00 AM',
      location: {
        city: bookingData.eventCity || bookingData.location?.city || 'Mumbai',
        address: bookingData.location?.address || 'Client Venue',
      },
      eventType: bookingData.eventType || 'Wedding Ceremony',
      totalAmount: bookingData.totalAmount || 35000,
      advanceAmount: bookingData.advanceEscrowDeposit || Math.round((bookingData.totalAmount || 35000) * 0.3),
      status: 'pending',
      paymentStatus: 'advance_paid',
      notes: bookingData.notes || '',
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
            status: newStatus,
            notes: notes !== undefined ? notes : b.notes,
            paymentStatus: newStatus === 'completed' ? 'paid' : b.paymentStatus,
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
      pricingType: serviceData.pricingType || 'fixed',
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

  // Wishlist Toggle
  const toggleWishlist = (proId) => {
    setWishlist((prev) => {
      if (prev.includes(proId)) {
        return prev.filter((id) => id !== proId);
      } else {
        return [...prev, proId];
      }
    });
  };

  const isWishlisted = (proId) => wishlist.includes(proId);

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

  const value = {
    professionals,
    bookings,
    reviews,
    wishlist,
    categories,
    users,
    pricingRates,
    setPricingRates,
    availabilitySchedule,
    setAvailabilitySchedule,
    createBooking,
    updateBookingStatus,
    cancelBooking,
    addReview,
    addPortfolioItem,
    deletePortfolioItem,
    addService,
    deleteService,
    toggleWishlist,
    isWishlisted,
    toggleUserStatus,
    addCategory,
    deleteCategory,
    updateStudioProfile,
  };

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
};
