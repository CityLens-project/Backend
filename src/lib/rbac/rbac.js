import { AppError } from "../../pkg/error/error.js";

export function roleGuard(...allowedRoles) {
  return (req, res, next) => {
    try {
      if (!req.user) {
        throw new AppError("Authentication required", 401);
      }

      if (!allowedRoles.includes(req.user.role)) {
        throw new AppError("Access denied", 403);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
