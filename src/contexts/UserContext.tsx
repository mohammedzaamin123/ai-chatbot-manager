
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'Admin' | 'User' | 'Counselor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAdmin: boolean;
  isCounselor: boolean;
  isUser: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Mock user - in real app this would come from authentication
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Admin'
  });

  const isAdmin = user?.role === 'Admin';
  const isCounselor = user?.role === 'Counselor';
  const isUser = user?.role === 'User';

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isAdmin,
      isCounselor,
      isUser
    }}>
      {children}
    </UserContext.Provider>
  );
};
