"use client";

import { LuLock, LuCheck } from "react-icons/lu";

export const SubscriptionTrackerAuthFlow = () => {
  return (
    <section id="auth-flow" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Session Transactions &amp; JWT Verification
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Authentication pairs MongoDB replica-set transactions with bcrypt password salting and
          stateless JWT bearer tokens for secure private route resolution.
        </p>
      </div>

      {/* Auth Flows ASCII */}
      <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto space-y-3">
        <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-800 pb-2">
          <span>REGISTRATION &amp; LOGIN AUTHENTICATION SEQUENCE</span>
          <span className="text-emerald-400">ACID + BCRYPT + JWT</span>
        </div>
        <pre className="leading-relaxed">
{`[ SIGN-UP PIPELINE ]
Client POST /api/v1/auth/sign-up { name, email, password }
       │
       ▼
[1. Start Mongoose Session] ──▶ session.startTransaction()
       │
       ▼
[2. Email Collision Check]  ──▶ User.findOne({ email }).session(session)
       │                        (Throws 409 Conflict if already exists)
       ▼
[3. Bcrypt Hash Generation] ──▶ bcrypt.genSalt(10) ──▶ bcrypt.hash(password, salt)
       │
       ▼
[4. User Persistence]       ──▶ User.create([{ name, email, password: hash }], { session })
       │
       ▼
[5. JWT Token Generation]   ──▶ jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
       │
       ▼
[6. Commit & Response]      ──▶ session.commitTransaction() ──▶ Return 201 Created
       │
       └─(If error anywhere)──▶ session.abortTransaction() ──▶ 100% Rollback (Zero Orphan Records)


[ SIGN-IN PIPELINE ]
Client POST /api/v1/auth/sign-in { email, password }
       │
       ▼
[1. User Lookup]            ──▶ User.findOne({ email }) (Returns 404 if not found)
       │
       ▼
[2. Password Verification]  ──▶ bcrypt.compare(password, user.password) (Returns 401 if mismatch)
       │
       ▼
[3. JWT Token Generation]   ──▶ jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn })
       │
       ▼
[4. Authorized Session]     ──▶ Returns { success: true, token, user }`}
        </pre>
      </div>

      {/* Auth Middleware Card */}
      <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LuLock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">
              Bearer Token Guard (middlewares/auth.middleware.js)
            </h3>
          </div>
          <span className="font-mono text-xs text-neutral-400">Route Interceptor</span>
        </div>

        <div className="p-4 rounded-lg bg-neutral-900/80 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
          <pre className="leading-relaxed">
{`const authorize = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};`}
          </pre>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <LuCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Strict Bearer header format parsing</span>
          </div>
          <div className="flex items-center gap-2">
            <LuCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Cryptographic signature and expiry verification</span>
          </div>
          <div className="flex items-center gap-2">
            <LuCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Attaches hydrated user document to req.user</span>
          </div>
        </div>
      </div>
    </section>
  );
};
