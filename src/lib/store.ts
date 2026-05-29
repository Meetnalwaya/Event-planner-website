import { create } from 'zustand'

interface AdminStore {
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
  adminPassword: string
  setAdminPassword: (password: string) => void
  logout: () => void
}

export const useAdminStore = create<AdminStore>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),
  adminPassword: '',
  setAdminPassword: (password: string) => set({ adminPassword: password }),
  logout: () => set({ isAuthenticated: false, adminPassword: '' }),
}))

interface UIStore {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  notifications: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  notifications: [],
  addNotification: (message: string, type: 'success' | 'error' | 'info') =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Date.now().toString(), message, type },
      ],
    })),
  removeNotification: (id: string) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
}))
