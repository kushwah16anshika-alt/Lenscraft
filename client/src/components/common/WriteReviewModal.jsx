import React, { useState } from 'react';
import { Star, X, Sparkles, Send } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import Textarea from './Textarea';
import Input from './Input';
import { usePlatform } from '../../hooks/usePlatform';
import { useToast } from '../../hooks/useToast';

const WriteReviewModal = ({ isOpen, onClose, professional, booking }) => {
  const { addReview } = usePlatform();
  const { success, error } = useToast();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [eventType, setEventType] = useState(booking?.eventType || 'Wedding Shoot');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const targetPro = professional || booking?.professional;
  const proId = targetPro?.id || booking?.professionalId || 'pro-1';
  const proName = targetPro?.name || booking?.professionalName || 'Aarav Mehta';
  const proAvatar = targetPro?.avatar || booking?.professionalAvatar;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      error('Please write a brief comment describing your experience.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addReview({
        creatorId: proId,
        creatorName: proName,
        creatorAvatar: proAvatar,
        rating,
        event: eventType,
        comment,
      });

      setIsSubmitting(false);
      success(`Thank you! Your ${rating}-star review for ${proName} has been published.`);
      setComment('');
      onClose();
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Write Review for ${proName}`}>
      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1.5">
            Overall Experience Rating
          </label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1 text-[#D9A354] hover:scale-110 transition-transform"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-7 h-7 ${
                    (hoverRating || rating) >= star
                      ? 'fill-[#D9A354] text-[#D9A354]'
                      : 'text-[#D0C7B8]'
                  }`}
                />
              </button>
            ))}
            <span className="text-xs font-bold text-[#171717] ml-2">
              {rating === 5 ? '5.0 — Exceptional' : `${rating}.0 / 5.0`}
            </span>
          </div>
        </div>

        <Input
          label="Occasion / Project Type"
          placeholder="e.g. Royal Wedding in Udaipur, Brand Commercial..."
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          required
        />

        <Textarea
          label="Your Feedback & Review"
          rows={4}
          placeholder="Describe punctuality, visual aesthetics, communication, and turnaround speed..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <div className="pt-3 border-t border-[#E8E2D8] flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            isLoading={isSubmitting}
            leftIcon={<Send className="w-3.5 h-3.5" />}
          >
            Submit Review
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default WriteReviewModal;
