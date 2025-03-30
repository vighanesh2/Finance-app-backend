import express, { RequestHandler } from 'express';
import Business from '../models/Business';

const router = express.Router();

/**
 * @swagger
 * /api/businesses:
 *   get:
 *     summary: Get all businesses
 *     tags: [Businesses]
 *     responses:
 *       200:
 *         description: List of businesses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   image:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   daysLeft:
 *                     type: number
 *                   progress:
 *                     type: number
 *                   favorite:
 *                     type: boolean
 *                   category:
 *                     type: string
 */
router.get('/', (async (req, res) => {
  try {
    console.log('Fetching all businesses...');
    const businesses = await Business.find();
    console.log('Found businesses:', businesses);
    res.json(businesses);
  } catch (error) {
    console.error('Error in GET /:', error);
    res.status(500).json({ 
      message: 'Error fetching businesses', 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RequestHandler);

/**
 * @swagger
 * /api/businesses/category/{category}:
 *   get:
 *     summary: Get businesses by category
 *     tags: [Businesses]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Category to filter businesses
 *     responses:
 *       200:
 *         description: List of businesses in the category
 */
router.get('/category/:category', (async (req, res) => {
  try {
    const { category } = req.params;
    console.log('Fetching businesses for category:', category);
    const businesses = category === 'all' 
      ? await Business.find()
      : await Business.find({ category });
    console.log('Found businesses:', businesses);
    res.json(businesses);
  } catch (error) {
    console.error('Error in GET /category/:category:', error);
    res.status(500).json({ 
      message: 'Error fetching businesses by category', 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RequestHandler);

/**
 * @swagger
 * /api/businesses/{id}/favorite:
 *   patch:
 *     summary: Toggle favorite status of a business
 *     tags: [Businesses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business ID
 *     responses:
 *       200:
 *         description: Updated business
 *       404:
 *         description: Business not found
 */
router.patch('/:id/favorite', (async (req, res) => {
  try {
    console.log('Toggling favorite for business:', req.params.id);
    const business = await Business.findById(req.params.id);
    if (!business) {
      console.log('Business not found:', req.params.id);
      return res.status(404).json({ message: 'Business not found' });
    }
    business.favorite = !business.favorite;
    await business.save();
    console.log('Updated business:', business);
    res.json(business);
  } catch (error) {
    console.error('Error in PATCH /:id/favorite:', error);
    res.status(500).json({ 
      message: 'Error updating favorite status', 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RequestHandler);

export default router; 