# Auth API reference

All routes start with `/auth`. Send JSON with `Content-Type: application/json`.
For browser requests, use `credentials: "include"` so the login cookie is stored and sent.

## Endpoints

**PROJECT_URL** `https://citylens.up.railway.app/`

### Sign up

**POST** `/api/auth/signup`

Send:

```json
{
  "firstName": "Alex",
  "lastName": "Example",
  "email": "alex@example.com",
  "password": "password123"
}
```

`firstName`: 3-30 characters (use at least 3);
`lastName`: 3-30 characters (use at least 3);
`email`: valid email;
`password`: 8-20 characters.

Optional:
`provider` (`local`, `google`, or `facebook`; defaults to `local`),
`gender` (`male` or `female`).

Returns:
`{ "message": "User created successfully", "success": true }`. A verification code is emailed;
verify the account before logging in.

### Verify account

**PATCH** `/api/auth/verify-account`

Send: `{ "email": "alex@example.com", "code": "123456" }`

`code` must be six characters. The code expires after 15 minutes.

Returns: `{ "message": "User verified successfully", "success": true }`.

### Log in

**POST** `/api/auth/login`

Send: `{ "email": "alex@example.com", "password": "password123" }`

Returns:

```json
{
  "message": "User Logged in successfully",
  "success": true,
  "data": {
    "id": "USER_ID",
    "email": "alex@example.com",
    "name": "Alex Example",
    "role": "citizen"
  }
}
```

Also sets an `access_token` cookie (one hour). The token is not returned in the JSON body.

### Log out

**POST** `/api/auth/logout`

Send no request body. Include browser credentials so the existing cookie is sent.

Returns: `{ "message": "Logged out successfully", "success": true }`. The response clears the `access_token` cookie.

### Send password-reset code

**POST** `/api/auth/send-otp`

Send: `{ "email": "alex@example.com" }`

Returns: `{ "message": "OTP sent successfully, check your email", "success": true }`. The code expires after 15 minutes.

### Verify one-time code

**POST** `/api/auth/verify-otp`

Send: `{ "email": "alex@example.com", "code": "123456" }`

Returns: `{ "message": "OTP verified successfully", "success": true }`. This consumes the code; for password reset, send the code directly to `/auth/reset-password` instead.

### Reset password

**PATCH** `/api/auth/reset-password`

Send: `{ "email": "alex@example.com", "code": "123456", "newPassword": "newpassword123" }`

`code` must be six characters. `newPassword` is validated as 2-20 characters; use at least 8.

Returns: `{ "message": "Password reset successfully", "success": true }`.

Send a unique `Idempotency-Key` header (for example, a UUID) with each reset attempt.

## Errors and notes

Errors return JSON with `success: false` and a `message`; validation errors use HTTP 400. Common statuses: 403 for an unverified account or invalid login, 404 for a missing user or expired code, and 409 for an existing account. Show the `message` to the user; do not show `stack` if present.

Login requires a verified account. There is currently no token-refresh, or social-login endpoint. The frontend origin must match the backend's configured CORS origin for cookie requests to work.
