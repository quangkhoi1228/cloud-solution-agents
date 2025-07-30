import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CloudSolutionStateType } from './types/cloud-solution-state-type';
import axios from 'axios';
import { roles } from '@/components/layout/role-selector';

interface Message {
  id: number;
  type: 'user' | 'system';
  content: string;
  timestamp: string;
  avatar: string;
  name: string;
  role?: string;
  roleColor?: string;
}

type ActionType =
  | 'idle'
  | 'callApi'
  | 'preSaleTalk'
  | 'preSaleShowUserRequirements'
  | 'preSaleHandOverSolutionArchitect'
  | 'solutionArchitectTalk'
  | 'solutionArchitectShowSolution'
  | 'solutionArchitectHandOverProjectManager'
  | 'projectManagerTalk'
  | 'projectManagerShowPlan'
  | 'projectManagerHandOverSale'
  | 'saleTalk'
  | 'saleShowQuote'
  | 'saleHandOverDocumentManager'
  | 'documentManagerTalk'
  | 'documentManagerShowProposal'
  | 'documentManagerHandOverDeliveryManager'
  | 'deliveryManagerTalk'
  | 'deliveryManagerHandOverEnd'
  | 'end';

type FileType =
  | 'user_requirements'
  | 'solution_architect_report'
  | 'project_manager_report'
  | 'sale_report'
  | 'final_proposal';

interface AppState {
  // UI State
  showChat: boolean;
  showFileExplorer: boolean;
  activeRole: string | null;
  loadingRole: string | null;
  files: FileType[];
  selectedFile: string;
  editorTab: 'preview' | 'raw';
  processingState: ActionType | null;
  delayTime: number;

  cloudSolutionState: CloudSolutionStateType;
  actionQueue: ActionType[];
  revealSettings: {
    enabled: boolean;
    duration: number;
    autoStart: boolean;
  };

  setRevealSettings: (settings: {
    enabled: boolean;
    duration: number;
    autoStart: boolean;
  }) => void;

  // Chat State
  messages: Message[];
  currentMessage: string;

  // Actions
  setShowChat: (show: boolean) => void;
  setShowFileExplorer: (show: boolean) => void;
  setActiveRole: (roleId: string | null) => void;
  setLoadingRole: (roleId: string | null) => void;
  setSelectedFile: (fileName: string, timeout?: number) => void;
  setEditorTab: (tab: 'preview' | 'raw') => void;
  setCurrentMessage: (message: string) => void;
  addMessage: (message: Omit<Message, 'id'>) => void;
  sendMessage: () => void;

  // Async Actions
  switchRole: (roleId: string) => Promise<void>;
  setProcessingState: (state: ActionType) => void;
  setMessagesFromData: (data: CloudSolutionStateType) => void;
  setCloudSolutionState: (state: CloudSolutionStateType) => void;
  pushActionQueue: (actions: ActionType[]) => void;
  handleAction: () => void;
  addAIMessage: (action: ActionType) => void;
  setFiles: (files: FileType[]) => void;
  addFile: (file: FileType) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial State
      showChat: true,
      showFileExplorer: true,
      activeRole: 'solution-architect',
      loadingRole: null,
      files: [],
      selectedFile: 'README.md',
      editorTab: 'preview',
      messages: [],
      currentMessage: '',
      processingState: null,
      delayTime: 500,
      cloudSolutionState: {
        messages: [],
        next: '',
        user_requirements: '',
        folder_path: '',
        final_proposal: '',
        final_proposal_parts: [],
        solution_architect_report: '',
        project_manager_report: '',
        sale_report: '',
        delivery_manager_report: '',
        final_acceptance: false,
      },
      actionQueue: [],
      revealSettings: {
        enabled: true,
        duration: 10,
        autoStart: true,
      },
      // UI Actions
      setShowChat: (show) => set({ showChat: show }),
      setShowFileExplorer: (show) => set({ showFileExplorer: show }),
      setActiveRole: (roleId) => set({ activeRole: roleId }),
      setLoadingRole: (roleId) => set({ loadingRole: roleId }),
      setSelectedFile: (fileName, timeout = 4) => {
        set({
          selectedFile: fileName,
          revealSettings: {
            enabled: true,
            duration: timeout,
            autoStart: true,
          },
        });
      },
      setEditorTab: (tab) => set({ editorTab: tab }),

      // Chat Actions
      setCurrentMessage: (message) => set({ currentMessage: message }),
      addAIMessage: (action: ActionType) => {
        const role = actionTypeDetail[action].activeRole;
        const message = actionTypeDetail[action].description;
        const now = new Date();
        const timestamp = now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        const roleInfo = roles.find((r) => r.id === role);

        get().addMessage({
          type: 'system',
          content: message,
          timestamp,
          avatar: roleInfo?.avatar || '/avatar/avatar1.jpg',
          name: role,
          role: role,
        });
        set({ activeRole: role });
      },
      addMessage: (message) => {
        const messages = get().messages;
        const newMessage = {
          ...message,
          id: Math.max(...messages.map((m) => m.id), 0) + 1,
        };
        set({ messages: [...messages, newMessage] });
      },
      sendMessage: () => {
        const { currentMessage, addMessage } = get();
        if (currentMessage.trim()) {
          const now = new Date();
          const timestamp = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });

          addMessage({
            type: 'user',
            content: currentMessage,
            timestamp,
            avatar: '/avatar/avatar1.jpg',
            name: 'You',
          });

          get().pushActionQueue(['callApi', 'preSaleTalk']);
        }
      },

      setMessagesFromData: (data: CloudSolutionStateType) => {},

      // Async Actions
      switchRole: async (roleId) => {
        const { activeRole, setLoadingRole, setActiveRole } = get();

        if (activeRole === roleId) {
          setActiveRole(null);
          return;
        }

        setLoadingRole(roleId);

        // Simulate loading time
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        setLoadingRole(null);
        setActiveRole(roleId);
      },

      setProcessingState: (state: ActionType) => {
        set({ processingState: state });

        console.log('state', state);
      },

      setFiles: (files: FileType[]) => {
        set({ files });
      },

      addFile: (file: FileType) => {
        const { files } = get();
        set({ files: [...files, file] });
      },

      pushActionQueue: (actions: ActionType[]) => {
        const { actionQueue } = get();
        set({ actionQueue: [...actionQueue, ...actions] });
        get().handleAction();
      },

      handleAction: () => {
        const { actionQueue, processingState } = get();
        console.log(
          'handleAction queue',
          actionQueue,
          'processingState',
          processingState
        );
        if (actionQueue.length <= 0 || processingState) {
          return;
        }

        const action = actionQueue.shift();
        if (!action) {
          return;
        }
        set({ processingState: action });
        console.log('action', action);

        if (action === 'callApi') {
          axios
            .post('/api/solution', {
              user_requirements: get().currentMessage,
            })
            .then((res) => {
              console.log('callApi response', res);
            })
            .finally(() => {
              set({ currentMessage: '' });
              setTimeout(() => {
                set({ processingState: null });
                get().handleAction();
              }, 1000);
            });
        }

        if (
          [
            'preSaleTalk',
            'preSaleHandOverSolutionArchitect',
            'solutionArchitectTalk',
            'solutionArchitectHandOverProjectManager',
            'projectManagerTalk',
            'projectManagerHandOverSale',
            'saleTalk',
            'saleHandOverDocumentManager',
            'documentManagerTalk',
            'documentManagerHandOverDeliveryManager',
            'deliveryManagerTalk',
            'deliveryManagerHandOverEnd',
          ].includes(action)
        ) {
          get().addAIMessage(action);
          setTimeout(() => {
            set({ processingState: null });
            get().handleAction();
          }, getMessageDelay(actionTypeDetail[action].description));
        }

        if (action === 'preSaleShowUserRequirements') {
          get().addFile('user_requirements');
          get().setSelectedFile('user_requirements.md', 4);
          setTimeout(() => {
            set({
              processingState: null,
            });
            get().handleAction();
          }, 4000 + get().delayTime);
        }

        if (action === 'solutionArchitectShowSolution') {
          get().addFile('solution_architect_report');
          get().setSelectedFile('solution_architect_report.md', 8);
          setTimeout(() => {
            set({
              processingState: null,
            });
            get().handleAction();
          }, 8000 + get().delayTime);
        }

        if (action === 'projectManagerShowPlan') {
          get().addFile('project_manager_report');
          get().setSelectedFile('project_manager_report.md', 4);

          setTimeout(() => {
            set({
              processingState: null,
            });
            get().handleAction();
          }, 4000 + get().delayTime);
        }

        if (action === 'saleShowQuote') {
          get().addFile('sale_report');
          get().setSelectedFile('sale_report.md', 4);
          setTimeout(() => {
            set({
              processingState: null,
            });
            get().handleAction();
          }, 4000 + get().delayTime);
        }

        if (action === 'documentManagerShowProposal') {
          get().addFile('final_proposal');
          get().setSelectedFile('final_proposal.md', 20);
          setTimeout(() => {
            set({
              processingState: null,
            });
            get().handleAction();
          }, 20000 + get().delayTime);
        }

        if (action === 'deliveryManagerHandOverEnd') {
          setTimeout(() => {
            set({
              processingState: null,
            });
            get().setActiveRole(null);
          }, 4000 + get().delayTime);
        }
      },

      setCloudSolutionState: (state: CloudSolutionStateType) => {
        const { cloudSolutionState } = get();
        // console.log('setCloudSolutionState test', state, cloudSolutionState);
        if (state.next === cloudSolutionState.next) {
          return;
        }

        // if (state.next === 'Pre-Sale') {
        //   if (state.folder_path === '') {
        //     get().pushActionQueue(['callApi', 'preSaleTalk']);
        //   }
        // } else
        if (state.next === 'create_project_folder') {
        } else if (state.next === 'Solution-Architect') {
          get().pushActionQueue([
            'preSaleShowUserRequirements',
            'preSaleHandOverSolutionArchitect',
            'solutionArchitectTalk',
          ]);
        } else if (state.next === 'Project-Manager') {
          get().pushActionQueue([
            'solutionArchitectShowSolution',
            'solutionArchitectHandOverProjectManager',
            'projectManagerTalk',
          ]);
        } else if (state.next === 'Sale') {
          get().pushActionQueue([
            'projectManagerShowPlan',
            'projectManagerHandOverSale',
            'saleTalk',
          ]);
        } else if (state.next === 'Document-Manager') {
          get().pushActionQueue([
            'saleShowQuote',
            'saleHandOverDocumentManager',
            'documentManagerTalk',
          ]);
        } else if (state.next === 'Delivery-Manager') {
          get().pushActionQueue([
            'documentManagerShowProposal',
            'documentManagerHandOverDeliveryManager',
            'deliveryManagerTalk',
          ]);
        } else if (state.next === '__end__') {
          get().pushActionQueue(['deliveryManagerHandOverEnd', 'end']);
        }

        set({ cloudSolutionState: state });
      },
    }),
    {
      name: 'app-store',
    }
  )
);

const getMessageDelay = (message: string) => {
  const delay = message.length * 80;
  return delay;
};

const actionTypeDetail: {
  [key: string]: { title: string; description: string; activeRole: string };
} = {
  preSaleTalk: {
    title: 'Pre-Sale Talk',
    description:
      'Xin chào bạn, tôi là Pre‑Sale — hãy để tôi giúp bạn phân tích yêu cầu nhé. Tôi sẽ cố gắng phân tích yêu cầu tổng quát và yêu chi tiết theo từng hạng mục kỹ thuật',
    activeRole: 'Pre-Sale',
  },
  preSaleHandOverSolutionArchitect: {
    title: 'Pre-Sale Hand Over Solution Architect',
    description:
      'Tôi đã phân tích xong yêu cầu, tiếp theo Solution Architect sẽ thiết kế kiến trúc cho bạn.',
    activeRole: 'Pre-Sale',
  },
  solutionArchitectTalk: {
    title: 'Solution Architect Talk',
    description:
      'Xin chào! Tôi là Solution Architect, tôi sẽ tiếp tục làm rõ kiến trúc giải pháp. Tôi sẽ lên giải pháp đề xuất, phương án chuyển đổi và sizing các thành phần cần thiết (BoM),...',
    activeRole: 'Solution-Architect',
  },
  solutionArchitectHandOverProjectManager: {
    title: 'Solution Architect Hand Over Project Manager',
    description:
      'Tôi đã hoàn thành kiến trúc, nhờ Project Manager và Sale sẽ lên kế hoạch triển khai và báo giá nhé',
    activeRole: 'Solution-Architect',
  },
  projectManagerTalk: {
    title: 'Project Manager Talk',
    description:
      'Chào bạn, tôi là Project Manager và sẽ phân chia công việc cũng như timeline dựa theo kiến trúc đã được thiết kế.',
    activeRole: 'Project-Manager',
  },
  projectManagerHandOverSale: {
    title: 'Project Manager Hand Over Sale',
    description:
      'Thông tin timeline & plan đã sẵn sàng, Sale vui lòng chuẩn bị thêm phần báo giá giúp nhé.',
    activeRole: 'Project-Manager',
  },
  saleTalk: {
    title: 'Sale Talk',
    description:
      'Xin chào, tôi là Sale và sẽ xử lý việc lên báo giá & proposal.',
    activeRole: 'Sale',
  },
  saleHandOverDocumentManager: {
    title: 'Sale Hand Over Document Manager',
    description:
      'Tôi đã xong phần báo giá nhờ Document Manager hoàn thiện tài liệu chính thức.',
    activeRole: 'Sale',
  },
  documentManagerTalk: {
    title: 'Document Manager Talk',
    description:
      'Xin chào! Tôi là Document Manager, tôi sẽ tổng hợp và chuẩn bị proposal hoàn chỉnh. Tài liệu sẽ bao gồm tổng hợp yêu cầu, giải pháp, báo giá, timeline, ...',
    activeRole: 'Document-Manager',
  },
  documentManagerHandOverDeliveryManager: {
    title: 'Document Manager Hand Over Delivery Manager',
    description:
      'Tôi đã bàn giao document cuối cùng sang Delivery Manager để triển khai.',
    activeRole: 'Document-Manager',
  },
  deliveryManagerTalk: {
    title: 'Delivery Manager Talk',
    description:
      'Xin chào, tôi là Delivery Manager và sẽ đảm bảo deliver đúng và đủ các yêu cầu từ khách hàng',
    activeRole: 'Delivery-Manager',
  },
  deliveryManagerHandOverEnd: {
    title: 'Delivery Manager Hand Over End',
    description:
      'Tôi đã kiểm tra proposal đáp ứng nhu cầu của của bạn, nhờ bạn kiểm tra giúp proposal nhé.',
    activeRole: 'Delivery-Manager',
  },
};

const initialMessages: Message[] = [
  // {
  //   id: 1,
  //   type: 'user',
  //   content:
  //     'Tôi muốn tạo một game 2048 bằng React. Bạn có thể giúp tôi không?',
  //   timestamp: '10:30 AM',
  //   avatar: 'U',
  //   name: 'You',
  // },
  // {
  //   id: 2,
  //   type: 'system',
  //   role: 'Solution Architect',
  //   content:
  //     'Tôi sẽ giúp bạn thiết kế kiến trúc cho game 2048. Chúng ta sẽ cần các component chính: GameBoard, Tile, GameLogic và ScoreBoard.',
  //   timestamp: '10:31 AM',
  //   avatar: 'SA',
  //   name: 'Alex',
  //   roleColor: 'bg-purple-500',
  // },
  // {
  //   id: 3,
  //   type: 'system',
  //   role: 'Project Manager',
  //   content:
  //     'Tôi đề xuất chia dự án thành 3 sprint: Sprint 1 - UI cơ bản, Sprint 2 - Game logic, Sprint 3 - Animation và polish.',
  //   timestamp: '10:32 AM',
  //   avatar: 'PM',
  //   name: 'Sarah',
  //   roleColor: 'bg-green-500',
  // },
  // {
  //   id: 4,
  //   type: 'user',
  //   content: 'Sounds great! Hãy bắt đầu với Sprint 1 nhé.',
  //   timestamp: '10:33 AM',
  //   avatar: 'U',
  //   name: 'You',
  // },
  // {
  //   id: 5,
  //   type: 'system',
  //   role: 'Pre-Sale',
  //   content:
  //     'Tôi có thể cung cấp template và boilerplate code để bạn bắt đầu nhanh hơn. Bạn có muốn sử dụng TypeScript không?',
  //   timestamp: '10:34 AM',
  //   avatar: 'PS',
  //   name: 'Mike',
  //   roleColor: 'bg-blue-500',
  // },
  // {
  //   id: 6,
  //   type: 'user',
  //   content: 'Có, TypeScript sẽ tốt hơn. Còn về styling thì sao?',
  //   timestamp: '10:35 AM',
  //   avatar: 'U',
  //   name: 'You',
  // },
  // {
  //   id: 7,
  //   type: 'system',
  //   role: 'Solution Architect',
  //   content:
  //     'Tôi recommend sử dụng Tailwind CSS cho styling. Nó sẽ giúp bạn tạo UI nhanh và responsive.',
  //   timestamp: '10:36 AM',
  //   avatar: 'SA',
  //   name: 'Alex',
  //   roleColor: 'bg-purple-500',
  // },
  // {
  //   id: 8,
  //   type: 'system',
  //   role: 'Document Manager',
  //   content:
  //     'Tôi sẽ chuẩn bị documentation và setup guide cho project này. Bạn có cần README chi tiết không?',
  //   timestamp: '10:37 AM',
  //   avatar: 'DM',
  //   name: 'Emma',
  //   roleColor: 'bg-orange-500',
  // },
];
