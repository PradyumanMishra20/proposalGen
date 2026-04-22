import { create } from 'zustand';
import { generateAIProposal } from '../services/aiService';

// Type definitions
export interface ProposalData {
  description: string;
  clientName: string;
  clientType: string;
  yourRole: string;
  keySellingPoint: string;
  experienceLevel: string;
  deadlineSensitivity: string;
  tone: string;
  showAdvanced: boolean;
  budgetRange: string;
  toolsTech: string;
  pastWorkExample: string;
  timeline?: string;
  deliverables?: string;
}

export interface GeneratedProposal {
  title: string;
  content: string;
  date: string;
}

export interface ProposalStoreState {
  // Template state
  selectedTemplate: string;
  
  // Form data state
  proposalData: ProposalData;
  
  // Output state
  generatedProposal: GeneratedProposal | null;
  showOutput: boolean;
  
  // Loading states
  isLoading: boolean;
  isRegenerating: boolean;
  isMakingShorter: boolean;
  isMakingStronger: boolean;
  
  // UI state
  isPremiumMode: boolean;
}

export interface ProposalStoreActions {
  // Template actions
  setSelectedTemplate: (template: string) => void;
  
  // Form data actions
  updateProposalData: (field: keyof ProposalData, value: string | boolean) => void;
  resetProposalData: () => void;
  
  // Proposal generation actions
  generateProposal: () => Promise<string>;
  regenerateProposal: () => Promise<string>;
  makeProposalShorter: () => Promise<string>;
  makeProposalStronger: () => Promise<string>;
  
  // Export actions
  copyToClipboard: () => Promise<boolean>;
  downloadAsTxt: () => Promise<boolean>;
  exportAsPdf: () => Promise<boolean>;
  generateShareLink: () => Promise<string>;
  
  // UI actions
  clearOutput: () => void;
  setPremiumMode: (enabled: boolean) => void;
  
  // Reset action
  reset: () => void;
}

export type ProposalStore = ProposalStoreState & ProposalStoreActions;

// Initial state
const initialProposalData: ProposalData = {
  description: '',
  clientName: '',
  clientType: '',
  yourRole: '',
  keySellingPoint: '',
  experienceLevel: '',
  deadlineSensitivity: '',
  tone: 'normal',
  showAdvanced: false,
  budgetRange: '',
  toolsTech: '',
  pastWorkExample: ''
};

// Proposal Store - Centralized state management
export const useProposalStore = create<ProposalStore>((set, get) => ({
  // State
  selectedTemplate: '',
  proposalData: initialProposalData,
  generatedProposal: null,
  showOutput: false,
  isLoading: false,
  isRegenerating: false,
  isMakingShorter: false,
  isMakingStronger: false,
  isPremiumMode: false,

  // Actions
  setSelectedTemplate: (template: string) => set({ selectedTemplate: template }),
  
  updateProposalData: (field: keyof ProposalData, value: string | boolean) => 
    set((state) => ({
      proposalData: { ...state.proposalData, [field]: value }
    })),
  
  resetProposalData: () => set({ proposalData: { ...initialProposalData } }),
  
  generateProposal: async (): Promise<string> => {
    const { proposalData, selectedTemplate } = get();
    
    if (!proposalData.description) {
      throw new Error('Please provide a project description');
    }
    
    set({ isLoading: true });
    
    try {
      const proposalResult = await generateAIProposal(selectedTemplate, proposalData);
      
      // Handle AI service response
      let proposalText: string;
      if (proposalResult.success && proposalResult.proposal) {
        proposalText = proposalResult.proposal;
      } else {
        throw new Error(proposalResult.error || 'Failed to generate proposal');
      }
      
      if (!proposalText || typeof proposalText !== 'string' || proposalText.trim().length === 0) {
        throw new Error('Generated proposal is empty or invalid');
      }
      
      const proposalLength = proposalText.length;
      const hasCustomFields = !!(proposalData.clientName || proposalData.clientType || proposalData.yourRole);
      
      set({
        generatedProposal: {
          title: 'Professional Proposal',
          content: proposalText,
          date: new Date().toLocaleDateString()
        },
        showOutput: true
      });
      
      // Track analytics
      try {
        const { trackProposalGenerated } = await import('../utils/analytics');
        trackProposalGenerated('professional', proposalLength, hasCustomFields);
      } catch (error) {
        console.log('Analytics tracking skipped');
      }
      
      return proposalText;
    } catch (error) {
      console.error('Proposal generation error:', error);
      
      // Track error analytics
      try {
        const { trackError } = await import('../utils/analytics');
        trackError('proposal_generation', (error as Error).message, {
          has_description: !!proposalData.description,
          has_client_name: !!proposalData.clientName,
          has_role: !!proposalData.yourRole
        });
      } catch (analyticsError) {
        console.log('Analytics tracking skipped');
      }
      
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  
  regenerateProposal: async (): Promise<string> => {
    const { proposalData, selectedTemplate } = get();
    
    set({ isRegenerating: true });
    
    try {
      const proposalResult = await generateAIProposal(selectedTemplate, proposalData);
      
      // Handle AI service response
      let proposalText: string;
      if (proposalResult.success && proposalResult.proposal) {
        proposalText = proposalResult.proposal;
      } else {
        throw new Error(proposalResult.error || 'Failed to regenerate proposal');
      }
      
      set((state) => ({
        generatedProposal: state.generatedProposal ? {
          ...state.generatedProposal,
          content: proposalText
        } : null
      }));
      
      return proposalText;
    } catch (error) {
      console.error('Regeneration error:', error);
      throw error;
    } finally {
      set({ isRegenerating: false });
    }
  },
  
  makeProposalShorter: async (): Promise<string> => {
    const { proposalData, selectedTemplate } = get();
    
    set({ isMakingShorter: true });
    
    try {
      const proposalResult = await generateAIProposal(selectedTemplate, proposalData);
      
      // Handle AI service response
      let proposalText: string;
      if (proposalResult.success && proposalResult.proposal) {
        proposalText = proposalResult.proposal;
      } else {
        throw new Error(proposalResult.error || 'Failed to shorten proposal');
      }
      
      set((state) => ({
        generatedProposal: state.generatedProposal ? {
          ...state.generatedProposal,
          content: proposalText
        } : null
      }));
      
      return proposalText;
    } catch (error) {
      console.error('Shortening error:', error);
      throw error;
    } finally {
      set({ isMakingShorter: false });
    }
  },
  
  makeProposalStronger: async (): Promise<string> => {
    const { proposalData, selectedTemplate } = get();
    
    set({ isMakingStronger: true });
    
    try {
      const proposalResult = await generateAIProposal(selectedTemplate, proposalData);
      
      // Handle AI service response
      let proposalText: string;
      if (proposalResult.success && proposalResult.proposal) {
        proposalText = proposalResult.proposal;
      } else {
        throw new Error(proposalResult.error || 'Failed to strengthen proposal');
      }
      
      set((state) => ({
        generatedProposal: state.generatedProposal ? {
          ...state.generatedProposal,
          content: proposalText
        } : null
      }));
      
      return proposalText;
    } catch (error) {
      console.error('Strengthening error:', error);
      throw error;
    } finally {
      set({ isMakingStronger: false });
    }
  },
  
  copyToClipboard: async (): Promise<boolean> => {
    const { generatedProposal } = get();
    
    if (!generatedProposal?.content) {
      throw new Error('No proposal to copy');
    }
    
    try {
      const { copyToClipboard: copyText } = await import('../utils/exportUtils');
      await copyText(generatedProposal.content);
      
      // Track analytics
      try {
        const { trackProposalAction } = await import('../utils/analytics');
        trackProposalAction('copy', 'clipboard', generatedProposal.content.length);
      } catch (error) {
        console.log('Analytics tracking skipped');
      }
      
      return true;
    } catch (error) {
      console.error('Clipboard error:', error);
      
      // Track error analytics
      try {
        const { trackError } = await import('../utils/analytics');
        trackError('copy_to_clipboard', (error as Error).message);
      } catch (analyticsError) {
        console.log('Analytics tracking skipped');
      }
      
      throw new Error('Failed to copy proposal. Please try selecting and copying manually.');
    }
  },

  downloadAsTxt: async (): Promise<boolean> => {
    const { generatedProposal } = get();
    
    if (!generatedProposal) {
      throw new Error('No proposal to download');
    }
    
    try {
      const { downloadAsTxt } = await import('../utils/exportUtils');
      const filename = generatedProposal.title.toLowerCase().replace(/\s+/g, '_');
      downloadAsTxt(generatedProposal.content, filename);
      
      // Track analytics
      try {
        const { trackProposalAction } = await import('../utils/analytics');
        trackProposalAction('download', 'txt', generatedProposal.content.length);
      } catch (error) {
        console.log('Analytics tracking skipped');
      }
      
      return true;
    } catch (error) {
      console.error('Download error:', error);
      
      // Track error analytics
      try {
        const { trackError } = await import('../utils/analytics');
        trackError('download_txt', (error as Error).message);
      } catch (analyticsError) {
        console.log('Analytics tracking skipped');
      }
      
      throw new Error('Failed to download proposal as text file.');
    }
  },

  exportAsPdf: async (): Promise<boolean> => {
    const { generatedProposal } = get();
    
    if (!generatedProposal) {
      throw new Error('No proposal to export');
    }
    
    try {
      const { exportAsPdf } = await import('../utils/exportUtils');
      await exportAsPdf(generatedProposal);
      
      // Track analytics
      try {
        const { trackProposalAction } = await import('../utils/analytics');
        trackProposalAction('export', 'pdf', generatedProposal.content.length);
      } catch (error) {
        console.log('Analytics tracking skipped');
      }
      
      return true;
    } catch (error) {
      console.error('PDF export error:', error);
      
      // Track error analytics
      try {
        const { trackError } = await import('../utils/analytics');
        trackError('export_pdf', (error as Error).message);
      } catch (analyticsError) {
        console.log('Analytics tracking skipped');
      }
      
      throw new Error('Failed to export proposal as PDF.');
    }
  },

  generateShareLink: async (): Promise<string> => {
    const { generatedProposal } = get();
    
    if (!generatedProposal) {
      throw new Error('No proposal to share');
    }
    
    try {
      const { generateShareLink } = await import('../utils/exportUtils');
      const shareLink = generateShareLink(generatedProposal);
      return shareLink;
    } catch (error) {
      console.error('Share link error:', error);
      throw new Error('Failed to generate share link.');
    }
  },
  
  clearOutput: () => set({
    generatedProposal: null,
    showOutput: false
  }),
  
  setPremiumMode: (enabled: boolean) => set({ isPremiumMode: enabled }),
  
  reset: () => set({
    selectedTemplate: '',
    proposalData: { ...initialProposalData },
    generatedProposal: null,
    showOutput: false,
    isLoading: false,
    isRegenerating: false,
    isMakingShorter: false,
    isMakingStronger: false,
    isPremiumMode: false
  })
}));

// UI Store for UI-specific state
export interface UIStoreState {
  // Navigation state
  isMenuOpen: boolean;
  
  // Modal state
  activeModal: string | null;
  modalProps: Record<string, any>;
  
  // Notification state
  notifications: Array<{
    id: number | string;
    type: string;
    message: string;
    duration?: number;
  }>;
}

export interface UIStoreActions {
  // Navigation actions
  toggleMenu: () => void;
  closeMenu: () => void;
  
  // Modal actions
  openModal: (modalType: string, props?: Record<string, any>) => void;
  closeModal: () => void;
  
  // Notification actions
  addNotification: (notification: {
    type: string;
    message: string;
    duration?: number;
  }) => void;
  removeNotification: (id: number | string) => void;
  clearNotifications: () => void;
  
  // Reset action
  reset: () => void;
}

export type UIStore = UIStoreState & UIStoreActions;

export const useUIStore = create<UIStore>((set) => ({
  // State
  isMenuOpen: false,
  activeModal: null,
  modalProps: {},
  notifications: [],
  
  // Actions
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  
  closeMenu: () => set({ isMenuOpen: false }),
  
  openModal: (modalType: string, props: Record<string, any> = {}) => set({
    activeModal: modalType,
    modalProps: props
  }),
  
  closeModal: () => set({
    activeModal: null,
    modalProps: {}
  }),
  
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, {
      ...notification,
      id: Date.now() + Math.random()
    }]
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  clearNotifications: () => set({ notifications: [] }),
  
  reset: () => set({
    isMenuOpen: false,
    activeModal: null,
    modalProps: {},
    notifications: []
  })
}));

// Navigation Store for routing state
export interface NavigationStoreState {
  currentPath: string;
  previousPath: string | null;
  navigationHistory: string[];
}

export interface NavigationStoreActions {
  setCurrentPath: (path: string) => void;
  goBack: () => void;
  reset: () => void;
}

export type NavigationStore = NavigationStoreState & NavigationStoreActions;

export const useNavigationStore = create<NavigationStore>((set) => ({
  // State
  currentPath: '/',
  previousPath: null,
  navigationHistory: [],
  
  // Actions
  setCurrentPath: (path: string) => set((state) => ({
    currentPath: path,
    previousPath: state.currentPath,
    navigationHistory: [...state.navigationHistory, path].slice(-10) // Keep last 10
  })),
  
  goBack: () => set((state) => ({
    currentPath: state.previousPath || '/',
    previousPath: state.navigationHistory[state.navigationHistory.length - 2] || '/'
  })),
  
  reset: () => set({
    currentPath: '/',
    previousPath: null,
    navigationHistory: []
  })
}));
