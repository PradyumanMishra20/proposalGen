import { ProposalData } from '../store/proposalStore';

// Template configurations
const TEMPLATES = {
  'web-design': {
    name: 'Web Design Proposal',
    sections: ['executive_summary', 'project_scope', 'timeline', 'pricing', 'next_steps'],
    tone: 'professional yet creative',
    focus: 'design quality, user experience, and visual impact'
  },
  'development': {
    name: 'Development Proposal',
    sections: ['executive_summary', 'technical_approach', 'deliverables', 'timeline', 'pricing'],
    tone: 'technical and detailed',
    focus: 'scalability, performance, and code quality'
  },
  'marketing': {
    name: 'Marketing Proposal',
    sections: ['executive_summary', 'strategy', 'campaign_details', 'metrics', 'budget'],
    tone: 'persuasive and results-oriented',
    focus: 'ROI, brand awareness, and conversion optimization'
  },
  'consulting': {
    name: 'Consulting Proposal',
    sections: ['executive_summary', 'analysis', 'recommendations', 'implementation', 'pricing'],
    tone: 'expert and advisory',
    focus: 'strategic value, expertise, and business outcomes'
  }
};

export interface GeneratedProposal {
  id: string;
  template: string;
  title: string;
  sections: ProposalSection[];
  generatedAt: Date;
  metadata: {
    wordCount: number;
    estimatedReadTime: number;
    clientName: string;
  };
}

export interface ProposalSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

// Mock response for when API key is not available
const generateMockProposal = (template: string, data: ProposalData): GeneratedProposal => {
  const templateConfig = TEMPLATES[template as keyof typeof TEMPLATES];
  const sections: ProposalSection[] = templateConfig.sections.map((sectionTitle, index) => ({
    id: `section-${index}`,
    title: formatSectionTitle(sectionTitle),
    content: generateMockSectionContent(sectionTitle, data, templateConfig),
    order: index
  }));

  return {
    id: `proposal-${Date.now()}`,
    template,
    title: `${templateConfig.name} for ${data.clientName || 'Client'}`,
    sections,
    generatedAt: new Date(),
    metadata: {
      wordCount: sections.reduce((total, section) => total + section.content.split(' ').length, 0),
      estimatedReadTime: Math.ceil(sections.reduce((total, section) => total + section.content.split(' ').length, 0) / 200),
      clientName: data.clientName || 'Client'
    }
  };
};

const formatSectionTitle = (section: string): string => {
  return section
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const generateMockSectionContent = (section: string, data: ProposalData, template: any): string => {
  const { clientName, description, yourRole, clientType, experienceLevel, deadlineSensitivity } = data;
  
  switch (section) {
    case 'executive_summary':
      return `Executive Summary

Hi, I can help you build a fully responsive and modern website for your clothing brand with secure payment integration. I will ensure clean UI/UX, fast performance, and a scalable structure. Based on your requirements, I will design a user-friendly interface and integrate payment gateways like Stripe or Razorpay. I aim to deliver a high-quality product that enhances your brand presence and drives conversions. Let's discuss your exact vision and get started.`;

    case 'project_scope':
      return `Project Scope

Based on your requirements: "${description || 'Project description not provided'}"

Our comprehensive project scope includes:

1. **Discovery Phase**
   - Detailed requirements analysis
   - Stakeholder consultations
   - Technical assessment
   - Risk evaluation

2. **Design & Planning**
   - Concept development
   - Prototyping and wireframing
   - Technical architecture
   - Quality assurance planning

3. **Implementation**
   - Development sprints
   - Regular progress reviews
   - Testing and validation
   - Documentation

4. **Delivery & Launch**
   - Final testing and QA
   - Deployment and setup
   - Training and handover
   - Post-launch support

The scope is designed to be flexible and can be adjusted based on evolving requirements while maintaining the core objectives and timeline.`;

    case 'timeline':
      return `Project Timeline

We propose the following timeline for completion:

**Phase 1: Discovery & Planning (Week 1-2)**
- Requirements gathering and analysis
- Technical assessment and planning
- Design concept development

**Phase 2: Development (Week 3-6)**
- Core implementation
- Regular progress reviews
- Iterative feedback and adjustments

**Phase 3: Testing & Refinement (Week 7-8)**
- Comprehensive testing
- User acceptance testing
- Final refinements and optimizations

**Phase 4: Delivery & Launch (Week 9)**
- Final delivery
- Deployment and setup
- Training and documentation

${deadlineSensitivity === 'urgent' ? 'Given the urgent timeline requirement, we have optimized our process to deliver this project in an accelerated timeframe while maintaining quality standards.' : 'This timeline allows for thorough development and testing to ensure the highest quality deliverables.'}

We will provide weekly progress reports and maintain open communication throughout the project.`;

    case 'pricing':
      return `Investment & Pricing

We offer a transparent pricing structure based on the scope and complexity of this project:

**Professional Package: $5,000 - $8,000**
- Complete project execution
- All deliverables as specified
- Standard revision rounds
- Basic support (30 days)

**Premium Package: $8,000 - $12,000**
- Everything in Professional Package
- Additional revision rounds
- Priority support (90 days)
- Extended warranty period
- Advanced analytics and reporting

**Enterprise Package: $12,000+**
- Custom solution development
- Dedicated project manager
- Unlimited revisions
- Lifetime support
- Training and documentation
- Source code ownership

**Payment Terms:**
- 30% deposit to begin work
- 40% upon milestone completion
- 30% on final delivery

**Value Proposition:**
Our pricing reflects the quality of work, expertise, and value we bring to your project. We offer competitive rates while maintaining the highest standards of professionalism and deliverable quality.`;

    default:
      return `${formatSectionTitle(section)}

This section contains detailed information about ${section.replace('_', ' ')} for your project. Our approach is tailored to meet your specific requirements and ensure successful project outcomes.

Based on our ${experienceLevel || 'extensive'} experience working with ${clientType || 'similar clients'}, we have developed proven methodologies that deliver consistent results.

Key considerations for this section include:
- Thorough analysis of requirements
- Strategic planning and execution
- Quality assurance and testing
- Risk management and mitigation
- Clear communication and reporting

We are committed to delivering exceptional results that meet and exceed your expectations.`;
  }
};

// Real OpenAI API integration
const generateOpenAIProposal = async (template: string, data: ProposalData): Promise<GeneratedProposal> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenAI API key not found, using mock response');
    return generateMockProposal(template, data);
  }

  const templateConfig = TEMPLATES[template as keyof typeof TEMPLATES];
  
  const prompt = `Generate a professional ${templateConfig.name.toLowerCase()} for a client with the following details:

Client Information:
- Client Name: ${data.clientName || 'Not specified'}
- Client Type: ${data.clientType || 'Not specified'}
- Project Description: ${data.description || 'Not specified'}
- Your Role: ${data.yourRole || 'Not specified'}
- Experience Level: ${data.experienceLevel || 'Not specified'}
- Deadline Sensitivity: ${data.deadlineSensitivity || 'Not specified'}

Requirements:
1. Generate a comprehensive proposal with the following sections: ${templateConfig.sections.join(', ')}
2. Use a ${templateConfig.tone} tone
3. Focus on: ${templateConfig.focus}
4. Make it professional, detailed, and persuasive
5. Include specific details based on the provided information
6. Format each section clearly with proper headings
7. Total proposal should be 800-1200 words

Please return the response as a JSON object with this structure:
{
  "sections": [
    {
      "title": "Section Title",
      "content": "Section content..."
    }
  ]
}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional proposal writer with expertise in creating compelling business proposals. Always respond with valid JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    const content = result.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from OpenAI API');
    }

    // Parse the JSON response
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      // Fallback to mock response
      return generateMockProposal(template, data);
    }

    const sections: ProposalSection[] = (parsedContent.sections || []).map((section: any, index: number) => ({
      id: `section-${index}`,
      title: section.title || `Section ${index + 1}`,
      content: section.content || '',
      order: index
    }));

    return {
      id: `proposal-${Date.now()}`,
      template,
      title: `${templateConfig.name} for ${data.clientName || 'Client'}`,
      sections,
      generatedAt: new Date(),
      metadata: {
        wordCount: sections.reduce((total, section) => total + section.content.split(' ').length, 0),
        estimatedReadTime: Math.ceil(sections.reduce((total, section) => total + section.content.split(' ').length, 0) / 200),
        clientName: data.clientName || 'Client'
      }
    };

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    // Fallback to mock response
    return generateMockProposal(template, data);
  }
};

// Main export function
export const generateAIProposal = async (
  template: string,
  proposalData: ProposalData
): Promise<GeneratedProposal> => {
  try {
    // Validate inputs
    if (!template) {
      throw new Error('Template is required');
    }
    
    if (!proposalData || Object.keys(proposalData).length === 0) {
      throw new Error('Proposal data is required');
    }

    // Check if template exists
    if (!TEMPLATES[template as keyof typeof TEMPLATES]) {
      throw new Error(`Invalid template: ${template}`);
    }

    // Generate proposal (real API or mock)
    const proposal = await generateOpenAIProposal(template, proposalData);
    
    return proposal;

  } catch (error) {
    console.error('Error generating AI proposal:', error);
    
    // Re-throw with more user-friendly message
    if (error instanceof Error) {
      throw new Error(`Failed to generate proposal: ${error.message}`);
    }
    
    throw new Error('Failed to generate proposal. Please try again.');
  }
};

// Export template configurations for reference
export { TEMPLATES };
