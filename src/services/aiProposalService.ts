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

const getSectionGuidance = (section: string, template: any): string => {
  const guidance: Record<string, string> = {
    'executive_summary': 'Start with a compelling hook that shows you understand their problem. Briefly introduce your solution and highlight the key benefits.',
    'project_scope': 'Detail exactly what will be delivered. Include specific features, functionalities, and deliverables. Use clear, measurable criteria.',
    'technical_approach': 'Explain your methodology and technologies. Show why your approach is superior and how it ensures success.',
    'strategy': 'Outline your strategic approach. Include market analysis, target audience considerations, and competitive advantages.',
    'campaign_details': 'Provide specific campaign tactics, channels, and execution timeline. Include metrics for success.',
    'analysis': 'Present your findings and insights. Use data to support your recommendations.',
    'recommendations': 'Provide actionable recommendations with expected outcomes and implementation steps.',
    'implementation': 'Detail the implementation plan with phases, milestones, and resource requirements.',
    'deliverables': 'List all deliverables with specifications and acceptance criteria.',
    'timeline': 'Provide a realistic timeline with key milestones, dependencies, and buffer time.',
    'pricing': 'Present pricing options with clear value proposition. Include payment terms and what is included.',
    'budget': 'Break down the budget allocation with justification for each major expense category.',
    'metrics': 'Define KPIs and success metrics. Include reporting frequency and measurement methods.',
    'next_steps': 'Outline the immediate next steps, decision points, and timeline for moving forward.'
  };
  
  return guidance[section] || 'Provide comprehensive information for this section with specific details and actionable insights.';
};

const generateMockSectionContent = (section: string, data: ProposalData, template: any): string => {
  const { description, clientType, experienceLevel, deadlineSensitivity } = data;
  
  switch (section) {
    case 'executive_summary':
      return `## Executive Summary

I'm excited to present a comprehensive solution for your ${data.clientType || 'business'} needs. Based on your requirements for "${data.description || 'your project'}", I've developed a strategic approach that combines cutting-edge technology with proven methodologies.

**Key Highlights:**
- **Professional Expertise**: ${data.experienceLevel || 'Extensive'} experience delivering successful projects
- **Client-Focused Approach**: Tailored solutions that address your specific challenges
- **Quality Assurance**: Commitment to excellence and attention to detail
- **Timely Delivery**: ${deadlineSensitivity === 'urgent' ? 'Accelerated timeline with dedicated resources' : 'Efficient project management with realistic milestones'}

This proposal outlines a clear roadmap to achieve your objectives while maintaining the highest standards of quality and professionalism. Let's explore how we can transform your vision into reality.`;

    case 'project_scope':
      return `## Project Scope

Based on your requirements: "${description || 'Project description not provided'}"

Our comprehensive project scope includes:

### 1. **Discovery & Analysis Phase**
- **Requirements Gathering**: In-depth analysis of your business objectives
- **Stakeholder Interviews**: Understanding key decision-maker needs
- **Technical Assessment**: Evaluating current infrastructure and requirements
- **Risk Analysis**: Identifying potential challenges and mitigation strategies

### 2. **Strategic Planning & Design**
- **Concept Development**: Creating tailored solutions for your specific needs
- **Prototyping**: Interactive mockups and user experience design
- **Technical Architecture**: Scalable and maintainable system design
- **Quality Framework**: Comprehensive testing and validation plan

### 3. **Implementation & Development**
- **Agile Development**: Iterative sprints with regular deliverables
- **Progress Reviews**: Weekly status meetings and milestone tracking
- **Quality Assurance**: Continuous testing and code reviews
- **Documentation**: Comprehensive technical and user documentation

### 4. **Delivery & Success**
- **Final Testing**: Comprehensive QA and user acceptance testing
- **Deployment**: Smooth transition to production environment
- **Training**: Team training and knowledge transfer
- **Ongoing Support**: Post-launch maintenance and optimization

*The scope is designed to be flexible and can be adjusted based on evolving requirements while maintaining the core objectives and timeline.*`;

    case 'timeline':
      return `## Project Timeline

We propose the following timeline for completion:

### **Phase 1: Discovery & Planning (Week 1-2)**
- ✅ Requirements gathering and analysis
- ✅ Technical assessment and planning
- ✅ Design concept development
- ✅ Risk assessment and mitigation planning

### **Phase 2: Development & Implementation (Week 3-6)**
- ✅ Core development and feature implementation
- ✅ Regular progress reviews and feedback sessions
- ✅ Iterative improvements based on your input
- ✅ Integration testing and quality assurance

### **Phase 3: Testing & Refinement (Week 7-8)**
- ✅ Comprehensive testing and quality assurance
- ✅ User acceptance testing and feedback incorporation
- ✅ Performance optimization and final refinements
- ✅ Documentation and training materials preparation

### **Phase 4: Delivery & Launch (Week 9)**
- ✅ Final delivery and deployment
- ✅ Team training and knowledge transfer
- ✅ Post-launch support and monitoring setup
- ✅ Project closure and success metrics review

${deadlineSensitivity === 'urgent' ? '🚀 **Priority Timeline**: Given the urgent timeline requirement, we have optimized our process to deliver this project in an accelerated timeframe while maintaining our high-quality standards. Additional resources will be allocated to ensure timely completion.' : '⏱️ **Standard Timeline**: This timeline allows for thorough development and testing to ensure the highest quality deliverables while maintaining realistic expectations.'}

**Communication & Reporting:**
- Weekly progress reports every Friday
- Bi-weekly stakeholder meetings
- Real-time access to project dashboard
- 24/7 communication channel for urgent matters`;

    case 'pricing':
      return `## Investment & Pricing

We offer a transparent pricing structure based on the scope and complexity of this project:

### 💼 **Professional Package: $5,000 - $8,000**
- ✅ Complete project execution
- ✅ All deliverables as specified
- ✅ Standard revision rounds (2 rounds)
- ✅ Basic support (30 days post-launch)
- ✅ Project documentation
- ✅ Source code delivery

### 🚀 **Premium Package: $8,000 - $12,000**
- ✅ Everything in Professional Package
- ✅ Additional revision rounds (4 rounds total)
- ✅ Priority support (90 days post-launch)
- ✅ Extended warranty period (1 year)
- ✅ Advanced analytics and reporting
- ✅ Performance optimization
- ✅ SEO optimization (if applicable)

### 🏢 **Enterprise Package: $12,000+**
- ✅ Custom solution development
- ✅ Dedicated project manager
- ✅ Unlimited revisions
- ✅ Lifetime support and maintenance
- ✅ Comprehensive training program
- ✅ Complete documentation suite
- ✅ Source code ownership
- ✅ Custom integrations
- ✅ Scalability planning

### 💳 **Flexible Payment Terms**
- **30% deposit** to begin work
- **40% payment** upon milestone completion
- **30% final payment** on successful delivery
- **Multiple payment options** available (Wire transfer, ACH, Credit Card)

### 🎯 **Value Proposition**
> *Our pricing reflects the exceptional quality, expertise, and value we bring to your project. We offer competitive rates while maintaining the highest standards of professionalism and deliverable quality.*

**ROI Guarantee**: We're confident in our ability to deliver results that exceed your investment. All packages include a satisfaction guarantee.`;

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
  
  const prompt = `You are an expert proposal writer with 15+ years of experience creating winning business proposals for Fortune 500 companies and startups. Your proposals consistently achieve 85%+ win rates.

Generate a comprehensive, client-ready ${templateConfig.name.toLowerCase()} that will impress the client and secure the project.

CLIENT CONTEXT:
- Client Name: ${data.clientName || 'Client Company'}
- Client Type: ${data.clientType || 'Business'}
- Project Description: ${data.description || 'Project requirements'}
- Your Role/Expertise: ${data.yourRole || 'Service Provider'}
- Experience Level: ${data.experienceLevel || 'Professional'}
- Deadline Sensitivity: ${data.deadlineSensitivity || 'Normal'}

PROPOSAL REQUIREMENTS:
1. Create a compelling narrative that addresses the client's specific needs and pain points
2. Use a ${templateConfig.tone} tone that builds trust and credibility
3. Focus on: ${templateConfig.focus}
4. Include quantifiable benefits and ROI where applicable
5. Address potential concerns proactively
6. Create urgency without being pushy
7. Demonstrate deep understanding of their industry/business

REQUIRED SECTIONS (in this order):
${templateConfig.sections.map((section, index) => 
  `${index + 1}. ${formatSectionTitle(section)} - ${getSectionGuidance(section, templateConfig)}`
).join('\n')}

CONTENT GUIDELINES:
- Each section should be 150-300 words for optimal readability
- Use professional business language with clear, concise sentences
- Include specific examples and case studies where relevant
- Add bullet points for key deliverables and milestones
- Incorporate industry-specific terminology appropriately
- Ensure logical flow between sections
- End with a strong call-to-action

FORMATTING REQUIREMENTS:
- Use markdown formatting for headers (##, ###)
- Use bullet points for lists
- Use **bold** for emphasis on key points
- Use *italics* for subtle emphasis
- Ensure professional, clean formatting

Please return the response as a JSON object with this structure:
{
  "sections": [
    {
      "title": "Section Title",
      "content": "Formatted markdown content..."
    }
  ]
}

IMPORTANT: This proposal must be client-ready and professional enough to send directly to a potential client without modifications.`;

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
