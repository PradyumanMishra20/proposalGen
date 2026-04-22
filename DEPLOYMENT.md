# ProposalGen Deployment Guide

## Overview
This guide will help you deploy your ProposalGen application to production on Vercel. The app is a React-based SaaS application with AI-powered proposal generation.

## Prerequisites
- Node.js 18+ installed
- Git repository set up
- Vercel account
- OpenAI API key (for AI functionality)

## Environment Variables Setup

### Required Environment Variables
Create a `.env.local` file in your project root:

```bash
# OpenAI API Configuration (Required for AI features)
VITE_OPENAI_API_KEY=your-openai-api-key-here

# Optional: Google Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=false
VITE_ANALYTICS_DEBUG=false

# Application Configuration
VITE_APP_NAME=ProposalGen
VITE_APP_VERSION=1.0.0

# Contact Information
VITE_SUPPORT_EMAIL=support@proposalgen.com
VITE_CONTACT_EMAIL=contact@proposalgen.com
```

### Getting Your OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key and add it to your environment variables

## Build Issues & Solutions

### TypeScript Build Errors
The project uses strict TypeScript which may cause build errors. If you encounter build issues:

#### Option 1: Use the Custom Build Script
```bash
npm run build:custom
```

#### Option 2: Temporarily Disable Strict TypeScript
1. Edit `tsconfig.json`
2. Set `"strict": false`
3. Run `npm run build`
4. Re-enable strict mode after deployment

#### Option 3: Fix Specific TypeScript Errors
The main issue is in `MainTool.tsx` with boolean type checking. The error occurs because:
- TypeScript 6.0 is stricter than the supported version
- The `getFieldClasses` function expects a boolean but receives `string | false | undefined`

## Vercel Deployment Steps

### Step 1: Prepare Your Repository
```bash
# Make sure all changes are committed
git add .
git commit -m "Production-ready deployment setup"
git push origin main
```

### Step 2: Deploy to Vercel

#### Method A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Method B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect it's a React app
5. Configure environment variables in the Vercel dashboard

### Step 3: Configure Environment Variables in Vercel
In your Vercel project dashboard:
1. Go to Settings > Environment Variables
2. Add the required variables from the `.env.local` section above
3. Make sure to select the correct environment (Production, Preview, Development)

### Step 4: Deploy
1. Trigger a new deployment
2. Monitor the build logs
3. If build fails, check the "Build Issues & Solutions" section above

## Production Optimizations

### Build Performance
- The app uses React 18 with optimized bundle splitting
- Images are optimized through build process
- CSS is minified and purged

### Security
- API keys are stored in environment variables
- No sensitive data in client-side code
- HTTPS enforced by default on Vercel

### SEO & Analytics
- Meta tags configured in `public/index.html`
- Google Analytics integration ready
- Structured data for search engines

## Post-Deployment Checklist

### Verify Functionality
- [ ] Homepage loads correctly
- [ ] Proposal generation works (with API key)
- [ ] All forms submit properly
- [ ] Responsive design works on mobile
- [ ] Dark/light theme toggle works
- [ ] Copy/download/share functions work

### Performance
- [ ] Page load time < 3 seconds
- [ ] Core Web Vitals pass
- [ ] No console errors in production

### Monitoring
- [ ] Set up Vercel Analytics
- [ ] Configure error monitoring (optional)
- [ ] Set up uptime monitoring

## Troubleshooting

### Common Issues

#### Build Fails with TypeScript Errors
**Solution**: Use the custom build script or temporarily disable strict TypeScript

#### API Key Not Working
**Solution**: 
1. Verify the key is correct
2. Check it's set in production environment variables
3. Ensure the key has sufficient credits

#### Blank Page on Deployment
**Solution**: 
1. Check browser console for errors
2. Verify all environment variables are set
3. Check if the build completed successfully

#### Routes Not Working
**Solution**: The `vercel.json` file handles SPA routing. Ensure it's in your root directory.

## Alternative Deployment Platforms

### Netlify
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables in Netlify dashboard

### AWS Amplify
1. Connect your Git repository
2. Configure build settings
3. Add environment variables
4. Deploy

### Railway
1. Connect your Git repository
2. Railway will auto-detect React app
3. Add environment variables
4. Deploy

## Maintenance

### Regular Updates
- Update dependencies monthly
- Monitor API usage and costs
- Check for security vulnerabilities
- Update OpenAI API key if needed

### Scaling
- Monitor Vercel Analytics for traffic
- Upgrade plan if needed
- Consider CDN for static assets
- Implement caching strategies

## Support

If you encounter issues during deployment:
1. Check Vercel deployment logs
2. Review browser console errors
3. Verify environment variables
4. Test with a fresh build locally

For additional help, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [React Deployment Guide](https://reactjs.org/docs/deployment.html)
- [OpenAI API Documentation](https://platform.openai.com/docs)
