export interface PIProject {
  id: string;
  name: string;
  progress: number;
  budget: string;
  actual_cost: string;
  status: 'In Progress' | 'Completed' | 'Planning' | 'Delayed';
  start_date: string;
  end_date: string;
  manager: string;
  created_at?: string;
  updated_at?: string;
}

export interface PIProjectControl {
  id: string;
  project_id: string;
  milestone_name: string;
  planned_value: string;
  earned_value: string;
  actual_cost: string;
  cpi: number;
  spi: number;
  variance_cost: string;
  status: string;
  created_at?: string;
}

export interface PITaskIssue {
  id: string;
  project_id: string;
  title: string;
  type: 'Task' | 'Issue';
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  due_date: string;
  status: 'To Do' | 'In Progress' | 'Resolved' | 'Closed';
  created_at?: string;
}

export interface PIRfiSubmittal {
  id: string;
  project_id: string;
  rfi_number: string;
  subject: string;
  type: 'RFI' | 'Submittal';
  from_party: string;
  assigned_to: string;
  date_submitted: string;
  status: 'Draft' | 'Open' | 'Under Review' | 'Approved' | 'Rejected';
  created_at?: string;
}

export interface PIAIInsight {
  id: string;
  project_id?: string;
  category: string;
  insight_text: string;
  impact: 'Critical' | 'Warning' | 'Positive';
  recommendation: string;
  created_at?: string;
}

export interface PIReport {
  id: string;
  project_id?: string;
  title: string;
  period: string;
  generated_by: string;
  file_size: string;
  created_at?: string;
}

