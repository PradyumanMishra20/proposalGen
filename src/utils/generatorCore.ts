// Core proposal generation logic
import { ProposalData } from '../store/proposalStore';

export const generateProposal = (data: ProposalData): string => {
  const {
    description,
    clientName,
    clientType,
    yourRole,
    keySellingPoint,
    budgetRange,
    toolsTech,
    pastWorkExample,
    experienceLevel,
    deadlineSensitivity,
    tone,
    timeline,
    deliverables
  } = data;

  // Generate proposal content based on input data
  const proposal = `
# ${clientName} - Project Proposal

## Executive Summary
This proposal outlines a comprehensive solution for ${clientName}, tailored to meet their specific needs as a ${clientType} organization.

## Project Description
${description}

## Our Approach
As ${yourRole}, we bring expertise and proven methodologies to deliver exceptional results. Our approach focuses on:
- Quality and attention to detail
- Clear communication and transparency
- Meeting deadlines and exceeding expectations

## Key Selling Points
${keySellingPoint}

## Tools & Technology
${toolsTech}

## Past Work Example
${pastWorkExample}

## Timeline & Deliverables
${timeline ? `- **Timeline**: ${timeline}` : ''}
${deliverables ? `- **Deliverables**: ${deliverables}` : ''}

## Budget
- **Budget Range**: ${budgetRange}

## Next Steps
We look forward to discussing this proposal further and demonstrating how we can help ${clientName} achieve their goals.

---

*This proposal was generated using AI-powered proposal generation technology*
  `.trim();

  return proposal;
};

export default generateProposal;
