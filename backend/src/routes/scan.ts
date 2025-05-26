import express from 'express';
import multer from 'multer';
import { analyzeImage } from '../services/visionService';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authMiddleware, upload.single('image'), async (req: AuthRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Check user's subscription
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id },
    });

    if (!subscription) {
      return res.status(403).json({ error: 'No active subscription' });
    }

    // Check if user has exceeded free tier limits
    if (subscription.plan === 'FREE') {
      const scanCount = await prisma.scan.count({
        where: { userId: req.user.id },
      });

      if (scanCount >= 10) {
        return res.status(403).json({ 
          error: 'Free tier limit reached',
          message: 'Please upgrade to continue scanning'
        });
      }
    }

    const result = await analyzeImage(req.file.buffer);

    // Store scan result
    await prisma.scan.create({
      data: {
        userId: req.user.id,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        sensitiveData: result.sensitiveData,
        encryptionStatus: result.encryptionStatus,
      },
    });

    res.json(result);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

export default router; 