import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

interface AuthenticatedRequest extends Request {
  user?: any; // Add custom user object to request
}

export const protect = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1]; // Remove "Bearer "
      console.log(`The token is ${token}`);
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // You can attach user info here

      next(); // continue to the protected route
    } catch (error) {
      console.error('Token failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};
