// Proposal templates
export const proposalTemplates = {
  webDevelopment: {
    title: 'Web Development Proposal',
    sections: [
      'Executive Summary',
      'Project Scope',
      'Technical Approach',
      'Timeline',
      'Pricing',
      'Terms & Conditions'
    ]
  },
  mobileApp: {
    title: 'Mobile App Development Proposal',
    sections: [
      'Executive Summary',
      'Features & Functionality',
      'Development Process',
      'Timeline',
      'Pricing',
      'Support & Maintenance'
    ]
  },
  consulting: {
    title: 'Consulting Services Proposal',
    sections: [
      'Executive Summary',
      'Services Overview',
      'Methodology',
      'Deliverables',
      'Timeline',
      'Pricing'
    ]
  },
  design: {
    title: 'Design Services Proposal',
    sections: [
      'Executive Summary',
      'Design Process',
      'Deliverables',
      'Timeline',
      'Pricing',
      'Revisions'
    ]
  }
};

export const getTemplateByType = (type: string) => {
  return proposalTemplates[type as keyof typeof proposalTemplates] || proposalTemplates.consulting;
};
