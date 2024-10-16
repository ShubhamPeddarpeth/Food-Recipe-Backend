import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
   if (!authHeader) {
     return res.status(401).json({ message: 'Unauthorized. Please log in.' });
   }

   try {
    
     if (authHeader) {
       jwt.verify(authHeader, 'secret', (err) => {
         if (err) return res.sendStatus(403);
         next();
        });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
          return res
            .status(403)
            .json({ message: 'Invalid Token. Please log in again.' });

    };
  }
