import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
      index: true,
    },
    sender: {
      type: String,
      required: true,
    },
    senderRole: {
      type: String,
      enum: ['client', 'creator', 'user', 'photographer', 'videographer', 'editor', 'admin'],
      default: 'client',
    },
    senderName: {
      type: String,
      required: true,
    },
    senderAvatar: {
      type: String,
      default: '',
    },
    recipient: {
      type: String,
      required: true,
    },
    recipientName: {
      type: String,
      default: '',
    },
    creatorId: {
      type: String,
      required: true,
      index: true,
    },
    creatorName: {
      type: String,
      default: '',
    },
    creatorAvatar: {
      type: String,
      default: '',
    },
    clientId: {
      type: String,
      required: true,
      index: true,
    },
    clientName: {
      type: String,
      default: '',
    },
    clientAvatar: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      required: [true, 'Message text is required'],
      trim: true,
      maxlength: [4000, 'Message cannot exceed 4000 characters'],
    },
    attachments: [
      {
        url: { type: String },
        type: { type: String, default: 'image' },
        name: { type: String },
      },
    ],
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ conversationId: 1, createdAt: 1 });
messageSchema.index({ creatorId: 1, clientId: 1 });

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;
