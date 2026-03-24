# Claude Instructions for This Repository

## 🚨 MANDATORY: TypeScript Check Before EVERY Commit (NON-NEGOTIABLE)

**Before EVERY `git commit`, run `npx tsc --noEmit`. If it has ANY errors, DO NOT commit. Fix all errors first.**

```bash
# MUST run this before EVERY commit:
npx tsc --noEmit

# Only if exit code 0 → commit and push
git add -A && git commit -m "your message" && git push origin main
```

**Common mistakes that WILL break CI:**
- Importing a component that doesn't exist → create the file AND add to barrel export
- Emitting bus events with fields not in the type → update the type definition
- Passing JSX props not in the component's Props interface → add to interface or remove prop

See `skills/mandatory-typecheck/SKILL.md` for the full protocol.

## Code Safety Rules

1. Use `.maybeSingle()` instead of `.single()` for Supabase queries
2. Always handle null/undefined gracefully
3. Verify changes compile before pushing: `npx tsc --noEmit`
4. After pushing, check CI status and Vercel deployment status
