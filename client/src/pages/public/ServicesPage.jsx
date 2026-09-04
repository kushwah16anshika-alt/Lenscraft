import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  Camera,
  Video,
  Film,
  CheckCircle2,
  Search,
  Layers,
  ChevronRight,
  HelpCircle,
  ChevronDown,
  Award,
  SlidersHorizontal,
} from 'lucide-react';
import { CREATIVE_CATEGORIES } from '../../constants/categories';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const ServicesPage = () => {
  const [selectedRole, setSelectedRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  // Extended metadata for enhanced professional display
  const categoryDetails = {
    weddings: {
      startingPrice: '₹25,000 / day',
      turnaround: '7–14 Days',
      highlights: ['Dual-camera coverage', 'Drone aerials', '400+ retouched frames', 'Online master gallery'],
    },
    'pre-wedding': {
      startingPrice: '₹20,000 / shoot',
      turnaround: '5–7 Days',
      highlights: ['4K Cinema visuals', 'Location mood-boards', 'Outfit changes', '60s Social media teaser'],
    },
    'corporate-events': {
      startingPrice: '₹18,000 / day',
      turnaround: '48–72 Hours',
      highlights: ['Keynote multi-cam', 'Executive headshots', 'Same-day press selects', 'Full audio mastering'],
    },
    'product-commercial': {
      startingPrice: '₹15,000 / project',
      turnaround: '3–5 Days',
      highlights: ['Studio lighting setup', 'Clean background clipping', 'Macro detailing', 'High-res e-comm ready'],
    },
    'reels-shorts': {
      startingPrice: '₹3,500 / video',
      turnaround: '24–48 Hours',
      highlights: ['Hook optimization', 'Dynamic kinetic typography', 'Trending sound design', '2 Free revision rounds'],
    },
    'color-grading': {
      startingPrice: '₹8,000 / project',
      turnaround: '3–5 Days',
      highlights: ['DaVinci Resolve studio pipeline', 'Rec.709 & HDR deliverables', 'Skin-tone preservation', 'Custom film LUTs'],
    },
    'birthdays-portraits': {
      startingPrice: '₹12,000 / session',
      turnaround: '3–5 Days',
      highlights: ['Outdoor or studio setup', 'Natural light candid portraits', 'Styling guidance', '50 High-res edits'],
    },
    'music-videos': {
      startingPrice: '₹35,000 / project',
      turnaround: '10–14 Days',
      highlights: ['Creative concept direction', 'Gimbal & FPV drone sweeps', 'Cinema color grading', 'DCI 4K Master export'],
    },
  };

  const signaturePackages = [
    {
      id: 'pkg-1',
      badge: 'Most Popular for Events',
      title: 'Cinematic Royal Wedding Experience',
      tagline: 'Dual Master Photographers + Cinema DP with Drone Coverage',
      price: '₹55,000',
      period: 'per full day',
      turnaround: '14 Days delivery (Teaser in 48h)',
      features: [
        '2 Senior Candid Photographers + 1 Cinema Videographer',
        '400+ Master Color-Graded High-Resolution Stills',
        '3–5 Minute Cinematic Teaser Film in 4K',
        '25–35 Minute Full Extended Ceremony Film',
        'Licensed Cinema Soundtracks & Sound Mixing',
        'Private Cloud Gallery with 1-Year Hosting',
      ],
      roleTarget: 'photographers',
      slug: 'weddings',
    },
    {
      id: 'pkg-2',
      badge: 'Best for Brands & Founders',
      title: 'Commercial Brand & Product Stills',
      tagline: 'High-Conversion Advertising Stills & 3D Lighting Setup',
      price: '₹32,000',
      period: 'per campaign',
      turnaround: '5 Days delivery',
      features: [
        'Full Day Studio or On-Location Production',
        'Up to 25 Unique Hero Product Concepts & Angles',
        'Commercial Licensing for Web, Print & Billboard',
        'High-End Skin, Texture & Retouching Finish',
        'Ready-to-use Formats for Amazon, Shopify & Socials',
        'Includes RAW Uncompressed File Delivery Option',
      ],
      roleTarget: 'photographers',
      slug: 'commercial',
    },
    {
      id: 'pkg-3',
      badge: 'Top for Social Media Growth',
      title: 'Viral Creator Retainer Pack (5 Reels)',
      tagline: 'High-Retention Short-Form Video Editing & Soundscaping',
      price: '₹14,500',
      period: 'pack of 5 videos',
      turnaround: '72 Hours turnaround',
      features: [
        '5 High-Retention Short-Form Videos (Reels / TikToks / Shorts)',
        'Kinetic Subtitles, B-Roll Splicing & Motion Graphics',
        'Trending Audio Selection & SFX Sound Design',
        'Custom Thumbnail Concepts & Cover Frame Selects',
        '2 Rounds of Interactive Timecode Revisions',
        'Optimized Aspect Ratios (9:16, 4:5, 1:1)',
      ],
      roleTarget: 'editors',
      slug: 'reels-editing',
    },
  ];

  const faqs = [
    {
      q: 'How does the Escrow Payment Protection guarantee work?',
      a: 'When you book any creative package through LensCraft, your payment is held securely in our protected escrow system. The creator is only paid once your project milestones are reached and you have previewed and confirmed your deliverables.',
    },
    {
      q: 'Can I book a combined team for both Photography & Videography?',
      a: 'Yes! Many of our certified studios offer comprehensive multi-disciplinary teams. You can filter by individual disciplines or choose creators that specialize in complete dual-coverage packages.',
    },
    {
      q: 'How do I receive my final high-resolution photos and video deliverables?',
      a: 'All deliverables are uploaded directly to your LensCraft Client Portal in original full-resolution format, complete with download permissions, revision notes, and private shareable gallery links.',
    },
    {
      q: 'What if I need custom shoot hours or travel outside city limits?',
      a: 'You can directly message any creator to request a customized quote. Creators will provide travel arrangements and custom hourly extensions before you confirm the booking.',
    },
    {
      q: 'What is the cancellation and rescheduling policy?',
      a: 'We provide flexible rescheduling up to 72 hours prior to your scheduled shoot date. Full details on cancellation terms are clearly displayed on each creator’s rate card before booking.',
    },
  ];

  const filteredCategories = CREATIVE_CATEGORIES.filter((cat) => {
    const matchesRole =
      selectedRole === 'all' ||
      (selectedRole === 'photographer' && cat.role === 'photographer') ||
      (selectedRole === 'videographer' && cat.role === 'videographer') ||
      (selectedRole === 'editor' && cat.role === 'editor');

    const matchesSearch =
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20 text-left">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F3] via-white to-[#F7F5F2] border-b border-[#E5E0D8] pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F3] border border-[#E8DBCA] text-[#B88A5A] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Compass className="w-3.5 h-3.5" />
              <span>Verified Creative Services & Packages</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#171717] tracking-tight leading-[1.1]">
              Bespoke Photography, Cinema & Post-Production
            </h1>

            <p className="text-sm sm:text-base text-[#6B6258] leading-relaxed max-w-2xl">
              Browse transparent rate cards, vetted creative disciplines, and verified talent with 100% escrow protection and guaranteed delivery timelines.
            </p>

            {/* Quick Filter & Search Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8C8276] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search disciplines (e.g., Weddings, Commercial, Color Grading)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white border border-[#E5E0D8] text-xs text-[#171717] placeholder-[#8C8276] focus:outline-none focus:border-[#171717] focus:ring-1 focus:ring-[#171717] transition-all shadow-2xs"
                />
              </div>

              {/* Role Filter Buttons */}
              <div className="flex items-center gap-1.5 p-1 rounded-md bg-[#EEEAE4] border border-[#E5E0D8] overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: 'All Services', icon: SlidersHorizontal },
                  { id: 'photographer', label: 'Photography', icon: Camera },
                  { id: 'videographer', label: 'Cinematography', icon: Video },
                  { id: 'editor', label: 'Post-Production', icon: Film },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = selectedRole === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedRole(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-[#171717] text-white shadow-2xs'
                          : 'text-[#6B6258] hover:text-[#171717] hover:bg-white/60'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-lg bg-white border border-[#E5E0D8] shadow-2xs">
          <div className="flex items-start gap-3.5 p-2">
            <div className="w-10 h-10 rounded-md bg-[#FAF7F3] border border-[#E8DBCA] flex items-center justify-center text-[#B88A5A] shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wide">100% Escrow Protection</h4>
              <p className="text-[11px] text-[#6B6258] mt-0.5 leading-snug">
                Funds remain held securely until you inspect & approve final deliverables.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-2">
            <div className="w-10 h-10 rounded-md bg-[#FAF7F3] border border-[#E8DBCA] flex items-center justify-center text-[#B88A5A] shrink-0">
              <Award className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wide">Editorial Vetted Talent</h4>
              <p className="text-[11px] text-[#6B6258] mt-0.5 leading-snug">
                Gear, past portfolios & identity thoroughly verified by our creative board.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-2">
            <div className="w-10 h-10 rounded-md bg-[#FAF7F3] border border-[#E8DBCA] flex items-center justify-center text-[#B88A5A] shrink-0">
              <Clock className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wide">48h Fast Previews</h4>
              <p className="text-[11px] text-[#6B6258] mt-0.5 leading-snug">
                Receive initial social teasers & selects within 48 hours of shoot wrap.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-2">
            <div className="w-10 h-10 rounded-md bg-[#FAF7F3] border border-[#E8DBCA] flex items-center justify-center text-[#B88A5A] shrink-0">
              <Zap className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wide">Commercial Rights</h4>
              <p className="text-[11px] text-[#6B6258] mt-0.5 leading-snug">
                Clear license terms with optional uncompressed RAW footage transfer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Signature Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#E5E0D8]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B88A5A] block mb-1">
              Curated Production Packages
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
              Signature Creative Tiers
            </h2>
          </div>
          <p className="text-xs text-[#6B6258] max-w-md">
            Complete turnkey solutions with pre-negotiated deliverables, transparent pricing, and guaranteed turnaround.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {signaturePackages.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-lg bg-white border border-[#E5E0D8] p-7 shadow-2xs hover:border-[#171717] transition-all flex flex-col justify-between relative group hover:shadow-md"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FAF7F3] text-[#B88A5A] border border-[#E8DBCA]">
                    {pkg.badge}
                  </span>
                  <span className="text-[11px] text-[#8C8276] font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#B88A5A]" />
                    {pkg.turnaround}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-[#171717] group-hover:text-[#B88A5A] transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-[#6B6258] mt-1 leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                <div className="py-4 border-y border-[#E5E0D8]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-serif font-bold text-[#171717]">{pkg.price}</span>
                    <span className="text-xs text-[#8C8276]">/ {pkg.period}</span>
                  </div>
                  <span className="text-[10px] text-[#8C8276] uppercase tracking-wider font-semibold block mt-0.5">
                    Starting Base Price
                  </span>
                </div>

                <div className="space-y-2.5">
                  <span className="text-[10px] uppercase font-bold text-[#8C8276] tracking-wider block">
                    What's Included:
                  </span>
                  <ul className="space-y-2 text-xs text-[#4A433B]">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B88A5A] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5E0D8]">
                <Link to={`/${pkg.roleTarget}?category=${pkg.slug}`}>
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-between"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    <span>Explore Creators</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Disciplines Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#E5E0D8]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B88A5A] block mb-1">
              Disciplines Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
              All Specialty Disciplines ({filteredCategories.length})
            </h2>
          </div>
          <p className="text-xs text-[#6B6258]">
            Filter by specialty to view available creators, portfolios, and rates.
          </p>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-lg border border-[#E5E0D8] space-y-3">
            <Compass className="w-8 h-8 text-[#8C8276] mx-auto opacity-50" />
            <h3 className="text-base font-bold text-[#171717]">No categories match your search</h3>
            <p className="text-xs text-[#6B6258]">Try adjusting your search keywords or switching category filters.</p>
            <Button variant="outline" size="sm" onClick={() => { setSelectedRole('all'); setSearchQuery(''); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCategories.map((cat, idx) => {
              const details = categoryDetails[cat.id] || {
                startingPrice: 'Contact for rates',
                turnaround: '3–7 Days',
                highlights: ['Professional equipment', 'High-res edits', 'Fast delivery'],
              };
              const targetRoute =
                cat.role === 'editor'
                  ? 'editors'
                  : cat.role === 'videographer'
                  ? 'videographers'
                  : 'photographers';

              return (
                <div
                  key={cat.id}
                  className="rounded-lg bg-white border border-[#E5E0D8] overflow-hidden shadow-2xs hover:border-[#171717] hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="relative h-48 bg-[#EEEAE4] overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                      {/* Number Tag */}
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-white/90 backdrop-blur-xs text-[#171717] font-serif font-bold text-[10px] shadow-2xs">
                        0{idx + 1}
                      </div>

                      {/* Role Badge */}
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-white text-[9px] uppercase font-bold tracking-wider">
                        {cat.role}
                      </div>

                      {/* Price / Pro Count Strip */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium drop-shadow-sm">
                        <span>{details.startingPrice}</span>
                        <span className="text-[#E8DBCA] font-bold">{cat.count}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-serif font-bold text-[#171717] group-hover:text-[#B88A5A] transition-colors leading-snug">
                        {cat.name}
                      </h3>

                      <p className="text-xs text-[#6B6258] leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>

                      {/* Highlights Chips */}
                      <div className="pt-2 border-t border-[#E5E0D8] space-y-1.5">
                        <span className="text-[9px] uppercase font-bold text-[#8C8276] tracking-wider block">
                          Included Deliverables:
                        </span>
                        <ul className="space-y-1 text-[11px] text-[#4A433B]">
                          {details.highlights.slice(0, 2).map((h, hIdx) => (
                            <li key={hIdx} className="flex items-center gap-1.5 truncate">
                              <span className="w-1 h-1 rounded-full bg-[#B88A5A]" />
                              <span className="truncate">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="p-5 pt-0">
                    <Link to={`/${targetRoute}?category=${cat.slug}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-between group-hover:bg-[#171717] group-hover:text-white group-hover:border-[#171717] transition-all"
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      >
                        <span>View {cat.name.split(' ')[0]}</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* How Booking Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-xl bg-[#171717] text-white border border-[#2B2B2B] shadow-lg space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B88A5A] block">
              Workflow Protocol
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-white">
              How LensCraft Service Booking Operates
            </h2>
            <p className="text-xs sm:text-sm text-[#A39B91]">
              A seamless, protected four-step workflow designed for corporate brands, event planners, and discerning clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-md bg-[#212121] border border-[#2E2E2E] space-y-3 relative">
              <span className="text-2xl font-serif font-bold text-[#B88A5A] block">01</span>
              <h4 className="text-sm font-bold text-white">Discover & Shortlist</h4>
              <p className="text-xs text-[#A39B91] leading-relaxed">
                Filter creators by verified gear, portfolio galleries, verified client reviews, and transparent day rates.
              </p>
            </div>

            <div className="p-5 rounded-md bg-[#212121] border border-[#2E2E2E] space-y-3 relative">
              <span className="text-2xl font-serif font-bold text-[#B88A5A] block">02</span>
              <h4 className="text-sm font-bold text-white">Escrow Payment Lock</h4>
              <p className="text-xs text-[#A39B91] leading-relaxed">
                Secure your shoot date with advance payment held in escrow. Creators are only funded upon your delivery sign-off.
              </p>
            </div>

            <div className="p-5 rounded-md bg-[#212121] border border-[#2E2E2E] space-y-3 relative">
              <span className="text-2xl font-serif font-bold text-[#B88A5A] block">03</span>
              <h4 className="text-sm font-bold text-white">Production & Shoot Day</h4>
              <p className="text-xs text-[#A39B91] leading-relaxed">
                Coordinate call-sheets, shot lists, and mood boards directly with your creator through our built-in workspace.
              </p>
            </div>

            <div className="p-5 rounded-md bg-[#212121] border border-[#2E2E2E] space-y-3 relative">
              <span className="text-2xl font-serif font-bold text-[#B88A5A] block">04</span>
              <h4 className="text-sm font-bold text-white">Master Deliverables</h4>
              <p className="text-xs text-[#A39B91] leading-relaxed">
                Receive 48h teasers and final high-res cloud downloads with full commercial license certificates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B88A5A] block">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#6B6258] max-w-md mx-auto">
            Everything you need to know about package bookings, guarantees, and deliverables.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, fIdx) => {
            const isOpen = openFaq === fIdx;
            return (
              <div
                key={fIdx}
                className="rounded-md bg-white border border-[#E5E0D8] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-[#FAF7F3]/50 transition-colors"
                >
                  <span className="text-sm font-bold text-[#171717]">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8C8276] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#B88A5A]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-[#6B6258] leading-relaxed border-t border-[#E5E0D8]/60 animate-slide-up">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom Enterprise Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-lg bg-gradient-to-r from-[#FAF7F3] via-white to-[#F7F5F2] border border-[#E8DBCA] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B88A5A] block">
              Custom Commercial & Multi-City Shoots
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#171717]">
              Need a bespoke production team or multi-camera setup?
            </h3>
            <p className="text-xs text-[#6B6258] leading-relaxed">
              Our creative concierge assists with high-scale weddings, brand commercial retainers, and multi-city campaign shoots.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/photographers">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Browse All Talent
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
