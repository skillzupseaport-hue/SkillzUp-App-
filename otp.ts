// Lightweight demo-only OTP storage using localStorage. Not suitable for production.
type PendingUser = {
  id: string
  name: string
  email: string
  phone: string
  password: string
  createdAt: string
}

const otpKey = (email: string) => `skillzup_otp_${email.toLowerCase()}`
const pendingKey = (email: string) => `skillzup_pending_user_${email.toLowerCase()}`

export function generateAndStoreOtp(email: string, ttlSeconds = 300) {
  if (typeof window === "undefined") return null
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = Date.now() + ttlSeconds * 1000
  localStorage.setItem(otpKey(email), JSON.stringify({ code, expiresAt }))
  return { code, expiresAt }
}

export function verifyOtp(email: string, code: string) {
  if (typeof window === "undefined") return false
  const raw = localStorage.getItem(otpKey(email))
  if (!raw) return false
  const { code: stored, expiresAt } = JSON.parse(raw) as { code: string; expiresAt: number }
  const valid = Date.now() <= expiresAt && stored === code
  return valid
}

export function clearOtp(email: string) {
  if (typeof window === "undefined") return
  localStorage.removeItem(otpKey(email))
}

export function storePendingUser(email: string, user: PendingUser) {
  if (typeof window === "undefined") return
  localStorage.setItem(pendingKey(email), JSON.stringify(user))
}

export function getPendingUser(email: string): PendingUser | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(pendingKey(email))
  return raw ? (JSON.parse(raw) as PendingUser) : null
}

export function clearPendingUser(email: string) {
  if (typeof window === "undefined") return
  localStorage.removeItem(pendingKey(email))
}

export function maskEmail(email: string) {
  const [user, domain] = email.split("@")
  if (!user || !domain) return email
  const visible = user.slice(0, 2)
  const masked = "*".repeat(Math.max(2, user.length - 2))
  return `${visible}${masked}@${domain}`
}

export function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "")
  if (digits.length <= 4) return phone
  const last4 = digits.slice(-4)
  return `${"*".repeat(Math.max(0, digits.length - 4))}${last4}`
}
