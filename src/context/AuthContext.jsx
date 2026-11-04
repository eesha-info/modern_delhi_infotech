import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('mdi_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeView, setActiveView] = useState(() => {
    try {
      const saved = localStorage.getItem('mdi_auth_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.role === 'admin') return 'admin';
        if (parsed.role === 'student') return 'student';
      }
      return 'landing';
    } catch {
      return 'landing';
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('mdi_auth_user', JSON.stringify(user));
      if (user.role === 'admin') setActiveView('admin');
      else if (user.role === 'student') setActiveView('student');
    } else {
      localStorage.removeItem('mdi_auth_user');
      setActiveView('landing');
    }
  }, [user]);

  const loginAsAdmin = (email = 'admin@moderndelhiinfotech.com') => {
    const adminUser = {
      id: 'admin-01',
      role: 'admin',
      name: 'Sonu Kumar (Sonu Sir)',
      email: email,
      designation: 'Director & Chief Technical Mentor',
      qualifications: 'BCA, MCA',
      phone: '+91 70500 12501'
    };
    setUser(adminUser);
    setActiveView('admin');
    return adminUser;
  };

  const loginAsStudent = (studentData) => {
    const studentUser = {
      ...studentData,
      role: 'student'
    };
    setUser(studentUser);
    setActiveView('student');
    return studentUser;
  };

  const logout = () => {
    setUser(null);
    setActiveView('landing');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        activeView,
        setActiveView,
        loginAsAdmin,
        loginAsStudent,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isStudent: user?.role === 'student'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
