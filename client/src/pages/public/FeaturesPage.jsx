import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Camera,
  Video,
  Film,
  Sliders,
  Layers,
  HardDrive,
  FileCheck,
  Users,
  Compass,
  ChevronDown,
  Lock,
} from 'lucide-react';
import Button from '../../components/common/Button';
import AiMatchmakerModal from '../../components/common/AiMatchmakerModal';
import CreatorOnboardingModal from '../../components/common/CreatorOnboardingModal';

const FeaturesPage = () => {
  const [matchmakerOpen, setMatchmakerOpen] = useState(false);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [activeAudienceTab, setActiveAudienceTab] = useState('clients');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Interactive Shoot Cost & Timeline Estimator State
  const [estimatorDiscipline, setEstimatorDiscipline] = useState('wedding');
  const [coverageScale, setCoverageScale] = useState(1); // 0: Half Day (4h), 1: Full Day (8-10h), 2: 2-Day Event, 3: 3-Day Grand Celebration
  const [crewSize, setCrewSize] = useState('dual'); // single, dual, trio
  const [addonDrone, setAddonDrone] = useState(true);
  const [addonFastTeaser, setAddonFastTeaser] = useState(true);
  const [addonRawDrive, setAddonRawDrive] = useState(false);
  const [addonAlbum, setAddonAlbum] = useState(true);

  // Cost calculation matrix
  const baseRates = {
    wedding: { base: 25000, name: 'Royal & Candid Wedding' },
    videography: { base: 30000, name: 'Cinematic Wedding & DP' },
    commercial: { base: 22000, name: 'Commercial Brand & Product' },
    reels: { base: 10000, name: 'Short-Form Viral Video Retainer' },
  };

  const scaleMultipliers = [0.65, 1.0, 1.85, 2.7];
  const scaleLabels = ['Half Day (4h)', 'Full Day (8–10h)', '2-Day Celebration', '3-Day Grand Royal'];
  const scaleTurnarounds = ['3–5 Days', '7–10 Days', '12–14 Days', '14–20 Days'];

  const crewMultiplier = crewSize === 'single' ? 1.0 : crewSize === 'dual' ? 1.55 : 2.1;

  const currentBase = baseRates[estimatorDiscipline].base;
  const rawSubtotal = Math.round(currentBase * scaleMultipliers[coverageScale] * crewMultiplier);
  const droneCost = addonDrone ? 8000 : 0;
  const teaserCost = addonFastTeaser ? 4500 : 0;
  const rawDriveCost = addonRawDrive ? 6000 : 0;
  const albumCost = addonAlbum ? 7500 : 0;

  const totalEstimate = rawSubtotal + droneCost + teaserCost + rawDriveCost + albumCost;
  const estimatedTurnaround = addonFastTeaser ? '48h Teaser + ' + scaleTurnarounds[coverageScale] : scaleTurnarounds[coverageScale];

  const comparisonRows = [
    {
      feature: 'Payment Security & Escrow',
      standard: '100% upfront risk; no protection if creator cancels or underdelivers',
      lenscraft: '100% Escrow held safely until client inspects and approves final edits',
      highlight: true,
    },
    {
      feature: 'Gear & Technical Audit',
      standard: 'Self-reported; risk of amateur camera bodies and overheating',
      lenscraft: 'Strict physical audit of dual-slot RAW bodies, cinema lenses & backup gear',
      highlight: true,
    },
    {
      feature: 'Early Social Teasers',
      standard: 'Often delayed weeks; missed social media momentum',
      lenscraft: 'Guaranteed 48-hour color-graded cinematic teaser preview',
      highlight: false,
    },
    {
      feature: 'Cloud Master Vault',
      standard: 'Messy expiring Google Drive / WeTransfer links',
      lenscraft: 'Permanent high-res cloud gallery with lossless download permissions',
      highlight: false,
    },
    {
      feature: 'Multi-Discipline Bundles',
      standard: 'Coordinating 3 different unaligned freelancers manually',
      lenscraft: 'Synchronized Photo + Cinema + Reel Editing teams on unified call-sheets',
      highlight: true,
    },
    {
      feature: 'Commercial Licensing',
      standard: 'Ambiguous verbal agreements or surprise copyright fees',
      lenscraft: 'Standardized digital licenses with optional uncompressed RAW transfer',
      highlight: false,
    },
    {
      feature: 'Backup & Replacement Guarantee',
      standard: 'Left stranded if photographer has an emergency',
      lenscraft: 'Immediate emergency standby creator dispatch via platform concierge',
      highlight: true,
    },
    {
      feature: 'Dispute Arbitration',
      standard: 'Civil disputes or lost advances with zero recourse',
      lenscraft: 'Dedicated creative board arbitration with guaranteed resolution',
      highlight: false,
    },
  ];

  const featurePillars = [
    {
      id: 'escrow',
      icon: ShieldCheck,
      number: '01',
      title: '100% Escrow Protection Engine',
      summary: 'Never risk your capital. Client funds remain securely bonded in our automated escrow vault.',
      points: [
        'Milestone-based fund disbursement',
        'Direct creator payout upon delivery confirmation',
        'Automated GST invoicing and tax reporting',
        'Guaranteed refund protocol for non-performance',
      ],
    },
    {
      id: 'audit',
      icon: Award,
      number: '02',
      title: 'Physical Gear & Skill Accreditation',
      summary: 'Only the top 8% of applicants receive the verified LensCraft Master Creator badge.',
      points: [
        'Mandatory dual-slot RAW body verification (Sony, Canon, Nikon, RED)',
        'Calibrated DaVinci Resolve Studio color pipelines',
        'Licensed DGCA & Part 107 drone pilot verification',
        'Annual portfolio quality review by senior creative directors',
      ],
    },
    {
      id: 'fast-turnaround',
      icon: Clock,
      number: '03',
      title: '48-Hour Fast Teaser Protocol',
      summary: 'Share your milestone moments while the excitement is at its highest peak.',
      points: [
        'High-resolution edited teaser stills delivered in 48 hours',
        'Cinematic 60-second 4K teaser video for social media',
        'Lossless cloud preview links for immediate sharing',
        'Interactive timecode client revision markers',
      ],
    },
    {
      id: 'cloud-vault',
      icon: HardDrive,
      number: '04',
      title: '4K Master Cloud Vault & Delivery',
      summary: 'Bank-grade cloud infrastructure engineered specifically for massive RAW & ProRes media.',
      points: [
        'High-speed global CDN for instant full-resolution viewing',
        'Organized chronological album folders and guest download links',
        'Optional uncompressed RAW footage hard-drive dispatch',
        '1-Year complimentary high-availability cloud backup',
      ],
    },
    {
      id: 'team-bundles',
      icon: Users,
      number: '05',
      title: 'Synchronized Multi-Discipline Bundles',
      summary: 'Combine Master Photographers, Cinema DPs, and Reel Editors under one unified contract.',
      points: [
        'Unified shoot call-sheet and moodboard sync',
        'Coordinated color temperature and lighting cues',
        'Up to 20% savings on bundled cross-discipline packages',
        'Single point of communication for full production squads',
      ],
    },
    {
      id: 'legal',
      icon: FileCheck,
      number: '06',
      title: 'Transparent Commercial Licensing',
      summary: 'Legally vetted contracts that protect your IP rights and usage scopes clearly.',
      points: [
        'Clear commercial usage tiers (Web, Social, Billboard, Broadcast)',
        'Full personal print and distribution rights for family events',
        'Standardized non-disclosure agreement (NDA) support',
        'Zero hidden licensing royalties or reprint fees',
      ],
    },
  ];

  const faqs = [
    {
      q: 'How does the LensCraft Escrow Protection guarantee work?',
      a: 'When you book a package, 100% of your payment is locked in our secure escrow holding account. The creator is only paid once your project milestones are reached and you have inspected your final deliverables in the portal.',
    },
    {
      q: 'What makes LensCraft creators different from open marketplace freelancers?',
      a: 'Every creator on LensCraft undergoes a strict physical gear verification, portfolio audit, and identity check. Only creators using professional dual-card-slot camera bodies and calibrated color grading setups are accredited.',
    },
    {
      q: 'Can I customize the packages with custom hours, extra cameras, or travel?',
      a: 'Yes! Our Interactive Budget Estimator allows you to model custom configurations, and you can message creators directly or use our AI Matchmaker to generate bespoke quotes.',
    },
    {
      q: 'What happens if a creator has a medical or personal emergency on shoot day?',
      a: 'LensCraft provides an instant emergency replacement guarantee. Our concierge will immediately deploy a standby verified creator of equal or higher tier at no additional cost.',
    },
  ];

  return (
    <div className="space-y-24 pb-24 text-left">
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION (Cosmic Dark Theme)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-400/20 text-cyan-300 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-6 shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>The LensCraft Platform Infrastructure</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white max-w-5xl leading-[1.08] mb-6 uppercase">
            Engineered for <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 font-serif lowercase tracking-normal">
              visual excellence & total confidence.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Discover the proprietary escrow engine, certified gear accreditation, 48-hour delivery pipeline, and collaborative studio tools trusted across 12,000+ shoots.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setMatchmakerOpen(true)}
              className="shadow-xl px-8 font-bold"
              rightIcon={<Sparkles className="w-4 h-4" />}
            >
              Launch AI Matchmaker
            </Button>

            <a href="#estimator">
              <Button
                variant="outline"
                size="lg"
                rightIcon={<Sliders className="w-4 h-4" />}
              >
                Interactive Cost Estimator
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 01: INTERACTIVE SHOOT BUDGET & TIMELINE ESTIMATOR
         ───────────────────────────────────────────────────────────── */}
      <section id="estimator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 block mb-1">
              01 — Interactive Planning Tool
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Shoot Budget & Timeline Estimator
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Model your custom shoot requirements and instantly view transparent pricing, turnaround speeds, and crew configurations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl glass-panel shadow-2xl space-y-7">
            {/* Discipline Selection */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                1. Select Creative Discipline
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'wedding', label: 'Wedding Stills', icon: Camera },
                  { id: 'videography', label: 'Cinema Film', icon: Video },
                  { id: 'commercial', label: 'Commercial', icon: Camera },
                  { id: 'reels', label: 'Viral Reels', icon: Film },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = estimatorDiscipline === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEstimatorDiscipline(item.id)}
                      className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Coverage Scale Slider */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold uppercase tracking-wider text-slate-300">
                  2. Shoot Duration / Scale
                </label>
                <span className="font-bold text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 font-mono">
                  {scaleLabels[coverageScale]}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={3}
                step={1}
                value={coverageScale}
                onChange={(e) => setCoverageScale(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Half Day</span>
                <span>Full Day</span>
                <span>2-Day Event</span>
                <span>3-Day Royal</span>
              </div>
            </div>

            {/* Crew Size */}
            <div className="space-y-2.5 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                3. Crew & Camera Setup
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'single', title: 'Solo Master', desc: '1 Lead Artist' },
                  { id: 'dual', title: 'Dual Team', desc: '1 Lead + 1 Second' },
                  { id: 'trio', title: 'Full Squad', desc: '2 Leads + Drone OP' },
                ].map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setCrewSize(c.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      crewSize === c.id
                        ? 'border-cyan-500/80 bg-cyan-500/10 text-white shadow-md'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold block">{c.title}</span>
                    <span
                      className={`text-[10px] block mt-0.5 ${
                        crewSize === c.id ? 'text-cyan-300' : 'text-slate-500'
                      }`}
                    >
                      {c.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons Checklist */}
            <div className="space-y-2.5 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                4. Production Add-Ons & Speed
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label
                  onClick={() => setAddonDrone(!addonDrone)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    addonDrone ? 'border-cyan-500/60 bg-cyan-500/10' : 'border-slate-800 bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={addonDrone}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-slate-700"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">4K Drone Aerials</span>
                      <span className="text-[10px] text-slate-400">Licensed DGCA Pilot</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-400 font-mono">+₹8,000</span>
                </label>

                <label
                  onClick={() => setAddonFastTeaser(!addonFastTeaser)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    addonFastTeaser ? 'border-cyan-500/60 bg-cyan-500/10' : 'border-slate-800 bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={addonFastTeaser}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-slate-700"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">48h Fast Social Teaser</span>
                      <span className="text-[10px] text-slate-400">Instagram/Reel Ready</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-400 font-mono">+₹4,500</span>
                </label>

                <label
                  onClick={() => setAddonRawDrive(!addonRawDrive)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    addonRawDrive ? 'border-cyan-500/60 bg-cyan-500/10' : 'border-slate-800 bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={addonRawDrive}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-slate-700"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">RAW Uncompressed Drive</span>
                      <span className="text-[10px] text-slate-400">Courier Hard Drive</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-400 font-mono">+₹6,000</span>
                </label>

                <label
                  onClick={() => setAddonAlbum(!addonAlbum)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    addonAlbum ? 'border-cyan-500/60 bg-cyan-500/10' : 'border-slate-800 bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={addonAlbum}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-slate-700"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">Signature Hardcover Album</span>
                      <span className="text-[10px] text-slate-400">Fuji Matte Lustre Paper</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-400 font-mono">+₹7,500</span>
                </label>
              </div>
            </div>
          </div>

          {/* Live Estimate Summary Card (5 Cols Sticky) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl glass-panel text-white border-cyan-500/30 shadow-2xl space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400">
                Estimated Production Tier
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-bold uppercase tracking-wider border border-cyan-400/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                <span>100% Escrow Protected</span>
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 block mb-1">Total Estimated Investment</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                  ₹{totalEstimate.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400">est. total</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                All-inclusive estimate with equipment, crew, editing, and commercial licensing.
              </p>
            </div>

            {/* Delivery Specifications */}
            <div className="space-y-3 py-4 border-y border-slate-800/80 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Turnaround Timeline:
                </span>
                <span className="font-bold text-white">{estimatedTurnaround}</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  Crew Deployment:
                </span>
                <span className="font-bold text-white">
                  {crewSize === 'single' ? '1 Lead Master' : crewSize === 'dual' ? '2 Master Photographers' : '2 Leads + 1 Drone Specialist'}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                  Delivery Format:
                </span>
                <span className="font-bold text-white">4K Lossless Cloud Gallery</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setMatchmakerOpen(true)}
                className="w-full font-bold"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Match Me With Creators
              </Button>

              <Link to="/photographers" className="block">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  Browse Available Studios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 02: CORE PLATFORM CAPABILITIES (6 PILLARS)
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 block mb-1">
              02 — Core Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              The 6 Pillars of LensCraft
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Built from the ground up to solve reliability, color science consistency, and payment security for the creative industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featurePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="p-7 rounded-2xl glass-card hover:border-cyan-500/40 transition-all shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <span className="text-2xl font-serif font-bold text-slate-600 group-hover:text-cyan-400 transition-colors">
                      {pillar.number}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-serif font-bold text-white leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.summary}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
                    {pillar.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 03: COMPARISON MATRIX (FREELANCER VS LENSCRAFT)
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 block mb-1">
              03 — Why Choose LensCraft
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              The Standard vs. LensCraft Certified
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Why high-budget wedding planners, corporate brands, and celebrities book through LensCraft.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl glass-panel shadow-2xl border-slate-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60">
                <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-slate-300 w-1/3">
                  Capability / Feature
                </th>
                <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-slate-500 w-1/3">
                  Traditional Unvetted Freelancing
                </th>
                <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-cyan-300 w-1/3 bg-cyan-500/10 border-l border-cyan-400/20">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LensCraft Certified Platform</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-400">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{row.standard}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-200 font-medium bg-cyan-500/5 border-l border-cyan-400/10">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{row.lenscraft}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 04: PERSPECTIVE VIEWS (CLIENTS / BRANDS / CREATORS)
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 block mb-1">
              04 — Tailored Workflows
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Built for Every Stakeholder
            </h2>
          </div>

          {/* Perspective Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
            {[
              { id: 'clients', label: 'For Couples & Families' },
              { id: 'brands', label: 'For Brands & Agencies' },
              { id: 'creators', label: 'For Certified Creators' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveAudienceTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeAudienceTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="p-8 sm:p-12 rounded-2xl glass-panel space-y-8 text-slate-200 border-cyan-500/20">
          {activeAudienceTab === 'clients' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
              <div className="p-6 rounded-2xl glass-card space-y-3">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
                <h4 className="text-base font-serif font-bold text-white">Zero-Stress Escrow</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your funds are protected throughout the shoot. Creators only receive disbursement once you approve the final album and cinematic teasers.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card space-y-3">
                <Clock className="w-6 h-6 text-cyan-400" />
                <h4 className="text-base font-serif font-bold text-white">48-Hour Social Previews</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Post pristine, color-graded wedding and event teasers while your celebrations are still fresh on social media.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card space-y-3">
                <Layers className="w-6 h-6 text-cyan-400" />
                <h4 className="text-base font-serif font-bold text-white">Coordinated Studios</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Book unified photo and cinema squads with single contracts, synchronizing every lighting cue and timeline milestone.
                </p>
              </div>
            </div>
          )}

          {activeAudienceTab === 'brands' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
              <div className="p-6 rounded-2xl glass-card space-y-3">
                <FileCheck className="w-6 h-6 text-indigo-400" />
                <h4 className="text-base font-serif font-bold text-white">Standard Commercial IP</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Full commercial licensing for web, Amazon, billboard, and broadcast with zero residual royalty surprises.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card space-y-3">
                <HardDrive className="w-6 h-6 text-indigo-400" />
                <h4 className="text-base font-serif font-bold text-white">RAW ProRes & S-Log Deliveries</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Optionally receive uncompressed RAW frames and ProRes cinema footage for in-house agency post-production.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card space-y-3">
                <Zap className="w-6 h-6 text-indigo-400" />
                <h4 className="text-base font-serif font-bold text-white">Centralized Billing & GST</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  One vendor on your accounts payable ledger. Automated GST invoices and vendor onboarding compliance.
                </p>
              </div>
            </div>
          )}

          {activeAudienceTab === 'creators' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
              <div className="p-6 rounded-2xl glass-card space-y-3">
                <Lock className="w-6 h-6 text-emerald-400" />
                <h4 className="text-base font-serif font-bold text-white">Guaranteed Payouts</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  No more chasing unpaid invoices. 100% of client shoot funds are bonded in escrow before you pack your camera bags.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card space-y-3">
                <Compass className="w-6 h-6 text-emerald-400" />
                <h4 className="text-base font-serif font-bold text-white">Curated High-Budget Clients</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Get discovered by discerning couples, luxury brand directors, and agencies looking for top-tier craftsmanship.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card space-y-3">
                <Award className="w-6 h-6 text-emerald-400" />
                <h4 className="text-base font-serif font-bold text-white">Studio Media Hosting</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Showcase your 4K lookbook, manage rate cards, and receive booking inquiries through your custom studio profile.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 05: FAQ ACCORDION
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 block">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Platform Capabilities FAQ
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Everything you need to know about our technology, guarantees, and escrow protection.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, fIdx) => {
            const isOpen = openFaqIndex === fIdx;
            return (
              <div
                key={fIdx}
                className="rounded-xl glass-card overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                  className="w-full p-5 flex items-center justify-between text-left gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-sm font-bold text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 animate-slide-up">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 06: CALL TO ACTION BANNER
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 rounded-2xl glass-panel text-white border-cyan-500/30 shadow-2xl text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 block">
              Ready to Begin?
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight uppercase">
              Experience the Future of Creative Production.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Find your ideal visual storyteller today or join our verified creator roster.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setMatchmakerOpen(true)}
              rightIcon={<Sparkles className="w-4 h-4" />}
            >
              Launch AI Matchmaker
            </Button>
            <button
              onClick={() => setCreatorModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-all hover:border-cyan-400/50"
            >
              Apply as Creator
            </button>
          </div>
        </div>
      </section>

      {/* Interactive AI Matchmaker Modal */}
      <AiMatchmakerModal
        isOpen={matchmakerOpen}
        onClose={() => setMatchmakerOpen(false)}
      />

      {/* Creator Application Modal */}
      <CreatorOnboardingModal
        isOpen={creatorModalOpen}
        onClose={() => setCreatorModalOpen(false)}
      />
    </div>
  );
};

export default FeaturesPage;
