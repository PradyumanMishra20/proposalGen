# Pre-Deployment Checklist

## Build Verification
- [ ] Run `npm run type-check` - Ensure no TypeScript errors
- [ ] Run `npm run build` - Ensure build completes successfully
- [ ] Check build output size - Should be optimized (< 5MB total)
- [ ] Test build locally - Serve build folder and verify functionality

## Environment Variables
- [ ] Create `.env.local` with required variables
- [ ] Verify `VITE_OPENAI_API_KEY` is set (required for AI features)
- [ ] Update `.env.example` with current variables
- [ ] Update `vercel.json` with correct environment variable names

## Code Quality
- [ ] Remove unused imports and variables
- [ ] Fix ESLint warnings (optional but recommended)
- [ ] Ensure all console.log statements are removed from production
- [ ] Verify error handling is in place

## Performance & SEO
- [ ] Check page load performance
- [ ] Verify meta tags in `public/index.html`
- [ ] Ensure favicon is present
- [ ] Test responsive design on multiple screen sizes

## Security
- [ ] No hardcoded secrets in source code
- [ ] Environment variables properly configured
- [ ] HTTPS enforced (automatic on Vercel)
- [ ] API keys are server-side only (if applicable)

## Functionality Tests
- [ ] Homepage loads correctly
- [ ] Proposal generation works (with API key)
- [ ] Form validation works properly
- [ ] Copy/download/share functions work
- [ ] Dark/light theme toggle works
- [ ] Mobile navigation works

## Deployment Configuration
- [ ] `vercel.json` is properly configured
- [ ] Build command: `npm run build`
- [ ] Output directory: `build`
- [ ] SPA routing configured (rewrites to index.html)

## Git Repository
- [ ] All changes committed
- [ ] `.gitignore` excludes sensitive files
- [ ] No build artifacts in repository
- [ ] Clean working directory

## Vercel Setup
- [ ] Vercel account created
- [ ] Git repository connected
- [ ] Environment variables set in Vercel dashboard
- [ ] Custom domain configured (if applicable)

## Post-Deployment
- [ ] Monitor first deployment build
- [ ] Test all functionality on deployed URL
- [ ] Check browser console for errors
- [ ] Verify analytics are working (if configured)

## Rollback Plan
- [ ] Previous version tagged in Git
- [ ] Rollback procedure documented
- [ ] Backup plan in place

---

## Quick Deployment Commands

```bash
# 1. Final build test
npm run build

# 2. Deploy to Vercel
vercel --prod

# 3. Monitor deployment
vercel logs
```

## Environment Variables Template

Copy these to your Vercel project settings:

```
VITE_OPENAI_API_KEY=your-openai-api-key
VITE_APP_NAME=ProposalGen
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=false
VITE_SUPPORT_EMAIL=support@proposalgen.com
VITE_CONTACT_EMAIL=contact@proposalgen.com
```

---

**Ready for deployment when all items are checked!**
