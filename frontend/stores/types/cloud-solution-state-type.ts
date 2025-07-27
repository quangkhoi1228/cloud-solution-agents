export interface AIResponseMessage {
  type: 'human' | 'ai';
  data: {
    content: string;
    additional_kwargs: {};
    response_metadata: {};
    type: string;
    name: string | null;
    id: string;
  };
}

export interface FinalProposalPart {
  id: string;
  title: string;
  content: string;
  level: string;
  content_type: string;
}

export interface CloudSolutionStateType {
  messages: AIResponseMessage[];
  next: string;
  user_requirements: string;
  folder_path: string;
  final_proposal: string;
  final_proposal_parts: FinalProposalPart[];
  solution_architect_report: string;
  project_manager_report: string;
  sale_report: string;
  delivery_manager_report: string;
  final_acceptance: boolean;
};
