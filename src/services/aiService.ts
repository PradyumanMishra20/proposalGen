import { ProposalData } from '../store/proposalStore';

// Types
interface AIProposalRequest {
  template: string;
  proposalData: ProposalData;
  tone?: string;
  length?: 'short' | 'medium' | 'long';
}

interface AIProposalResponse {
  success: boolean;
  proposal: string;
  error?: string;
  tokensUsed?: number;
}

// OpenAI API configuration
const OPENAI_CONFIG = {
  apiKey: process.env.REACT_APP_OPENAI_API_KEY || '',
  model: 'gpt-3.5-turbo',
  maxTokens: 1000,
  temperature: 0.7
};

// Template-specific prompts
const TEMPLATE_PROMPTS: Record<string, string> = {
  'web-design': `You are an expert web designer and proposal writer. Create a professional web design proposal for a freelance project. Focus on:
- Understanding client needs and goals
- Technical approach and technologies
- Design process and deliverables
- Timeline and milestones
- Pricing structure
- Your unique value proposition`,

  'development': `You are an experienced full-stack developer. Create a comprehensive development proposal for a freelance project. Include:
- Technical requirements analysis
- Architecture and technology stack
- Development methodology
- Testing and quality assurance
- Deployment and maintenance
- Project timeline and deliverables`,

  'marketing': `You are a digital marketing strategist. Create a compelling marketing proposal for a freelance project. Cover:
- Marketing objectives and KPIs
- Target audience analysis
- Strategy and tactics
- Content and channels
- Budget allocation
- Expected outcomes and ROI`,

  'consulting': `You are a business consultant. Create a professional consulting proposal for a freelance project. Address:
- Business problem analysis
- Consulting approach and methodology
- Deliverables and milestones
- Timeline and resources
- Expertise and credentials
- Success metrics and evaluation`
};

// Mock data for fallback when API is not available
const MOCK_PROPOSALS: Record<string, string> = {
  'web-design': `# Web Design Proposal

## Executive Summary
Thank you for considering my web design services for your project. I propose creating a modern, responsive website that will effectively showcase your brand and engage your target audience.

## Understanding Your Needs
Based on our discussion, I understand you need a professional web presence that will help you achieve your business objectives.

## Proposed Solution
### Design Approach
- Modern, clean design aligned with current web standards
- Mobile-first responsive design for optimal user experience
- User interface focused on conversion and engagement
- Brand-consistent visual elements and typography

### Technical Implementation
- HTML5, CSS3, and JavaScript for clean, semantic code
- Responsive frameworks for cross-device compatibility
- Performance optimization for fast loading times
- SEO-friendly structure and implementation

### Deliverables
1. **Homepage Design** - Engaging landing page with clear call-to-action
2. **Inner Pages** - Consistent design for all required pages
3. **Mobile Version** - Fully responsive mobile experience
4. **Contact Forms** - Functional forms with validation
5. **Basic SEO Setup** - Meta tags and structured data

## Timeline
- **Week 1**: Discovery and design mockups
- **Week 2**: Development of homepage and key pages
- **Week 3**: Responsive optimization and testing
- **Week 4**: Final revisions and launch

## Investment
Total project cost: $2,500 - $5,000 (depending on complexity)

## Next Steps
I'm excited about the possibility of working together. Please let me know if you have any questions or would like to discuss this proposal further.

Best regards,
Web Designer`,

  'development': `# Development Proposal

## Project Overview
This proposal outlines my approach to developing your software solution for your organization.

## Technical Solution
### Architecture
- Scalable, maintainable code structure
- Modern development practices and standards
- Security-first approach to data handling
- Performance optimization throughout

### Technology Stack
- Frontend: React.js with modern hooks and patterns
- Backend: Node.js with Express.js framework
- Database: MongoDB for flexible data storage
- Deployment: Cloud hosting with CI/CD pipeline

### Development Process
1. **Requirements Analysis** - Deep dive into project needs
2. **System Design** - Architecture and database design
3. **Development** - Iterative development with regular updates
4. **Testing** - Comprehensive testing at each stage
5. **Deployment** - Smooth deployment with monitoring

## Deliverables
- Complete, tested application
- Documentation and user guides
- Source code with version control
- Deployment and setup instructions
- 30-day post-launch support

## Timeline
- **Phase 1** (2 weeks): Requirements and design
- **Phase 2** (4 weeks): Core development
- **Phase 3** (2 weeks): Testing and refinement
- **Phase 4** (1 week): Deployment and handover

## Investment
Total project investment: $5,000 - $15,000 (depending on complexity and scope)

## Why Choose Me
With extensive experience in software development, I deliver high-quality solutions that meet business needs and exceed expectations.

Looking forward to discussing this project with you.

Best regards,
Full-Stack Developer`,

  'marketing': `# Marketing Strategy Proposal

## Campaign Overview
This proposal outlines a comprehensive marketing strategy for your business to achieve your marketing objectives.

## Strategic Approach
### Target Audience Analysis
- Demographic and psychographic profiling
- Customer journey mapping
- Pain points and opportunity identification
- Competitive positioning analysis

### Marketing Channels
- **Digital Marketing**: SEO, PPC, social media marketing
- **Content Strategy**: Blog posts, videos, infographics
- **Email Marketing**: Newsletter campaigns and automation
- **Social Media**: Platform-specific content and engagement

### Campaign Strategy
1. **Awareness Phase** - Brand visibility and reach
2. **Consideration Phase** - Content marketing and education
3. **Conversion Phase** - Lead generation and nurturing
4. **Retention Phase** - Customer loyalty and advocacy

## Expected Results
- Increased brand awareness by 40-60%
- Lead generation improvement of 25-35%
- Conversion rate optimization of 15-25%
- ROI of 3:1 or better within 6 months

## Timeline
- **Month 1**: Strategy development and research
- **Month 2**: Content creation and channel setup
- **Month 3**: Campaign launch and optimization
- **Month 4-6**: Ongoing management and refinement

## Investment
Monthly marketing investment: $2,000 - $5,000
Setup and strategy fee: $3,000 - $7,000

## Measurement & Reporting
- Weekly performance reports
- Monthly strategy reviews
- Quarterly ROI analysis
- Annual strategic planning

I'm confident this approach will deliver measurable results for your business.

Best regards,
Marketing Strategist`,

  'consulting': `# Consulting Engagement Proposal

## Engagement Overview
This proposal outlines my consulting services to help your organization address your business challenges.

## Consulting Approach
### Discovery Phase
- Comprehensive business analysis
- Stakeholder interviews and assessment
- Process and system evaluation
- Root cause analysis of key issues

### Strategic Planning
- Goal alignment and objective setting
- Action plan development
- Resource allocation recommendations
- Risk assessment and mitigation strategies

### Implementation Support
- Change management guidance
- Team training and development
- Process optimization
- Performance monitoring systems

## Deliverables
1. **Comprehensive Assessment Report** - Current state analysis
2. **Strategic Roadmap** - 90-day action plan
3. **Implementation Guide** - Step-by-step execution plan
4. **Performance Dashboard** - Key metrics and KPIs
5. **Progress Reports** - Weekly updates and reviews

## Engagement Structure
- **Weekly Strategy Sessions** - 2-hour planning meetings
- **On-site Support** - As needed for critical initiatives
- **Email/Phone Support** - Available for urgent matters
- **Monthly Reviews** - Progress assessment and adjustments

## Timeline
- **Week 1-2**: Discovery and assessment
- **Week 3-4**: Strategy development
- **Week 5-12**: Implementation support
- **Ongoing**: Monitoring and optimization

## Investment
Consulting fee: $150-$300 per hour
Monthly retainer: $4,000 - $8,000
Project-based pricing available

## Expected Outcomes
- Improved operational efficiency by 20-30%
- Clear strategic direction and alignment
- Enhanced team performance and engagement
- Measurable business growth and profitability

I'm committed to delivering tangible results and sustainable improvements for your organization.

Best regards,
Business Consultant`
};

// Helper function to build the prompt
const buildPrompt = (template: string, proposalData: ProposalData): string => {
  const basePrompt = TEMPLATE_PROMPTS[template] || TEMPLATE_PROMPTS['web-design'];
  
  const context = `
Client Information:
- Client Name: ${proposalData.clientName || 'Not specified'}
- Client Type: ${proposalData.clientType || 'Not specified'}
- Project Description: ${proposalData.description || 'Not specified'}

Your Role: ${proposalData.yourRole || 'Professional'}
Experience Level: ${proposalData.experienceLevel || 'Experienced'}
Key Selling Point: ${proposalData.keySellingPoint || 'Expert service delivery'}
Budget Range: ${proposalData.budgetRange || 'Flexible'}
Tools & Technology: ${proposalData.toolsTech || 'Modern tools and frameworks'}
Past Work: ${proposalData.pastWorkExample || 'Similar successful projects'}
Timeline: ${proposalData.timeline || 'Flexible timeline'}
Deliverables: ${proposalData.deliverables || 'Comprehensive deliverables'}

Tone: ${proposalData.tone || 'Professional'}
Deadline Sensitivity: ${proposalData.deadlineSensitivity || 'Normal'}

${basePrompt}

Generate a professional, compelling proposal that addresses the client's specific needs and demonstrates your expertise. The proposal should be well-structured, persuasive, and include specific details about your approach, deliverables, timeline, and pricing. Keep it professional but approachable, and make sure to highlight what makes you the best choice for this project.`;

  return context;
};

// Main AI service function
export const generateAIProposal = async (
  template: string,
  proposalData: ProposalData
): Promise<AIProposalResponse> => {
  try {
    // Check if OpenAI API key is available
    if (!OPENAI_CONFIG.apiKey || OPENAI_CONFIG.apiKey === 'your-openai-api-key') {
      console.log('OpenAI API key not found, using mock proposal');
      return generateMockProposal(template, proposalData);
    }

    const prompt = buildPrompt(template, proposalData);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        model: OPENAI_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: 'You are a professional proposal writer with expertise in freelance projects. Write compelling, professional proposals that win clients.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: OPENAI_CONFIG.maxTokens,
        temperature: OPENAI_CONFIG.temperature
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      return generateMockProposal(template, proposalData);
    }

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      console.error('No response from OpenAI API');
      return generateMockProposal(template, proposalData);
    }

    const proposal = data.choices[0].message?.content || '';
    const tokensUsed = data.usage?.total_tokens || 0;

    return {
      success: true,
      proposal: proposal.trim(),
      tokensUsed
    };

  } catch (error) {
    console.error('Error generating AI proposal:', error);
    return generateMockProposal(template, proposalData);
  }
};

// Mock proposal generator for fallback
const generateMockProposal = (template: string, proposalData: ProposalData): Promise<AIProposalResponse> => {
  // Simulate API delay
  const delay = Math.random() * 1000 + 500; // 500-1500ms delay
  
  return new Promise<AIProposalResponse>((resolve) => {
    setTimeout(() => {
      const mockProposal = MOCK_PROPOSALS[template] || MOCK_PROPOSALS['web-design'];
      
      // Add personalization section at the beginning
      const personalization = `
## Client Information
- Client: ${proposalData.clientName || 'Client'}
- Project: ${proposalData.description || 'Custom project requirements'}
- Your Role: ${proposalData.yourRole || 'Professional Consultant'}
- Experience: ${proposalData.experienceLevel || 'Experienced professional'}

---

`;

      const personalizedProposal = personalization + mockProposal;

      resolve({
        success: true,
        proposal: personalizedProposal,
        tokensUsed: 0
      });
    }, delay);
  });
};

// Helper function to check if AI service is available
export const isAIServiceAvailable = (): boolean => {
  return !!(OPENAI_CONFIG.apiKey && OPENAI_CONFIG.apiKey !== 'your-openai-api-key');
};

// Export types for use in other components
export type { AIProposalRequest, AIProposalResponse };
