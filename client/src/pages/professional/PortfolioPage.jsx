import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Sparkles,
  Brain,
  CheckCircle2,
  AlertCircle,
  Wand2,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Edit3,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { usePlatform } from '../../hooks/usePlatform';
import { useToast } from '../../hooks/useToast';
import { aiService } from '../../services/aiService';

// Canonical 9 photography categories
export const CANONICAL_CATEGORIES = [
  'Wedding photography',
  'Portrait photography',
  'Fashion photography',
  'Nature and landscape photography',
  'Product photography',
  'Event photography',
  'Food photography',
  'Architecture and interior photography',
  'Other or uncertain',
];

// Sample showcase images for quick demonstration and testing
const SAMPLE_PRESETS = [
  {
    name: 'Wedding',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    title: 'Heritage Palace Bridal Session',
  },
  {
    name: 'Portrait',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    title: 'Studio Golden Hour Headshot',
  },
  {
    name: 'Nature & Landscape',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    title: 'Alpine Valley Sunset Vista',
  },
  {
    name: 'Food',
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
    title: 'Gourmet Culinary Plating',
  },
  {
    name: 'Architecture',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    title: 'Modern Minimalist Villa Facade',
  },
];

const PortfolioPage = () => {
  const { professionals, addPortfolioItem, updatePortfolioItemAiClassification, deletePortfolioItem } = usePlatform();
  const { success, error, info } = useToast();
  const currentPro = professionals[0] || {};
  const items = currentPro.portfolio || [];

  // Filter state
  const [activeCategory, setActiveCategory] = useState('All');

  // Modal upload state
  const [modalOpen, setModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Wedding photography',
    url: '',
    mediaType: 'image',
    tags: '',
  });

  // AI Classification state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [isAiConfirmed, setIsAiConfirmed] = useState(false);
  const [isOverridden, setIsOverridden] = useState(false);

  // Review modal state for existing items
  const [reviewItem, setReviewItem] = useState(null);

  // Trigger AI Image Classification
  const handleAnalyzeImage = async (urlToAnalyze = newItem.url) => {
    const targetUrl = urlToAnalyze.trim();
    if (!targetUrl) {
      error('Please enter an image URL to analyze.');
      return;
    }

    try {
      setIsAnalyzing(true);
      const res = await aiService.classifyImage(targetUrl);
      const data = res.data || res;

      setAiResult(data);
      // Auto-set the suggested category into the form
      if (data.suggestedCategory && data.suggestedCategory !== 'Other or uncertain') {
        setNewItem((prev) => ({ ...prev, category: data.suggestedCategory }));
        setIsAiConfirmed(true);
        setIsOverridden(false);
      } else {
        setIsAiConfirmed(false);
        setIsOverridden(false);
      }
      success(`AI classified as "${data.suggestedCategory}" (${Math.round((data.confidence || 0) * 100)}% confidence)`);
    } catch (err) {
      console.error('AI Classification failed:', err);
      error(err.message || 'Computer Vision analysis failed.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Populate preset sample
  const handleSelectPreset = (preset) => {
    setNewItem((prev) => ({
      ...prev,
      url: preset.url,
      title: preset.title,
    }));
    handleAnalyzeImage(preset.url);
  };

  // Manual category change
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setNewItem((prev) => ({ ...prev, category: selected }));

    if (aiResult) {
      if (selected !== aiResult.suggestedCategory) {
        setIsOverridden(true);
        setIsAiConfirmed(false);
      } else {
        setIsOverridden(false);
        setIsAiConfirmed(true);
      }
    }
  };

  // Save new portfolio item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.title.trim() || !newItem.url.trim()) {
      error('Please provide both a title and media URL.');
      return;
    }

    const payload = {
      ...newItem,
      aiClassification: aiResult
        ? {
            suggestedCategory: aiResult.suggestedCategory,
            confidence: aiResult.confidence,
            allPredictions: aiResult.allPredictions,
            isConfirmedByUser: isAiConfirmed,
            isOverridden: isOverridden,
            modelName: aiResult.modelName || 'clip-vit-base-patch32',
            needsReview: aiResult.needsReview || false,
            classifiedAt: new Date().toISOString(),
          }
        : undefined,
    };

    addPortfolioItem(currentPro.id, payload);
    setModalOpen(false);
    success('Portfolio item published to your public gallery!');

    // Reset form
    setNewItem({
      title: '',
      category: 'Wedding photography',
      url: '',
      mediaType: 'image',
      tags: '',
    });
    setAiResult(null);
    setIsAiConfirmed(false);
    setIsOverridden(false);
  };

  // Delete portfolio item
  const handleDelete = (id) => {
    deletePortfolioItem(currentPro.id, id);
    success('Portfolio media removed from public studio.');
  };

  // Update classification on existing item
  const handleSaveReview = (item, newCat, confirmed, overridden) => {
    if (updatePortfolioItemAiClassification) {
      updatePortfolioItemAiClassification(currentPro.id, item.id, {
        category: newCat,
        isConfirmedByUser: confirmed,
        isOverridden: overridden,
      });
    }
    setReviewItem(null);
    success(`Updated category to "${newCat}"`);
  };

  // Filter items by category tab
  const filteredItems = items.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  // Calculate metrics
  const totalItems = items.length;
  const aiClassifiedCount = items.filter((i) => i.aiClassification?.suggestedCategory).length;
  const verifiedCount = items.filter((i) => i.aiClassification?.isConfirmedByUser).length;

  return (
    <div className="space-y-6 text-left animate-reveal">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-500/15">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
            <Brain className="w-3.5 h-3.5" />
            <span>AI Computer Vision Media Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Studio Portfolio <span className="text-gradient-cyan">Gallery</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Automatic photography style categorization powered by Zero-Shot Multimodal Computer Vision (OpenAI CLIP).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setModalOpen(true);
              setAiResult(null);
              setIsAiConfirmed(false);
              setIsOverridden(false);
            }}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Upload New Work
          </Button>
        </div>
      </div>

      {/* AI Intelligence Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl glass-card border border-sky-500/15">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Total Works</span>
          <span className="text-xl font-bold font-display text-white mt-0.5 block">{totalItems}</span>
        </div>
        <div className="p-3.5 rounded-xl glass-card border border-cyan-500/20 bg-cyan-950/20">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> AI Analyzed
          </span>
          <span className="text-xl font-bold font-display text-cyan-200 mt-0.5 block">{aiClassifiedCount}</span>
        </div>
        <div className="p-3.5 rounded-xl glass-card border border-emerald-500/20 bg-emerald-950/20">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Verified by Creator
          </span>
          <span className="text-xl font-bold font-display text-emerald-200 mt-0.5 block">{verifiedCount}</span>
        </div>
        <div className="p-3.5 rounded-xl glass-card border border-sky-500/15">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Vision Model</span>
          <span className="text-xs font-mono font-medium text-sky-300 mt-1 block truncate">CLIP ViT-B/32</span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        <button
          type="button"
          onClick={() => setActiveCategory('All')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            activeCategory === 'All'
              ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          All Categories ({items.length})
        </button>
        {CANONICAL_CATEGORIES.map((cat) => {
          const count = items.filter((i) => i.category?.toLowerCase() === cat.toLowerCase()).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>{cat}</span>
              {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory.toLowerCase() === cat.toLowerCase() ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Portfolio Gallery Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const aiData = item.aiClassification;
            const hasAi = !!aiData?.suggestedCategory;
            const confidencePct = Math.round((aiData?.confidence || 0) * 100);

            return (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden glass-card border border-sky-500/20 shadow-lg hover:border-cyan-400/50 transition-all duration-300"
              >
                {/* Image & Overlay */}
                <div className="aspect-square bg-midnight-950 overflow-hidden relative">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* AI Style Pill Badge on Image */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[85%]">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider bg-midnight-950/85 backdrop-blur-md text-cyan-300 border border-cyan-500/30 flex items-center gap-1 shadow-md">
                      <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                      {item.category}
                    </span>

                    {hasAi && (
                      <span
                        className={`px-2 py-1 rounded-full text-[9px] font-mono font-medium backdrop-blur-md border shadow-md flex items-center gap-1 ${
                          aiData.isOverridden
                            ? 'bg-purple-950/85 text-purple-300 border-purple-500/40'
                            : confidencePct >= 70
                            ? 'bg-emerald-950/85 text-emerald-300 border-emerald-500/40'
                            : 'bg-amber-950/85 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        {aiData.isOverridden ? (
                          <>
                            <Edit3 className="w-2.5 h-2.5" />
                            Overridden
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            {confidencePct}% AI Match
                          </>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="p-4 bg-midnight-900/90 border-t border-sky-500/15 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="text-sm font-display font-bold text-white truncate">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1 truncate">
                      <span>Category: {item.category}</span>
                      {hasAi && !aiData.isOverridden && (
                        <span className="text-emerald-400 font-mono text-[10px]">· Verified</span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setReviewItem(item)}
                      className="p-1.5 rounded-lg hover:bg-sky-500/10 text-slate-400 hover:text-cyan-400 transition-colors"
                      title="Inspect & Adjust AI Classification"
                    >
                      <Brain className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete media"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center glass-card rounded-2xl border border-sky-500/20">
          <Brain className="w-10 h-10 text-cyan-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-white">No portfolio works found</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            {activeCategory === 'All'
              ? 'Upload your creative works and let the Computer Vision AI categorize them automatically.'
              : `No items uploaded under "${activeCategory}" yet.`}
          </p>
          <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Upload New Work
          </Button>
        </div>
      )}

      {/* ========================================================== */}
      {/* Upload Modal with Live Computer Vision Style Assistant */}
      {/* ========================================================== */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Upload Portfolio Work & AI Style Classifier"
      >
        <form onSubmit={handleAddItem} className="space-y-4">
          {/* Quick Presets Picker */}
          <div>
            <label className="block text-[11px] font-semibold uppercase font-mono tracking-wider text-slate-300 mb-1.5">
              Quick Test Presets (Click to Demo)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => handleSelectPreset(p)}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-sky-950/40 border border-sky-500/20 text-sky-300 hover:bg-cyan-500/20 hover:border-cyan-400/40 transition-all font-mono"
                >
                  ⚡ {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Media URL Input with inline AI Scan Button */}
          <div className="space-y-1.5 text-left">
            <label className="block text-[11px] font-semibold uppercase font-mono tracking-wider text-slate-300">
              Media Image URL *
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/photo-..."
                value={newItem.url}
                onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                onBlur={() => {
                  if (newItem.url.trim() && !aiResult && !isAnalyzing) {
                    handleAnalyzeImage(newItem.url);
                  }
                }}
                className="w-full rounded-xl bg-slate-900/90 border border-sky-500/20 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 px-3.5 py-2.5 text-xs sm:text-sm text-white transition-all focus:outline-none backdrop-blur-md"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleAnalyzeImage(newItem.url)}
                disabled={isAnalyzing || !newItem.url.trim()}
                leftIcon={
                  isAnalyzing ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  ) : (
                    <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
                  )
                }
              >
                {isAnalyzing ? 'Scanning...' : 'Scan AI'}
              </Button>
            </div>
          </div>

          {/* Real-time Image Preview */}
          {newItem.url.trim() && (
            <div className="relative rounded-xl overflow-hidden border border-sky-500/20 bg-slate-950 aspect-video max-h-44 flex items-center justify-center">
              <img
                src={newItem.url}
                alt="Upload preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping" />
                    <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin flex items-center justify-center" />
                    <Brain className="w-5 h-5 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-medium">
                    Analyzing Photographic Genre with CLIP...
                  </span>
                </div>
              )}
            </div>
          )}

          {/* AI Style Assistant Results Box */}
          {aiResult && (
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 to-slate-900/50 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  AI Style Suggestion
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border ${
                    aiResult.confidence >= 0.70
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                      : aiResult.confidence >= 0.40
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {Math.round((aiResult.confidence || 0) * 100)}% Confidence
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 bg-midnight-950/70 p-2.5 rounded-lg border border-sky-500/15">
                <div>
                  <div className="text-sm font-bold text-white font-display">
                    {aiResult.suggestedCategory}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Model: {aiResult.modelName || 'clip-vit-base-patch32'}
                  </div>
                </div>

                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setNewItem((prev) => ({ ...prev, category: aiResult.suggestedCategory }));
                    setIsAiConfirmed(true);
                    setIsOverridden(false);
                    info(`Selected AI suggestion: ${aiResult.suggestedCategory}`);
                  }}
                  leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                >
                  {isAiConfirmed ? 'Accepted' : 'Accept AI Style'}
                </Button>
              </div>

              {/* Alternative predictions bar */}
              {aiResult.allPredictions?.length > 1 && (
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">
                    Alternative Genre Predictions:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {aiResult.allPredictions.slice(1, 5).map((pred) => (
                      <button
                        key={pred.category}
                        type="button"
                        onClick={() => {
                          setNewItem((prev) => ({ ...prev, category: pred.category }));
                          setIsOverridden(true);
                          setIsAiConfirmed(false);
                        }}
                        className="text-left p-1.5 rounded-lg bg-slate-900/60 hover:bg-sky-500/15 border border-sky-500/10 text-[10px] text-slate-300 flex items-center justify-between transition-colors"
                      >
                        <span className="truncate pr-1">{pred.category.replace(' photography', '')}</span>
                        <span className="font-mono text-cyan-400 shrink-0">
                          {Math.round(pred.confidence * 100)}%
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Work Title Input */}
          <Input
            label="Work / Shoot Title *"
            required
            placeholder="e.g. Udaipur Palace Sunset Bridal Session"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          />

          {/* Category Dropdown (with Manual Override indicator) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-semibold uppercase font-mono tracking-wider text-slate-300">
                Assigned Category *
              </label>
              {isOverridden && (
                <span className="text-[10px] font-mono text-purple-400 font-semibold flex items-center gap-1">
                  <Edit3 className="w-3 h-3" /> Manually Overridden
                </span>
              )}
              {isAiConfirmed && !isOverridden && (
                <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> AI Confirmed
                </span>
              )}
            </div>
            <Select
              value={newItem.category}
              onChange={handleCategoryChange}
              options={CANONICAL_CATEGORIES.map((cat) => ({
                label: cat,
                value: cat,
              }))}
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-3 flex justify-end gap-2 border-t border-sky-500/15">
            <Button variant="ghost" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save & Publish Work
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================== */}
      {/* Review Modal for existing portfolio item */}
      {/* ========================================================== */}
      {reviewItem && (
        <Modal
          isOpen={!!reviewItem}
          onClose={() => setReviewItem(null)}
          title="Review Photographic Category"
        >
          <div className="space-y-4 text-left">
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-950 border border-sky-500/20">
              <img src={reviewItem.url} alt={reviewItem.title} className="w-full h-full object-cover" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">{reviewItem.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Current Style: <span className="text-cyan-300 font-semibold">{reviewItem.category}</span>
              </p>
            </div>

            {reviewItem.aiClassification && (
              <div className="p-3 rounded-xl bg-slate-900/80 border border-sky-500/15 space-y-2">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                  Original AI Inference Data
                </span>
                <div className="text-xs text-slate-300 space-y-1">
                  <div>Suggested: {reviewItem.aiClassification.suggestedCategory}</div>
                  <div>Confidence: {Math.round((reviewItem.aiClassification.confidence || 0) * 100)}%</div>
                  <div>Model: {reviewItem.aiClassification.modelName}</div>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase font-mono tracking-wider text-slate-300">
                Change or Override Style
              </label>
              <Select
                value={reviewItem.category}
                onChange={(e) => setReviewItem({ ...reviewItem, category: e.target.value })}
                options={CANONICAL_CATEGORIES.map((cat) => ({
                  label: cat,
                  value: cat,
                }))}
              />
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-sky-500/15">
              <Button variant="ghost" size="sm" type="button" onClick={() => setReviewItem(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  handleSaveReview(
                    reviewItem,
                    reviewItem.category,
                    true,
                    reviewItem.category !== reviewItem.aiClassification?.suggestedCategory
                  )
                }
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PortfolioPage;
